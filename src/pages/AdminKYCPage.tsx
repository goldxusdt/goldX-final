import { CheckCircle, ExternalLink, XCircle, Shield } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { supabase } from '@/db/supabase';
import type { Profile } from '@/types';

export default function AdminKYCPage() {
  const [users, setUsers] = useState<Profile[]>([]);
  const [selectedUser, setSelectedUser] = useState<Profile | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .neq('kyc_status', 'not_submitted')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setUsers(data || []);
    } catch (error) {
      console.error('Failed to load KYC submissions:', error);
    }
  };

  const handleApprove = async (userId: string) => {
    try {
      const { error } = await supabase
        .from('profiles')
        // @ts-ignore - Supabase type inference issue
        .update({ kyc_status: 'approved', kyc_rejection_reason: null })
        .eq('id', userId);

      if (error) throw error;
      toast.success('KYC approved successfully');
      loadUsers();
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to approve KYC:', error);
      toast.error('Failed to approve KYC');
    }
  };

  const handleReject = async (userId: string) => {
    if (!rejectionReason) {
      toast.error('Please provide a rejection reason');
      return;
    }

    try {
      const { error } = await supabase
        .from('profiles')
        // @ts-ignore - Supabase type inference issue
        .update({ kyc_status: 'rejected', kyc_rejection_reason: rejectionReason })
        .eq('id', userId);

      if (error) throw error;
      toast.success('KYC rejected');
      setRejectionReason('');
      loadUsers();
      setDialogOpen(false);
    } catch (error) {
      console.error('Failed to reject KYC:', error);
      toast.error('Failed to reject KYC');
    }
  };

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold v56-gradient-text">KYC Verification</h1>
        <p className="text-muted-foreground">Review and verify user documents</p>
      </div>

      <Card className="v56-glass premium-border">
        <CardHeader>
          <CardTitle>KYC Submissions</CardTitle>
          <CardDescription>Review user identity documents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {users.map((user) => (
              <div
                key={user.id}
                className="p-4 border border-primary/10 rounded-lg bg-accent/30"
              >
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <p className="font-semibold text-primary">{user.full_name || user.username || 'No name'}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="mt-2 flex items-center gap-4">
                      <p className="text-[10px] text-muted-foreground uppercase tracking-widest">
                        Submitted: {new Date(user.created_at).toLocaleDateString()}
                      </p>
                      {user.kyc_id_number && (
                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20">
                          <Shield className="h-3 w-3 text-primary" />
                          <span className="text-[10px] font-mono font-bold text-primary tracking-tighter">AI-ID: {user.kyc_id_number}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full border ${
                    user.kyc_status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' :
                    user.kyc_status === 'rejected' ? 'bg-destructive/10 text-destructive border-destructive/20' :
                    'bg-yellow-500/10 text-yellow-500 border-yellow-500/20'
                  }`}>
                    {user.kyc_status}
                  </span>
                </div>

                <div className="flex items-center gap-3 mt-4">
                  <Dialog open={dialogOpen && selectedUser?.id === user.id} onOpenChange={(open) => {
                    setDialogOpen(open);
                    if (open) setSelectedUser(user);
                  }}>
                    <DialogTrigger asChild>
                      {user.kyc_status === 'pending' ? (
                        <Button size="sm" className="w-full rounded-xl font-bold uppercase tracking-widest text-[10px]">
                          <CheckCircle className="h-3 w-3 mr-2" />
                          Review & Action
                        </Button>
                      ) : (
                        <Button variant="outline" size="sm" className="w-full rounded-xl font-bold uppercase tracking-widest text-[10px] border-primary/20 hover:bg-primary/5">
                          <Shield className="h-3 w-3 mr-2 text-primary" />
                          View Details
                        </Button>
                      )}
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle>KYC Verification: {user.full_name || user.username}</DialogTitle>
                        <DialogDescription>Review AI-extracted data alongside document proof</DialogDescription>
                      </DialogHeader>
                      {selectedUser && (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-4">
                              <h4 className="text-sm font-black uppercase tracking-widest text-primary">Document Proof</h4>
                              <div className="space-y-4">
                                {selectedUser.kyc_id_front && (
                                  <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-tighter">ID Front View</Label>
                                    <div className="relative group overflow-hidden rounded-xl border border-primary/20 aspect-video bg-accent/30 flex items-center justify-center">
                                      <img loading="lazy" decoding="async" src={selectedUser.kyc_id_front} alt="ID Front" className="w-full h-full object-contain" />
                                      <a href={selectedUser.kyc_id_front} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <ExternalLink className="h-6 w-6 text-white" />
                                      </a>
                                    </div>
                                  </div>
                                )}
                                {selectedUser.kyc_id_back && (
                                  <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-tighter">ID Back View</Label>
                                    <div className="relative group overflow-hidden rounded-xl border border-primary/20 aspect-video bg-accent/30 flex items-center justify-center">
                                      <img loading="lazy" decoding="async" src={selectedUser.kyc_id_back} alt="ID Back" className="w-full h-full object-contain" />
                                      <a href={selectedUser.kyc_id_back} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <ExternalLink className="h-6 w-6 text-white" />
                                      </a>
                                    </div>
                                  </div>
                                )}
                                {selectedUser.kyc_selfie && (
                                  <div className="space-y-2">
                                    <Label className="text-xs uppercase tracking-tighter">Selfie Verification</Label>
                                    <div className="relative group overflow-hidden rounded-xl border border-primary/20 aspect-video bg-accent/30 flex items-center justify-center">
                                      <img loading="lazy" decoding="async" src={selectedUser.kyc_selfie} alt="Selfie" className="w-full h-full object-contain" />
                                      <a href={selectedUser.kyc_selfie} target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
                                        <ExternalLink className="h-6 w-6 text-white" />
                                      </a>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="space-y-6">
                              <div className="p-4 rounded-2xl bg-primary/5 border border-primary/20 space-y-4">
                                <h4 className="text-sm font-black uppercase tracking-widest text-primary flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4" />
                                  AI Analysis Report
                                </h4>
                                <div className="space-y-3">
                                  <div>
                                    <Label className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Detected ID Number</Label>
                                    <p className="text-lg font-mono font-bold text-primary tracking-wider">
                                      {selectedUser.kyc_id_number || 'No ID Number Detected'}
                                    </p>
                                  </div>
                                  <div>
                                    <Label className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">Full OCR Raw Output</Label>
                                    <div className="mt-2 p-3 rounded-xl bg-background/50 border border-white/5 text-[10px] font-mono whitespace-pre-wrap max-h-[150px] overflow-y-auto leading-relaxed">
                                      {selectedUser.kyc_ocr_text || 'No OCR text available for this submission.'}
                                    </div>
                                  </div>
                                  <div className="pt-2 border-t border-primary/10">
                                    <Label className="text-[10px] uppercase text-muted-foreground font-black tracking-widest">User Profile Name</Label>
                                    <p className="font-bold text-sm">{selectedUser.full_name}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4 pt-4 border-t border-white/5">
                                {selectedUser.kyc_status === 'pending' ? (
                                  <>
                                    <div className="space-y-2">
                                      <Label className="text-[10px] uppercase font-black tracking-widest">Decision Reason</Label>
                                      <Textarea
                                        value={rejectionReason}
                                        onChange={(e) => setRejectionReason(e.target.value)}
                                        placeholder="Enter reason if rejecting or internal notes if approving..."
                                        rows={3}
                                        className="bg-accent/30 border-white/10"
                                      />
                                    </div>
                                    <div className="flex gap-4">
                                      <Button className="flex-1 h-12 rounded-xl font-bold uppercase tracking-widest" onClick={() => handleApprove(selectedUser.id)}>
                                        <CheckCircle className="mr-2 h-4 w-4" />
                                        Verify
                                      </Button>
                                      <Button variant="destructive" className="flex-1 h-12 rounded-xl font-bold uppercase tracking-widest" onClick={() => handleReject(selectedUser.id)}>
                                        <XCircle className="mr-2 h-4 w-4" />
                                        Reject
                                      </Button>
                                    </div>
                                  </>
                                ) : (
                                  <div className={`p-4 rounded-xl border font-bold text-center uppercase tracking-widest text-xs ${
                                    selectedUser.kyc_status === 'approved' ? 'bg-green-500/10 text-green-500 border-green-500/20' : 'bg-destructive/10 text-destructive border-destructive/20'
                                  }`}>
                                    Status: {selectedUser.kyc_status}
                                    {selectedUser.kyc_rejection_reason && (
                                      <p className="mt-2 text-[10px] font-normal lowercase tracking-normal text-muted-foreground italic">
                                        Reason: {selectedUser.kyc_rejection_reason}
                                      </p>
                                    )}
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
