import React, { useEffect, useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Search, FileDown, Eye, Pencil } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

class OrdersErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }>{
  constructor(props: any){ super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: any){ return { hasError: true, message: String(error?.message || error) }; }
  componentDidCatch(error: any){ console.error('AdminOrders error:', error); }
  render(){ if (this.state.hasError) { return <div className="p-4 text-sm text-destructive-foreground bg-destructive/10 rounded-xl">Failed to load Orders page: {this.state.message}</div>; } return this.props.children as any; }
}

const AdminOrders = () => {
  const { state, dispatch } = useAdmin();
  const [tab, setTab] = useState<'New'|'In Transit'|'Delivered'|'Cancelled'>('New');
  const [seller, setSeller] = useState('all');
  const [cod, setCod] = useState('all');
  const [city, setCity] = useState('all');
  const [courier, setCourier] = useState('all');
  const [search, setSearch] = useState('');

  const [riskOpen, setRiskOpen] = useState(false);
  const [riskTarget, setRiskTarget] = useState<string|null>(null);
  const [riskNote, setRiskNote] = useState('');
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string[]>([]);
  const [detailOpen, setDetailOpen] = useState(false);
  const [currentId, setCurrentId] = useState<string | null>(null);
  const [staffNote, setStaffNote] = useState("");
  const [editAddress, setEditAddress] = useState("");

  useEffect(() => {
    const t = setTimeout(()=>setLoading(false), 400);
    return ()=>clearTimeout(t);
  }, []);

  const filtered = useMemo(() => state.orders
    .filter(o => o.status === tab)
    .filter(o => seller==='all' || o.seller===seller)
    .filter(o => cod==='all' || (cod==='cod'? o.cod : !o.cod))
    .filter(o => city==='all' || o.city===city)
    .filter(o => courier==='all' || o.courier===courier)
    .filter(o => o.id.toLowerCase().includes(search.toLowerCase()) || o.buyer.toLowerCase().includes(search.toLowerCase()))
  , [state.orders, tab, seller, cod, city, courier, search]);

  const now = Date.now();

  const toggleSelect = (id: string) => setSelected(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);
  const toggleAll = () => setSelected(prev => prev.length===filtered.length ? [] : filtered.map(o=>o.id));

  const exportCsv = () => {
    const headers = ["Order ID","Seller","Buyer","City","Payment","Amount","Status"]; 
    const rows = (selected.length? state.orders.filter(o=>selected.includes(o.id)) : filtered).map(o => [o.id, o.seller, o.buyer, o.city, o.cod? 'COD':'Prepaid', o.amount, o.status]);
    const csv = [headers, ...rows].map(r=>r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `orders_export_${Date.now()}.csv`; a.click();
    URL.revokeObjectURL(url);
  };

  const openDetail = (id: string) => {
    setCurrentId(id); setDetailOpen(true);
    setStaffNote(""); setEditAddress("");
  };

  return (
    <OrdersErrorBoundary>
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Order Operations
          </h1>
          <p className="text-muted-foreground mt-1">Monitor and manage order fulfillment across all sellers</p>
        </div>
        <Tabs value={tab} onValueChange={(v)=>setTab(v as any)}>
          <TabsList className="grid w-full grid-cols-4 rounded-xl">
            <TabsTrigger value="New" className="rounded-xl">
              New
              {state.orders.filter(o => o.status === 'New').length > 0 && (
                <Badge className="ml-2 h-5 w-5 rounded-full p-0 text-xs">
                  {state.orders.filter(o => o.status === 'New').length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="In Transit" className="rounded-xl">In Transit</TabsTrigger>
            <TabsTrigger value="Delivered" className="rounded-xl">Delivered</TabsTrigger>
            <TabsTrigger value="Cancelled" className="rounded-xl">Cancelled</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <Card className="glass-panel border-primary/10">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Smart Filters
          </CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-6 gap-4">
          <Input 
            placeholder="Search order ID or buyer..." 
            value={search} 
            onChange={(e)=>setSearch(e.target.value)}
            className="rounded-xl"
          />
          <Select value={seller} onValueChange={setSeller}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="All Sellers"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sellers</SelectItem>
              {[...new Set(state.orders.map(o=>o.seller))].map(s => 
                <SelectItem key={s} value={s}>{s}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Select value={cod} onValueChange={setCod}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="Payment Method"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Methods</SelectItem>
              <SelectItem value="cod">COD Only</SelectItem>
              <SelectItem value="prepaid">Prepaid Only</SelectItem>
            </SelectContent>
          </Select>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="All Cities"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Cities</SelectItem>
              {[...new Set(state.orders.map(o=>o.city))].map(c => 
                <SelectItem key={c} value={c}>{c}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <Select value={courier} onValueChange={setCourier}>
            <SelectTrigger className="rounded-xl">
              <SelectValue placeholder="All Couriers"/>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Couriers</SelectItem>
              {[...new Set(state.orders.map(o=>o.courier))].map(c => 
                <SelectItem key={c} value={c}>{c}</SelectItem>
              )}
            </SelectContent>
          </Select>
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              onClick={()=>{ setSeller('all'); setCod('all'); setCity('all'); setCourier('all'); setSearch(''); }}
              className="rounded-xl"
            >
              Reset Filters
            </Button>
            <Button variant="outline" className="rounded-xl" onClick={exportCsv}>
              <FileDown className="h-4 w-4 mr-2" /> Export CSV
            </Button>
            {selected.length>0 && (
              <Button className="rounded-xl" onClick={()=>{ selected.forEach(id => dispatch({ type:'ORDERS_UPDATE', payload: { id, status: 'Delivered' } })); setSelected([]); }}>Mark Shipped</Button>
            )}
          </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">{tab} Orders</CardTitle></CardHeader>
          <CardContent>
            <div className="overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th className="w-8"><Checkbox checked={selected.length===filtered.length && filtered.length>0} onCheckedChange={toggleAll as any} /></th>
                    <th>Order</th>
                    <th>Seller</th>
                    <th>Buyer</th>
                    <th>City</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>SLA</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {loading ? (
                    Array.from({ length: 6 }).map((_,i)=>(
                      <tr key={i} className="border-t animate-pulse">
                        <td colSpan={9} className="py-3"><div className="h-4 bg-muted rounded w-1/2" /></td>
                      </tr>
                    ))
                  ) : filtered.map(o => {
                    const remaining = o.shipBy - now;
                    const overdue = remaining < 0;
                    const hrs = Math.abs(Math.floor(remaining / 3600000));
                    const mins = Math.abs(Math.floor((remaining % 3600000)/60000));
                    const highRisk = o.cod && (overdue || o.amount > 500);
                    return (
                      <tr key={o.id} className="border-t">
                        <td className="py-2"><Checkbox checked={selected.includes(o.id)} onCheckedChange={()=>toggleSelect(o.id)} /></td>
                        <td className="py-2">{o.id}</td>
                        <td>{o.seller}</td>
                        <td>{o.buyer}</td>
                        <td>{o.city}</td>
                        <td className="flex items-center gap-2">{o.cod ? <Badge>COD</Badge> : <Badge variant="secondary">Prepaid</Badge>} {highRisk && <Badge variant="destructive">High Risk</Badge>}</td>
                        <td>AED {o.amount}</td>
                        <td><Badge variant={overdue? 'destructive':'secondary'}>{overdue ? `Overdue ${hrs}h ${mins}m` : `${hrs}h ${mins}m`}</Badge></td>
                        <td className="text-right space-x-2">
                          <Button size="sm" variant="outline" onClick={()=>openDetail(o.id)}><Eye className="h-4 w-4 mr-1"/>View</Button>
                          {tab!== 'Delivered' && <Button size="sm" onClick={()=>dispatch({ type:'ORDERS_UPDATE', payload: { id: o.id, status: 'Delivered' } })}>Mark Delivered</Button>}
                          {o.cod && <Button size="sm" variant="outline" onClick={()=>{ setRiskTarget(o.id); setRiskOpen(true); }}>Flag COD Risk</Button>}
                          {tab!=='Cancelled' && <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'ORDERS_UPDATE', payload: { id: o.id, status: 'Cancelled' } })}>Refund</Button>}
                        </td>
                      </tr>
                    );
                  })}
                  {filtered.length===0 && (
                    <tr><td colSpan={8} className="py-8 text-center text-muted-foreground">No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* Exceptions */}
        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Exception Queue</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">Failed deliveries & RTOs will appear here.</CardContent>
        </Card>

        <Dialog open={riskOpen} onOpenChange={setRiskOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Flag COD Risk</DialogTitle></DialogHeader>
            <Textarea placeholder="Reason or notes" value={riskNote} onChange={(e)=>setRiskNote(e.target.value)} />
            <DialogFooter>
              <Button variant="outline" onClick={()=>setRiskOpen(false)}>Cancel</Button>
              <Button onClick={()=>{ if (riskTarget) dispatch({ type:'LOG_ADD', payload: { id: crypto.randomUUID(), who: 'admin@rassooq.com', action: 'FLAG_COD_RISK', target: riskTarget, type: 'Order', at: new Date().toISOString() } }); setRiskNote(''); setRiskTarget(null); setRiskOpen(false); }}>Flag</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
          <DialogContent>
            <DialogHeader><DialogTitle>Order Detail</DialogTitle></DialogHeader>
            <div className="space-y-3 text-sm">
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <div className="text-muted-foreground">Order ID</div>
                  <div className="font-medium">{currentId}</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Status</div>
                  <div className="font-medium">{state.orders.find(o=>o.id===currentId)?.status}</div>
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Shipping Address</div>
                <Textarea placeholder="Edit address" value={editAddress} onChange={(e)=>setEditAddress(e.target.value)} />
                <Button size="sm" variant="outline" className="mt-2" onClick={()=>setEditAddress('Updated address for demo')}>Suggest Address</Button>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Staff Notes</div>
                <Textarea placeholder="Add internal note" value={staffNote} onChange={(e)=>setStaffNote(e.target.value)} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={()=>setDetailOpen(false)}>Close</Button>
              <Button onClick={()=>{ if (currentId) dispatch({ type:'ORDERS_UPDATE', payload: { id: currentId } }); setDetailOpen(false); }}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
    </div>
    </OrdersErrorBoundary>
  );
};

export default AdminOrders;

