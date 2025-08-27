import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AppContext";
import { 
  AlertCircle, 
  DollarSign, 
  TrendingUp, 
  Clock, 
  Download,
  Eye,
  Calendar,
  Filter,
  CreditCard,
  Banknote,
  ArrowUpRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const earningsData = [
  { month: 'Jan', earnings: 3200 },
  { month: 'Feb', earnings: 4100 },
  { month: 'Mar', earnings: 3800 },
  { month: 'Apr', earnings: 5200 },
  { month: 'May', earnings: 4900 },
  { month: 'Jun', earnings: 6100 },
  { month: 'Jul', earnings: 5800 },
  { month: 'Aug', earnings: 7200 },
];

const transactionHistory = [
  {
    id: 1,
    date: "2024-12-20",
    amount: 1250.00,
    status: "processed",
    method: "Bank Transfer",
    grossEarnings: 1450.00,
    fees: 87.00,
    commission: 113.00,
    net: 1250.00
  },
  {
    id: 2,
    date: "2024-12-13",
    amount: 980.50,
    status: "processed",
    method: "Digital Wallet",
    grossEarnings: 1150.00,
    fees: 69.00,
    commission: 100.50,
    net: 980.50
  },
  {
    id: 3,
    date: "2024-12-06",
    amount: 2100.00,
    status: "pending",
    method: "Bank Transfer",
    grossEarnings: 2450.00,
    fees: 147.00,
    commission: 203.00,
    net: 2100.00
  },
  {
    id: 4,
    date: "2024-11-29",
    amount: 750.00,
    status: "failed",
    method: "Digital Wallet",
    grossEarnings: 870.00,
    fees: 52.20,
    commission: 67.80,
    net: 750.00
  }
];

const SellerPayouts = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState("all");

  if (currentRole !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getStatusBadge = (status) => {
    const variants = {
      processed: { variant: "default", icon: "✓" },
      pending: { variant: "secondary", icon: "⏳" },
      failed: { variant: "destructive", icon: "✗" }
    };
    const config = variants[status] || variants.pending;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <span>{config.icon}</span>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const filteredTransactions = transactionHistory.filter(transaction => {
    if (statusFilter !== "all" && transaction.status !== statusFilter) return false;
    // In real app, would also filter by date range
    return true;
  });

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Payouts & Earnings
          </h1>
          <p className="text-muted-foreground">Track your earnings, manage payouts, and view financial performance</p>
        </motion.div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20 shadow-glow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total Earnings</p>
                    <p className="text-2xl font-bold text-primary">$8,420.50</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-2">
                      <TrendingUp className="h-3 w-3 text-primary" />
                      +12.5% from last month
                    </p>
                  </div>
                  <div className="p-3 rounded-full bg-primary/20">
                    <DollarSign className="h-6 w-6 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="backdrop-blur-sm bg-gradient-to-br from-flash/10 to-flash/5 border-flash/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Pending Payouts</p>
                    <p className="text-2xl font-bold text-flash">$2,100.00</p>
                    <p className="text-xs text-muted-foreground mt-2">Processing in 2 days</p>
                  </div>
                  <div className="p-3 rounded-full bg-flash/20">
                    <Clock className="h-6 w-6 text-flash" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="backdrop-blur-sm bg-gradient-to-br from-tertiary/10 to-tertiary/5 border-tertiary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Last Payout</p>
                    <p className="text-2xl font-bold text-tertiary">$1,250.00</p>
                    <p className="text-xs text-muted-foreground mt-2">Dec 20, 2024</p>
                  </div>
                  <div className="p-3 rounded-full bg-tertiary/20">
                    <Banknote className="h-6 w-6 text-tertiary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="backdrop-blur-sm bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Next Payout</p>
                    <p className="text-2xl font-bold text-secondary">$3,070.50</p>
                    <p className="text-xs text-muted-foreground mt-2">Jan 03, 2025</p>
                  </div>
                  <div className="p-3 rounded-full bg-secondary/20">
                    <Calendar className="h-6 w-6 text-secondary" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Earnings Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Earnings Over Time
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={earningsData}>
                    <defs>
                      <linearGradient id="earningsGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="earnings"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      fill="url(#earningsGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions & Transaction History */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-4"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Quick Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                  <ArrowUpRight className="h-4 w-4 mr-2" />
                  Request Early Payout
                </Button>
                <Button variant="outline" className="w-full">
                  <Download className="h-4 w-4 mr-2" />
                  Download Tax Report
                </Button>
                <Button variant="outline" className="w-full">
                  <Eye className="h-4 w-4 mr-2" />
                  View Payment Methods
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Transaction History */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="lg:col-span-8"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-primary" />
                    Transaction History
                  </CardTitle>
                  <div className="flex gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="processed">Processed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Date</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Method</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTransactions.map((transaction) => (
                        <TableRow key={transaction.id} className="hover:bg-muted/50">
                          <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                          <TableCell className="font-medium">${transaction.amount.toFixed(2)}</TableCell>
                          <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell>{transaction.method}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => setSelectedTransaction(transaction)}
                                  >
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Transaction Breakdown</DialogTitle>
                                  </DialogHeader>
                                  {selectedTransaction && (
                                    <div className="space-y-4">
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm text-muted-foreground">Gross Earnings</p>
                                          <p className="font-medium">${selectedTransaction.grossEarnings.toFixed(2)}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">Platform Fees</p>
                                          <p className="font-medium text-destructive">-${selectedTransaction.fees.toFixed(2)}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">Commission</p>
                                          <p className="font-medium text-destructive">-${selectedTransaction.commission.toFixed(2)}</p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">Net Payout</p>
                                          <p className="font-bold text-primary">${selectedTransaction.net.toFixed(2)}</p>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </DialogContent>
                              </Dialog>
                              <Button variant="outline" size="sm">
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerPayouts;