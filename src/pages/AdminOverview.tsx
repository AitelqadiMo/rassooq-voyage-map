import React, { useMemo } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChartContainer, ChartLegend, ChartLegendContent, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { AlertTriangle, CheckCircle2, Info, TrendingUp, PackageSearch, Users, Activity, Shield, Zap, BarChart3 } from "lucide-react";

const AdminOverview = () => {
  const { state, dispatch } = useAdmin();

  const chartConfig = useMemo(() => ({
    orders: { label: "Orders", color: "hsl(var(--primary))" },
    gmv: { label: "GMV", color: "hsl(var(--secondary))" },
  }), []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Control Center
          </h1>
          <p className="text-muted-foreground mt-1">Monitor your marketplace performance and system health</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="rounded-xl border-primary/20 hover:border-primary/40">
            <Activity className="h-4 w-4 mr-2" />
            Real-time
          </Button>
          <Select value={state.dateRange} onValueChange={(v)=>dispatch({ type: 'SET_DATE_RANGE', payload: v as any })}>
            <SelectTrigger className="w-40 rounded-xl">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="glass-panel hover-lift border-primary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Total GMV</div>
                <div className="text-2xl font-bold">AED {state.kpis.gmv.toLocaleString()}</div>
                <div className="flex items-center text-sm text-emerald-600 mt-1">
                  <TrendingUp className="h-4 w-4 mr-1"/>+3.2%
                </div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-primary-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel hover-lift border-secondary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Orders Today</div>
                <div className="text-2xl font-bold">{state.kpis.ordersToday.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground mt-1">Live tracking</div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-secondary/20 flex items-center justify-center">
                <PackageSearch className="h-6 w-6 text-secondary" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel hover-lift border-accent/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">COD Success</div>
                <div className="text-2xl font-bold">{state.kpis.codSuccessPct}%</div>
                <div className="text-sm text-emerald-600 mt-1">Above target</div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-accent/20 flex items-center justify-center">
                <Shield className="h-6 w-6 text-accent" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel hover-lift border-flash/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Returns</div>
                <div className="text-2xl font-bold">{state.kpis.returnsPct}%</div>
                <div className="text-sm text-amber-600 mt-1">Monitor closely</div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-flash/20 flex items-center justify-center">
                <AlertTriangle className="h-6 w-6 text-flash" />
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="glass-panel hover-lift border-tertiary/10">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm text-muted-foreground">Active Sellers</div>
                <div className="text-2xl font-bold">{state.kpis.activeSellers}</div>
                <div className="text-sm text-muted-foreground mt-1">Verified</div>
              </div>
              <div className="h-12 w-12 rounded-xl bg-tertiary/20 flex items-center justify-center">
                <Users className="h-6 w-6 text-tertiary" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel border-primary/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Orders & Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-80">
              <BarChart data={state.ordersTrend}>
                <CartesianGrid vertical={false} stroke="hsl(var(--border))" strokeDasharray="3 3" />
                <XAxis 
                  dataKey="day" 
                  tickLine={false} 
                  axisLine={false} 
                  tickMargin={8}
                  className="text-xs"
                />
                <Bar dataKey="orders" fill="var(--color-orders)" radius={[4, 4, 0, 0]} />
                <Bar dataKey="gmv" fill="var(--color-gmv)" radius={[4, 4, 0, 0]} />
                <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="glass-panel border-secondary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-secondary" />
                Top Categories
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.topCategories.map((c, index) => (
                <div key={c.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span className="text-sm font-medium">{c.name}</span>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    AED {c.sales.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
          
          <Card className="glass-panel border-tertiary/10">
            <CardHeader className="pb-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <Users className="h-4 w-4 text-tertiary" />
                Top Sellers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {state.topSellers.map((s, index) => (
                <div key={s.name} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex items-center gap-2">
                    <div className="h-6 w-6 rounded-full bg-gradient-primary flex items-center justify-center text-xs font-bold text-primary-foreground">
                      {index + 1}
                    </div>
                    <span className="text-sm font-medium">{s.name}</span>
                  </div>
                  <Badge variant="secondary" className="rounded-full">
                    AED {s.sales.toLocaleString()}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* System Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel border-amber-500/10">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-amber-500" />
                System Alerts
              </CardTitle>
              <Badge variant="secondary" className="rounded-full">
                {state.notifications.length} active
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {state.notifications.map(n => (
              <div key={n.id} className="flex items-center justify-between p-4 rounded-xl glass-panel hover-lift">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                    n.level === 'warn' ? 'bg-amber-500/20' : 
                    n.level === 'error' ? 'bg-destructive/20' : 'bg-primary/20'
                  }`}>
                    {n.level === 'warn' ? (
                      <AlertTriangle className="h-4 w-4 text-amber-500"/>
                    ) : n.level === 'error' ? (
                      <AlertTriangle className="h-4 w-4 text-destructive"/>
                    ) : (
                      <Info className="h-4 w-4 text-primary"/>
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{n.message}</p>
                    <p className="text-xs text-muted-foreground">2 minutes ago</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="rounded-xl">
                  Resolve
                </Button>
              </div>
            ))}
            {state.notifications.length === 0 && (
              <div className="text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto mb-2" />
                <p className="text-sm font-medium">All systems operational</p>
                <p className="text-xs text-muted-foreground">No alerts at this time</p>
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="glass-panel border-emerald-500/10">
          <CardHeader className="pb-4">
            <CardTitle className="text-xl font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-emerald-500" />
              System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-emerald-500/5 to-emerald-500/10">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium">Database</span>
                </div>
                <Badge variant={state.health.db==='ok' ? 'default' : state.health.db==='warn' ? 'secondary' : 'destructive'} className="rounded-full">
                  {state.health.db}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-primary/5 to-primary/10">
                <div className="flex items-center gap-2">
                  <div className={`h-2 w-2 rounded-full ${state.health.queueLagMs < 500 ? 'bg-emerald-500' : 'bg-destructive'}`} />
                  <span className="text-sm font-medium">Queue Lag</span>
                </div>
                <Badge variant={state.health.queueLagMs<500 ? 'default' : 'destructive'} className="rounded-full">
                  {state.health.queueLagMs} ms
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-xl bg-gradient-to-r from-secondary/5 to-secondary/10">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-emerald-500" />
                  <span className="text-sm font-medium">API Uptime</span>
                </div>
                <Badge className="rounded-full">
                  {state.health.apiUptimePct}%
                </Badge>
              </div>
            </div>
            
            <div className="pt-4 border-t border-border/20">
              <Button className="w-full rounded-xl" variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                View Detailed Metrics
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminOverview;

