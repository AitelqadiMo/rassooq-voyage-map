import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";

const ReturnRequest = () => {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const orderId = params.get('orderId');
  const [reason, setReason] = useState("");
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Card>
          <CardHeader>
            <CardTitle>Return Request {orderId ? `(Order #${orderId})` : ''}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <label className="text-sm font-medium">Reason</label>
              <Textarea value={reason} onChange={(e) => setReason(e.target.value)} placeholder="Describe the issue" />
              <div className="flex gap-2">
                <Button onClick={() => navigate(`/account/returns/${Math.floor(Math.random()*10000)}`)} data-testid="submit-return" disabled={!reason}>Submit</Button>
                <Button variant="outline" onClick={() => navigate(-1)}>Cancel</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default ReturnRequest;