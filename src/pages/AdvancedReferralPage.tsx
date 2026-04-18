import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Network, 
  ChevronRight, 
  ChevronDown, 
  User, 
  Calendar, 
  ShieldCheck, 
  Users, 
  TrendingUp, 
  ArrowLeft,
  Download,
  Search,
  Filter,
  PieChart,
  BarChart3
} from 'lucide-react';
import { toast } from 'sonner';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/db/supabase';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

interface DownlineUser {
  user_id: string;
  username: string;
  email: string;
  level: number;
  referrer_id: string;
  created_at: string;
  kyc_status: string;
  is_active: boolean;
  children?: DownlineUser[];
}

interface CommissionStat {
  level: number;
  total_commission: number;
  member_count: number;
  commission_rate: number;
}

export default function AdvancedReferralPage() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [downline, setDownline] = useState<DownlineUser[]>([]);
  const [stats, setStats] = useState<CommissionStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [levelFilter, setLevelFilter] = useState('all');
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (user) {
      loadData();
    }
  }, [user]);

  const loadData = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const { data: downlineData, error: downlineError } = await (supabase.rpc as any)('get_downline_network', { 
        p_user_id: user.id 
      });

      if (downlineError) throw downlineError;

      const { data: statsData, error: statsError } = await (supabase.rpc as any)('get_referral_commission_stats', { 
        p_user_id: user.id 
      });

      if (statsError) throw statsError;

      setDownline(downlineData || []);
      setStats(statsData || []);
    } catch (error) {
      console.error('Failed to load referral data:', error);
      toast.error('Failed to load referral data');
    } finally {
      setLoading(false);
    }
  };

  const toggleNode = (userId: string) => {
    const newExpanded = new Set(expandedNodes);
    if (newExpanded.has(userId)) {
      newExpanded.delete(userId);
    } else {
      newExpanded.add(userId);
    }
    setExpandedNodes(newExpanded);
  };

  const buildTree = (users: DownlineUser[]) => {
    const userMap = new Map<string, DownlineUser>();
    const rootNodes: DownlineUser[] = [];

    // Initialize all nodes
    users.forEach(u => {
      userMap.set(u.user_id, { ...u, children: [] });
    });

    // Link nodes to their parents
    users.forEach(u => {
      const node = userMap.get(u.user_id)!;
      if (u.referrer_id === user?.id) {
        rootNodes.push(node);
      } else {
        const parent = userMap.get(u.referrer_id);
        if (parent) {
          parent.children?.push(node);
        }
      }
    });

    return rootNodes;
  };

  const filteredDownline = downline.filter(u => {
    const matchesSearch = u.username?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          u.email?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLevel = levelFilter === 'all' || u.level === parseInt(levelFilter);
    return matchesSearch && matchesLevel;
  });

  const treeData = buildTree(filteredDownline);

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text('Advanced Referral Report', 14, 20);
    doc.setFontSize(12);
    doc.text(`User: ${user?.email}`, 14, 30);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 37);

    // Commission Stats Table
    doc.text('Commission Statistics by Level', 14, 50);
    (doc as any).autoTable({
      startY: 55,
      head: [['Level', 'Commission Rate', 'Members', 'Total Earned']],
      body: stats.map(s => [
        `Level ${s.level}`,
        `${(s.commission_rate * 100).toFixed(1)}%`,
        s.member_count,
        `${Number(s.total_commission).toFixed(2)} USDT`
      ]),
    });

    // Downline Members Table
    const lastY = (doc as any).lastAutoTable.finalY + 15;
    doc.text('Downline Network Members', 14, lastY);
    (doc as any).autoTable({
      startY: lastY + 5,
      head: [['Username', 'Email', 'Level', 'Join Date', 'KYC']],
      body: downline.map(u => [
        u.username || 'N/A',
        u.email || 'N/A',
        u.level,
        new Date(u.created_at).toLocaleDateString(),
        u.kyc_status
      ]),
    });

    doc.save('referral_report.pdf');
    toast.success('Report exported as PDF');
  };

  const TreeNode = ({ node, level = 0 }: { node: DownlineUser; level?: number }) => {
    const hasChildren = node.children && node.children.length > 0;
    const isExpanded = expandedNodes.has(node.user_id);

    return (
      <div className="ml-4 @md:ml-6 mt-2">
        <div 
          className="flex items-center gap-2 p-3 v56-glass premium-border rounded-lg cursor-pointer hover:bg-accent/20 transition-all"
          onClick={() => hasChildren && toggleNode(node.user_id)}
        >
          {hasChildren ? (
            isExpanded ? <ChevronDown className="h-4 w-4 text-primary" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />
          ) : (
            <div className="w-4" />
          )}
          <div className="p-1.5 bg-background rounded-full border border-primary/20">
            <User className="h-3 w-3 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-semibold truncate text-sm">{node.username}</span>
              <Badge variant="outline" className="text-[10px] h-4">Level {node.level}</Badge>
              {node.kyc_status === 'approved' && (
                <ShieldCheck className="h-3 w-3 text-green-500" />
              )}
            </div>
            <p className="text-[10px] text-muted-foreground truncate">{node.email}</p>
          </div>
          <div className="text-right shrink-0">
            <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
              <Calendar className="h-3 w-3" />
              <span>{new Date(node.created_at).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        {isExpanded && hasChildren && (
          <div className="border-l-2 border-primary/10 ml-5 pl-2 mt-2 space-y-2">
            {node.children!.map(child => (
              <TreeNode key={child.user_id} node={child} level={level + 1} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="rounded-full">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold v56-gradient-text tracking-tight flex items-center gap-2">
              <Network className="h-8 w-8 text-primary" />
              Advanced Referral Dashboard
            </h1>
            <p className="text-muted-foreground">Detailed network analysis and commission tracking</p>
          </div>
        </div>
        <Button onClick={exportToPDF} className="v56-primary-btn w-full md:w-auto">
          <Download className="h-4 w-4 mr-2" />
          Export Report
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <Card className="v56-glass premium-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              Total Network
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">{downline.length}</div>
            <p className="text-[10px] text-muted-foreground">Members across all levels</p>
          </CardContent>
        </Card>
        <Card className="v56-glass premium-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Total Commissions
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {stats.reduce((acc, curr) => acc + Number(curr.total_commission), 0).toFixed(2)} USDT
            </div>
            <p className="text-[10px] text-muted-foreground">Lifetime referral earnings</p>
          </CardContent>
        </Card>
        <Card className="v56-glass premium-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <PieChart className="h-4 w-4 text-orange-500" />
              Direct Referrals
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {downline.filter(u => u.level === 1).length}
            </div>
            <p className="text-[10px] text-muted-foreground">Level 1 members</p>
          </CardContent>
        </Card>
        <Card className="v56-glass premium-border">
          <CardHeader className="p-4 pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-blue-500" />
              Active Levels
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <div className="text-2xl font-bold">
              {new Set(downline.map(u => u.level)).size}
            </div>
            <p className="text-[10px] text-muted-foreground">Levels with active members</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="stats" className="w-full">
        <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
          <TabsTrigger value="stats">Commission Stats</TabsTrigger>
          <TabsTrigger value="network">Network Tree</TabsTrigger>
        </TabsList>
        
        <TabsContent value="stats" className="space-y-6">
          <Card className="v56-glass premium-border overflow-hidden mt-4">
            <CardHeader>
              <CardTitle>Level-wise Statistics</CardTitle>
              <CardDescription>Commission breakdown and member count for each level</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Level</TableHead>
                    <TableHead>Commission Rate</TableHead>
                    <TableHead className="text-center">Members</TableHead>
                    <TableHead className="text-right">Total Commission</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <TableRow key={i}>
                        <TableCell><Skeleton className="h-4 w-16 bg-muted" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-12 bg-muted" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-8 mx-auto bg-muted" /></TableCell>
                        <TableCell><Skeleton className="h-4 w-20 ml-auto bg-muted" /></TableCell>
                      </TableRow>
                    ))
                  ) : stats.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                        No commission data available
                      </TableCell>
                    </TableRow>
                  ) : (
                    stats.map((stat) => (
                      <TableRow key={stat.level} className="hover:bg-accent/10">
                        <TableCell className="font-medium">Level {stat.level}</TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-primary/10 text-primary border-none">
                            {(stat.commission_rate * 100).toFixed(1)}%
                          </Badge>
                        </TableCell>
                        <TableCell className="text-center font-semibold">
                          {stat.member_count}
                        </TableCell>
                        <TableCell className="text-right font-bold text-green-500">
                          {Number(stat.total_commission).toFixed(2)} USDT
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network" className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 mt-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search by username or email..." 
                className="pl-9 v56-glass"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select value={levelFilter} onValueChange={setLevelFilter}>
                <SelectTrigger className="v56-glass">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Filter by Level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Levels</SelectItem>
                  {Array.from({ length: 15 }, (_, i) => (
                    <SelectItem key={i + 1} value={(i + 1).toString()}>Level {i + 1}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Card className="v56-glass premium-border min-h-[400px]">
            <CardHeader>
              <CardTitle>Network Tree</CardTitle>
              <CardDescription>Visual representation of your referral hierarchy</CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-4">
              {loading ? (
                <div className="space-y-4">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Skeleton key={i} className="h-16 w-full bg-muted rounded-lg" />
                  ))}
                </div>
              ) : treeData.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
                  <Network className="h-12 w-12 mb-4 opacity-20" />
                  <p>No members found in your network matching the filters.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {treeData.map(node => (
                    <TreeNode key={node.user_id} node={node} />
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
