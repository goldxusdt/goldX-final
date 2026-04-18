import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";
import * as OTPAuth from "https://esm.sh/otpauth@9.1.2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    const body = await req.json();
    const { email, token, secret: setupSecret, isBackupCode, mode } = body;

    if (mode === 'ping') {
      return new Response(JSON.stringify({ success: true, message: 'verify-totp is healthy' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (!email || !token) {
      throw new Error("Email and token are required");
    }

    const { data: profileData, error: profileError } = await supabaseClient
      .from("profiles")
      .select("mfa_secret, mfa_backup_codes, id, mfa_locked_until, mfa_failed_attempts")
      .eq("email", email)
      .maybeSingle();

    if (profileError || !profileData) {
      throw new Error("User profile not found");
    }

    if (profileData.mfa_locked_until && new Date(profileData.mfa_locked_until) > new Date()) {
      throw new Error("MFA is temporarily locked due to too many failed attempts");
    }

    let isValid = false;

    if (isBackupCode) {
      const hashedCodes = profileData.mfa_backup_codes || [];
      const encoder = new TextEncoder();
      const data = encoder.encode(token);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const inputHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      
      const matchedIdx = hashedCodes.findIndex((h: string) => h === inputHash || h === btoa(token));

      if (matchedIdx !== -1) {
        isValid = true;
        const updatedCodes = hashedCodes.filter((_: any, i: number) => i !== matchedIdx);
        await supabaseClient
          .from("profiles")
          .update({ mfa_backup_codes: updatedCodes })
          .eq("id", profileData.id);
      }
    } else {
      const mfaSecret = setupSecret || profileData?.mfa_secret;
      if (!mfaSecret) {
        throw new Error("MFA secret not found");
      }
      
      const totpObj = new OTPAuth.TOTP({
        secret: mfaSecret,
        algorithm: "SHA1",
        digits: 6,
        period: 30,
      });
      const delta = totpObj.validate({ token, window: 1 });
      isValid = delta !== null;
    }

    if (!isValid) {
      const attempts = (profileData.mfa_failed_attempts || 0) + 1;
      const updates: any = { mfa_failed_attempts: attempts };
      if (attempts >= 5) {
        updates.mfa_locked_until = new Date(Date.now() + 30 * 60 * 1000).toISOString();
      }
      await supabaseClient.from("profiles").update(updates).eq("id", profileData.id);
      
      return new Response(JSON.stringify({ error: "Invalid security code" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      });
    }

    await supabaseClient.from("profiles").update({ 
      mfa_failed_attempts: 0, 
      mfa_locked_until: null 
    }).eq("id", profileData.id);

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
