import { motion } from "framer-motion";
import { CategoryCard } from "@/components/ui/category-card";
import { ChevronRight, Sparkles } from "lucide-react";

interface Category {
  id: string;
  title: string;
  image: string;
  itemCount: number;
}

interface CategoryGridProps {
  categories: Category[];
  onCategoryClick: (categoryId: string) => void;
}

export const CategoryGrid = ({ categories, onCategoryClick }: CategoryGridProps) => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
      
      <div className="container mx-auto px-6 relative z-10">
        {/* Enhanced Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <motion.div
            className="inline-flex items-center gap-3 glass-premium px-6 py-3 rounded-full text-sm font-semibold mb-8 shadow-floating"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="bg-gradient-primary bg-clip-text text-transparent">Curated Collections</span>
          </motion.div>

          <motion.h2 
            className="font-display text-5xl md:text-7xl font-bold mb-6 leading-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              Explore Our
            </span>
            <br />
            <span className="text-foreground">Universe</span>
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            Discover thousands of premium products across our carefully curated categories
          </motion.p>
        </motion.div>

        {/* Enhanced Categories Grid */}
        <motion.div 
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: {},
            visible: {
              transition: {
                staggerChildren: 0.15
              }
            }
          }}
        >
          {categories.slice(0, 12).map((category, index) => (
            <motion.div
              key={category.id}
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.8 },
                visible: { opacity: 1, y: 0, scale: 1 }
              }}
              transition={{ 
                duration: 0.7, 
                ease: [0.25, 0.46, 0.45, 0.94],
                type: "spring",
                stiffness: 100
              }}
              className="group relative"
            >
              <CategoryCard
                title={category.title}
                image={category.image}
                itemCount={category.itemCount}
                isNew={index < 2}
                onClick={() => onCategoryClick(category.id)}
                className="h-full"
              />

              {/* Ranking Badge for Top Categories */}
              {index < 3 && (
                <motion.div
                  className="absolute -top-3 -right-3 z-20"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ 
                    delay: 1 + index * 0.2,
                    type: "spring",
                    stiffness: 200
                  }}
                >
                  <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center shadow-glow border-2 border-background">
                    <span className="text-xs font-bold text-primary-foreground">{index + 1}</span>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Enhanced CTA Section */}
        <motion.div
          className="text-center mt-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <motion.button
            className="group inline-flex items-center gap-4 glass-premium px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-glow transition-all duration-300 hover:scale-105 border border-primary/20"
            whileHover={{ 
              backgroundImage: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)))",
              color: "hsl(var(--primary-foreground))"
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>Discover All Categories</span>
            <motion.div
              whileHover={{ x: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <ChevronRight className="w-5 h-5" />
            </motion.div>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};