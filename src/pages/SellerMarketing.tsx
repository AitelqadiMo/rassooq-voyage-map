import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SellerMarketing = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 space-y-4">
        <Card>
          <CardHeader><CardTitle>Image Auto-Enhancement</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Input type="file" multiple />
            <Button>Enhance Images</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>SEO Settings</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <Input placeholder="Meta Title" />
            <Input placeholder="Meta Keywords" />
            <Textarea placeholder="Meta Description" className="md:col-span-2" />
            <Button className="md:col-span-2">Generate Sitemap</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Email Campaigns</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <Input placeholder="Campaign Name" />
            <Input placeholder="Audience Segment" />
            <Input placeholder="Schedule (YYYY-MM-DD)" />
            <Textarea placeholder="Email Content" className="md:col-span-3" />
            <Button className="md:col-span-3">Schedule Campaign</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Ad Manager Integration</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            <Input placeholder="Facebook Ads Account ID" />
            <Input placeholder="Google Ads Account ID" />
            <Button>Connect</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Analytics Dashboard</CardTitle></CardHeader>
          <CardContent className="text-sm text-muted-foreground">KPIs and charts coming soon.</CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default SellerMarketing;


