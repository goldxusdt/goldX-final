import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import * as totp from 'https://esm.sh/otplib@12.0.1';
import { corsHeaders, sanitizeInput } from '../_shared/security.ts';

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    const rawBody = await req.json();
    const { email, token, secret: setupSecret, isBackupCode } = sanitizeInput(rawBody);

    const { data: profileData, error: profileError } = await supabaseClient
      .from('profiles')
      .select('mfa_secret, mfa_backup_codes, id')
      .eq('email', email)
      .maybeSingle();
    
    if (profileError || !profileData) {
      throw new Error('User profile not found');
    }

    if (isBackupCode) {
      const hashedCodes = profileData.mfa_backup_codes || [];
      const matchedIdx = hashedCodes.findIndex((h: string) => h === btoa(token));
      
      if (matchedIdx === -1) {
        return new Response(JSON.stringify({ error: 'Invalid backup code' }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 400,
        });
      }

      const updatedCodes = hashedCodes.filter((_: any, i: number) => i !== matchedIdx);
      await supabaseClient
        .from('profiles')
        .update({ mfa_backup_codes: updatedCodes })
        .eq('id', profileData.id);

      const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '127.0.0.1';
      await supabaseClient.from('admin_security_logs').insert({
        admin_id: profileData.id,
        event_type: 'mfa_recovery_code_used',
        ip_address: clientIp.split(',')[0].trim(),
        user_agent: req.headers.get('user-agent'),
        outcome: 'success',
        additional_details: { method: 'backup_code' },
      });

      return new Response(JSON.stringify({ success: true, message: 'Backup code accepted' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      });
    }

    const mfaSecret = setupSecret || profileData?.mfa_secret;
    if (!mfaSecret) {
      throw new Error('MFA secret not found');
    }

    const isValid = totp.authenticator.check(token, mfaSecret);

    if (!isValid) {
      return new Response(JSON.stringify({ error: 'Invalid security code' }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      });
    }

    const clientIp = req.headers.get('cf-connecting-ip') || req.headers.get('x-forwarded-for') || '127.0.0.1';
    await supabaseClient.from('admin_security_logs').insert({
      admin_id: profileData.id,
      event_type: setupSecret ? 'mfa_setup_verified' : 'mfa_verified',
      ip_address: clientIp.split(',')[0].trim(),
      user_agent: req.headers.get('user-agent'),
      outcome: 'success',
      additional_details: { method: 'totp', is_setup: !!setupSecret },
    });

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
