import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const AdminReturns = () => {
  const { state, dispatch } = useAdmin();
  const [status, setStatus] = useState('All');
  const [search, setSearch] = useState('');
  const [detailId, setDetailId] = useState<string|null>(null);
  const [rejectOpen, setRejectOpen] = useState(false);
  const [rejectNote, setRejectNote] = useState('');

  const filtered = useMemo(() => state.rmas
    .filter(r => status==='All' || r.status===status)
    .filter(r => r.id.toLowerCase().includes(search.toLowerCase()) || r.orderId.toLowerCase().includes(search.toLowerCase()) || r.item.toLowerCase().includes(search.toLowerCase()))
  , [state.rmas, status, search]);

  const active = state.rmas.find(r => r.id===detailId) || null;

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Returns & Refunds</h1>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Filters</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-4 gap-2">
            <Input placeholder="Search RMA / Order / Item" value={search} onChange={(e)=>setSearch(e.target.value)} />
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                {['All','Pending','Approved','Rejected'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <div />
            <div className="flex gap-2"><Button variant="outline" onClick={()=>{ setStatus('All'); setSearch(''); }}>Reset</Button></div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">RMA List</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>RMA</th>
                    <th>Order</th>
                    <th>Item</th>
                    <th>Reason</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map(r => (
                    <tr key={r.id} className="border-t">
                      <td className="py-2">{r.id}</td>
                      <td>{r.orderId}</td>
                      <td>{r.item}</td>
                      <td>{r.reason}</td>
                      <td><Badge variant={r.status==='Pending'?'secondary':r.status==='Approved'?'default':'destructive'}>{r.status}</Badge></td>
                      <td className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={()=>setDetailId(r.id)}>Detail</Button>
                        {r.status!=='Approved' && <Button size="sm" onClick={()=>dispatch({ type:'RMA_UPDATE', payload: { id: r.id, status: 'Approved', timeline: [...r.timeline, 'Approved'] } })}>Approve</Button>}
                        {r.status!=='Rejected' && <Button size="sm" variant="outline" onClick={()=>{ setDetailId(r.id); setRejectOpen(true); }}>Reject</Button>}
                      </td>
                    </tr>
                  ))}
                  {filtered.length===0 && (
                    <tr><td colSpan={6} className="py-8 text-center text-muted-foreground">No returns found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Detail Drawer Substitute */}
        {active && (
          <Card>
            <CardHeader className="pb-2"><CardTitle className="text-lg">RMA Detail — {active.id}</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              <div className="text-sm text-muted-foreground">Photos:</div>
              <div className="flex gap-2">{(active.photos||[]).length===0 ? <span className="text-sm text-muted-foreground">No photos uploaded</span> : active.photos!.map((p,i)=>(<img key={i} src={p} className="w-16 h-16 rounded object-cover"/>))}</div>
              <div className="text-sm text-muted-foreground">Timeline:</div>
              <div className="flex flex-wrap gap-2">{active.timeline.map((t,i)=>(<Badge key={i} variant="secondary">{t}</Badge>))}</div>
              <div className="flex gap-2">
                <Button onClick={()=>dispatch({ type:'RMA_UPDATE', payload: { id: active.id, status: 'Approved', timeline: [...active.timeline, 'Refund Issued'] } })}>Approve Refund</Button>
                <Button variant="outline" onClick={()=>setRejectOpen(true)}>Reject</Button>
                <Button variant="ghost" onClick={()=>setDetailId(null)}>Close</Button>
              </div>
            </CardContent>
          </Card>
        )}

        <Dialog open={rejectOpen} onOpenChange={setRejectOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Reject Return</DialogTitle></DialogHeader>
            <Textarea placeholder="Reason" value={rejectNote} onChange={(e)=>setRejectNote(e.target.value)} />
            <DialogFooter>
              <Button variant="outline" onClick={()=>setRejectOpen(false)}>Cancel</Button>
              <Button onClick={()=>{ if (detailId) dispatch({ type:'RMA_UPDATE', payload: { id: detailId, status: 'Rejected', notes: rejectNote, timeline: [...(state.rmas.find(r=>r.id===detailId)?.timeline||[]), 'Rejected'] } }); setRejectNote(''); setRejectOpen(false); }}>Submit</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminReturns;

