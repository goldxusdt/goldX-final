import { ArrowDownToLine, ArrowUpFromLine, TrendingUp, Users, ArrowRight, Activity, Calendar, Award, BarChart3 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { useAuth } from '@/contexts/AuthContext';
import { getTransactions, getWalletBalances } from '@/db/api';
import { supabase } from '@/db/supabase';
import { ROITimer } from '@/components/ROITimer';
import { Gold3DIcon } from '@/components/ui/Gold3DIcon';
import type { Transaction, WalletBalances } from '@/types';
import { cn } from '@/lib/utils';

export default function DashboardPage() {
  const { user, profile } = useAuth();
  const { t } = useTranslation();
  const [balances, setBalances] = useState<WalletBalances | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [monthlyRoi, setMonthlyRoi] = useState(10.00);
  const [dailyRoi, setDailyRoi] = useState(0.33);

  useEffect(() => {
    if (user) {
      loadData();
      
      // Setup realtime subscriptions
      const walletsChannel = supabase
        .channel(`public:wallets:user_id=eq.${user.id}`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'wallets', 
          filter: `user_id=eq.${user.id}` 
        }, () => {
          getWalletBalances(user.id).then(setBalances);
        })
        .subscribe();

      const transactionsChannel = supabase
        .channel(`public:transactions:user_id=eq.${user.id}`)
        .on('postgres_changes', { 
          event: '*', 
          schema: 'public', 
          table: 'transactions', 
          filter: `user_id=eq.${user.id}` 
        }, () => {
          getTransactions(user.id, 5).then(setTransactions);
        })
        .subscribe();

      return () => {
        supabase.removeChannel(walletsChannel);
        supabase.removeChannel(transactionsChannel);
      };
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    
    try {
      const { data: settingsData } = await supabase
        .from('settings')
        .select('key, value');
      
      if (settingsData) {
        const monthly = (settingsData as any[]).find(s => s.key === 'monthly_roi_percentage');
        const daily = (settingsData as any[]).find(s => s.key === 'daily_roi_percentage');
        if (monthly) setMonthlyRoi(parseFloat(monthly.value));
        if (daily) setDailyRoi(parseFloat(daily.value));
      }

      const [balancesData, transactionsData] = await Promise.all([
        getWalletBalances(user.id),
        getTransactions(user.id, 5)
      ]);
      setBalances(balancesData);
      setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalBalance = balances?.total ?? 0;

  if (loading) {
    return (
      <div className="p-6 space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <Skeleton className="h-10 w-48 bg-muted rounded-xl" />
          <Skeleton className="h-14 w-64 bg-muted rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map(i => <Skeleton key={i} className="h-32 bg-muted rounded-2xl" />)}
        </div>
        <Skeleton className="h-64 w-full bg-muted rounded-2xl" />
      </div>
    );
  }

  const getHighestLevel = () => {
    if (!profile) return 0;
    for (let i = 15; i >= 1; i--) {
      if ((profile as any)[`referral_level_${i}_enabled` as keyof typeof profile]) return i;
    }
    return 0;
  };

  const highestLevel = getHighestLevel();

  return (
    <div className="p-6 lg:p-10 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-2xl md:text-4xl font-black tracking-tight leading-tight">
            {t('dashboard.portfolio').split(' ')[0]} <span className="v56-gradient-text">{t('dashboard.portfolio').split(' ')[1]}</span>
          </h1>
          <p className="text-muted-foreground flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {t('dashboard.welcome')}, {profile?.full_name || user?.email?.split('@')[0]}
            <Badge variant="outline" className="ml-2 bg-primary/10 border-primary/20 text-primary font-bold">
              {t('dashboard.member_level', { level: highestLevel })}
            </Badge>
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="v56-glass premium-border px-6 py-3 flex gap-6 items-center rounded-2xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <Gold3DIcon name="roi" size={32} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{t('dashboard.monthly_roi')}</p>
                <p className="text-xl font-bold text-primary leading-tight">{monthlyRoi.toFixed(2)}%</p>
              </div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center">
                <Gold3DIcon name="analytics" size={32} />
              </div>
              <div>
                <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{t('dashboard.daily_roi')}</p>
                <p className="text-xl font-bold text-green-500 leading-tight">{dailyRoi.toFixed(2)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {/* Total Assets Card - Primary Focus */}
        <Card className="col-span-1 md:col-span-2 v56-glass premium-border relative overflow-hidden group gold-shimmer min-h-[160px] flex flex-col justify-center">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
            <Logo size={140} />
          </div>
          <CardHeader className="pb-2">
            <CardDescription className="uppercase tracking-[0.2em] font-black text-[10px] text-muted-foreground">{t('dashboard.total_value')}</CardDescription>
            <CardTitle className="text-3xl md:text-5xl font-black v56-gradient-text text-glow tabular-nums">
              ${totalBalance.toFixed(2)}
              <span className="text-xl ml-2 font-medium opacity-60">{t('common.usdt')}</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-green-500 text-sm font-bold">
              <TrendingUp className="h-4 w-4" />
              <span>{t('dashboard.growth_active')}</span>
              <span className="mx-2 text-white/10">|</span>
              <Award className="h-4 w-4 text-primary" />
              <span className="text-primary uppercase tracking-tighter text-xs">{t('dashboard.premium_tier')}</span>
              <span className="mx-2 text-white/10">|</span>
              <Link to="/analytics" className="text-primary hover:text-primary/80 flex items-center gap-1 transition-colors group/link">
                <BarChart3 className="h-3 w-3" />
                <span className="text-[10px] uppercase font-bold tracking-widest">{t('nav.analytics')}</span>
                <ArrowRight className="h-3 w-3 group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Next Payout Card */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1">
          <ROITimer lastCreditAt={profile?.last_roi_credit_at || null} className="h-full flex flex-col justify-center" />
        </div>

        {/* Quick Actions */}
        <div className="col-span-1 md:col-span-2 lg:col-span-1 xl:col-span-1 grid grid-cols-2 gap-4">
          <Button variant="outline" className="h-full flex-col gap-3 py-6 rounded-2xl border-primary/20 bg-primary/5 hover:bg-primary/10 transition-all hover:scale-105 gold-border" asChild>
            <Link to="/deposit">
              <div className="p-3 rounded-xl bg-primary/20">
                <ArrowDownToLine className="h-6 w-6 text-primary" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">{t('nav.deposit')}</span>
            </Link>
          </Button>
          <Button variant="outline" className="h-full flex-col gap-3 py-6 rounded-2xl border-white/5 bg-white/5 hover:bg-white/10 transition-all hover:scale-105" asChild>
            <Link to="/withdrawal">
              <div className="p-3 rounded-xl bg-white/10">
                <ArrowUpFromLine className="h-6 w-6" />
              </div>
              <span className="font-bold text-xs uppercase tracking-widest">{t('nav.withdrawal')}</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Secondary Wallets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: t('wallets.deposit'), value: balances?.deposit ?? 0, icon: "wallet", color: "text-blue-400" },
          { label: t('wallets.roi'), value: balances?.roi ?? 0, icon: "roi", color: "text-green-400" },
          { label: t('wallets.bonus'), value: balances?.bonus ?? 0, icon: "bonus", color: "text-purple-400" },
          { label: t('wallets.withdrawal'), value: balances?.withdrawal ?? 0, icon: "withdrawal", color: "text-primary" }
        ].map((item, idx) => (
          <Card key={idx} className="v56-glass premium-border group hover:border-primary/40 transition-all">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground">{item.label}</p>
              <Gold3DIcon name={item.icon as any} size={24} className={cn("transition-transform group-hover:scale-110", item.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl md:text-3xl font-black tabular-nums italic">${item.value.toFixed(2)}</div>
              <p className="text-[10px] text-muted-foreground mt-1 uppercase font-bold tracking-widest opacity-60">{t('common.usdt')} Balance</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Activity & Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <Card className="v56-glass premium-border overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between border-b border-white/5 pb-6">
              <div className="space-y-1">
                <CardTitle className="text-xl font-bold flex items-center gap-2">
                  <Activity className="h-5 w-5 text-primary" />
                  {t('dashboard.recent_activity')}
                </CardTitle>
                <CardDescription>{t('dashboard.recent_description')}</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="hover:bg-primary/10 hover:text-primary rounded-lg transition-colors" asChild>
                <Link to="/transactions">
                  {t('common.view_all')} <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              {transactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground space-y-4">
                  <div className="p-4 rounded-full bg-muted/20">
                    <Activity className="h-10 w-10 opacity-20" />
                  </div>
                  <p>{t('dashboard.no_activity')}</p>
                </div>
              ) : (
                <div className="divide-y divide-white/5">
                  {transactions.map(tx => (
                    <div key={tx.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 hover:bg-white/[0.02] transition-colors group">
                      <div className="flex items-center gap-4">
                        <div className={cn(
                          "w-12 h-12 rounded-xl flex items-center justify-center border transition-transform group-hover:scale-110",
                          tx.status === 'completed' || tx.status === 'approved' 
                            ? "bg-green-500/10 border-green-500/20 text-green-500" 
                            : tx.status === 'rejected' 
                              ? "bg-red-500/10 border-red-500/20 text-red-500"
                              : "bg-yellow-500/10 border-yellow-500/20 text-yellow-500"
                        )}>
                          {tx.transaction_type === 'deposit' ? <ArrowDownToLine className="h-5 w-5" /> : <ArrowUpFromLine className="h-5 w-5" />}
                        </div>
                        <div>
                          <p className="font-bold text-sm uppercase tracking-tight">{tx.transaction_type.replace('_', ' ')}</p>
                          <p className="text-xs text-muted-foreground">{new Date(tx.created_at).toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-black text-lg tabular-nums">${tx.amount.toFixed(2)}</p>
                        <p className={cn(
                          "text-[10px] uppercase font-black tracking-widest",
                          tx.status === 'completed' || tx.status === 'approved' ? "text-green-500" : tx.status === 'rejected' ? "text-red-500" : "text-yellow-500"
                        )}>
                          {t(`common.${tx.status}`)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-8">
          {/* Mini Referral Summary */}
          <Card className="v56-glass premium-border h-fit">
            <CardHeader>
              <CardTitle className="text-xl font-bold flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                {t('dashboard.referral_code')}
              </CardTitle>
              <CardDescription>{t('dashboard.recent_description')}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/20 relative overflow-hidden group">
                <Users className="absolute -bottom-4 -right-4 h-24 w-24 text-primary opacity-5 group-hover:opacity-10 transition-opacity" />
                <p className="text-xs font-black uppercase tracking-widest text-primary mb-1">{t('dashboard.referral_code')}</p>
                <div className="flex items-center justify-between">
                  <code className="text-2xl font-black font-mono tracking-tighter text-glow">{profile?.referral_code}</code>
                  <Button size="icon" variant="ghost" className="hover:bg-primary/20" onClick={() => {
                    navigator.clipboard.writeText(`${window.location.origin}/signup?ref=${profile?.referral_code}`);
                    toast.success("Link copied to clipboard!");
                  }}>
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center text-sm">
                  <span className="text-muted-foreground">{t('dashboard.member_level', { level: 1 })} Partners</span>
                  <span className="font-bold">{t('common.active')}</span>
                </div>
                <Button className="w-full  h-12 font-bold" asChild>
                  <Link to="/referrals">{t('dashboard.manage_network')}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
