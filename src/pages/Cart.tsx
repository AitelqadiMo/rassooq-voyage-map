import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { Badge } from "@/components/ui/badge";
import { mockCartItems } from "@/data/extended-mock-data";
import { 
  Trash2, 
  Heart, 
  Tag, 
  Truck, 
  Clock,
  ShoppingBag,
  ArrowRight
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Cart = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState(mockCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const savings = cartItems.reduce((sum, item) => {
    if (item.originalPrice) {
      return sum + ((item.originalPrice - item.price) * item.quantity);
    }
    return sum;
  }, 0);
  
  const promoDiscount = appliedPromo ? 25 : 0; // Mock discount
  const deliveryFee = subtotal > 100 ? 0 : 15;
  const total = subtotal - promoDiscount + deliveryFee;

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart",
    });
  };

  const handleMoveToWishlist = (itemId: string) => {
    handleRemoveItem(itemId);
    toast({
      title: "Moved to Wishlist",
      description: "Item has been moved to your wishlist",
    });
  };

  const handleApplyPromo = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo(promoCode);
      toast({
        title: "Promo Code Applied!",
        description: "You saved AED 25 with code WELCOME10",
      });
    } else {
      toast({
        title: "Invalid Promo Code",
        description: "Please check your promo code and try again",
        variant: "destructive"
      });
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center max-w-md mx-auto px-4">
            <ShoppingBag className="h-24 w-24 mx-auto text-muted-foreground mb-6" />
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">
              Start shopping to add items to your cart
            </p>
            <Link to="/">
              <Button size="lg">
                Continue Shopping
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <span className="text-foreground">Shopping Cart</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold">Shopping Cart</h1>
                <span className="text-muted-foreground">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {/* Delivery Info */}
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Truck className="h-4 w-4 text-primary" />
                    <span>
                      {deliveryFee === 0 
                        ? "🎉 You qualify for FREE delivery!" 
                        : `Add AED ${(100 - subtotal).toFixed(0)} more for FREE delivery`
                      }
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Cart Items List */}
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <Card key={item.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <div className="w-20 h-20 flex-none">
                          <img 
                            src={item.image} 
                            alt={item.title}
                            className="w-full h-full object-cover rounded-md"
                          />
                        </div>

                        {/* Product Info */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-medium text-sm mb-1 line-clamp-2">
                            {item.title}
                          </h3>
                          <p className="text-xs text-muted-foreground mb-2">
                            {item.brand}
                          </p>
                          
                          {/* Stock Status */}
                          <div className="flex items-center gap-2 mb-3">
                            {item.inStock ? (
                              <Badge variant="default" className="text-xs">
                                <Clock className="h-3 w-3 mr-1" />
                                In Stock
                              </Badge>
                            ) : (
                              <Badge variant="destructive" className="text-xs">
                                Out of Stock
                              </Badge>
                            )}
                            {item.discount && (
                              <Badge variant="secondary" className="text-xs">
                                {item.discount}% OFF
                              </Badge>
                            )}
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-3">
                            <button 
                              onClick={() => handleRemoveItem(item.id)}
                              className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1"
                            >
                              <Trash2 className="h-3 w-3" />
                              Remove
                            </button>
                            <button 
                              onClick={() => handleMoveToWishlist(item.id)}
                              className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1"
                            >
                              <Heart className="h-3 w-3" />
                              Move to Wishlist
                            </button>
                          </div>
                        </div>

                        {/* Price & Quantity */}
                        <div className="text-right space-y-3">
                          <div>
                            <div className="font-bold text-primary">
                              AED {item.price}
                            </div>
                            {item.originalPrice && (
                              <div className="text-xs text-muted-foreground line-through">
                                AED {item.originalPrice}
                              </div>
                            )}
                          </div>

                          <QuantitySelector
                            value={item.quantity}
                            onChange={(qty) => handleQuantityChange(item.id, qty)}
                            size="sm"
                          />

                          <div className="text-sm font-medium">
                            Total: AED {(item.price * item.quantity).toFixed(0)}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="space-y-4">
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={!!appliedPromo}
                      />
                      {!appliedPromo && (
                        <Button 
                          variant="outline" 
                          onClick={handleApplyPromo}
                          disabled={!promoCode}
                        >
                          Apply
                        </Button>
                      )}
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center gap-2 text-sm text-green-600">
                        <Tag className="h-4 w-4" />
                        <span>Code {appliedPromo} applied</span>
                        <button 
                          onClick={() => setAppliedPromo(null)}
                          className="text-muted-foreground hover:text-foreground"
                        >
                          Remove
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="border-t pt-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Subtotal ({cartItems.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                      <span>AED {subtotal.toFixed(0)}</span>
                    </div>
                    
                    {savings > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>You saved</span>
                        <span>-AED {savings.toFixed(0)}</span>
                      </div>
                    )}
                    
                    {appliedPromo && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Promo discount</span>
                        <span>-AED {promoDiscount}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between text-sm">
                      <span>Delivery fee</span>
                      <span>
                        {deliveryFee === 0 ? (
                          <span className="text-green-600">FREE</span>
                        ) : (
                          `AED ${deliveryFee}`
                        )}
                      </span>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>AED {total.toFixed(0)}</span>
                    </div>
                  </div>

                  <Link to="/checkout" className="block">
                    <Button size="lg" className="w-full">
                      Proceed to Checkout
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>

                  <Link to="/" className="block">
                    <Button variant="outline" className="w-full">
                      Continue Shopping
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Cart;