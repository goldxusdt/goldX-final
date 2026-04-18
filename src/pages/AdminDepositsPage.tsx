import { RefreshCw, Search, Filter, Calendar, User, Hash } from 'lucide-react';
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
import { getPlatformSetting, rejectDeposit } from '@/db/api';
import { useAuth } from '@/contexts/AuthContext';
import { invokeEdgeFunction } from '@/lib/functions';

import type { Deposit } from '@/types';

export default function AdminDepositsPage() {
  const { user } = useAuth();
  const [deposits, setDeposits] = useState<Deposit[]>([]);
  const [loading, setLoading] = useState(true);
  const [verifying, setVerifying] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    loadDeposits();
  }, [statusFilter]);

  const loadDeposits = async () => {
    setLoading(true);
    try {
      let query = supabase.from('deposits').select('*, profiles!deposits_user_id_fkey(email, full_name)');
      
      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }
      
      const { data, error } = await query.order('created_at', { ascending: false });

      if (error) throw error;
      setDeposits(data || []);
    } catch (error) {
      console.error('Failed to load deposits:', error);
      toast.error('Failed to load deposits');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (depositId: string) => {
    if (!user) return;
    
    try {
      const { error } = await supabase.rpc('process_deposit_approval', {
        deposit_id_param: depositId,
        admin_id: user.id
      } as any);

      if (error) throw error;
      
      toast.success('Deposit approved successfully');
      loadDeposits();
    } catch (error: any) {
      console.error('Failed to approve deposit:', error);
      toast.error(error?.message || 'Failed to approve deposit');
    }
  };

  const handleReject = async (depositId: string) => {
    try {
      const { error } = await rejectDeposit(depositId, 'Rejected by admin');

      if (error) throw error;
      toast.success('Deposit rejected');
      loadDeposits();
    } catch (error) {
      console.error('Failed to reject deposit:', error);
      toast.error('Failed to reject deposit');
    }
  };

  const handleVerify = async (deposit: Deposit) => {
    setVerifying(deposit.id);
    try {
      const walletKey = deposit.network === 'BEP20' ? 'deposit_wallet_bep20' : 'deposit_wallet_trc20';
      const walletAddress = await getPlatformSetting(walletKey);

      if (!walletAddress) {
        toast.error('Platform wallet address not configured in settings');
        return;
      }

      toast.info('Verifying transaction on blockchain...');

      const { data, error } = await invokeEdgeFunction('verify-transaction', {
        body: {
          transactionHash: deposit.transaction_hash,
          network: deposit.network,
          expectedAddress: walletAddress,
          expectedAmount: deposit.amount
        }
      });

      if (error) {
        toast.error(`Verification failed: ${error.message}`);
        return;
      }

      if (data?.verified) {
        toast.success(`Transaction verified! Amount: ${data.actualAmount} USDT`);
        await handleApprove(deposit.id);
      } else {
        toast.error(data?.error || 'Transaction could not be verified');
      }
    } catch (error) {
      console.error('Verification error:', error);
      toast.error('Failed to verify transaction');
    } finally {
      setVerifying(null);
    }
  };

  const filteredDeposits = deposits.filter(d =>
    (d as any).profiles?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (d as any).profiles?.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.transaction_hash?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold v56-gradient-text">Deposit Management</h1>
        <p className="text-muted-foreground">Review and approve user deposits</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search email, name, or hash..."
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
            <SelectItem value="all">All Deposits</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <Card className="v56-glass premium-border">
        <CardHeader>
          <CardTitle>Deposit Submissions ({filteredDeposits.length})</CardTitle>
          <CardDescription>Verify hashes and credit wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-12">Loading deposits...</div>
            ) : filteredDeposits.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">No deposits found.</div>
            ) : (
              filteredDeposits.map((d) => (
                <div key={d.id} className="p-4 border border-primary/10 rounded-lg hover:border-primary/30 transition-all bg-accent/30 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <User className="h-4 w-4 text-primary" />
                      <span className="font-semibold text-sm">{(d as any).profiles?.email}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] uppercase font-bold ${
                        d.status === 'approved' ? 'bg-green-500/20 text-green-500' :
                        d.status === 'rejected' ? 'bg-red-500/20 text-red-500' :
                        'bg-yellow-500/20 text-yellow-500'
                      }`}>
                        {d.status}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-4">
                      <span>Amount: <span className="font-bold text-primary">{d.amount.toFixed(2)} USDT</span></span>
                      <span>Network: <span className="font-bold text-blue-500">{d.network}</span></span>
                      {(d as any).coupon_bonus > 0 && (
                        <span className="bg-green-500/10 text-green-500 px-2 py-0.5 rounded border border-green-500/20 font-bold">
                          Bonus: +{(d as any).coupon_bonus.toFixed(2)} USDT
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-muted-foreground mt-2 flex items-center gap-2">
                      <Calendar className="h-3 w-3" />
                      {new Date(d.created_at).toLocaleString()}
                      <span className="mx-2">|</span>
                      <Hash className="h-3 w-3" />
                      <span className="font-mono text-primary/80 truncate max-w-[200px]">{d.transaction_hash}</span>
                    </div>
                  </div>
                  {d.status === 'pending' && (
                    <div className="flex gap-2 w-full md:w-auto">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleVerify(d)}
                        disabled={verifying === d.id}
                        className="flex-1 md:flex-none"
                      >
                        {verifying === d.id ? (
                          <RefreshCw className="h-4 w-4 animate-spin mr-2" />
                        ) : (
                          <RefreshCw className="h-4 w-4 mr-2" />
                        )}
                        Verify
                      </Button>
                      <Button size="sm" onClick={() => handleApprove(d.id)} className="flex-1 md:flex-none">Approve</Button>
                      <Button size="sm" variant="destructive" onClick={() => handleReject(d.id)} className="flex-1 md:flex-none">Reject</Button>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
