import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useCart, useWishlist } from "@/contexts/AppContext";

interface ProductCardProps {
  id: string;
  title: string;
  brand: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  discount?: number;
  isFlashSale?: boolean;
  badges?: string[];
  className?: string;
}

export const ProductCard = ({
  id,
  title,
  brand,
  price,
  originalPrice,
  rating,
  reviewCount,
  image,
  discount,
  isFlashSale,
  badges = [],
  className
}: ProductCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, isInWishlist, removeFromWishlist } = useWishlist();
  const wishlisted = isInWishlist(id || title);

  return (
    <Card className={cn(
      "group cursor-pointer hover-float overflow-hidden bg-gradient-card glass-card border-0",
      isFlashSale && "ring-2 ring-flash/50 shadow-glow",
      className
    )}>
      <CardContent className="p-0">
        {/* Image Section */}
        <div className="relative aspect-square overflow-hidden" onClick={() => navigate(`/p/${encodeURIComponent(title.toLowerCase().replace(/\s+/g, '-') )}`)}>
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-elegant duration-700"
          />
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-elegant" />
          
          {/* Discount Badge */}
          {discount && (
            <Badge 
              variant={isFlashSale ? "default" : "destructive"}
              className={cn(
                "absolute top-3 left-3 text-xs font-bold shadow-medium backdrop-blur-sm",
                isFlashSale && "bg-gradient-flash text-flash-foreground animate-flash shadow-glow"
              )}
            >
              -{discount}%
            </Badge>
          )}
          
          {/* Other Badges */}
          {badges.length > 0 && (
            <div className="absolute top-3 right-3 flex flex-col gap-1">
              {badges.map((badge, index) => (
                <Badge key={index} variant="secondary" className="text-xs glass-panel">
                  {badge}
                </Badge>
              ))}
            </div>
          )}
          
          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-3 right-3 h-9 w-9 rounded-full glass-card hover:glass-premium opacity-0 group-hover:opacity-100 transition-elegant hover:scale-110"
            onClick={(e) => { e.stopPropagation(); wishlisted ? removeFromWishlist(id || title) : addToWishlist(id || title); }}
          >
            <Heart className={cn("h-4 w-4 transition-colors", wishlisted && "fill-red-500 text-red-500")} />
          </Button>
          
          {/* Quick Add to Cart */}
          <Button
            variant="default"
            size="sm"
            className="absolute bottom-3 left-3 right-3 opacity-0 group-hover:opacity-100 transition-elegant bg-gradient-primary hover:shadow-glow font-semibold hover:scale-[1.02]"
            onClick={(e) => { e.stopPropagation(); addToCart({ id: id || title, title, price, image }); }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
        
        {/* Content Section */}
        <div className="p-4 space-y-2">
          {/* Brand */}
          <p className="text-sm text-muted-foreground font-medium tracking-wide">{brand}</p>
          
          {/* Title */}
          <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-primary transition-colors min-h-[2.5rem]">
            {title}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{rating}</span>
            </div>
            <span className="text-xs text-muted-foreground">({reviewCount.toLocaleString()})</span>
          </div>
          
          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-bold text-lg text-primary">
              MAD {price.toLocaleString()}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                MAD {originalPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
