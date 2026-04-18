import { Bell, Send, History, Layout, Plus, Loader2, Trash2, CheckCircle2, AlertCircle, Monitor, Settings } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/db/supabase';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { SEOHead } from '@/lib/seo';
import { invokeEdgeFunction } from '@/lib/functions';

import type { NotificationHistory, NotificationTemplate } from '@/types';
import { cn } from '@/lib/utils';

export default function AdminNotificationDashboardPage() {
  const [history, setHistory] = useState<NotificationHistory[]>([]);
  const [templates, setTemplates] = useState<NotificationTemplate[]>([]);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [activeTab, setActiveTab] = useState('compose');

  const [notification, setNotification] = useState({
    title: '',
    body: '',
    target_type: 'all',
    target_id: '',
    action_url: '',
    icon_url: ''
  });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [historyRes, templatesRes] = await Promise.all([
        supabase.from('notification_history').select('*').order('sent_at', { ascending: false }),
        supabase.from('notification_templates').select('*').order('created_at', { ascending: false })
      ]);

      if (historyRes.error) throw historyRes.error;
      if (templatesRes.error) throw templatesRes.error;

      setHistory(historyRes.data || []);
      setTemplates(templatesRes.data || []);
    } catch (error) {
      toast.error('Failed to load notification data');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (!notification.title || !notification.body) {
      toast.error('Title and body are required');
      return;
    }

    setSending(true);
    try {
      const { data, error } = await invokeEdgeFunction('send-push-notification', {
        body: notification
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Failed to send notification');

      toast.success(`Notification sent successfully to ${data.stats.delivered} users!`);
      setNotification({
        title: '',
        body: '',
        target_type: 'all',
        target_id: '',
        action_url: '',
        icon_url: ''
      });
      loadData();
    } catch (error: any) {
      console.error('Send error:', error);
      toast.error(error.message || 'Failed to send notification');
    } finally {
      setSending(false);
    }
  };

  const handleApplyTemplate = (template: any) => {
    setNotification({
      ...notification,
      title: template.title,
      body: template.body
    });
    setActiveTab('compose');
    toast.success('Template applied');
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
      <SEOHead title="Notification Management" noindex={true} />
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl sm:text-4xl font-black v56-gradient-text tracking-tight leading-tight flex items-center gap-3">
            <Bell className="h-8 w-8 text-primary" />
            Notification <span className="text-foreground">Management</span>
          </h1>
          <p className="text-xs uppercase font-bold tracking-widest text-muted-foreground flex items-center gap-2">
            <Send className="h-4 w-4 text-primary" />
            Browser Push Notifications & User Broadcasts
          </p>
        </div>
        <Button 
          variant="outline" 
          onClick={loadData} 
          className="h-12 rounded-xl border-primary/20 hover:bg-primary/5"
        >
          <History className="mr-2 h-4 w-4" />
          Refresh Data
        </Button>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
        <TabsList className="v56-glass premium-border p-1 h-14 rounded-2xl gap-2 bg-white/5">
          <TabsTrigger value="compose" className="rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full">
            <Plus className="mr-2 h-4 w-4" />
            Compose
          </TabsTrigger>
          <TabsTrigger value="templates" className="rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full">
            <Layout className="mr-2 h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="history" className="rounded-xl font-bold uppercase tracking-widest text-[10px] data-[state=active]:bg-primary data-[state=active]:text-primary-foreground h-full">
            <History className="mr-2 h-4 w-4" />
            History
          </TabsTrigger>
        </TabsList>

        <TabsContent value="compose" className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="v56-glass premium-border overflow-hidden">
              <CardHeader className="bg-primary/5 border-b border-white/5">
                <CardTitle className="text-lg font-black flex items-center gap-2">
                  <Send className="h-5 w-5 text-primary" />
                  Broadcast Notification
                </CardTitle>
                <CardDescription>Compose a message to send to your users.</CardDescription>
              </CardHeader>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest">Target Audience</Label>
                    <Select 
                      value={notification.target_type} 
                      onValueChange={(val) => setNotification({...notification, target_type: val})}
                    >
                      <SelectTrigger className="rounded-xl h-12 border-white/10 bg-white/5">
                        <SelectValue placeholder="Select target audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Subscribed Users</SelectItem>
                        <SelectItem value="individual">Specific User</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {notification.target_type === 'individual' && (
                    <div className="space-y-2">
                      <Label className="text-xs font-bold uppercase tracking-widest">User ID</Label>
                      <Input 
                        placeholder="Enter Supabase User ID" 
                        value={notification.target_id}
                        onChange={(e) => setNotification({...notification, target_id: e.target.value})}
                        className="rounded-xl h-12 border-white/10 bg-white/5"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest">Title (Max 50 characters)</Label>
                    <Input 
                      placeholder="e.g. New Investment Opportunity" 
                      maxLength={50}
                      value={notification.title}
                      onChange={(e) => setNotification({...notification, title: e.target.value})}
                      className="rounded-xl h-12 border-white/10 bg-white/5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest">Message Body (Max 200 characters)</Label>
                    <Textarea 
                      placeholder="Describe your notification..." 
                      maxLength={200}
                      value={notification.body}
                      onChange={(e) => setNotification({...notification, body: e.target.value})}
                      className="rounded-xl min-h-[120px] border-white/10 bg-white/5"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest">Action URL (Optional)</Label>
                    <Input 
                      placeholder="e.g. https://goldxusdt.com/blog/new-post" 
                      value={notification.action_url}
                      onChange={(e) => setNotification({...notification, action_url: e.target.value})}
                      className="rounded-xl h-12 border-white/10 bg-white/5"
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleSendNotification} 
                  className="w-full h-14 rounded-xl font-bold uppercase tracking-widest premium-gradient"
                  disabled={sending}
                >
                  {sending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
                  Send Push Notification
                </Button>
              </CardContent>
            </Card>

            <div className="space-y-8">
              <Card className="v56-glass premium-border overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <Monitor className="h-5 w-5 text-blue-500" />
                    Live Preview
                  </CardTitle>
                  <CardDescription>How users will see your notification.</CardDescription>
                </CardHeader>
                <CardContent className="p-8 flex justify-center bg-black/20">
                  <div className="w-full max-w-[320px] p-4 rounded-2xl bg-[#2a2a2e] text-white shadow-2xl border border-white/10 animate-pulse">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center border border-primary/30">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-black truncate">{notification.title || 'Notification Title'}</p>
                        <p className="text-[10px] text-gray-400 line-clamp-2">{notification.body || 'Your message body will appear here...'}</p>
                        <p className="text-[8px] text-gray-500 mt-1 uppercase font-bold">via GOLD X USDT</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="v56-glass premium-border overflow-hidden">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <Settings className="h-5 w-5 text-amber-500" />
                    Sending Policy
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4 text-xs text-muted-foreground">
                  <div className="flex items-start gap-3 p-3 rounded-xl bg-amber-500/5 border border-amber-500/10 text-amber-500/80">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <p>Notifications are sent in real-time to all users who have explicitly opted in via their browser.</p>
                  </div>
                  <ul className="space-y-2 list-disc pl-4">
                    <li>Rate limiting: Maximum 10 notifications per user per day.</li>
                    <li>Browser support: Chrome, Firefox, Safari, Edge (Desktop & Mobile).</li>
                    <li>Privacy: User consent is required for all broadcast communications.</li>
                    <li>Persistence: Notifications expire and are cleared after 7 days if unclicked.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="templates" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="v56-glass premium-border border-dashed border-white/20 hover:border-primary/50 transition-all cursor-pointer group flex flex-col items-center justify-center p-8 h-[240px]">
              <Plus className="h-10 w-10 text-muted-foreground group-hover:text-primary mb-4 transition-colors" />
              <p className="text-sm font-black uppercase tracking-widest text-muted-foreground">Create Template</p>
            </Card>

            {templates.map((template) => (
              <Card key={template.id} className="v56-glass premium-border overflow-hidden hover:scale-[1.02] transition-transform">
                <CardHeader className="bg-white/5 border-b border-white/5">
                  <div className="flex justify-between items-start">
                    <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest bg-primary/10 text-primary border-primary/20">
                      {template.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-sm font-black mt-3">{template.name}</CardTitle>
                </CardHeader>
                <CardContent className="p-4 space-y-2">
                  <p className="text-xs font-bold line-clamp-1">{template.title}</p>
                  <p className="text-[10px] text-muted-foreground line-clamp-3 leading-relaxed">{template.body}</p>
                </CardContent>
                <CardFooter className="p-4 pt-0">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full text-[10px] font-black uppercase tracking-widest h-10 rounded-xl"
                    onClick={() => handleApplyTemplate(template)}
                  >
                    Apply Template
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-8">
          <Card className="v56-glass premium-border overflow-hidden">
            <CardContent className="p-0">
              <Table>
                <TableHeader className="bg-white/5">
                  <TableRow className="border-white/5">
                    <TableHead className="py-6 pl-8 font-black uppercase tracking-widest text-[10px]">Notification</TableHead>
                    <TableHead className="py-6 font-black uppercase tracking-widest text-[10px]">Audience</TableHead>
                    <TableHead className="py-6 font-black uppercase tracking-widest text-[10px]">Delivered</TableHead>
                    <TableHead className="py-6 font-black uppercase tracking-widest text-[10px]">Engagement</TableHead>
                    <TableHead className="py-6 pr-8 text-right font-black uppercase tracking-widest text-[10px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((log) => (
                    <TableRow key={log.id} className="border-white/5 hover:bg-white/5 transition-colors">
                      <TableCell className="py-6 pl-8">
                        <div className="space-y-1">
                          <p className="text-sm font-bold">{log.title}</p>
                          <p className="text-[10px] text-muted-foreground line-clamp-1">{log.body}</p>
                          <p className="text-[9px] text-muted-foreground/60">{format(new Date(log.sent_at), 'MMM dd, yyyy HH:mm')}</p>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <Badge variant="outline" className="text-[9px] font-black uppercase tracking-widest">
                          {log.target_type}
                        </Badge>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                          <span className="text-sm font-black">{log.stats?.delivered || 0}</span>
                        </div>
                      </TableCell>
                      <TableCell className="py-6">
                        <div className="space-y-1">
                          <div className="flex justify-between text-[10px] font-bold">
                            <span>CTR</span>
                            <span>{log.stats?.delivered ? ((log.stats.clicked / log.stats.delivered) * 100).toFixed(1) : 0}%</span>
                          </div>
                          <Progress value={log.stats?.delivered ? (log.stats.clicked / log.stats.delivered) * 100 : 0} className="h-1" />
                        </div>
                      </TableCell>
                      <TableCell className="py-6 pr-8 text-right">
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-400 hover:bg-red-500/10 h-10 w-10 rounded-xl">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                  {history.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} className="py-20 text-center text-muted-foreground italic text-sm">
                        No broadcast history found.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Progress({ value, className }: { value: number, className?: string }) {
  return (
    <div className={cn("w-full bg-white/5 rounded-full h-2 overflow-hidden", className)}>
      <div 
        className="h-full bg-primary transition-all duration-500" 
        style={{ width: `${value}%` }}
      />
    </div>
  );
}
