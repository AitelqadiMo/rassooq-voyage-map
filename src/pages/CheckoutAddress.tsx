import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";

const CheckoutAddress = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Delivery Address</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input placeholder="Full Name" />
              <Input placeholder="Phone Number" />
              <Input placeholder="Email" type="email" />
              <Input placeholder="Street Address" className="md:col-span-2" />
              <Input placeholder="City" />
              <Input placeholder="Region/State" />
              <Input placeholder="Postal Code" />
              <Input placeholder="Country" />
              <div className="flex items-center gap-2 md:col-span-2 mt-2">
                <Checkbox id="save" />
                <label htmlFor="save" className="text-sm">Save this address for future orders</label>
              </div>
            </div>
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={() => navigate('/cart')}>Back to Cart</Button>
              <Button onClick={() => navigate('/checkout/delivery')} data-testid="go-delivery">Continue to Delivery Options</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default CheckoutAddress;