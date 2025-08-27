import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import React from "react";

const Checkout = () => {
  const navigate = useNavigate();
  const steps = ["Shipping", "Delivery", "Payment", "Review"];
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-3 mb-4">
              {steps.map((s, i) => (
                <React.Fragment key={s}>
                  <div className={`px-3 py-1 rounded-full text-xs ${i===0? 'bg-primary text-primary-foreground':'bg-muted text-muted-foreground'}`}>{s}</div>
                  {i<steps.length-1 && <div className="h-px flex-1 bg-border" />}
                </React.Fragment>
              ))}
            </div>
            <p className="text-muted-foreground">Start by entering your shipping information.</p>
            <Button className="mt-4" onClick={() => navigate('/checkout/address')} data-testid="go-address">Continue to Shipping</Button>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default Checkout;