import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";

interface CategoryCardProps {
  title: string;
  image: string;
  itemCount?: number;
  isNew?: boolean;
  onClick?: () => void;
  className?: string;
}

export const CategoryCard = ({
  title,
  image,
  itemCount,
  isNew,
  onClick,
  className
}: CategoryCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={cn("group cursor-pointer", className)}
      onClick={onClick}
    >
      <Card className="overflow-hidden border-0 shadow-card hover:shadow-floating transition-all duration-500 bg-gradient-card">
        <CardContent className="p-0">
          <div className="relative aspect-square overflow-hidden">
            {/* Image with Enhanced Hover Effect */}
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-500" />
            
            {/* Animated Particles on Hover */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-primary/60 rounded-full"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.3, 0.8, 0.3],
                  }}
                  transition={{
                    duration: 2 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 1,
                  }}
                />
              ))}
            </div>
            
            {/* Floating Action Icon */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              whileHover={{ opacity: 1, scale: 1, y: 0 }}
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300"
            >
              <div className="w-16 h-16 bg-primary/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow">
                <ArrowRight className="w-7 h-7 text-primary-foreground" />
              </div>
            </motion.div>
            
            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
              {isNew && (
                <Badge className="bg-tertiary text-tertiary-foreground border-0 shadow-medium animate-pulse px-3 py-1">
                  New
                </Badge>
              )}
            </div>
            
            {/* Item Count */}
            {itemCount && (
              <Badge 
                variant="secondary" 
                className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm text-foreground border-0 shadow-medium px-3 py-1"
              >
                {itemCount.toLocaleString()} items
              </Badge>
            )}
            
            {/* Category Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
              <motion.h3 
                className="font-display text-2xl font-bold text-white group-hover:text-primary-glow transition-colors duration-300 mb-2"
                whileHover={{ x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {title}
              </motion.h3>
              <motion.p 
                className="text-white/80 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ y: 10 }}
                whileHover={{ y: 0 }}
              >
                Explore Collection
              </motion.p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};