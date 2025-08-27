import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

const CheckoutDelivery = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Options</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup defaultValue="standard" className="space-y-3">
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="standard" id="standard" />
                  <Label htmlFor="standard">Standard Delivery (3–5 days)</Label>
                </div>
                <div className="text-sm font-medium">AED 15</div>
              </div>
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="express" id="express" />
                  <Label htmlFor="express">Express Delivery (1–2 days)</Label>
                </div>
                <div className="text-sm font-medium">AED 30</div>
              </div>
              <div className="flex items-center justify-between border rounded-lg p-3">
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="pickup" id="pickup" />
                  <Label htmlFor="pickup">Pickup Point</Label>
                </div>
                <div className="text-sm font-medium">Free</div>
              </div>
            </RadioGroup>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate('/checkout/address')}>Back</Button>
              <Button onClick={() => navigate('/checkout/payment')} data-testid="go-payment">Continue to Payment</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutDelivery;