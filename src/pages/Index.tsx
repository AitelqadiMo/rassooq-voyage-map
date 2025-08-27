import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
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
  const trendingProducts = products.slice(16, 24);
  const topCategories = categories.slice(0, 6);

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
      
      {/* Full-Width Immersive Hero Banner */}
      <section 
        ref={heroRef}
        className="relative h-screen w-full flex items-center overflow-hidden"
        style={{
          transform: `translateY(${scrollY * 0.3}px)`,
        }}
      >
        {/* Dynamic Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-orange-500 to-yellow-400 opacity-90" />
        <div className="absolute inset-0 bg-gradient-mesh opacity-60" />
        
        {/* Animated Wave Patterns */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute inset-0 opacity-30"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              backgroundImage: `radial-gradient(circle at 20% 80%, hsl(var(--primary)) 0%, transparent 50%),
                                radial-gradient(circle at 80% 20%, hsl(var(--secondary)) 0%, transparent 50%),
                                radial-gradient(circle at 40% 40%, hsl(var(--accent)) 0%, transparent 50%)`,
              backgroundSize: "400% 400%",
            }}
          />
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-white/20 rounded-full blur-sm"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-50, -100, -50],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.8, 1.2, 0.8],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 4,
              }}
            />
          ))}
        </div>

        {/* Hero Content - Left Aligned */}
        <div className="relative z-10 w-full">
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <motion.div
              className="max-w-4xl text-white"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
            >
              <motion.div
                className="inline-flex items-center gap-3 glass-premium px-6 py-3 rounded-full text-sm font-semibold mb-8"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Sparkles className="w-5 h-5 text-orange-300" />
                <span>Premium Marketplace Experience</span>
              </motion.div>

              <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-none">
                <span className="bg-gradient-to-r from-white via-orange-200 to-yellow-300 bg-clip-text text-transparent">
                  RASSOOQ
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl lg:text-4xl font-light mb-12 leading-relaxed max-w-3xl">
                Where <span className="font-semibold text-orange-300">Innovation</span> meets{" "}
                <span className="font-semibold text-yellow-300">Commerce</span>
                <br />
                <span className="text-white/80 text-xl md:text-2xl">Discover • Experience • Transcend</span>
              </p>

              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.8 }}
              >
                <Button 
                  size="lg"
                  onClick={() => navigate('/categories')}
                  className="glass-premium hover:bg-white/30 hover:shadow-glow text-white border-white/20 px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-105 group"
                >
                  Explore Collection
                  <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  size="lg"
                  variant="outline"
                  onClick={() => navigate('/plus')}
                  className="glass-card border-white/30 text-white hover:bg-white/10 px-12 py-6 text-xl font-semibold rounded-2xl transition-all duration-500 hover:scale-105"
                >
                  Join Rassooq+
                  <Sparkles className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 15, 0] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <div className="w-8 h-12 border-2 border-white/40 rounded-full flex justify-center backdrop-blur-sm">
            <motion.div 
              className="w-2 h-4 bg-white/80 rounded-full mt-3"
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </section>

      <main className="relative z-10 bg-background w-full">
        {/* Category Highlights - Full Width */}
        <motion.section 
          className="py-24 w-full bg-gradient-to-br from-background via-primary/5 to-secondary/5"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <motion.div 
              className="text-center mb-20"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-3 glass-premium px-6 py-3 rounded-full text-sm font-semibold mb-8">
                <Sparkles className="w-5 h-5 text-primary" />
                <span>Discover Categories</span>
              </div>
              <h2 className="font-display text-5xl md:text-7xl font-bold mb-6">
                <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Shop by Style
                </span>
              </h2>
              <p className="text-xl md:text-2xl text-muted-foreground max-w-4xl mx-auto">
                Curated collections designed for your lifestyle
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
              {topCategories.map((category, index) => (
                <motion.div
                  key={category.id}
                  className="group cursor-pointer"
                  initial={{ opacity: 0, y: 60, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ 
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "easeOut"
                  }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8, scale: 1.05 }}
                  onClick={() => navigate(`/c/${category.id}`)}
                >
                  <div className="glass-premium p-8 rounded-3xl hover:shadow-glow transition-all duration-500 border border-white/10 backdrop-blur-lg">
                    <div className="relative mb-6 overflow-hidden rounded-2xl">
                      <img 
                        src={category.image} 
                        alt={category.title}
                        className="w-full h-32 object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    </div>
                    <h3 className="font-semibold text-lg text-center mb-2">{category.title}</h3>
                    <p className="text-sm text-muted-foreground text-center">{category.itemCount} items</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* Trending Products - Full Width */}
        <motion.section 
          className="py-24 w-full bg-gradient-subtle"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 text-orange-600 px-6 py-3 rounded-full mb-4">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">Trending Now</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
                What's Hot
              </h2>
              <p className="text-xl text-muted-foreground">
                Discover what everyone's talking about
              </p>
            </div>
            <ProductCarousel
              title=""
              products={trendingProducts}
            />
          </div>
        </motion.section>

        {/* Featured Brands - Full Width Glassmorphic Strip */}
        <motion.section 
          className="py-24 w-full relative overflow-hidden"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="absolute inset-0 bg-gradient-mesh opacity-30" />
          <div className="max-w-7xl mx-auto px-8 lg:px-12 relative z-10">
            <div className="text-center mb-16">
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
                Official Stores
              </h2>
              <p className="text-xl text-muted-foreground">
                Shop directly from premium brands
              </p>
            </div>
            <BrandCarousel />
          </div>
        </motion.section>

        {/* New Arrivals */}
        <motion.section 
          className="py-24 w-full bg-gradient-subtle"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-tertiary/10 text-tertiary px-6 py-3 rounded-full mb-4">
                <Sparkles className="h-5 w-5" />
                <span className="font-semibold">Just Launched</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
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

        {/* Rassooq+ Premium Section - Full Width */}
        <motion.section 
          className="py-24 w-full"
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
            className="py-24 w-full bg-gradient-subtle"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="max-w-7xl mx-auto px-8 lg:px-12">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-3 bg-primary/10 text-primary px-6 py-3 rounded-full mb-4">
                  <Award className="h-5 w-5" />
                  <span className="font-semibold">Customer Favorites</span>
                </div>
                <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
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

        {/* Personalized Recommendations */}
        <motion.section 
          className="py-24 w-full"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="max-w-7xl mx-auto px-8 lg:px-12">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 bg-secondary/10 text-secondary px-6 py-3 rounded-full mb-4">
                <TrendingUp className="h-5 w-5" />
                <span className="font-semibold">For You</span>
              </div>
              <h2 className="font-display text-5xl md:text-6xl font-bold text-foreground mb-4">
                Recommended
              </h2>
              <p className="text-xl text-muted-foreground">
                Specially curated products based on your preferences
              </p>
            </div>
            <ProductCarousel
              title=""
              products={featuredProducts}
            />
          </div>
        </motion.section>
      </main>
      
      {/* Mobile Bottom Navigation */}
      <div className="md:hidden">
        <MobileBottomNav cartItems={cartItems} />
      </div>
      
      {/* Desktop Floating Cart Only */}
      <div className="hidden md:block">
        <FloatingCart 
          itemCount={cartItems}
          onCartClick={() => navigate('/cart')}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
