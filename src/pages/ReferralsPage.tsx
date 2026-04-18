import { Award, Copy, TrendingUp, Users, Target, Shield, Zap, Share2, Star, BarChart3, Network, History, LayoutGrid } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useAuth } from '@/contexts/AuthContext';
import { getReferralCommissions, getReferralStats } from '@/db/api';
import { ReferralTree } from '@/components/ReferralTree';
import { NetworkAnalytics } from '@/components/referrals/NetworkAnalytics';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { ReferralCommission, ReferralStats } from '@/types';
import { cn } from '@/lib/utils';
import { supabase } from '@/db/supabase';

export default function ReferralsPage() {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState<ReferralStats | null>(null);
  const [commissions, setCommissions] = useState<ReferralCommission[]>([]);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    loadData();
    loadSettings();
  }, [user]);

  const loadSettings = async () => {
    const { data } = await supabase.from('settings').select('key, value');
    if (data) {
      const settingsObj: Record<string, string> = {};
      (data as any[]).forEach(s => settingsObj[s.key] = s.value);
      setSettings(settingsObj);
    }
  };

  const loadData = async () => {
    if (!user) return;
    try {
      const [statsData, commissionsData] = await Promise.all([
        getReferralStats(user.id),
        getReferralCommissions(user.id)
      ]);
      if (statsData) setStats(statsData);
      if (commissionsData) setCommissions(commissionsData);
    } catch (error) {
      console.error('Failed to load referral data:', error);
    }
  };

  const getReferralLink = () => {
    if (!profile?.referral_code) return '';
    return `${window.location.origin}/signup?ref=${profile.referral_code}`;
  };

  const copyReferralLink = () => {
    const link = getReferralLink();
    navigator.clipboard.writeText(link);
    toast.success('Referral link copied to clipboard!');
  };

  const levelColors = [
    '#FFD700', '#FFA500', '#FF8C00', '#FF7F50', '#FF6347', 
    '#FF4500', '#FF0000', '#DC143C', '#B22222', '#8B0000',
    '#FF1493', '#C71585', '#800080', '#4B0082', '#00008B'
  ];

  const getLevelPercentage = (level: number) => {
    const key = `level${level}_commission`;
    return settings[key] ? `${settings[key]}%` : '0%';
  };

  const levelTargets = [
    'Always Active', 'Always Active', 'Always Active', 'Always Active',
    '10,000 USDT Performance', '25,000 USDT Performance', '50,000 USDT Performance', '75,000 USDT Performance',
    '100,000 USDT Performance', '150,000 USDT Performance', '200,000 USDT Performance', '300,000 USDT Performance',
    '400,000 USDT Performance', '500,000 USDT Performance', '1,000,000 USDT Performance'
  ];
  const levelTargetAmounts = [
    0, 0, 0, 0,
    10000, 25000, 50000, 75000, 100000, 150000, 200000, 300000, 400000, 500000, 1000000
  ];

  return (
    <div className="p-6 lg:p-10 space-y-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            Network <span className="v56-gradient-text">Expansion</span>
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Users className="h-4 w-4" />
            Build your team and earn multi-level rewards
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
          <Button 
            onClick={() => navigate('/referrals/advanced')} 
            variant="outline"
            className="v56-glass flex-1 md:flex-none h-12 rounded-xl font-bold uppercase tracking-widest text-xs px-6 border-primary/20 text-primary hover:bg-primary/10"
          >
            <Network className="mr-2 h-4 w-4" />
            Advanced Tree Dashboard
          </Button>
          <Button onClick={copyReferralLink} className="v56-primary-btn flex-1 md:flex-none h-12 rounded-xl font-bold uppercase tracking-widest text-xs px-6 shadow-lg shadow-primary/20">
            <Copy className="mr-2 h-4 w-4" />
            Copy Invite Link
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-8">
        <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 no-scrollbar">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-xl bg-muted/50 p-1 text-muted-foreground w-max sm:w-full sm:grid sm:grid-cols-4 border border-white/5">
            <TabsTrigger value="overview" className="rounded-lg h-10 px-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <LayoutGrid className="h-3 w-3" /> Overview
            </TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-lg h-10 px-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <BarChart3 className="h-3 w-3" /> Network Analytics
            </TabsTrigger>
            <TabsTrigger value="tree" className="rounded-lg h-10 px-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <Network className="h-3 w-3" /> Genealogy Tree
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-lg h-10 px-6 font-bold uppercase tracking-widest text-[10px] flex items-center gap-2">
              <History className="h-3 w-3" /> Bonus History
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="overview" className="space-y-10">
          {/* Referral Link Card - Re-designed */}
          <Card className="v56-glass premium-border relative overflow-hidden group gold-shimmer">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Share2 size={120} />
            </div>
            <CardContent className="p-8">
              <div className="flex flex-col lg:flex-row gap-8 items-center">
                <div className="flex-1 space-y-4 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-black uppercase tracking-widest text-primary">
                    <Star className="h-3 w-3 fill-primary" /> Elite Invitation Link
                  </div>
                  <h2 className="text-2xl font-black">Invite Partners, Scale Wealth</h2>
                  <p className="text-muted-foreground text-sm max-w-xl">
                    Share your unique invitation link with your network and automatically earn commissions 
                    from up to 15 levels of deep-tier referrals.
                  </p>
                </div>
                <div className="w-full lg:w-auto space-y-4">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1 min-w-0 sm:min-w-[300px]">
                      <Input
                        value={getReferralLink()}
                        readOnly
                        className="font-mono text-xs h-12 bg-accent/30 border-white/10 pr-12 rounded-xl"
                      />
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1 h-10 w-10 hover:bg-primary/20"
                        onClick={copyReferralLink}
                      >
                        <Copy className="h-4 w-4 text-primary" />
                      </Button>
                    </div>
                    <Button onClick={copyReferralLink} className=" h-12 px-8 font-black uppercase tracking-widest rounded-xl">
                      Copy Link
                    </Button>
                  </div>
                  <div className="flex items-center justify-center lg:justify-start gap-4">
                    <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Invitation Code:</p>
                    <code className="px-3 py-1 rounded-lg bg-primary/10 border border-primary/20 text-primary font-black font-mono tracking-tighter">
                      {profile?.referral_code || '---'}
                    </code>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats Cards - Enhanced */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="v56-glass premium-border group hover:border-primary/40 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Total Partners</p>
                <Users className="h-5 w-5 text-blue-400 transition-transform group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tabular-nums">{stats?.totalReferrals || 0}</div>
                <p className="text-[10px] text-muted-foreground mt-1">Across all levels</p>
              </CardContent>
            </Card>

            <Card className="v56-glass premium-border group hover:border-primary/40 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Performance Fund</p>
                <Zap className="h-5 w-5 text-yellow-400 transition-transform group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tabular-nums">${Number((profile as any)?.performance_contribution || 0).toFixed(2)}</div>
                <p className="text-[10px] text-muted-foreground mt-1">Direct Performance Profit</p>
              </CardContent>
            </Card>

            <Card className="v56-glass premium-border group hover:border-primary/40 transition-all">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Network Bonuses</p>
                <TrendingUp className="h-5 w-5 text-blue-400 transition-transform group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tabular-nums">${stats?.totalEarnings.toFixed(2) || '0.00'}</div>
                <p className="text-[10px] text-muted-foreground mt-1">Total Commission Earned</p>
              </CardContent>
            </Card>

            <Card className="v56-glass premium-border group hover:border-primary/40 transition-all gold-border">
              <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                <p className="text-[10px] uppercase font-black tracking-widest text-primary">Direct Referrals</p>
                <Award className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-black tabular-nums">{stats?.level1Count || 0}</div>
                <p className="text-[10px] text-muted-foreground mt-1 text-primary/60">Level 1 Active</p>
              </CardContent>
            </Card>
          </div>

          {/* Commission Structure - Grid Visual */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h3 className="text-xl font-black flex items-center gap-2">
                  <Target className="h-5 w-5 text-primary" />
                  Commission <span className="text-primary">Architecture</span>
                </h3>
                <p className="text-xs text-muted-foreground">Advanced 15-tier rewards system</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {Array.from({ length: 15 }).map((_, i) => {
                const level = i + 1;
                const isEnabled = (profile as any)?.[`referral_level_${level}_enabled`] ?? (level <= 4);
                const isLocked = !isEnabled;
                const levelCount = stats?.[`level_${level}_count` as keyof ReferralStats] || 0;
                const levelIncome = stats?.[`level_${level}_commission` as keyof ReferralStats] || 0;
                const target = levelTargetAmounts[i];
                const performance = profile?.performance_usdt || 0;
                const progress = target > 0 ? Math.min(100, (performance / target) * 100) : 100;
                
                return (
                  <div
                    key={level}
                    className={cn(
                      "relative p-5 rounded-2xl border transition-all duration-300 group overflow-hidden",
                      isLocked 
                        ? "bg-muted/10 border-white/5 opacity-70" 
                        : "v56-glass border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(255,215,0,0.1)]"
                    )}
                  >
                    {isLocked && (
                      <div className="absolute top-3 right-3">
                        <Shield className="h-3 w-3 text-muted-foreground opacity-30" />
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-4">
                      <div 
                        className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-xs border"
                        style={{ 
                          backgroundColor: `${levelColors[i]}15`, 
                          borderColor: `${levelColors[i]}30`,
                          color: levelColors[i]
                        }}
                      >
                        L{level}
                      </div>
                      <div>
                        <p className="text-2xl font-black tabular-nums tracking-tighter">{getLevelPercentage(i + 1)}</p>
                        <p className="text-[8px] uppercase font-black tracking-widest text-muted-foreground">Commission</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="p-3 rounded-xl bg-accent/30 border border-white/5 space-y-1">
                        <p className="text-[8px] uppercase font-black tracking-[0.2em] text-muted-foreground">Target</p>
                        <p className="text-[10px] font-bold truncate leading-tight">{levelTargets[i]}</p>
                        {target > 0 && (
                          <div className="mt-2 space-y-1">
                            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary transition-all duration-500" 
                                style={{ width: `${progress}%` }} 
                              />
                            </div>
                            <p className="text-[8px] text-right text-muted-foreground font-medium">
                              {performance.toLocaleString()} / {target.toLocaleString()} USDT
                            </p>
                          </div>
                        )}
                      </div>

                      <div className="flex justify-between items-end pt-2">
                        <div>
                          <p className="text-[8px] uppercase font-black tracking-widest text-muted-foreground">Team Size</p>
                          <p className="text-sm font-bold">{levelCount}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[8px] uppercase font-black tracking-widest text-muted-foreground">Earnings</p>
                          <p className="text-sm font-bold text-primary">${levelIncome.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <NetworkAnalytics />
        </TabsContent>

        <TabsContent value="tree" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Network Visualization
            </h3>
            <p className="text-xs text-muted-foreground">Trace your entire lineage through the blockchain</p>
          </div>
          {user && (
            <div className="v56-glass premium-border rounded-3xl overflow-hidden min-h-[500px]">
              <ReferralTree userId={user.id} maxLevels={15} />
            </div>
          )}
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <div className="space-y-1">
            <h3 className="text-xl font-black flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Live Bonus Feed
            </h3>
            <p className="text-xs text-muted-foreground">Real-time commission tracking</p>
          </div>
          <Card className="v56-glass premium-border">
            <CardContent className="p-0">
              {commissions.length === 0 ? (
                <div className="py-20 text-center text-muted-foreground space-y-3">
                  <Award className="h-10 w-10 mx-auto opacity-10" />
                  <p className="text-sm">Waiting for first commission...</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {commissions.map((commission) => (
                    <div key={commission.id} className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20 group-hover:scale-110 transition-transform">
                          <TrendingUp className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">Level {commission.level}</p>
                          <p className="text-sm font-bold truncate">Partner Bonus</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-black text-primary ">+${commission.commission_amount.toFixed(2)}</p>
                        <p className="text-[9px] text-muted-foreground">{new Date(commission.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
