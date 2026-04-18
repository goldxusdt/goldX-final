import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.39.7";

const TELEGRAM_BOT_TOKEN = Deno.env.get("TELEGRAM_BOT_TOKEN");
const TELEGRAM_CHAT_ID = Deno.env.get("TELEGRAM_CHAT_ID");
const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabase = createClient(SUPABASE_URL!, SUPABASE_SERVICE_ROLE_KEY!);
    const payload = await req.json();
    
    // Handle both direct calls and database webhooks
    let event_type = payload.event_type;
    let title = payload.title;
    let details = payload.details;

    // If it's a database webhook
    if (payload.record && payload.table) {
      if (payload.table === 'profiles' && payload.type === 'INSERT') {
        event_type = 'new_user';
        title = 'New User Registered';
        details = `User ${payload.record.email} has joined the platform.`;
      } else if (payload.table === 'support_tickets' && payload.type === 'INSERT') {
        event_type = 'form_submission';
        title = 'New Support Ticket';
        details = `Subject: ${payload.record.subject}\nUser ID: ${payload.record.user_id}`;
      } else if (payload.table === 'withdrawals' && payload.type === 'INSERT') {
        event_type = 'withdrawal_request';
        title = 'New Withdrawal Request';
        details = `Amount: ${payload.record.amount} USDT\nUser ID: ${payload.record.user_id}`;
      }
    }

    if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
      console.error("Telegram credentials not configured");
      return new Response(JSON.stringify({ error: "Telegram credentials not configured" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Check if alerts are enabled and if this trigger is active
    const { data: settings } = await supabase
      .from("settings")
      .select("value")
      .in("key", ["telegram_alerts_enabled", "telegram_alert_triggers"]);

    const alertsEnabled = settings?.find(s => s.key === "telegram_alerts_enabled")?.value === "true";
    const triggers = JSON.parse(settings?.find(s => s.key === "telegram_alert_triggers")?.value || "{}");

    if (!alertsEnabled || (event_type && triggers[event_type] === false)) {
      console.log(`Alert suppressed: enabled=${alertsEnabled}, trigger=${event_type}`);
      return new Response(JSON.stringify({ success: true, message: "Alert suppressed" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const timestamp = new Date().toLocaleString();
    const message = `[System Alert] - Title: ${title} | Details: ${details} | Time: ${timestamp}`;

    // Prepare inline keyboard for interactive actions
    let reply_markup = null;
    if (event_type === 'withdrawal_request' && payload.record?.id) {
      reply_markup = {
        inline_keyboard: [
          [
            { text: "✅ Approve", callback_data: `approve_withdrawal:${payload.record.id}` },
            { text: "❌ Reject", callback_data: `reject_withdrawal:${payload.record.id}` }
          ]
        ]
      };
    } else if (event_type === 'form_submission' && payload.record?.id) {
      reply_markup = {
        inline_keyboard: [
          [
            { text: "💬 Reply", callback_data: `reply_ticket:${payload.record.id}` }
          ]
        ]
      };
    }

    const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message,
        parse_mode: "HTML",
        reply_markup: reply_markup,
      }),
    });

    const result = await response.json();

    // Log the alert
    const { data: alertLog } = await supabase.from("telegram_alerts_history").insert({
      event_type,
      message,
      status: result.ok ? "sent" : "failed",
      error_message: result.ok ? null : result.description,
      message_id: result.ok ? result.result.message_id.toString() : null,
    }).select().single();

    // Update original record with message ID if applicable
    if (result.ok && payload.record?.id) {
      if (event_type === 'withdrawal_request') {
        await supabase.from('withdrawals').update({ telegram_message_id: result.result.message_id.toString() }).eq('id', payload.record.id);
      } else if (event_type === 'form_submission') {
        await supabase.from('support_tickets').update({ telegram_message_id: result.result.message_id.toString() }).eq('id', payload.record.id);
      }
    }

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error sending Telegram alert:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
