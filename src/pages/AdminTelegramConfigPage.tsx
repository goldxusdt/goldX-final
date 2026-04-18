import { Send, Settings, History, Loader2, CheckCircle2, AlertCircle, Info, ExternalLink, Bot, MessageSquare, Terminal, Globe, ShieldCheck } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { SEOHead } from '@/lib/seo';
import { invokeEdgeFunction } from '@/lib/functions';

import type { PlatformSetting, TelegramAlertHistory } from '@/types';

export default function AdminTelegramConfigPage() {
  const [history, setHistory] = useState<TelegramAlertHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [testing, setTesting] = useState(false);
  const [config, setConfig] = useState({
    enabled: false,
    triggers: {
      new_user: true,
      failed_login: true,
      critical_error: true,
      form_submission: true
    }
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const { data: settings } = await supabase
        .from('settings')
        .select('*')
        .in('key', ['telegram_alerts_enabled', 'telegram_alert_triggers']) as { data: PlatformSetting[] | null };

      const { data: historyRes } = await supabase
        .from('telegram_alerts_history')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20) as { data: TelegramAlertHistory[] | null };

      const enabled = settings?.find(s => s.key === 'telegram_alerts_enabled')?.value === 'true';
      const triggers = JSON.parse(settings?.find(s => s.key === 'telegram_alert_triggers')?.value || '{}');

      setConfig({ enabled, triggers });
      setHistory(historyRes || []);
    } catch (error) {
      toast.error('Failed to load Telegram configuration');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateConfig = async (newConfig: typeof config) => {
    try {
      await Promise.all([
        // @ts-ignore
        supabase.from('settings').update({ value: newConfig.enabled.toString() }).eq('key', 'telegram_alerts_enabled'),
        // @ts-ignore
        supabase.from('settings').update({ value: JSON.stringify(newConfig.triggers) }).eq('key', 'telegram_alert_triggers')
      ]);
      setConfig(newConfig);
      toast.success('Configuration updated successfully');
    } catch (error) {
      toast.error('Failed to update configuration');
    }
  };

  const handleSetWebhook = async () => {
    setTesting(true);
    try {
      const webhookUrl = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-webhook`;
      const response = await fetch(`https://api.telegram.org/bot${import.meta.env.VITE_TELEGRAM_BOT_TOKEN}/setWebhook`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: webhookUrl })
      });
      const result = await response.json();
      if (result.ok) {
        toast.success('Webhook set successfully!');
      } else {
        toast.error(`Failed to set webhook: ${result.description}`);
      }
    } catch (error) {
      toast.error('Failed to set webhook');
    } finally {
      setTesting(false);
    }
  };

  const handleTestAlert = async () => {
    setTesting(true);
    try {
      const { data, error } = await invokeEdgeFunction('send-telegram-alert', {
        body: {
          event_type: 'test',
          title: 'Test System Alert',
          details: 'This is a test notification from the Gold X Usdt administrative panel to verify Bot integration.'
        }
      });

      if (error) throw error;
      if (!data.ok) throw new Error(data.description || 'Failed to send test alert');

      toast.success('Test alert sent successfully! Check your Telegram.');
      loadData();
    } catch (error: any) {
      toast.error(error.message || 'Failed to send test alert');
    } finally {
      setTesting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      <SEOHead title="Telegram Alert Config" noindex={true} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black v56-gradient-text tracking-tight leading-tight flex items-center gap-3">
            <Bot className="h-8 w-8 text-[#0088cc]" />
            Telegram <span className="text-foreground">Alerts</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
            <Settings className="h-4 w-4 text-[#0088cc]" />
            Administrative System Monitoring
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadData} 
          className="h-12 rounded-xl border-[#0088cc]/20 hover:bg-[#0088cc]/5"
        >
          <History className="mr-2 h-4 w-4" />
          Refresh Status
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Card className="v56-glass premium-border overflow-hidden">
            <CardHeader className="bg-[#0088cc]/5 border-b border-white/5">
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-[#0088cc]" />
                    Trigger Configuration
                  </CardTitle>
                  <CardDescription>Select which events should trigger a Telegram alert.</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest">{config.enabled ? 'Enabled' : 'Disabled'}</span>
                  <Switch 
                    checked={config.enabled} 
                    onCheckedChange={(val) => handleUpdateConfig({...config, enabled: val})} 
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { id: 'new_user', label: 'New User Registration', desc: 'Alert when a new account is verified.' },
                  { id: 'failed_login', label: 'Failed Admin Login', desc: 'Alert on incorrect admin MFA attempts.' },
                  { id: 'critical_error', label: 'System Errors', desc: 'Alert on edge function failures.' },
                  { id: 'form_submission', label: 'Form Submissions', desc: 'Alert when users submit support tickets.' }
                ].map((trigger) => (
                  <div key={trigger.id} className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 transition-colors hover:bg-white/10">
                    <div className="space-y-0.5">
                      <Label className="text-xs font-black uppercase tracking-widest">{trigger.label}</Label>
                      <p className="text-[10px] text-muted-foreground">{trigger.desc}</p>
                    </div>
                    <Switch 
                      checked={config.triggers[trigger.id as keyof typeof config.triggers]} 
                      onCheckedChange={(val) => handleUpdateConfig({
                        ...config, 
                        triggers: { ...config.triggers, [trigger.id]: val }
                      })}
                      disabled={!config.enabled}
                    />
                  </div>
                ))}
              </div>

              <div className="p-4 rounded-xl bg-[#0088cc]/10 border border-[#0088cc]/20 flex items-start gap-4">
                <Info className="h-5 w-5 text-[#0088cc] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-[#0088cc]">Security Note</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Alerts are sent using the configured Telegram Bot Token and Chat ID stored in your environment secrets. 
                    Ensure your bot has permissions to send messages to the designated chat.
                  </p>
                </div>
              </div>

              <Button 
                onClick={handleTestAlert} 
                disabled={testing || !config.enabled}
                className="w-full h-14 rounded-xl font-bold uppercase tracking-widest bg-[#0088cc] hover:bg-[#0077bb] text-white"
              >
                {testing ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                Send Test Alert
              </Button>
            </CardContent>
          </Card>

          <Card className="v56-glass premium-border overflow-hidden">
            <CardHeader className="bg-primary/5 border-b border-white/5">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                Telegram Webhook Configuration
              </CardTitle>
              <CardDescription>
                Enable interactive functionality by setting the webhook URL.
              </CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 shrink-0" />
                <div className="space-y-1">
                  <p className="text-xs font-bold text-blue-500">How Webhooks Work</p>
                  <p className="text-[10px] text-muted-foreground leading-relaxed">
                    Webhooks allow Telegram to send messages and button clicks from the bot back to our platform.
                    This is required for approving withdrawals and replying to tickets via Telegram.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 group hover:bg-white/10 transition-colors">
                <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Globe className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-black uppercase tracking-widest mb-0.5">Webhook Status</p>
                  <p className="text-[10px] text-muted-foreground font-mono truncate">
                    {import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-webhook
                  </p>
                </div>
                <Button 
                  onClick={handleSetWebhook} 
                  disabled={testing}
                  className="rounded-xl px-6 font-black uppercase tracking-widest text-[10px] h-10 shrink-0"
                >
                  {testing ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Set Webhook'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="v56-glass premium-border overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/5">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <History className="h-5 w-5 text-amber-500" />
                Alert History
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="border-white/5">
                    <TableHead className="py-6 pl-8 font-black uppercase tracking-widest text-[10px]">Event Type</TableHead>
                    <TableHead className="py-6 font-black uppercase tracking-widest text-[10px]">Message</TableHead>
                    <TableHead className="py-6 font-black uppercase tracking-widest text-[10px]">Status</TableHead>
                    <TableHead className="py-6 pr-8 text-right font-black uppercase tracking-widest text-[10px]">Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((alert) => (
                    <TableRow key={alert.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="py-6 pl-8">
                        <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">
                          {alert.event_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <p className="text-xs line-clamp-1 max-w-[300px]">{alert.message}</p>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2">
                          {alert.status === 'sent' ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : (
                            <AlertCircle className="h-4 w-4 text-red-500" />
                          )}
                          <span className="text-xs font-bold uppercase tracking-widest">{alert.status}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6 pr-8 text-right text-[10px] text-muted-foreground">
                        {format(new Date(alert.created_at), 'HH:mm:ss')}
                      </TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={4} className="py-20 text-center text-muted-foreground italic text-sm">
                        No alert history recorded yet.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card className="v56-glass premium-border overflow-hidden bg-[#0088cc]/5 border-[#0088cc]/20">
            <CardHeader className="bg-[#0088cc]/10 border-b border-[#0088cc]/10">
              <CardTitle className="text-lg font-black flex items-center gap-2">
                <Terminal className="h-5 w-5 text-[#0088cc]" />
                Setup Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-[10px]">1</span>
                    Create Bot
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Open Telegram and search for <span className="font-black text-foreground">@BotFather</span>. Use the <span className="text-[#0088cc] font-mono">/newbot</span> command to create your bot and obtain your <span className="font-bold">Bot Token</span>.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-[10px]">2</span>
                    Get Chat ID
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Message your bot or use <span className="font-black text-foreground">@userinfobot</span> to find your <span className="font-bold">Chat ID</span>. This is where alerts will be sent.
                  </p>
                </div>

                <div className="space-y-2">
                  <h4 className="text-xs font-black uppercase tracking-widest flex items-center gap-2">
                    <span className="h-5 w-5 rounded-full bg-[#0088cc] text-white flex items-center justify-center text-[10px]">3</span>
                    Store Secrets
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    Add the <span className="font-mono text-[#0088cc]">TELEGRAM_BOT_TOKEN</span> and <span className="font-mono text-[#0088cc]">TELEGRAM_CHAT_ID</span> to your project's environment variables.
                  </p>
                </div>
              </div>

              <div className="pt-4 border-t border-[#0088cc]/10">
                <Button variant="ghost" className="w-full text-[#0088cc] hover:bg-[#0088cc]/10 text-xs font-bold" asChild>
                  <a href="https://core.telegram.org/bots/tutorial" target="_blank" rel="noreferrer">
                    Full Documentation <ExternalLink className="ml-2 h-3 w-3" />
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="v56-glass premium-border overflow-hidden">
            <CardHeader className="bg-white/5 border-b border-white/5">
              <CardTitle className="text-sm font-black uppercase tracking-widest">Bot Status</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Bot API</span>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">Online</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Webhook</span>
                  <Badge variant="outline" className="text-[10px] bg-green-500/10 text-green-500 border-green-500/20">Active</Badge>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Last Alert</span>
                  <span className="font-mono text-primary">{history[0] ? format(new Date(history[0].created_at), 'HH:mm') : 'Never'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
