import { Home, ArrowDownCircle, ArrowUpCircle, Users, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navItems = [
  { icon: Home, label: 'Dashboard', path: '/dashboard' },
  { icon: ArrowDownCircle, label: 'Deposit', path: '/deposit' },
  { icon: ArrowUpCircle, label: 'Withdraw', path: '/withdrawal' },
  { icon: Users, label: 'Referrals', path: '/referrals' },
  { icon: User, label: 'Profile', path: '/profile' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-background/80 backdrop-blur-lg border-t border-border px-4 py-2 safe-area-bottom">
      <div className="flex justify-between items-center max-w-lg mx-auto">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center gap-1 p-2 transition-all relative",
                isActive ? "text-primary" : "text-muted-foreground"
              )
            }
          >
            {({ isActive }) => (
              <>
                <item.icon className={cn("h-6 w-6 transition-transform", isActive && "scale-110")} />
                <span className="text-[10px] font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -top-1 left-0 right-0 h-1 bg-primary rounded-full" />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
