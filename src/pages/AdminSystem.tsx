import React, { useMemo, useState } from "react";
import { useAdmin } from "@/contexts/AdminContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { 
  Server, 
  Database, 
  Activity, 
  Shield, 
  Settings, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Clock,
  Cpu,
  HardDrive,
  Zap,
  Globe,
  Lock,
  Trash2,
  Download,
  RefreshCw,
  Bell,
  Users,
  FileText,
  BarChart3,
  Gauge
} from "lucide-react";

const AdminSystem = () => {
  const { state } = useAdmin();
  const [user, setUser] = useState('');
  const [type, setType] = useState('All');
  const [search, setSearch] = useState('');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [autoRefresh, setAutoRefresh] = useState(true);

  // Mock enhanced system data
  const systemMetrics = {
    cpu: { usage: 45, cores: 8, load: [0.8, 1.2, 0.9] },
    memory: { used: 6.2, total: 16, cached: 2.1 },
    disk: { used: 234, total: 500, iops: 1200 },
    network: { inbound: 125, outbound: 89, connections: 1847 },
    database: { 
      connections: { active: 12, idle: 28, max: 100 },
      queries: { slow: 3, total: 15429, avgTime: 45 },
      size: { total: '12.4 GB', growth: '+2.1%' }
    },
    cache: { hitRate: 94.2, memory: '2.1 GB', keys: 45678 },
    queues: { 
      pending: 23, 
      processing: 8, 
      failed: 2, 
      throughput: 1250 
    },
    api: {
      requests: { total: 125460, perMin: 85, errors: 12 },
      latency: { p50: 120, p95: 450, p99: 890 },
      rateLimit: { violations: 5, blocked: 18 }
    }
  };

  const alerts = [
    { id: 1, level: 'warning', message: 'High memory usage detected', time: '5 min ago' },
    { id: 2, level: 'info', message: 'Database backup completed', time: '1 hour ago' },
    { id: 3, level: 'error', message: 'Payment gateway timeout', time: '2 hours ago' }
  ];

  const logs = useMemo(() => state.logs
    .filter(l => type==='All' || l.type===type)
    .filter(l => !user || l.who===user)
    .filter(l => (l.who+l.action+l.target).toLowerCase().includes(search.toLowerCase()))
  , [state.logs, user, type, search]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'ok': return <CheckCircle className="h-4 w-4 text-tertiary" />;
      case 'warn': return <AlertTriangle className="h-4 w-4 text-flash" />;
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      default: return <Clock className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getAlertIcon = (level: string) => {
    switch (level) {
      case 'error': return <XCircle className="h-4 w-4 text-destructive" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-flash" />;
      case 'info': return <CheckCircle className="h-4 w-4 text-tertiary" />;
      default: return <Bell className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-mesh">
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">System Monitor</h1>
            <p className="text-muted-foreground text-lg">Real-time system health and performance monitoring</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch checked={autoRefresh} onCheckedChange={setAutoRefresh} />
              <span className="text-sm font-medium">Auto Refresh</span>
            </div>
            <Button variant="outline" className="glass-card">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="glass-card">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="logs">Audit Logs</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* System Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="glass-card border-0 shadow-medium hover-float">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">System Status</p>
                      <div className="flex items-center gap-2">
                        {getStatusIcon(state.health.db)}
                        <span className="font-semibold text-lg">Operational</span>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-tertiary/10 rounded-xl flex items-center justify-center">
                      <Server className="h-6 w-6 text-tertiary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium hover-float">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">API Uptime</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{state.health.apiUptimePct}%</span>
                        <Badge variant="outline" className="text-xs">99.9%</Badge>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center">
                      <Activity className="h-6 w-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium hover-float">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Active Users</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">2,847</span>
                        <Badge className="bg-tertiary/20 text-tertiary">+12%</Badge>
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                      <Users className="h-6 w-6 text-secondary" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium hover-float">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">Queue Lag</p>
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-lg">{state.health.queueLagMs}ms</span>
                        {state.health.queueLagMs < 500 ? 
                          <Badge className="bg-tertiary/20 text-tertiary">Good</Badge> : 
                          <Badge variant="destructive">High</Badge>
                        }
                      </div>
                    </div>
                    <div className="h-12 w-12 bg-flash/10 rounded-xl flex items-center justify-center">
                      <Zap className="h-6 w-6 text-flash" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Resources */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Cpu className="h-5 w-5 text-primary" />
                    System Resources
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">{systemMetrics.cpu.usage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpu.usage} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Memory</span>
                      <span className="text-sm text-muted-foreground">{systemMetrics.memory.used}GB / {systemMetrics.memory.total}GB</span>
                    </div>
                    <Progress value={(systemMetrics.memory.used / systemMetrics.memory.total) * 100} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Disk Usage</span>
                      <span className="text-sm text-muted-foreground">{systemMetrics.disk.used}GB / {systemMetrics.disk.total}GB</span>
                    </div>
                    <Progress value={(systemMetrics.disk.used / systemMetrics.disk.total) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bell className="h-5 w-5 text-flash" />
                    System Alerts
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {alerts.map((alert) => (
                      <div key={alert.id} className="flex items-start gap-3 p-3 rounded-lg glass-panel">
                        {getAlertIcon(alert.level)}
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <p className="text-xs text-muted-foreground">{alert.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5 text-secondary" />
                    Database Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="glass-panel p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Active Connections</div>
                      <div className="text-xl font-bold text-secondary">{systemMetrics.database.connections.active}</div>
                    </div>
                    <div className="glass-panel p-3 rounded-lg">
                      <div className="text-sm text-muted-foreground">Avg Query Time</div>
                      <div className="text-xl font-bold text-secondary">{systemMetrics.database.queries.avgTime}ms</div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Connection Pool</span>
                      <span className="text-sm text-muted-foreground">{systemMetrics.database.connections.active + systemMetrics.database.connections.idle} / {systemMetrics.database.connections.max}</span>
                    </div>
                    <Progress value={((systemMetrics.database.connections.active + systemMetrics.database.connections.idle) / systemMetrics.database.connections.max) * 100} className="h-2" />
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-accent" />
                    API Performance
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-3">
                    <div className="glass-panel p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">P50</div>
                      <div className="text-lg font-bold text-accent">{systemMetrics.api.latency.p50}ms</div>
                    </div>
                    <div className="glass-panel p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">P95</div>
                      <div className="text-lg font-bold text-accent">{systemMetrics.api.latency.p95}ms</div>
                    </div>
                    <div className="glass-panel p-3 rounded-lg text-center">
                      <div className="text-sm text-muted-foreground">P99</div>
                      <div className="text-lg font-bold text-accent">{systemMetrics.api.latency.p99}ms</div>
                    </div>
                  </div>
                  <div className="glass-panel p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">Requests/min</span>
                      <span className="text-lg font-bold text-primary">{systemMetrics.api.requests.perMin}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-tertiary" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                    <div className="flex items-center gap-3">
                      <Lock className="h-4 w-4 text-tertiary" />
                      <span className="font-medium">SSL Certificate</span>
                    </div>
                    <Badge className="bg-tertiary/20 text-tertiary">Valid</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                    <div className="flex items-center gap-3">
                      <Globe className="h-4 w-4 text-secondary" />
                      <span className="font-medium">Firewall Status</span>
                    </div>
                    <Badge className="bg-tertiary/20 text-tertiary">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-4 w-4 text-flash" />
                      <span className="font-medium">Rate Limit Violations</span>
                    </div>
                    <Badge variant="outline">{systemMetrics.api.rateLimit.violations} today</Badge>
                  </div>
                </CardContent>
              </Card>

              <Card className="glass-card border-0 shadow-medium">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5 text-primary" />
                    System Controls
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                    <div>
                      <div className="font-medium">Maintenance Mode</div>
                      <div className="text-sm text-muted-foreground">Temporarily disable public access</div>
                    </div>
                    <Switch checked={maintenanceMode} onCheckedChange={setMaintenanceMode} />
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full glass-card">
                      <Download className="h-4 w-4 mr-2" />
                      Download System Backup
                    </Button>
                    <Button variant="outline" className="w-full glass-card">
                      <Trash2 className="h-4 w-4 mr-2" />
                      Clear System Cache
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="logs" className="space-y-6">
            <Card className="glass-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-secondary" />
                  Audit Logs
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
                  <Input 
                    placeholder="Search logs..." 
                    value={search} 
                    onChange={(e)=>setSearch(e.target.value)}
                    className="glass-panel border-0"
                  />
                  <Select value={user} onValueChange={setUser}>
                    <SelectTrigger className="glass-panel border-0">
                      <SelectValue placeholder="Filter by user"/>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Users</SelectItem>
                      {[...new Set(state.logs.map(l=>l.who))].map(u => 
                        <SelectItem key={u} value={u}>{u}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <Select value={type} onValueChange={setType}>
                    <SelectTrigger className="glass-panel border-0">
                      <SelectValue placeholder="Filter by type"/>
                    </SelectTrigger>
                    <SelectContent>
                      {['All','Product','Seller','Order','System'].map(t => 
                        <SelectItem key={t} value={t}>{t}</SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  <div className="md:col-span-2 flex gap-2">
                    <Button variant="outline" className="glass-card">
                      <Download className="h-4 w-4 mr-2" />
                      Export CSV
                    </Button>
                    <Button variant="outline" className="glass-card">
                      <RefreshCw className="h-4 w-4 mr-2" />
                      Refresh
                    </Button>
                  </div>
                </div>
                
                <div className="glass-panel rounded-lg overflow-hidden">
                  <div className="overflow-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-muted/20">
                        <tr className="text-left">
                          <th className="p-3 font-semibold">User</th>
                          <th className="p-3 font-semibold">Action</th>
                          <th className="p-3 font-semibold">Target</th>
                          <th className="p-3 font-semibold">Type</th>
                          <th className="p-3 font-semibold">Timestamp</th>
                        </tr>
                      </thead>
                      <tbody>
                        {logs.map(l => (
                          <tr key={l.id} className="border-t border-border/50 hover:bg-muted/10 transition-colors">
                            <td className="p-3 font-medium">{l.who}</td>
                            <td className="p-3">{l.action}</td>
                            <td className="p-3 text-muted-foreground">{l.target}</td>
                            <td className="p-3">
                              <Badge variant="outline" className="text-xs">{l.type}</Badge>
                            </td>
                            <td className="p-3 text-muted-foreground">{new Date(l.at).toLocaleString()}</td>
                          </tr>
                        ))}
                        {logs.length===0 && (
                          <tr>
                            <td colSpan={5} className="py-12 text-center text-muted-foreground">
                              <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                              No logs found matching your criteria.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="glass-card border-0 shadow-medium">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5 text-primary" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Performance Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">Enable API Caching</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">Auto-scaling</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">Debug Mode</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="font-semibold text-lg">Security Settings</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">Two-Factor Auth Required</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">Session Timeout (30min)</span>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-3 glass-panel rounded-lg">
                        <span className="font-medium">IP Whitelist</span>
                        <Switch />
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4 border-t border-border/20">
                  <Button className="bg-gradient-primary hover:shadow-glow">
                    Save Configuration
                  </Button>
                  <Button variant="outline" className="glass-card">
                    Reset to Defaults
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminSystem;

