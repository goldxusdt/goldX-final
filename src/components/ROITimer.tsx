import { useEffect, useState } from 'react';
import { Clock, Zap } from 'lucide-react';
import { supabase } from '@/db/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';

interface ROITimerProps {
  lastCreditAt: string | null;
  className?: string;
}

export function ROITimer({ lastCreditAt, className }: ROITimerProps) {
  const { user } = useAuth();
  const [timeLeft, setTimeLeft] = useState<string>('24:00:00');
  const [referenceDate, setReferenceDate] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    async function getReferenceDate() {
      if (lastCreditAt) {
        setReferenceDate(new Date(lastCreditAt).getTime());
        return;
      }

      if (!user) return;

      const { data } = await supabase
        .from('deposits')
        .select('approved_at')
        .eq('user_id', user.id)
        .eq('status', 'approved')
        .order('approved_at', { ascending: true })
        .limit(1)
        .maybeSingle() as { data: { approved_at: string } | null, error: any };

      if (data?.approved_at) {
        setReferenceDate(new Date(data.approved_at).getTime());
      } else {
        setReferenceDate(null);
      }
    }

    getReferenceDate();
  }, [lastCreditAt, user]);

  useEffect(() => {
    const updateTime = () => {
      if (!referenceDate) return;
      
      const now = new Date().getTime();
      const next = referenceDate + 24 * 60 * 60 * 1000;
      const total = 24 * 60 * 60 * 1000;
      const remaining = next - now;

      if (remaining <= 0) {
        setTimeLeft('00:00:00');
        setProgress(100);
        return;
      }

      const hours = Math.floor(remaining / (1000 * 60 * 60));
      const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

      const elapsed = total - remaining;
      setProgress((elapsed / total) * 100);
      setTimeLeft(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
    };

    const timer = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(timer);
  }, [referenceDate]);

  if (!referenceDate) {
    return (
      <div className={cn("v56-glass p-4 rounded-2xl premium-border bg-white/5", className)}>
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">ROI Cycle Status</p>
            <p className="text-sm font-bold text-white leading-tight mt-1">Waiting for active deposit</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("v56-glass p-4 rounded-2xl premium-border gold-shimmer", className)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-primary/10 border border-primary/20">
            <Clock className="h-4 w-4 text-primary animate-pulse" />
          </div>
          <div>
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-tight">Next Payout Cycle</p>
            <p className="text-xl font-mono font-black text-primary  leading-none mt-1">{timeLeft}</p>
          </div>
        </div>
        <div className="text-right">
          <Zap className="h-4 w-4 text-primary ml-auto mb-1" />
          <p className="text-[10px] text-muted-foreground font-mono">{Math.round(progress)}% Complete</p>
        </div>
      </div>
      
      <div className="relative h-1.5 bg-secondary/10 rounded-full overflow-hidden">
        <div 
          className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-yellow-300 transition-all duration-1000 rounded-full "
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
