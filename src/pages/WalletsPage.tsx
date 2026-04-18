import { ArrowDownToLine, TrendingUp, Users, Wallet } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { getTransactions, getWalletBalances } from '@/db/api';
import type { Transaction, WalletBalances } from '@/types';

export default function WalletsPage() {
  const { user } = useAuth();
  const [balances, setBalances] = useState<WalletBalances | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    loadData();
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    try {
      const [balancesData, transactionsData] = await Promise.all([
        getWalletBalances(user.id),
        getTransactions(user.id, 20)
      ]);
      if (balancesData) setBalances(balancesData);
      if (transactionsData) setTransactions(transactionsData);
    } catch (error) {
      console.error('Failed to load wallet data:', error);
    }
  };

  const walletData = [
    {
      title: 'Deposit Wallet',
      balance: balances?.deposit || 0,
      icon: Wallet,
      description: 'Your investment balance',
      color: 'text-blue-500'
    },
    {
      title: 'ROI Wallet',
      balance: balances?.roi || 0,
      icon: TrendingUp,
      description: 'Monthly ROI earnings',
      color: 'text-green-500'
    },
    {
      title: 'Bonus Wallet',
      balance: balances?.bonus || 0,
      icon: Users,
      description: 'Referral commissions',
      color: 'text-purple-500'
    },
    {
      title: 'Withdrawal Wallet',
      balance: balances?.withdrawal || 0,
      icon: ArrowDownToLine,
      description: 'Processed withdrawals',
      color: 'text-orange-500'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold v56-gradient-text">My Wallets</h1>
        <p className="text-muted-foreground">Manage your wallet balances</p>
      </div>

      {/* Total Balance */}
      <Card className="border-primary/20 card-glow gold-border">
        <CardHeader>
          <CardTitle>Total Balance</CardTitle>
          <CardDescription>Combined balance across all wallets</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-4xl font-bold v56-gradient-text">{balances?.total.toFixed(2) || '0.00'} USDT</p>
        </CardContent>
      </Card>

      {/* Individual Wallets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {walletData.map((wallet) => {
          const Icon = wallet.icon;
          return (
            <Card key={wallet.title} className="border-primary/20 card-glow hover:border-primary/40 transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{wallet.title}</CardTitle>
                <div className="p-2 rounded-lg bg-primary/10">
                  <Icon className={`h-4 w-4 ${wallet.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-primary">{wallet.balance.toFixed(2)} USDT</div>
                <p className="text-xs text-muted-foreground mt-1">{wallet.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button size="lg" className="" asChild>
          <Link to="/deposit">
            <ArrowDownToLine className="mr-2 h-5 w-5" />
            Deposit Funds
          </Link>
        </Button>
        <Button size="lg" variant="outline" className="border-primary/50 hover:bg-primary/10" asChild>
          <Link to="/withdrawal">
            <ArrowDownToLine className="mr-2 h-5 w-5 rotate-180" />
            Withdraw Funds
          </Link>
        </Button>
      </div>

      {/* Transaction History */}
      <Card className="border-primary/20 card-glow">
        <CardHeader>
          <CardTitle>Transaction History</CardTitle>
          <CardDescription>Recent wallet transactions</CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <p className="text-muted-foreground text-center py-8">No transactions yet</p>
          ) : (
            <div className="space-y-2">
              {transactions.map((tx) => (
                <div
                  key={tx.id}
                  className="flex justify-between items-center p-3 border border-primary/10 rounded-lg hover:border-primary/30 transition-all bg-accent/30"
                >
                  <div>
                    <p className="font-medium capitalize">{tx.transaction_type.replace('_', ' ')}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(tx.created_at).toLocaleString()}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${tx.transaction_type.includes('deposit') || tx.transaction_type.includes('roi') || tx.transaction_type.includes('commission') ? 'text-green-500' : 'text-primary'}`}>
                      {tx.transaction_type.includes('withdrawal') ? '-' : '+'}{tx.amount.toFixed(2)} USDT
                    </p>
                    <p className="text-xs text-muted-foreground capitalize">{tx.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
