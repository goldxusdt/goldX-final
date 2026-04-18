import { Bell, Check, Info, AlertTriangle, X } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface Notification {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'info' | 'success' | 'warning' | 'error';
  unread: boolean;
}

interface RightSliderProps {
  isSidebarItem?: boolean;
  isCollapsed?: boolean;
}

export function RightSlider({ isSidebarItem, isCollapsed }: RightSliderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      title: 'Deposit Successful',
      description: 'Your deposit of 500 USDT has been confirmed.',
      time: '2 mins ago',
      type: 'success',
      unread: true,
    },
    {
      id: '2',
      title: 'New Referral',
      description: 'A new user joined using your referral link.',
      time: '1 hour ago',
      type: 'info',
      unread: true,
    },
    {
      id: '3',
      title: 'Security Alert',
      description: 'New login detected from a new IP address.',
      time: '3 hours ago',
      type: 'warning',
      unread: false,
    },
    {
      id: '4',
      title: 'Market Update',
      description: 'Gold prices are up by 1.5% today.',
      time: '5 hours ago',
      type: 'info',
      unread: false,
    },
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, unread: false })));
  };

  const removeNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => n.unread).length;

  return (
    <Sheet>
      <SheetTrigger asChild>
        {isSidebarItem ? (
          <button className={cn(
            'w-full flex items-center gap-4 py-3 rounded-2xl transition-all duration-300 relative group',
            isCollapsed ? "justify-center px-0" : "px-4",
            "text-muted-foreground hover:bg-white/5 hover:text-foreground"
          )}>
            <div className="relative">
              <Bell className={cn('w-5 h-5 transition-transform group-hover:scale-110')} />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-2 w-2">
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
              )}
            </div>
            {!isCollapsed && <span className="text-sm font-bold uppercase tracking-widest">Activity Log</span>}
            {isCollapsed && (
              <div className="absolute left-full ml-4 px-3 py-1 bg-popover text-popover-foreground rounded-md text-[10px] font-bold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 pointer-events-none border border-border shadow-xl">
                Activity Log
              </div>
            )}
          </button>
        ) : (
          <Button variant="ghost" size="icon" className="relative group hover:bg-primary/10 hover:text-primary transition-all hidden md:flex">
            <Bell className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary border border-background"></span>
              </span>
            )}
          </Button>
        )}
      </SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md p-0 flex flex-col v56-glass border-l border-white/10">
        <SheetHeader className="p-6 border-b border-white/10">
          <div className="flex items-center justify-between">
            <SheetTitle className="text-xl font-black v56-gradient-text">Notifications</SheetTitle>
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllRead} className="text-[10px] uppercase font-bold tracking-widest text-primary hover:bg-primary/10">
                Mark all read
              </Button>
            )}
          </div>
        </SheetHeader>

        <ScrollArea className="flex-1">
          <div className="p-4 space-y-4">
            {notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 rounded-2xl border transition-all duration-300 relative group",
                    notification.unread 
                      ? "bg-primary/5 border-primary/20" 
                      : "bg-white/5 border-white/5 opacity-70 hover:opacity-100"
                  )}
                >
                  <div className="flex gap-4">
                    <div className={cn(
                      "mt-1 p-2 rounded-xl shrink-0",
                      notification.type === 'success' && "bg-green-500/10 text-green-500",
                      notification.type === 'info' && "bg-blue-500/10 text-blue-500",
                      notification.type === 'warning' && "bg-yellow-500/10 text-yellow-500",
                      notification.type === 'error' && "bg-red-500/10 text-red-500",
                    )}>
                      {notification.type === 'success' && <Check className="h-4 w-4" />}
                      {notification.type === 'info' && <Info className="h-4 w-4" />}
                      {notification.type === 'warning' && <AlertTriangle className="h-4 w-4" />}
                      {notification.type === 'error' && <AlertTriangle className="h-4 w-4" />}
                    </div>
                    
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-bold uppercase tracking-tight">{notification.title}</h4>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{notification.time}</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {notification.description}
                      </p>
                    </div>

                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeNotification(notification.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
                <div className="p-4 rounded-full bg-muted/50">
                  <Bell className="h-8 w-8 text-muted-foreground opacity-20" />
                </div>
                <div className="space-y-1">
                  <p className="font-bold text-sm uppercase tracking-widest">No notifications</p>
                  <p className="text-xs text-muted-foreground">You're all caught up!</p>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="p-6 border-t border-white/10 bg-black/20">
          <Button className="w-full font-bold uppercase tracking-widest text-xs h-12 rounded-xl group" variant="outline">
            View All Activity
            <Bell className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
