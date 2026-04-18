import { Filter, Search, Calendar, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { supabase } from '@/db/supabase';
import { useAuth } from '@/contexts/AuthContext';
import type { Withdrawal } from '@/types';

export default function AdminWithdrawalsPage() {
  const { profile: adminProfile } = useAuth();
  const [withdrawals, setWithdrawals] = useState<Withdrawal[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadWithdrawals();
  }, [statusFilter]);

  const loadWithdrawals = async () => {
    setLoading(true);
    try {
      let query = supabase.from('withdrawals').select('*, profiles!withdrawals_user_id_fkey(email, full_name)');
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setWithdrawals(data || []);
    } catch (error) {
      console.error('Failed to load withdrawals:', error);
      toast.error('Failed to load withdrawals');
    } finally {
      setLoading(false);
    }
  };

  const handleProcess = async (withdrawalId: string, approved: boolean) => {
    if (!adminProfile) return;
    
    try {
      const { error } = await supabase.rpc('process_withdrawal_approval', {
        p_withdrawal_id: withdrawalId,
        p_admin_id: adminProfile.id,
        p_approved: approved,
        p_notes: approved ? 'Approved by admin' : 'Rejected by admin'
      } as any);

      if (error) throw error;
      toast.success(`Withdrawal ${approved ? 'approved' : 'rejected'} successfully`);
      loadWithdrawals();
    } catch (error: any) {
      console.error('Failed to process withdrawal:', error);
      toast.error(error.message || 'Failed to process withdrawal');
    }
  };

  const filteredWithdrawals = withdrawals.filter(w =>
    (w as any).profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (w as any).profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    w.wallet_address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold v56-gradient-text">Withdrawal Management</h1>
        <p className="text-muted-foreground">Review and process withdrawal requests</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email, name, or wallet..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[200px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Status Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Withdrawals</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="v56-glass premium-border">
        <CardHeader>
          <CardTitle>Withdrawal Requests ({filteredWithdrawals.length})</CardTitle>
          <CardDescription>Review user payouts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">Loading requests...</div>
            ) : filteredWithdrawals.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No withdrawal requests found.</div>
            ) : (
              filteredWithdrawals.map((w) => (
                <div key={w.id} className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 transition-all bg-accent/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{(w as any).profiles?.email}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        w.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        w.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {w.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-4">
                      <span>Amount: <span className="font-bold text-primary">{w.amount.toFixed(2)} USDT</span></span>
                      <span>Net: <span className="font-bold text-green-500">{w.net_amount.toFixed(2)} USDT</span></span>
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(w.created_at).toLocaleString()}
                      <span className="mx-2">|</span>
                      <span>Address: <span className="font-mono text-primary/80">{w.wallet_address}</span> ({w.network})</span>
                    </div>
                  </div>
                  <div className="flex gap-2 w-full md:w-auto">
                    {w.status !== 'approved' && (
                      <Button size="sm" onClick={() => handleProcess(w.id, true)} className="flex-1 md:flex-none bg-green-600 hover:bg-green-700">Approve</Button>
                    )}
                    {w.status !== 'rejected' && (
                      <Button size="sm" variant="destructive" onClick={() => handleProcess(w.id, false)} className="flex-1 md:flex-none">Reject</Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
