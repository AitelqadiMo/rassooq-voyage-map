import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { products } from "@/data/mock-data";

const SellerShop = () => {
  const showcase = products.slice(0, 6);
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1">
        <div className="relative h-48 md:h-64 bg-gradient-hero">
          <img src="https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1400" className="w-full h-full object-cover opacity-70" />
          <div className="absolute inset-0 bg-black/20" />
          <div className="absolute bottom-4 left-4 text-white">
            <div className="flex items-center gap-3">
              <img src="https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=120" className="w-16 h-16 rounded-full border" />
              <div>
                <h1 className="text-2xl font-bold">TechWorld</h1>
                <p className="text-sm text-white/80">Leading electronics store on Rassooq</p>
              </div>
            </div>
          </div>
        </div>

        <section className="container mx-auto px-4 py-6">
          <Card>
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground">We bring you the best of consumer tech at unbeatable prices. From smartphones and audio gear to laptops and accessories, our curated catalog is updated weekly.</p>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-4 py-2">
          <ProductCarousel title="Featured Products" products={showcase} />
        </section>

        <section className="container mx-auto px-4 py-6 grid md:grid-cols-2 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="font-semibold mb-2">Promo Video</div>
              <div className="aspect-video bg-black/10 rounded" />
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-4">
              <div className="font-semibold mb-2">Lookbook</div>
              <Button variant="outline">Download PDF</Button>
            </CardContent>
          </Card>
        </section>

        <section className="container mx-auto px-4 py-6 grid md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="font-semibold mb-2">Follow Us</div>
              <div className="flex gap-2 text-sm text-muted-foreground">
                <a href="#" className="underline">Instagram</a>
                <a href="#" className="underline">Website</a>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2">
            <CardContent className="pt-4">
              <div className="font-semibold mb-2">Wholesale & Terms</div>
              <ul className="list-disc pl-5 text-sm text-muted-foreground">
                <li>Minimum order: 100 units</li>
                <li>Payment: Bank transfer or card</li>
                <li>Delivery: 3–7 days</li>
              </ul>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SellerShop;


