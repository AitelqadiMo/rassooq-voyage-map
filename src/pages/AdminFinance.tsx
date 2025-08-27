import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

class FinanceErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean; message?: string }>{
  constructor(props: any){ super(props); this.state = { hasError: false }; }
  static getDerivedStateFromError(error: any){ return { hasError: true, message: String(error?.message || error) }; }
  componentDidCatch(error: any){ console.error('AdminFinance error:', error); }
  render(){ if (this.state.hasError) { return <div className="p-4 text-sm text-destructive-foreground bg-destructive/10 rounded-xl">Failed to load Finance page: {this.state.message}</div>; } return this.props.children as any; }
}

const AdminFinance = () => {
  const { state, dispatch } = useAdmin();
  const [status, setStatus] = useState('All');
  const [seller, setSeller] = useState('all');
  const [range, setRange] = useState('30d');
  const [detailOpen, setDetailOpen] = useState(false);
  const [current, setCurrent] = useState<string | null>(null);

  const payouts = useMemo(() => state.payouts
    .filter(p => status==='All' || p.status===status)
    .filter(p => seller==='all' || p.seller===seller)
  , [state.payouts, status, seller]);

  const report = useMemo(() => state.ordersTrend.map((d,i)=> ({ day: d.day, commission: d.gmv * 0.12, codOutstanding: Math.max(0, (100000 - i*3000)) })), [state.ordersTrend]);

  return (
    <FinanceErrorBoundary>
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 space-y-4">
        <h1 className="text-2xl font-bold">Finance</h1>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Payouts</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-5 gap-2">
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger><SelectValue placeholder="Status"/></SelectTrigger>
              <SelectContent>
                {['All','Pending','Approved','Paid','Rejected'].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <Select value={seller} onValueChange={setSeller}>
              <SelectTrigger><SelectValue placeholder="Seller"/></SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {[...new Set(state.payouts.map(p=>p.seller))].map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="col-span-3" />
            <div className="col-span-5 overflow-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-muted-foreground">
                    <th>Seller</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th className="text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payouts.map(p => (
                    <tr key={p.id} className="border-t">
                      <td className="py-2">{p.seller}</td>
                      <td>AED {p.amount}</td>
                      <td>{new Date(p.date).toLocaleDateString()}</td>
                      <td><Badge variant={p.status==='Pending'?'secondary':p.status==='Rejected'?'destructive': 'default'}>{p.status}</Badge></td>
                      <td className="text-right space-x-2">
                        <Button size="sm" variant="outline" onClick={()=>{ setCurrent(p.id); setDetailOpen(true); }}>View</Button>
                        {p.status==='Pending' && <Button size="sm" onClick={()=>dispatch({ type:'PAYOUT_UPDATE', payload: { id: p.id, status: 'Approved' } })}>Approve</Button>}
                        {p.status==='Pending' && <Button size="sm" variant="outline" onClick={()=>dispatch({ type:'PAYOUT_UPDATE', payload: { id: p.id, status: 'Rejected' } })}>Reject</Button>}
                      </td>
                    </tr>
                  ))}
                  {payouts.length===0 && (
                    <tr><td colSpan={5} className="py-8 text-center text-muted-foreground">No payouts found.</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3"><CardTitle className="text-lg">Reports</CardTitle></CardHeader>
          <CardContent>
            <ChartContainer config={{ commission: { label: 'Commission', color: 'hsl(var(--primary))' }, codOutstanding: { label: 'COD Outstanding', color: 'hsl(var(--destructive))' } }} className="h-72">
              <AreaChart data={report}>
                <CartesianGrid vertical={false} />
                <XAxis dataKey="day" tickLine={false} axisLine={false} tickMargin={8} />
                <YAxis />
                <Area dataKey="commission" stroke="var(--color-commission)" fill="var(--color-commission)" fillOpacity={0.2} />
                <Area dataKey="codOutstanding" stroke="var(--color-codOutstanding)" fill="var(--color-codOutstanding)" fillOpacity={0.2} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
      <Dialog open={detailOpen} onOpenChange={setDetailOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Payout Breakdown</DialogTitle></DialogHeader>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span>Payout ID</span><span>{current}</span></div>
            <div className="flex justify-between"><span>Gross</span><span>AED 10,000</span></div>
            <div className="flex justify-between"><span>Fees</span><span>- AED 500</span></div>
            <div className="flex justify-between font-semibold"><span>Net Amount</span><span>AED 9,500</span></div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={()=>setDetailOpen(false)}>Close</Button>
            <Button onClick={()=>setDetailOpen(false)}>Approve Transfer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </FinanceErrorBoundary>
  );
};

export default AdminFinance;

