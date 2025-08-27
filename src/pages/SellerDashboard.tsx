import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Package, 
  ShoppingBag, 
  ArrowUpRight, 
  AlertTriangle, 
  DollarSign,
  TrendingUp,
  Users,
  Eye,
  Plus,
  Download,
  Filter
} from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { Link } from "react-router-dom";

const SellerDashboard = () => {
  const { state, dispatch } = useAppContext();
  // Mock data for dashboard
  const stats = {
    todaySales: "12,340 MAD",
    ordersAwaiting: 23,
    lowStock: 8,
    returnsPending: 4,
    nextPayout: "Jan 15, 2024"
  };

  const recentOrders = [
    { id: "#RS-001234", customer: "Ahmed Ben Ali", amount: "340 MAD", status: "awaiting-shipment", time: "2 hours ago" },
    { id: "#RS-001235", customer: "Fatima Zahra", amount: "680 MAD", status: "shipped", time: "4 hours ago" },
    { id: "#RS-001236", customer: "Mohammed Alami", amount: "1,250 MAD", status: "delivered", time: "1 day ago" },
  ];

  const lowStockProducts = [
    { name: "Traditional Moroccan Lamp", stock: 3, sku: "TML-001" },
    { name: "Argan Oil Hair Treatment", stock: 1, sku: "AOH-045" },
    { name: "Handwoven Berber Rug", stock: 2, sku: "HBR-103" },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "awaiting-shipment":
        return <Badge variant="destructive" className="text-xs">Awaiting Shipment</Badge>;
      case "shipped":
        return <Badge variant="secondary" className="text-xs">Shipped</Badge>;
      case "delivered":
        return <Badge className="text-xs bg-mint-tea/20 text-tertiary">Delivered</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {state.currentRole === 'admin' && (
          <div className="mb-6 p-4 rounded-xl glass-panel border-amber-300/30 text-amber-900 flex items-center justify-between shadow-medium">
            <span className="text-sm font-medium">🔄 Impersonating Seller view</span>
            <Link to="/admin/overview" className="text-sm underline hover:text-amber-700 transition-colors">Exit</Link>
          </div>
        )}
        
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="font-display text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">Seller Dashboard</h1>
              <p className="text-muted-foreground text-lg">Welcome back! Here's your store overview.</p>
            </div>
            <Button className="bg-gradient-primary hover:shadow-glow transition-spring hover:scale-105 font-semibold px-6 py-3">
              <Plus className="h-5 w-5 mr-2" />
              Add Product
            </Button>
          </div>

          {/* Premium Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            <Card className="hover-float glass-card border-0 shadow-medium">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">Today's Sales</p>
                    <p className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">{stats.todaySales}</p>
                  </div>
                  <div className="h-14 w-14 bg-gradient-primary/10 rounded-xl flex items-center justify-center shadow-subtle">
                    <DollarSign className="h-7 w-7 text-primary" />
                  </div>
                </div>
                <div className="flex items-center mt-4 text-sm">
                  <TrendingUp className="h-4 w-4 text-tertiary mr-2" />
                  <span className="text-tertiary font-semibold">+12.5%</span>
                  <span className="text-muted-foreground ml-2">from yesterday</span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Orders Awaiting</p>
                    <p className="text-2xl font-bold text-secondary">{stats.ordersAwaiting}</p>
                  </div>
                  <div className="h-12 w-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="h-6 w-6 text-secondary" />
                  </div>
                </div>
                {stats.ordersAwaiting > 20 && (
                  <div className="flex items-center mt-2 text-sm text-amber-600">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    <span>High volume</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Low Stock</p>
                    <p className="text-2xl font-bold text-destructive">{stats.lowStock}</p>
                  </div>
                  <div className="h-12 w-12 bg-destructive/10 rounded-lg flex items-center justify-center">
                    <Package className="h-6 w-6 text-destructive" />
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2 h-7 text-xs">
                  Restock Now
                </Button>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Returns Pending</p>
                    <p className="text-2xl font-bold text-accent">{stats.returnsPending}</p>
                  </div>
                  <div className="h-12 w-12 bg-accent/10 rounded-lg flex items-center justify-center">
                    <ArrowUpRight className="h-6 w-6 text-accent rotate-180" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">Next Payout</p>
                    <p className="text-lg font-semibold text-tertiary">{stats.nextPayout}</p>
                  </div>
                  <div className="h-12 w-12 bg-tertiary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-6 w-6 text-tertiary" />
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="mt-2 h-7 text-xs p-0 text-tertiary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Dashboard Content */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="inventory">Inventory</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Orders */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg">Recent Orders</CardTitle>
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-2" />
                      View All
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-medium text-sm">{order.id}</span>
                            {getStatusBadge(order.status)}
                          </div>
                          <p className="text-sm text-muted-foreground">{order.customer}</p>
                          <p className="text-xs text-muted-foreground">{order.time}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-primary">{order.amount}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-lg text-destructive">Low Stock Alert</CardTitle>
                    <Button variant="outline" size="sm">
                      <Package className="h-4 w-4 mr-2" />
                      Manage Inventory
                    </Button>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {lowStockProducts.map((product) => (
                      <div key={product.sku} className="flex items-center justify-between p-3 rounded-lg bg-destructive/5 border border-destructive/20">
                        <div className="flex-1">
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-xs text-muted-foreground">SKU: {product.sku}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="destructive">{product.stock} left</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Order Management</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Order management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="inventory">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Management</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Inventory management interface coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Sales Analytics</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Analytics dashboard coming soon...</p>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SellerDashboard;