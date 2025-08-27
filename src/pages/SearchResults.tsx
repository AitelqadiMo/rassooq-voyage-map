import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { ProductCard } from "@/components/ui/product-card";
import { FilterDrawer } from "@/components/ui/filter-drawer";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { products } from "@/data/mock-data";
import { Grid, List, Search } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [viewMode, setViewMode] = useState<"grid" | "list">((new URLSearchParams(location.search).get('view') as any) || "grid");
  const [sortBy, setSortBy] = useState(new URLSearchParams(location.search).get('sort') || "relevance");

  // Filter products by search query (basic mock implementation)
  const filteredProducts = products.filter(product => 
    product.title.toLowerCase().includes(query.toLowerCase()) ||
    product.brand.toLowerCase().includes(query.toLowerCase())
  );
  
  const sortOptions = [
    { value: "relevance", label: "Relevance" },
    { value: "price-low", label: "Price: Low to High" },
    { value: "price-high", label: "Price: High to Low" },
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Customer Rating" },
    { value: "bestseller", label: "Best Sellers" },
  ];

  const handleFiltersChange = (filters: any) => {
    const next = new URLSearchParams(location.search);
    next.set('brands', filters.brands.join(','));
    next.set('ratings', filters.ratings.join(','));
    next.set('inStock', String(filters.inStock));
    next.set('freeDelivery', String(filters.freeDelivery));
    next.set('price', `${filters.priceRange[0]}-${filters.priceRange[1]}`);
    window.history.replaceState(null, '', `?${next.toString()}`);
  };

  useEffect(() => {
    const next = new URLSearchParams(location.search);
    next.set('view', viewMode);
    next.set('sort', sortBy);
    window.history.replaceState(null, '', `?${next.toString()}`);
  }, [viewMode, sortBy]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          {/* Search Results Header */}
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <span>Home</span>
              <span>/</span>
              <span className="text-foreground">Search Results</span>
            </div>
            
            <div className="flex items-center gap-3 mb-2">
              <Search className="h-5 w-5 text-muted-foreground" />
              <h1 className="text-2xl md:text-3xl font-bold">
                Search results for "{query}"
              </h1>
            </div>
            
            <p className="text-muted-foreground">
              {filteredProducts.length} products found
            </p>

            {/* Did you mean / suggestions */}
            {filteredProducts.length === 0 && (
              <div className="mt-4 p-4 bg-muted/50 rounded-lg">
                <h3 className="font-medium mb-2">No results found</h3>
                <p className="text-sm text-muted-foreground mb-3">
                  Try different keywords or check out these popular categories:
                </p>
                <div className="flex flex-wrap gap-2">
                  {["Electronics", "Fashion", "Beauty", "Home"].map((category) => (
                    <Button key={category} variant="outline" size="sm">
                      {category}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {filteredProducts.length > 0 && (
            <>
              {/* Filters & Sort Bar */}
              <div className="flex items-center justify-between mb-6 p-4 bg-card rounded-lg border">
                <div className="flex items-center gap-4">
                  <FilterDrawer onFiltersChange={handleFiltersChange} />
                  
                  <div className="hidden md:flex items-center gap-2">
                    <span className="text-sm font-medium">Sort by:</span>
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Mobile Sort */}
                  <div className="md:hidden">
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-32">
                        <SelectValue placeholder="Sort" />
                      </SelectTrigger>
                      <SelectContent>
                        {sortOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* View Toggle */}
                  <div className="hidden md:flex border rounded-md">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none"
                    >
                      <Grid className="h-4 w-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none"
                    >
                      <List className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              {viewMode === "grid" ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} {...product} />
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProducts.map((product) => (
                    <div key={product.id} className="flex gap-4 p-4 bg-card rounded-lg border">
                      <div className="w-24 h-24 flex-none">
                        <img 
                          src={product.image} 
                          alt={product.title}
                          className="w-full h-full object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm mb-1 line-clamp-2">
                          {product.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mb-2">
                          {product.brand}
                        </p>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-bold text-primary">
                            AED {product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-xs text-muted-foreground line-through">
                              AED {product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Button size="sm">Add to Cart</Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Load More */}
              <div className="flex justify-center mt-8">
                <Button variant="outline" size="lg">
                  Load More Results
                </Button>
              </div>
            </>
          )}

          {/* Popular Searches */}
          <div className="mt-12">
            <h3 className="font-semibold mb-4">Popular Searches</h3>
            <div className="flex flex-wrap gap-2">
              {["iPhone", "Samsung Galaxy", "Nike Shoes", "Coffee", "Skincare", "Laptop"].map((term) => (
                <Button key={term} variant="outline" size="sm">
                  {term}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default SearchResults;