import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Crown, Shield, Zap } from "lucide-react";

export const SouqPlusPromo = () => {
  const benefits = [
    {
      icon: Truck,
      title: "Free Delivery",
      description: "On orders above AED 50"
    },
    {
      icon: Crown,
      title: "Exclusive Deals",
      description: "Member-only discounts"
    },
    {
      icon: Shield,
      title: "Extended Returns",
      description: "60-day return policy"
    },
    {
      icon: Zap,
      title: "Priority Support",
      description: "24/7 premium support"
    }
  ];

  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-gradient-hero text-white overflow-hidden relative">
          <CardContent className="p-6 md:p-8">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <Badge variant="secondary" className="mb-4 bg-white/20 text-white">
                  Premium Membership
                </Badge>
                <h2 className="font-display text-2xl md:text-3xl font-bold mb-4">
                  Join Souq+ Today
                </h2>
                <p className="text-lg mb-6 text-white/90">
                  Unlock exclusive benefits and save more on every order
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button variant="outline" size="lg" className="bg-white text-primary hover:bg-white/90">
                    Start Free Trial
                  </Button>
                  <Button variant="ghost" size="lg" className="text-white border-white/30">
                    Learn More
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex flex-col items-center text-center p-4 bg-white/10 rounded-lg backdrop-blur-sm">
                    <benefit.icon className="h-8 w-8 mb-2" />
                    <h3 className="font-semibold text-sm mb-1">{benefit.title}</h3>
                    <p className="text-xs text-white/80">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};