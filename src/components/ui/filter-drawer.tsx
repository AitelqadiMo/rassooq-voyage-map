import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter, Star } from "lucide-react";
import { useState } from "react";

interface FilterDrawerProps {
  onFiltersChange?: (filters: any) => void;
}

export const FilterDrawer = ({ onFiltersChange }: FilterDrawerProps) => {
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [inStock, setInStock] = useState(false);
  const [freeDelivery, setFreeDelivery] = useState(false);

  const brands = ["Samsung", "Apple", "Nike", "Adidas", "TechSound", "FitTech"];
  const ratings = [5, 4, 3];

  const handleBrandChange = (brand: string, checked: boolean) => {
    setSelectedBrands(prev => 
      checked ? [...prev, brand] : prev.filter(b => b !== brand)
    );
  };

  const handleRatingChange = (rating: number, checked: boolean) => {
    setSelectedRatings(prev => 
      checked ? [...prev, rating] : prev.filter(r => r !== rating)
    );
  };

  const clearFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedBrands([]);
    setSelectedRatings([]);
    setInStock(false);
    setFreeDelivery(false);
  };

  const activeFiltersCount = selectedBrands.length + selectedRatings.length + 
    (inStock ? 1 : 0) + (freeDelivery ? 1 : 0) + 
    (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {activeFiltersCount > 0 && (
            <Badge variant="destructive" className="text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="flex items-center justify-between">
            Filters
            {activeFiltersCount > 0 && (
              <Button variant="ghost" size="sm" onClick={clearFilters}>
                Clear All
              </Button>
            )}
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-6 py-6">
          {/* Price Range */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Price Range</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Slider
                value={priceRange}
                onValueChange={setPriceRange}
                max={1000}
                step={10}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground">
                <span>AED {priceRange[0]}</span>
                <span>AED {priceRange[1]}</span>
              </div>
            </CardContent>
          </Card>

          {/* Brands */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Brands</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {brands.map((brand) => (
                <div key={brand} className="flex items-center space-x-2">
                  <Checkbox
                    id={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand, checked as boolean)
                    }
                  />
                  <label htmlFor={brand} className="text-sm font-medium">
                    {brand}
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Rating */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Customer Rating</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ratings.map((rating) => (
                <div key={rating} className="flex items-center space-x-2">
                  <Checkbox
                    id={`rating-${rating}`}
                    checked={selectedRatings.includes(rating)}
                    onCheckedChange={(checked) => 
                      handleRatingChange(rating, checked as boolean)
                    }
                  />
                  <label htmlFor={`rating-${rating}`} className="flex items-center text-sm">
                    <div className="flex items-center">
                      {[...Array(rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      ))}
                      {[...Array(5-rating)].map((_, i) => (
                        <Star key={i} className="h-3 w-3 text-muted-foreground" />
                      ))}
                    </div>
                    <span className="ml-2">& up</span>
                  </label>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Availability & Delivery */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">Availability & Delivery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center space-x-2">
                  <Checkbox
                    id="inStock"
                    checked={inStock}
                    onCheckedChange={(checked) => setInStock(checked as boolean)}
                  />
                <label htmlFor="inStock" className="text-sm font-medium">
                  In Stock
                </label>
              </div>
              <div className="flex items-center space-x-2">
                  <Checkbox
                    id="freeDelivery"
                    checked={freeDelivery}
                    onCheckedChange={(checked) => setFreeDelivery(checked as boolean)}
                  />
                <label htmlFor="freeDelivery" className="text-sm font-medium">
                  Free Delivery
                </label>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="border-t pt-4">
          <Button 
            className="w-full" 
            onClick={() => onFiltersChange?.({
              priceRange,
              brands: selectedBrands,
              ratings: selectedRatings,
              inStock,
              freeDelivery
            })}
          >
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};