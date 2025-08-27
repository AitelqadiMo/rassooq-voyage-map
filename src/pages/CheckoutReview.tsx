import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const CheckoutReview = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Review Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-3">
                <div className="border rounded-lg p-3">
                  <div className="font-medium mb-2">Items</div>
                  <div className="text-sm text-muted-foreground">Your selected products will be listed here.</div>
                </div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium mb-2">Shipping & Payment</div>
                  <div className="text-sm text-muted-foreground">Standard Delivery, COD</div>
                </div>
              </div>
              <div>
                <div className="border rounded-lg p-3">
                  <div className="font-medium mb-2">Order Summary</div>
                  <div className="flex justify-between text-sm"><span>Subtotal</span><span>AED 0.00</span></div>
                  <div className="flex justify-between text-sm"><span>Delivery</span><span>AED 15.00</span></div>
                  <div className="flex justify-between font-semibold mt-2"><span>Total</span><span>AED 15.00</span></div>
                  <div className="flex justify-between mt-4">
                    <Button variant="outline" onClick={()=>navigate('/checkout/payment')}>Back</Button>
                    <Button onClick={() => navigate(`/order/${Math.floor(Math.random()*100000)}`)} data-testid="place-order">Confirm Order</Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutReview;