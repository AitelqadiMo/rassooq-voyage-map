import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ReturnsDashboard } from "@/components/seller/returns-dashboard";
import { useAuth } from "@/contexts/AppContext";
import { AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const SellerReturns = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();

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

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-display text-3xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                Returns Management
              </h1>
              <p className="text-muted-foreground">
                Manage customer returns and refund requests efficiently
              </p>
            </div>
          </div>
        </motion.div>

        <ReturnsDashboard />
      </main>
      <Footer />
    </div>
  );
}; export default SellerReturns;