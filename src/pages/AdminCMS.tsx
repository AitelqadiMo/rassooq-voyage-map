import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const AdminCMS = () => {
  const { state, dispatch } = useAdmin();
  const [slotOpen, setSlotOpen] = useState(false);
  const [slotTitle, setSlotTitle] = useState('');
  const [slotType, setSlotType] = useState<'Hero'|'Banner'|'Carousel'|'CategoryTile'>('Banner');
  const [slotStart, setSlotStart] = useState('');
  const [slotEnd, setSlotEnd] = useState('');

  const [promoSearch, setPromoSearch] = useState('');
  const promos = useMemo(() => state.promotions.filter(p => p.name.toLowerCase().includes(promoSearch.toLowerCase())), [state.promotions, promoSearch]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">CMS</h1>

        {/* Homepage slots */}
        <Card>
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-lg">Homepage Slots</CardTitle>
            <Button size="sm" onClick={()=>setSlotOpen(true)}>Add Slot</Button>
          </CardHeader>
          <CardContent>
            {state.slots.length===0 ? (
              <div className="text-center text-muted-foreground py-8">No banners yet — add one</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {state.slots.map((s, idx) => (
                  <div key={s.id} className="p-3 rounded border bg-card">
                    <div className="flex items-center justify-between">
                      <div className="font-medium">{s.title} <Badge className="ml-2" variant="secondary">{s.type}</Badge></div>
                      <div className="text-xs text-muted-foreground">{s.start} → {s.end}</div>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'SLOT_REORDER', payload: { from: idx, to: Math.max(0, idx-1) } })} disabled={idx===0}>Up</Button>
                      <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'SLOT_REORDER', payload: { from: idx, to: Math.min(state.slots.length-1, idx+1) } })} disabled={idx===state.slots.length-1}>Down</Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Promotions */}
        <Card>
          <CardHeader className="pb-3 flex items-center justify-between">
            <CardTitle className="text-lg">Promotions</CardTitle>
            <Input placeholder="Search promos" value={promoSearch} onChange={(e)=>setPromoSearch(e.target.value)} className="max-w-xs" />
          </CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>Name</th>
                    <th>Ends</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {promos.map(p => (
                    <tr key={p.id} className="border-top">
                      <td className="py-2">{p.name}</td>
                      <td>{p.endsAt}</td>
                      <td>{p.active ? <Badge>Active</Badge> : <Badge variant="secondary">Inactive</Badge>}</td>
                      <td className="text-right">
                        <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'PROMO_UPDATE', payload: { id: p.id, active: !p.active } })}>{p.active ? 'Disable':'Enable'}</Button>
                      </td>
                    </tr>
                  ))}
                  {promos.length===0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No campaigns found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Help center articles */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Help Center Articles</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>Title</th>
                    <th>Tags</th>
                    <th>Published</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {state.articles.map(a => (
                    <tr key={a.id} className="border-t">
                      <td className="py-2">{a.title}</td>
                      <td>{a.tags.join(', ')}</td>
                      <td>{a.published ? <Badge>Yes</Badge> : <Badge variant="secondary">No</Badge>}</td>
                      <td className="text-right">
                        <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'ARTICLE_UPDATE', payload: { id: a.id, published: !a.published } })}>{a.published ? 'Unpublish':'Publish'}</Button>
                      </td>
                    </tr>
                  ))}
                  {state.articles.length===0 && (
                    <tr><td colSpan={4} className="py-8 text-center text-muted-foreground">No articles — add one</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Dialog open={slotOpen} onOpenChange={setSlotOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Add Homepage Slot</DialogTitle></DialogHeader>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <Input placeholder="Title" value={slotTitle} onChange={(e)=>setSlotTitle(e.target.value)} />
              <Select value={slotType} onValueChange={(v)=>setSlotType(v as any)}>
                <SelectTrigger><SelectValue placeholder="Type"/></SelectTrigger>
                <SelectContent>
                  {['Hero','Banner','Carousel','CategoryTile'].map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                </SelectContent>
              </Select>
              <Input placeholder="Start (YYYY-MM-DD)" value={slotStart} onChange={(e)=>setSlotStart(e.target.value)} />
              <Input placeholder="End (YYYY-MM-DD)" value={slotEnd} onChange={(e)=>setSlotEnd(e.target.value)} />
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={()=>setSlotOpen(false)}>Cancel</Button>
              <Button onClick={()=>{ if (slotTitle && slotStart && slotEnd) { dispatch({ type:'SLOT_ADD', payload: { id: crypto.randomUUID(), type: slotType, title: slotTitle, start: slotStart, end: slotEnd } }); setSlotOpen(false); setSlotTitle(''); setSlotStart(''); setSlotEnd(''); } }}>Add</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default AdminCMS;

