import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { FuturisticHero } from "@/components/ui/futuristic-hero";
import { CategoryGrid } from "@/components/ui/category-grid";
import { FloatingCart } from "@/components/ui/floating-cart";
import { ProductCarousel } from "@/components/sections/product-carousel";
import { motion } from "framer-motion";
import { SouqPlusPromo } from "@/components/sections/souq-plus-promo";
import { BrandCarousel } from "@/components/sections/brand-carousel";
import { categories, products, heroBanners } from "@/data/mock-data";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, TrendingUp, Award } from "lucide-react";

const Index = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [cartItems, setCartItems] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const navigate = useNavigate();
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Filter products for different sections
  const newArrivals = products.slice(0, 8);
  const bestSellers = products.filter(p => p.badges?.includes("Best Seller") || p.badges?.includes("Bestseller")).slice(0, 8);
  const featuredProducts = products.slice(8, 16);

  // Parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-rotate hero banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % heroBanners.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      
      {/* Full-Screen Immersive Hero */}
      <section 
        ref={heroRef}
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.5}px)`,
        }}
      >
        {/* Dynamic Background with Mesh Gradient */}
        <div className="absolute inset-0 bg-gradient-mesh opacity-90" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-secondary/20" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center max-w-6xl mx-auto px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold text-foreground mb-8 leading-none">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                RASSOOQ
              </span>
            </h1>
            <p className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 font-light leading-relaxed">
              The Future of Shopping
              <br />
              <span className="text-primary font-medium">Discover • Experience • Transcend</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Button 
              size="lg"
              onClick={() => navigate('/categories')}
              className="bg-gradient-primary border-0 text-primary-foreground px-12 py-4 text-lg font-semibold rounded-2xl hover-premium shadow-premium"
            >
              Explore Collection
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              onClick={() => navigate('/plus')}
              className="glass-card border-primary/20 text-primary px-12 py-4 text-lg font-semibold rounded-2xl hover:bg-primary/10 hover:scale-105 transition-spring"
            >
              Join Rassooq+
              <Sparkles className="ml-2 h-5 w-5" />
            </Button>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-primary/40 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-primary rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      <main className="relative z-10 bg-background">
        {/* Immersive Categories Section */}
        <motion.section 
          className="py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Explore Our Universe
            </h2>
            <p className="text-xl text-muted-foreground">
              Curated collections for every desire
            </p>
          </div>
          <CategoryGrid 
            categories={categories}
            onCategoryClick={(categoryId) => navigate(`/c/${categoryId}`)}
          />
        </motion.section>

        {/* New Arrivals with Enhanced Visuals */}
        <motion.section 
          className="py-24 bg-gradient-subtle"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-tertiary/10 text-tertiary px-6 py-3 rounded-full mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Just Launched</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Fresh Arrivals
              </h2>
              <p className="text-xl text-muted-foreground">
                The latest additions to our premium collection
              </p>
            </div>
            <ProductCarousel
              title=""
              products={newArrivals}
            />
          </div>
        </motion.section>

        {/* Rassooq+ Premium Section */}
        <motion.section 
          className="py-24"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <SouqPlusPromo />
        </motion.section>

        {/* Best Sellers */}
        {bestSellers.length > 0 && (
          <motion.section 
            className="py-24 bg-gradient-subtle"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="container mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full mb-4">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">Customer Favorites</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                  Best Sellers
                </h2>
                <p className="text-xl text-muted-foreground">
                  Loved by thousands, chosen by you
                </p>
              </div>
              <ProductCarousel
                title=""
                products={bestSellers}
              />
            </div>
          </motion.section>
        )}

        {/* Featured Products */}
        <motion.section 
          className="py-24"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-secondary/10 text-secondary px-6 py-3 rounded-full mb-4">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Handpicked</span>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
                Editor's Choice
              </h2>
              <p className="text-xl text-muted-foreground">
                Specially curated products that define excellence
              </p>
            </div>
            <ProductCarousel
              title=""
              products={featuredProducts}
            />
          </div>
        </motion.section>

        {/* Brand Showcase */}
        <motion.section 
          className="py-24 bg-gradient-subtle"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Premium Partners
            </h2>
            <p className="text-xl text-muted-foreground">
              Collaborating with the world's finest brands
            </p>
          </div>
          <BrandCarousel />
        </motion.section>
      </main>
      
      {/* Enhanced Floating Cart */}
      <FloatingCart 
        itemCount={cartItems}
        onCartClick={() => navigate('/cart')}
      />
      
      <Footer />
    </div>
  );
};

export default Index;
