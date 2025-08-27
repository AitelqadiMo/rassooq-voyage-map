import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

interface FuturisticHeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  image: string;
  onButtonClick?: () => void;
}

export const FuturisticHero = ({
  title,
  subtitle,
  buttonText,
  image,
  onButtonClick
}: FuturisticHeroProps) => {
  return (
    <motion.div 
      className="relative h-[70vh] md:h-[80vh] overflow-hidden rounded-3xl shadow-large group"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Background Image with Parallax Effect */}
      <motion.div 
        className="absolute inset-0"
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover"
        />
      </motion.div>
      
      {/* Futuristic Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-mesh opacity-40" />
      
      {/* Animated Grid Pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg width="100%" height="100%" className="w-full h-full">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" opacity="0.3"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container mx-auto px-6 md:px-8">
          <motion.div 
            className="max-w-3xl text-white space-y-6"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Floating Badge */}
            <motion.div
              className="inline-flex items-center gap-2 glass-premium px-4 py-2 rounded-full text-sm font-medium"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <Sparkles className="w-4 h-4 text-primary" />
              Premium Shopping Experience
            </motion.div>

            <motion.h1 
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {title}
            </motion.h1>
            
            {subtitle && (
              <motion.p 
                className="text-xl md:text-2xl lg:text-3xl text-white/90 font-medium leading-relaxed max-w-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                {subtitle}
              </motion.p>
            )}
            
            {buttonText && (
              <motion.div
                className="flex flex-col sm:flex-row gap-4 pt-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Button 
                  size="lg"
                  onClick={onButtonClick}
                  className="glass-premium hover:shadow-glow transition-spring hover:scale-105 text-lg px-8 py-4 h-auto font-semibold group"
                >
                  {buttonText}
                  <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-smooth" />
                </Button>
                
                <Button 
                  variant="outline"
                  size="lg"
                  className="glass-card hover:glass-premium transition-spring text-lg px-8 py-4 h-auto font-medium border-white/20 text-white hover:text-white"
                >
                  Explore Categories
                </Button>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/20 to-transparent" />
    </motion.div>
  );
};