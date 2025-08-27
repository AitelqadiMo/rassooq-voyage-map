import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const CheckoutPayment = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="cod" className="space-y-4 mb-4">
              <div className="flex items-center gap-3">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">Cash on Delivery</Label>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card">Credit / Debit Card <span className="text-xs text-muted-foreground ml-2">SSL Secure</span></Label>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 border rounded-lg p-3">
                  <Input placeholder="Card Number" />
                  <Input placeholder="Cardholder Name" />
                  <Input placeholder="MM/YY" />
                  <Input placeholder="CVV" />
                </div>
              </div>
            </RadioGroup>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate('/checkout/delivery')}>Back</Button>
              <Button onClick={() => navigate('/checkout/review')} data-testid="go-review">Place Order</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutPayment;