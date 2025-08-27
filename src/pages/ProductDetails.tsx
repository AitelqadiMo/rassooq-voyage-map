import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QuantitySelector } from "@/components/ui/quantity-selector";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { products } from "@/data/mock-data";
import { 
  Heart, 
  Share2, 
  Star, 
  Truck, 
  Shield, 
  RotateCcw,
  ChevronLeft,
  Plus,
  Minus,
  ShoppingCart
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find product by ID (in real app, this would be an API call)
  const product = products.find(p => p.id === id) || products[0];

  // Mock multiple images for carousel
  const productImages = [
    product.image,
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=600&h=600&fit=crop",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=600&h=600&fit=crop"
  ];

  const relatedProducts = products.filter(p => p.id !== product.id).slice(0, 6);

  const handleAddToCart = () => {
    toast({
      title: "Added to Cart",
      description: `${quantity} × ${product.title} added to your cart`,
    });
  };

  const handleBuyNow = () => {
    toast({
      title: "Redirecting to Checkout",
      description: "Taking you to secure checkout...",
    });
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from Wishlist" : "Added to Wishlist",
      description: isWishlisted ? "Item removed from your wishlist" : "Item saved to your wishlist",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 glass-panel p-3 rounded-lg w-fit">
            <Link to="/" className="hover:text-primary transition-colors font-medium">Home</Link>
            <span>/</span>
            <Link to="/category/electronics" className="hover:text-primary transition-colors font-medium">Electronics</Link>
            <span>/</span>
            <span className="text-foreground font-semibold">{product.title}</span>
          </div>
        </div>

        <div className="container mx-auto px-4 pb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              {/* Main Image */}
              <div className="aspect-square overflow-hidden rounded-lg border bg-card">
                <img 
                  src={productImages[selectedImageIndex]} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              <div className="flex gap-2 overflow-x-auto pb-2">
                {productImages.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`
                      flex-none w-20 h-20 rounded-md overflow-hidden border-2 transition-colors
                      ${index === selectedImageIndex 
                        ? 'border-primary' 
                        : 'border-transparent hover:border-muted-foreground'
                      }
                    `}
                  >
                    <img 
                      src={image} 
                      alt={`Product view ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Brand & Title */}
              <div>
                <p className="text-sm text-muted-foreground font-medium mb-1">{product.brand}</p>
                <h1 className="text-2xl md:text-3xl font-bold leading-tight">{product.title}</h1>
              </div>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium ml-1">{product.rating}</span>
                  </div>
                  <span className="text-muted-foreground">({product.reviewCount} reviews)</span>
                </div>
                <div className="flex gap-2">
                  {product.badges?.map((badge, index) => (
                    <Badge key={index} variant="secondary">{badge}</Badge>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <span className="text-3xl font-bold text-primary">
                    AED {product.price}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        AED {product.originalPrice}
                      </span>
                      <Badge variant="destructive" className="text-sm">
                        -{product.discount}% OFF
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">Inclusive of VAT</p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Truck className="h-4 w-4 text-primary" />
                  <span>Free Delivery</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Shield className="h-4 w-4 text-primary" />
                  <span>2 Year Warranty</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <RotateCcw className="h-4 w-4 text-primary" />
                  <span>30-Day Returns</span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-4 border-t pt-6">
                <div className="flex items-center gap-4">
                  <span className="font-medium">Quantity:</span>
                  <QuantitySelector 
                    value={quantity} 
                    onChange={setQuantity}
                    max={10}
                  />
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handleAddToCart}
                    variant="outline" 
                    size="lg" 
                    className="flex-1"
                  >
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Add to Cart
                  </Button>
                  <Button 
                    onClick={handleBuyNow}
                    size="lg" 
                    className="flex-1"
                  >
                    Buy Now
                  </Button>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={handleWishlist}
                    className={isWishlisted ? "text-red-500" : ""}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-current" : ""}`} />
                    {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Details Tabs */}
          <div className="mt-12">
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="specifications">Specifications</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
                <TabsTrigger value="qa">Q&A</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="prose prose-sm max-w-none">
                      <p>
                        Experience premium audio quality with these state-of-the-art wireless headphones. 
                        Featuring advanced noise cancellation technology, premium drivers, and up to 30 hours 
                        of battery life, these headphones are perfect for music lovers and professionals alike.
                      </p>
                      <h4>Key Features:</h4>
                      <ul>
                        <li>Active Noise Cancellation (ANC)</li>
                        <li>Bluetooth 5.0 connectivity</li>
                        <li>30-hour battery life</li>
                        <li>Premium leather ear cushions</li>
                        <li>Touch controls</li>
                        <li>Built-in microphone for calls</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="specifications" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">Audio</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Driver Size:</span>
                            <span>40mm</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Frequency Response:</span>
                            <span>20Hz - 20kHz</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Impedance:</span>
                            <span>32 Ohm</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Connectivity</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Bluetooth:</span>
                            <span>5.0</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Range:</span>
                            <span>10 meters</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Codecs:</span>
                            <span>SBC, AAC, aptX</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Customer Reviews</h4>
                        <Button variant="outline" size="sm">Write a Review</Button>
                      </div>
                      
                      {/* Mock reviews */}
                      <div className="space-y-4">
                        {[1, 2, 3].map((_, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex">
                                {[...Array(5)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                              <span className="font-medium">Amazing quality!</span>
                            </div>
                            <p className="text-sm text-muted-foreground mb-1">by Ahmed K. • Verified Purchase</p>
                            <p className="text-sm">
                              Great sound quality and the noise cancellation works perfectly. 
                              Battery life is excellent as promised.
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="qa" className="mt-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold">Questions & Answers</h4>
                        <Button variant="outline" size="sm">Ask a Question</Button>
                      </div>
                      
                      {/* Mock Q&A */}
                      <div className="space-y-4">
                        {[1, 2].map((_, index) => (
                          <div key={index} className="border-b pb-4 last:border-b-0">
                            <div className="mb-2">
                              <p className="font-medium">Q: Does this support iOS devices?</p>
                              <p className="text-sm text-muted-foreground">Asked by Sarah M.</p>
                            </div>
                            <div>
                              <p className="text-sm">A: Yes, it's fully compatible with iOS, Android, and other Bluetooth devices.</p>
                              <p className="text-sm text-muted-foreground">Answered by TechSound Support</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Related Products */}
          <div className="mt-12">
            <ProductCarousel 
              title="Related Products" 
              products={relatedProducts}
              showArrows={false}
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetails;