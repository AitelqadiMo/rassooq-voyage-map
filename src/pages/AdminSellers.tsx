import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminSellers = () => {
  const { state, dispatch } = useAdmin();
  const [status, setStatus] = useState('All');
  const [kyc, setKyc] = useState('all');
  const [search, setSearch] = useState('');
  const [commissionOpen, setCommissionOpen] = useState(false);
  const [commissionValue, setCommissionValue] = useState('');
  const [commissionTarget, setCommissionTarget] = useState<string|null>(null);

  const filtered = useMemo(() => state.sellers
    .filter(s => status==='All' || s.status===status)
    .filter(s => kyc==='all' || (kyc==='complete'? s.kycComplete : !s.kycComplete))
    .filter(s => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
  , [state.sellers, status, kyc, search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Sellers</h1>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Filters</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <Input placeholder="Search seller" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                {['All','Active','Suspended','Pending'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={kyc} onValueChange={setKyc}>
              <SelectTrigger><SelectValue placeholder="KYC"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="complete">KYC Complete</SelectItem>
                <SelectItem value="incomplete">KYC Incomplete</SelectItem>
              </SelectContent>
            </Select>
            <div className="col-span-2 flex gap-2">
              <Button variant="outline" onClick={()=>{ setStatus('All'); setKyc('all'); setSearch(''); }}>Reset</Button>
              <Button variant="outline" onClick={()=>{
                // Bulk Approvals for Pending
                state.sellers.filter(s=>s.status==='Pending').forEach(s=>dispatch({ type:'SELLER_UPDATE', payload: { id: s.id, status: 'Active' } }));
              }}>Bulk Approve Pending</Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Sellers</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Commission</th>
                    <th>KYC</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(s => (
                    <tr key={s.id} className="border-t">
                      <td className="py-2">{s.name}</td>
                      <td>{s.email}</td>
                      <td><Badge variant={s.status==='Active'?'default':s.status==='Pending'?'secondary':'destructive'}>{s.status}</Badge></td>
                      <td>{s.commission}%</td>
                      <td>{s.kycComplete ? <Badge>Complete</Badge> : <Badge variant="secondary">Incomplete</Badge>}</td>
                      <td className="text-right space-x-2">
                        <Button size="sm" onClick={()=>{ setCommissionTarget(s.id); setCommissionValue(String(s.commission)); setCommissionOpen(true); }}>Change commission</Button>
                        <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'SELLER_UPDATE', payload: { id: s.id, status: s.status==='Suspended' ? 'Active':'Suspended' } })}>{s.status==='Suspended' ? 'Unsuspend':'Suspend'}</Button>
                      </td>
                    </tr>
                  ))}
                  {filtered.length===0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No sellers found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={commissionOpen} onOpenChange={setCommissionOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Change Commission</DialogTitle></DialogHeader>
            <div className="relative">
              <Input type="number" value={commissionValue} onChange={(e)=>setCommissionValue(e.target.value)} className="pr-8" />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">%</span>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={()=>setCommissionOpen(false)}>Cancel</Button>
              <Button onClick={()=>{ if (commissionTarget) dispatch({ type:'SELLER_UPDATE', payload: { id: commissionTarget, commission: Number(commissionValue || 0) } }); setCommissionOpen(false); }}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminSellers;

