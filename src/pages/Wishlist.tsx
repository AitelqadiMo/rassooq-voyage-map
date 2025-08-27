import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useWishlist, useCart } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleAddToCart = (id: string) => {
    // Mock product info from id for demo
    addToCart({ id, title: id, price: 99, image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" });
    removeFromWishlist(id);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-4">Wishlist</h1>
        {items.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-3xl mb-2">💔</div>
            <p className="text-muted-foreground mb-4">Your wishlist is empty. Start exploring and add products you love.</p>
            <Button onClick={()=>navigate('/c/electronics')}>Browse Categories</Button>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {items.map(id => (
              <Card key={id}>
                <CardContent className="p-3">
                  <img src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop" alt="" className="rounded mb-2" />
                  <div className="font-medium text-sm mb-2 truncate">{id}</div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={()=>handleAddToCart(id)}>Add to Cart</Button>
                    <Button size="sm" variant="outline" onClick={()=>removeFromWishlist(id)}>Remove</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;


