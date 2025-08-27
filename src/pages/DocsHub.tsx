import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocsHub = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>24/7 Support</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Multilingual chat and ticketing.</p>
            <Button variant="outline">Open a Ticket</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Help Center & Academy</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Button variant="outline">Browse Articles</Button>
            <Button variant="outline">Enroll in Courses</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Blog & Videos</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Button variant="outline">Read Blog</Button>
            <Button variant="outline">Watch Tutorials</Button>
          </CardContent>
        </Card>
        <Card className="md:col-span-3">
          <CardHeader><CardTitle>API Docs & Marketplace</CardTitle></CardHeader>
          <CardContent className="space-y-2 text-sm">
            <p>Integrate your systems with Rassooq.</p>
            <div className="flex gap-2">
              <Button>API Documentation</Button>
              <Button variant="outline">App Marketplace</Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <Footer />
    </div>
  );
};

export default DocsHub;


