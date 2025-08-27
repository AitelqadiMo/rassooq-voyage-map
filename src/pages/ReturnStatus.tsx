import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Clock, RefreshCw, CheckCircle2, XCircle } from "lucide-react";

const ReturnStatus = () => {
  const { returnId } = useParams();
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Return #{returnId}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Received</Badge>
                <Badge variant="secondary"><RefreshCw className="h-3 w-3 mr-1" /> QC in progress</Badge>
                <Badge variant="secondary"><CheckCircle2 className="h-3 w-3 mr-1" /> Refunded</Badge>
              </div>
              <p className="text-sm text-muted-foreground">We will notify you once the refund is processed.</p>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnStatus;