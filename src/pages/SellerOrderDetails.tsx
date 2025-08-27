import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft,
  Package, 
  Truck, 
  Clock, 
  CheckCircle, 
  MapPin,
  User,
  Phone,
  Mail,
  Download,
  AlertCircle,
  Edit
} from "lucide-react";

const SellerOrderDetails = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { id } = useParams();
  const [trackingNumber, setTrackingNumber] = useState("");
  const [carrier, setCarrier] = useState("");
  const [notes, setNotes] = useState("");

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

  // Mock order data
  const order = {
    id: id || "ORD-2024-001",
    customerName: "Ahmed Al-Rashid",
    customerEmail: "ahmed.rashid@email.com",
    customerPhone: "+212 6 12 34 56 78",
    items: [
      { 
        name: "Samsung Galaxy S24 Ultra 256GB Black", 
        sku: "SGS24U-256-BLK", 
        quantity: 1, 
        price: 4999,
        image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&h=80&fit=crop"
      }
    ],
    subtotal: 4999,
    shipping: 0,
    tax: 0,
    total: 4999,
    status: "awaiting_shipment",
    paymentStatus: "paid",
    paymentMethod: "Credit Card",
    shippingAddress: {
      name: "Ahmed Al-Rashid",
      address: "123 Mohammed V Avenue",
      city: "Casablanca",
      postalCode: "20000",
      country: "Morocco",
      phone: "+212 6 12 34 56 78"
    },
    billingAddress: {
      name: "Ahmed Al-Rashid", 
      address: "123 Mohammed V Avenue",
      city: "Casablanca",
      postalCode: "20000",
      country: "Morocco"
    },
    orderDate: "2024-01-20T10:30:00Z",
    slaDeadline: "2024-01-22T17:00:00Z",
    trackingNumber: null,
    carrier: null,
    orderNotes: "Please handle with care"
  };

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

  const handleMarkShipped = () => {
    if (!trackingNumber || !carrier) {
      toast({
        title: "Missing Information",
        description: "Please provide tracking number and carrier information.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Order Shipped",
      description: `Order ${order.id} has been marked as shipped with tracking number ${trackingNumber}.`,
    });

    // Navigate back to orders list
    navigate('/seller/orders');
  };

  const carriers = [
    { value: "aramex", label: "Aramex" },
    { value: "dhl", label: "DHL" },
    { value: "fedex", label: "FedEx" },
    { value: "ups", label: "UPS" },
    { value: "poste_maroc", label: "Poste Maroc" },
    { value: "amana", label: "Amana" }
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const isOverdue = () => {
    return new Date(order.slaDeadline) < new Date() && 
           order.status !== 'delivered' && 
           order.status !== 'cancelled';
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button variant="ghost" onClick={() => navigate(-1)} className="mr-4">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Orders
          </Button>
          <div className="flex-1">
            <div className="flex items-center space-x-4 mb-2">
              <h1 className="font-heading text-3xl font-bold text-foreground">Order {order.id}</h1>
              {getStatusBadge(order.status)}
              {isOverdue() && <Badge variant="destructive">Overdue</Badge>}
            </div>
            <p className="text-muted-foreground">
              Placed on {formatDate(order.orderDate)}
              {order.slaDeadline && ` • SLA: ${formatDate(order.slaDeadline)}`}
            </p>
          </div>
          <div className="flex space-x-2">
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Invoice
            </Button>
            <Button variant="outline">
              <Edit className="h-4 w-4 mr-2" />
              Edit Order
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Package className="h-5 w-5 mr-2" />
                  Order Items
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4 pb-4 border-b last:border-b-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground">SKU: {item.sku}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm">Quantity: {item.quantity}</span>
                          <span className="font-semibold">{item.price} MAD</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator className="my-4" />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal:</span>
                    <span>{order.subtotal} MAD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping:</span>
                    <span>{order.shipping === 0 ? 'Free' : `${order.shipping} MAD`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax:</span>
                    <span>{order.tax} MAD</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total:</span>
                    <span>{order.total} MAD</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Information */}
            {order.status === 'awaiting_shipment' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Truck className="h-5 w-5 mr-2" />
                    Mark as Shipped
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="carrier">Carrier *</Label>
                      <Select value={carrier} onValueChange={setCarrier}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select carrier" />
                        </SelectTrigger>
                        <SelectContent>
                          {carriers.map((c) => (
                            <SelectItem key={c.value} value={c.value}>
                              {c.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tracking">Tracking Number *</Label>
                      <Input
                        id="tracking"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="Enter tracking number"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="notes">Shipping Notes (Optional)</Label>
                    <Textarea
                      id="notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Add any shipping notes..."
                      rows={3}
                    />
                  </div>
                  <Button 
                    onClick={handleMarkShipped}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    <Truck className="h-4 w-4 mr-2" />
                    Mark as Shipped
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Order Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Order Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Order Placed</p>
                      <p className="text-sm text-muted-foreground">{formatDate(order.orderDate)}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-success flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Payment Confirmed</p>
                      <p className="text-sm text-muted-foreground">Payment received via {order.paymentMethod}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-warning flex items-center justify-center">
                      <Clock className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="font-medium">Awaiting Shipment</p>
                      <p className="text-sm text-muted-foreground">Order is ready to be shipped</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Customer Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Customer Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <p className="font-medium">{order.customerName}</p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Mail className="h-4 w-4 mr-1" />
                    {order.customerEmail}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center">
                    <Phone className="h-4 w-4 mr-1" />
                    {order.customerPhone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Shipping Address */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MapPin className="h-5 w-5 mr-2" />
                  Shipping Address
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.shippingAddress.name}</p>
                  <p>{order.shippingAddress.address}</p>
                  <p>{order.shippingAddress.city}, {order.shippingAddress.postalCode}</p>
                  <p>{order.shippingAddress.country}</p>
                  <p className="mt-2 text-muted-foreground">
                    Phone: {order.shippingAddress.phone}
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Billing Address */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Address</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">
                  <p className="font-medium">{order.billingAddress.name}</p>
                  <p>{order.billingAddress.address}</p>
                  <p>{order.billingAddress.city}, {order.billingAddress.postalCode}</p>
                  <p>{order.billingAddress.country}</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Method:</span>
                    <span className="text-sm">{order.paymentMethod}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Status:</span>
                    <Badge className="bg-success text-success-foreground">Paid</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Notes */}
            {order.orderNotes && (
              <Card>
                <CardHeader>
                  <CardTitle>Order Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">{order.orderNotes}</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerOrderDetails;