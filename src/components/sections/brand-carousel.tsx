import { Card, CardContent } from "@/components/ui/card";
import { brands } from "@/data/mock-data";

export const BrandCarousel = () => {
  // Duplicate brands for infinite scroll effect
  const displayBrands = [...brands, ...brands];

  return (
    <section className="py-6 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-xl md:text-2xl font-bold text-center mb-6">
          Featured Brands
        </h2>
        
        <div className="overflow-hidden">
          <div className="flex animate-[scroll_20s_linear_infinite] gap-6">
            {displayBrands.map((brand, index) => (
              <Card 
                key={`${brand.id}-${index}`} 
                className="flex-none w-32 md:w-40 hover-lift cursor-pointer"
              >
                <CardContent className="p-4 flex items-center justify-center h-20">
                  <img 
                    src={brand.logo} 
                    alt={brand.name}
                    className="max-w-full max-h-full object-contain filter grayscale hover:grayscale-0 transition-all"
                  />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};