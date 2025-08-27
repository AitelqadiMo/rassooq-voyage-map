import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface HeroBannerProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonVariant?: "default" | "hero" | "flash" | "outline";
  image: string;
  onButtonClick?: () => void;
  className?: string;
}

export const HeroBanner = ({
  title,
  subtitle,
  buttonText,
  buttonVariant = "hero",
  image,
  onButtonClick,
  className
}: HeroBannerProps) => {
  return (
    <Card className={cn("overflow-hidden shadow-large hover-premium group", className)}>
      <CardContent className="p-0">
        <div className="relative h-56 md:h-72 lg:h-96 overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-elegant duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/20" />
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
          
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-2xl text-white space-y-4">
                <h1 className="font-display text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
                  {title}
                </h1>
                {subtitle && (
                  <p className="text-lg md:text-xl lg:text-2xl text-white/90 font-medium leading-relaxed">
                    {subtitle}
                  </p>
                )}
                {buttonText && (
                  <Button 
                    variant={buttonVariant}
                    size="lg"
                    onClick={onButtonClick}
                    className="font-semibold text-lg px-8 py-3 mt-6 hover-glow transition-spring hover:scale-105 shadow-large"
                  >
                    {buttonText}
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};