import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AppContext";
import { AlertCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SellerInventory = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();

  if (currentRole !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="font-heading text-3xl font-bold text-foreground mb-8">Inventory Management</h1>
        <Card>
          <CardHeader><CardTitle className="flex items-center"><Package className="h-5 w-5 mr-2" />Stock Levels</CardTitle></CardHeader>
          <CardContent><div className="text-center py-12"><Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" /><h3 className="text-lg font-semibold mb-2">Inventory Dashboard</h3><p className="text-muted-foreground">Track and manage your product inventory levels.</p></div></CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
}; export default SellerInventory;