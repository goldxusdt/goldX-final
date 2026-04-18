import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTranslation } from 'react-i18next';
import {
  LayoutDashboard,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Users,
  User,
  LifeBuoy,
  Settings,
  Shield,
  FileText,
  Calendar,
  Bell,
  Fingerprint,
  Ticket,
  Layout,
  History,
  BarChart3,
  ShieldCheck,
  Network,
  Send,
  Bot,
  Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Logo } from '@/components/Logo';

interface SidebarProps {
  className?: string;
  isCollapsed?: boolean;
}

import { RightSlider } from './RightSlider';

export function Sidebar({ className, isCollapsed }: SidebarProps) {
  const { isAdmin, isSuperAdmin } = useAuth();
  const { t } = useTranslation();
  const location = useLocation();

  const userNavItems = [
    { icon: LayoutDashboard, label: t('nav.dashboard'), path: '/dashboard' },
    { icon: BarChart3, label: t('nav.analytics'), path: '/analytics' },
    { icon: Wallet, label: t('nav.wallets'), path: '/wallets' },
    { icon: ArrowDownToLine, label: t('nav.deposit'), path: '/deposit' },
    { icon: ArrowUpFromLine, label: t('nav.withdrawal'), path: '/withdrawal' },
    { icon: Users, label: t('nav.referrals'), path: '/referrals' },
    { icon: Network, label: 'Advanced Referral', path: '/referrals/advanced' },
    { icon: User, label: t('nav.profile'), path: '/profile' },
    { icon: Smartphone, label: 'Notifications', path: '/profile/notifications' },
    { icon: FileText, label: t('nav.transactions'), path: '/transactions' },
    { icon: LifeBuoy, label: t('nav.support'), path: '/support' },
  ];

  const adminNavItems = [
    { icon: LayoutDashboard, label: 'User Dashboard', path: '/dashboard' },
    { icon: Shield, label: 'Admin Dashboard', path: '/admin' },
    { icon: ShieldCheck, label: 'Security Center', path: '/admin/security' },
    { icon: BarChart3, label: 'Security Dashboard', path: '/admin/security-dashboard' },
    { icon: FileText, label: 'Security Audit', path: '/admin/security-audit' },
    ...(isSuperAdmin ? [{ icon: History, label: 'Audit Logs', path: '/admin/audit-logs' }] : []),
    { icon: Layout, label: 'Style Guide', path: '/style-guide' },
    { icon: Users, label: 'Users', path: '/admin/users' },
    { icon: ArrowDownToLine, label: 'Deposits', path: '/admin/deposits' },
    { icon: FileText, label: 'Upload Logs', path: '/admin/upload-logs' },
    { icon: ArrowUpFromLine, label: 'Withdrawals', path: '/admin/withdrawals' },
    { icon: FileText, label: 'Transactions', path: '/admin/transactions' },
    { icon: Bell, label: 'System Logs', path: '/admin/notifications' },
    { icon: Send, label: 'Broadcast Manager', path: '/admin/broadcasts' },
    { icon: Bot, label: 'Telegram Alerts', path: '/admin/telegram-alerts' },
    { icon: Fingerprint, label: 'KYC Verification', path: '/admin/kyc' },
    { icon: LifeBuoy, label: 'Support Tickets', path: '/admin/tickets' },
    { icon: Layout, label: 'Landing Page', path: '/admin/landing' },
    { icon: Ticket, label: 'Coupons', path: '/admin/coupons' },
    { icon: Calendar, label: 'Content Management', path: '/admin/content' },
    { icon: Settings, label: 'Platform Settings', path: '/admin/settings' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <aside className={cn('bg-sidebar border-r border-sidebar-border relative overflow-hidden transition-all duration-500 flex flex-col h-full w-full', className)}>
      {/* Background visual element */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-5 bg-[radial-gradient(circle_at_0%_0%,hsl(var(--primary))_0%,transparent_50%)]" />
      
      <div className="flex flex-col h-full relative z-10">
        <div className={cn("p-6 border-b border-sidebar-border flex items-center transition-all duration-500", isCollapsed ? "justify-center" : "justify-center")}>
          <Link to="/" className="flex flex-col items-center gap-3 group">
            <div className={cn("rounded-2xl bg-primary/10 border border-primary/20 transition-all duration-500", isCollapsed ? "p-2" : "p-3")}>
              <Logo size={isCollapsed ? 28 : 44} />
            </div>
            {!isCollapsed && (
              <div className="text-center animate-in fade-in duration-500">
                <span className="font-black text-2xl tracking-tighter v56-gradient-text block">GOLD X USDT</span>
                <span className="text-[10px] uppercase font-bold tracking-[0.3em] text-muted-foreground opacity-60">Elite Investing</span>
              </div>
            )}
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  'flex items-center gap-4 py-3 rounded-2xl transition-all duration-300 relative group',
                  isCollapsed ? "justify-center px-0" : "px-4",
                  isActive
                    ? 'bg-primary/10 text-primary border border-primary/20 '
                    : 'text-muted-foreground hover:bg-white/5 hover:text-foreground'
                )}
              >
                {isActive && !isCollapsed && (
                  <div className="absolute left-[-1.5rem] w-2 h-8 bg-primary rounded-r-full " />
                )}
                <Icon className={cn('w-5 h-5 transition-transform group-hover:scale-110', isActive && 'text-primary')} />
                {!isCollapsed && <span className="text-sm font-bold uppercase tracking-widest animate-in slide-in-from-left-2 duration-300">{item.label}</span>}
                {isCollapsed && (
                  <div className="absolute left-full ml-4 px-3 py-1 bg-popover text-popover-foreground rounded-md text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-border shadow-xl">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
          
          {/* Right Slider Trigger integrated into Sidebar */}
          <div className="pt-4 mt-4 border-t border-sidebar-border">
            <RightSlider isSidebarItem isCollapsed={isCollapsed} />
          </div>
        </nav>

        <div className={cn("p-4 border-t border-sidebar-border transition-all duration-500", isCollapsed && "items-center")}>
          {!isCollapsed ? (
            <div className="v56-glass p-4 rounded-2xl border border-white/5 bg-white/5 text-center animate-in fade-in duration-500">
              <p className="text-[10px] uppercase font-black tracking-widest text-muted-foreground mb-1">Status</p>
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs font-bold">Secure</span>
              </div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            </div>
          )}
          {!isCollapsed && (
            <div className="mt-4 text-[10px] text-muted-foreground text-center font-bold tracking-widest opacity-50 uppercase">
              © 2026 GOLD X USDT
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
