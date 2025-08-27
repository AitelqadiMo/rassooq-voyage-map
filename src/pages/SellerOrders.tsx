import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Search, 
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  XCircle,
  AlertCircle,
  Eye,
  Download,
  MapPin
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SellerOrders = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("all");

  // Redirect if not seller
  if (currentRole !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground mb-4">You need seller access to view this page.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Mock orders data
  const orders = [
    {
      id: "ORD-2024-001",
      customerName: "Ahmed Al-Rashid",
      customerEmail: "ahmed.rashid@email.com",
      items: [
        { 
          name: "Samsung Galaxy S24 Ultra", 
          sku: "SGS24U-256-BLK", 
          quantity: 1, 
          price: 4999,
          image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=60&h=60&fit=crop"
        }
      ],
      total: 4999,
      status: "new",
      paymentStatus: "paid",
      shippingAddress: "123 Mohammed V Ave, Casablanca, Morocco",
      orderDate: "2024-01-20T10:30:00Z",
      slaDeadline: "2024-01-22T17:00:00Z",
      trackingNumber: null
    },
    {
      id: "ORD-2024-002",
      customerName: "Fatima Benali",
      customerEmail: "f.benali@email.com",
      items: [
        { 
          name: "Traditional Moroccan Kaftan", 
          sku: "TMK-001-RED", 
          quantity: 2, 
          price: 899,
          image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=60&h=60&fit=crop"
        },
        { 
          name: "Premium Argan Oil Set", 
          sku: "AOS-PREM-100", 
          quantity: 1, 
          price: 299,
          image: "https://images.unsplash.com/photo-1556228578-dd7f2b4cd4cd?w=60&h=60&fit=crop"
        }
      ],
      total: 2097,
      status: "awaiting_shipment",
      paymentStatus: "paid",
      shippingAddress: "456 Hassan II Blvd, Rabat, Morocco",
      orderDate: "2024-01-19T14:15:00Z",
      slaDeadline: "2024-01-21T17:00:00Z",
      trackingNumber: null
    },
    {
      id: "ORD-2024-003",
      customerName: "Youssef Tazi",
      customerEmail: "youssef.tazi@email.com", 
      items: [
        { 
          name: "Handwoven Berber Carpet", 
          sku: "HBC-L-BLU", 
          quantity: 1, 
          price: 1599,
          image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=60&h=60&fit=crop"
        }
      ],
      total: 1599,
      status: "shipped",
      paymentStatus: "paid",
      shippingAddress: "789 Atlas View, Marrakech, Morocco",
      orderDate: "2024-01-18T09:20:00Z",
      slaDeadline: "2024-01-20T17:00:00Z",
      trackingNumber: "TRK-MAR-2024-456789"
    },
    {
      id: "ORD-2024-004",
      customerName: "Aicha Ouali",
      customerEmail: "aicha.ouali@email.com",
      items: [
        { 
          name: "Moroccan Mint Tea Blend", 
          sku: "MTB-ORG-500", 
          quantity: 3, 
          price: 85,
          image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=60&h=60&fit=crop"
        }
      ],
      total: 255,
      status: "delivered",
      paymentStatus: "paid",
      shippingAddress: "321 Corniche Rd, Agadir, Morocco",
      orderDate: "2024-01-15T16:45:00Z",
      slaDeadline: "2024-01-17T17:00:00Z",
      trackingNumber: "TRK-AGA-2024-123456"
    },
    {
      id: "ORD-2024-005",
      customerName: "Omar Benjelloun",
      customerEmail: "omar.benj@email.com",
      items: [
        { 
          name: "Samsung Galaxy S24 Ultra", 
          sku: "SGS24U-256-BLK", 
          quantity: 1, 
          price: 4999,
          image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=60&h=60&fit=crop"
        }
      ],
      total: 4999,
      status: "cancelled",
      paymentStatus: "refunded",
      shippingAddress: "654 Royal Palm Ave, Fez, Morocco",
      orderDate: "2024-01-17T11:30:00Z",
      slaDeadline: null,
      trackingNumber: null
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "new":
        return <Badge className="bg-warning text-warning-foreground">New Order</Badge>;
      case "awaiting_shipment":
        return <Badge className="bg-orange-500 text-white">Awaiting Shipment</Badge>;
      case "shipped":
        return <Badge className="bg-blue-500 text-white">Shipped</Badge>;
      case "delivered":
        return <Badge className="bg-success text-success-foreground">Delivered</Badge>;
      case "cancelled":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "new":
        return <Clock className="h-4 w-4" />;
      case "awaiting_shipment":
        return <Package className="h-4 w-4" />;
      case "shipped":
        return <Truck className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "cancelled":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertCircle className="h-4 w-4" />;
    }
  };

  const ordersByStatus = {
    new: orders.filter(o => o.status === 'new'),
    awaiting_shipment: orders.filter(o => o.status === 'awaiting_shipment'),
    shipped: orders.filter(o => o.status === 'shipped'),
    delivered: orders.filter(o => o.status === 'delivered'),
    cancelled: orders.filter(o => o.status === 'cancelled')
  };

  const handleMarkShipped = (orderId: string) => {
    toast({
      title: "Order Marked as Shipped",
      description: `Order ${orderId} has been marked as shipped.`,
    });
  };

  const isOverdue = (slaDeadline: string | null) => {
    if (!slaDeadline) return false;
    return new Date(slaDeadline) < new Date();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customerName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const OrderCard = ({ order }: { order: typeof orders[0] }) => (
    <Card className={`mb-4 ${isOverdue(order.slaDeadline) && order.status !== 'delivered' && order.status !== 'cancelled' ? 'border-destructive' : ''}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="font-semibold">{order.id}</h3>
              {getStatusBadge(order.status)}
              {isOverdue(order.slaDeadline) && order.status !== 'delivered' && order.status !== 'cancelled' && (
                <Badge variant="destructive">Overdue</Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground">
              {order.customerName} • {formatDate(order.orderDate)}
            </p>
            {order.slaDeadline && (
              <p className="text-sm text-muted-foreground">
                SLA: {formatDate(order.slaDeadline)}
              </p>
            )}
          </div>
          <div className="text-right">
            <p className="font-semibold">{order.total} MAD</p>
            <p className="text-sm text-muted-foreground">{order.items.length} item(s)</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 mb-4">
          <MapPin className="h-4 w-4 text-muted-foreground" />
          <p className="text-sm text-muted-foreground truncate">{order.shippingAddress}</p>
        </div>

        <div className="flex items-center space-x-4 mb-4">
          {order.items.slice(0, 3).map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <img
                src={item.image}
                alt={item.name}
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-sm">×{item.quantity}</span>
            </div>
          ))}
          {order.items.length > 3 && (
            <span className="text-sm text-muted-foreground">
              +{order.items.length - 3} more
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/seller/orders/${order.id}`}>
              <Eye className="h-4 w-4 mr-2" />
              View Details
            </Link>
          </Button>
          
          <div className="flex space-x-2">
            {order.status === 'awaiting_shipment' && (
              <Button 
                size="sm" 
                onClick={() => handleMarkShipped(order.id)}
                className="bg-primary hover:bg-primary/90"
              >
                <Truck className="h-4 w-4 mr-2" />
                Mark Shipped
              </Button>
            )}
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Order Management</h1>
            <p className="text-muted-foreground">Track and manage your orders</p>
          </div>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Orders
          </Button>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Clock className="h-8 w-8 text-warning mr-3" />
                <div>
                  <p className="text-2xl font-bold">{ordersByStatus.new.length}</p>
                  <p className="text-sm text-muted-foreground">New Orders</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-orange-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{ordersByStatus.awaiting_shipment.length}</p>
                  <p className="text-sm text-muted-foreground">To Ship</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <Truck className="h-8 w-8 text-blue-500 mr-3" />
                <div>
                  <p className="text-2xl font-bold">{ordersByStatus.shipped.length}</p>
                  <p className="text-sm text-muted-foreground">Shipped</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <CheckCircle className="h-8 w-8 text-success mr-3" />
                <div>
                  <p className="text-2xl font-bold">{ordersByStatus.delivered.length}</p>
                  <p className="text-sm text-muted-foreground">Delivered</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center">
                <XCircle className="h-8 w-8 text-destructive mr-3" />
                <div>
                  <p className="text-2xl font-bold">{ordersByStatus.cancelled.length}</p>
                  <p className="text-sm text-muted-foreground">Cancelled</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search orders by ID or customer name..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="new">New Orders</SelectItem>
                  <SelectItem value="awaiting_shipment">Awaiting Shipment</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Orders Tabs */}
        <Tabs defaultValue="all" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
            <TabsTrigger value="new">New ({ordersByStatus.new.length})</TabsTrigger>
            <TabsTrigger value="awaiting_shipment">To Ship ({ordersByStatus.awaiting_shipment.length})</TabsTrigger>
            <TabsTrigger value="shipped">Shipped ({ordersByStatus.shipped.length})</TabsTrigger>
            <TabsTrigger value="delivered">Delivered ({ordersByStatus.delivered.length})</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled ({ordersByStatus.cancelled.length})</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="space-y-4">
              {filteredOrders.map(order => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          </TabsContent>

          {Object.entries(ordersByStatus).map(([status, orders]) => (
            <TabsContent key={status} value={status}>
              <div className="space-y-4">
                {orders.map(order => (
                  <OrderCard key={order.id} order={order} />
                ))}
                {orders.length === 0 && (
                  <Card>
                    <CardContent className="pt-6 text-center py-12">
                      {getStatusIcon(status)}
                      <h3 className="text-lg font-semibold mb-2 mt-4">No {status.replace('_', ' ')} orders</h3>
                      <p className="text-muted-foreground">
                        Orders with this status will appear here
                      </p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SellerOrders;