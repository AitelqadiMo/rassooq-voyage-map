import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Truck, Package, Clock } from "lucide-react";

const OrderDetails = () => {
  const navigate = useNavigate();
  const { orderId } = useParams();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Order #{orderId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Badge variant="secondary"><CheckCircle2 className="h-3 w-3 mr-1" /> Paid</Badge>
                <Badge variant="secondary"><Package className="h-3 w-3 mr-1" /> Packed</Badge>
                <Badge variant="secondary"><Truck className="h-3 w-3 mr-1" /> Shipped</Badge>
              </div>
              <div className="text-sm text-muted-foreground flex items-center gap-2">
                <Clock className="h-4 w-4" /> Estimated delivery in 2-3 days
              </div>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => navigate(`/account/returns/new?orderId=${orderId}`)} data-testid="start-return">Return item</Button>
                <Button variant="outline">Download Invoice</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default OrderDetails;