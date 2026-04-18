import { ReactNode, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { SessionTimeoutHandler } from '@/components/auth/SessionTimeoutHandler';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (!user) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen w-full bg-background/95 overflow-hidden">
      <SessionTimeoutHandler />
      
      {/* Desktop Collapsible Sidebar */}
      <div className={cn(
        "hidden lg:flex flex-col border-r border-sidebar-border bg-sidebar transition-all duration-500 ease-in-out relative group",
        isCollapsed ? "w-20" : "w-72"
      )}>
        <Sidebar isCollapsed={isCollapsed} className="w-full" />
        
        {/* Toggle Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-4 top-10 h-8 w-8 rounded-full border border-sidebar-border bg-sidebar shadow-md z-50 opacity-0 group-hover:opacity-100 transition-opacity"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <main className="flex-1 w-full overflow-x-hidden overflow-y-auto pt-16 md:pt-20 lg:pt-0 pb-20 lg:pb-0 scroll-smooth relative">
        <div className="p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto">
          {children}
        </div>
      </main>
      
      <BottomNav />
    </div>
  );
}
