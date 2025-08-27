import { Search, ShoppingCart, User, Menu, Globe, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SouqLogo } from "@/components/ui/souq-logo";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useCart, useAppContext } from "@/contexts/AppContext";
import { products, categories } from "@/data/mock-data";
import { MiniCart } from "@/components/ui/mini-cart";
import { MobileMenu } from "@/components/layout/mobile-menu";
import { ShellContext } from "@/components/layout/app-shell";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export const Header = () => {
  const inShell = React.useContext(ShellContext);
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { state, dispatch } = useAppContext();
  const [miniOpen, setMiniOpen] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [searchFocused, setSearchFocused] = React.useState(false);
  
  const suggestions = React.useMemo(() => {
    if (!query) return [] as Array<{ label: string; href: string; type: 'product' | 'category' }>;
    const productMatches = products
      .filter(p => p.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 4)
      .map(p => ({ 
        label: p.title, 
        href: `/p/${encodeURIComponent(p.title.toLowerCase().replace(/\s+/g, '-'))}`,
        type: 'product' as const
      }));
    const categoryMatches = categories
      .filter(c => c.title.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 3)
      .map(c => ({ 
        label: c.title, 
        href: `/c/${c.id}`,
        type: 'category' as const
      }));
    return [...productMatches, ...categoryMatches].slice(0, 6);
  }, [query]);

  const onSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
      setSearchFocused(false);
    }
  };

  if (inShell) return null;

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 z-50 w-full"
    >
      {/* Ultra-thin glass backdrop */}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-border/10" />
      
      <div className="relative container mx-auto px-6">
        <div className="flex items-center justify-between py-6">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
          
          {/* Logo with enhanced hover effect */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
            onClick={() => navigate('/')}
            className="cursor-pointer"
          >
            <SouqLogo 
              size="lg" 
              className="hidden md:block" 
            />
            <SouqLogo 
              size="md" 
              className="md:hidden" 
            />
          </motion.div>
          
          {/* Enhanced Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-12">
            <div className="relative w-full">
              <motion.form 
                onSubmit={onSearchSubmit} 
                className="relative"
                animate={{ 
                  scale: searchFocused ? 1.02 : 1,
                }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 z-10" />
                <Input 
                  placeholder="Search for anything..."
                  className="pl-14 pr-6 py-4 glass-premium border-0 shadow-floating focus:shadow-glow focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-base font-medium rounded-2xl"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
                />
              </motion.form>
              
              {/* Enhanced Search Suggestions */}
              <AnimatePresence>
                {suggestions.length > 0 && searchFocused && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute z-50 mt-3 w-full glass-premium border-0 shadow-floating rounded-2xl overflow-hidden backdrop-blur-xl"
                  >
                    {suggestions.map((s, index) => (
                      <motion.div 
                        key={s.href}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="px-6 py-4 hover:bg-primary/10 hover:text-primary cursor-pointer transition-all duration-200 flex items-center gap-4 group"
                        onMouseDown={() => navigate(s.href)}
                      >
                        <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                          <Search className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium text-sm">{s.label}</p>
                          <p className="text-xs text-muted-foreground capitalize">{s.type}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          
          {/* Right Actions - Enhanced */}
          <div className="flex items-center gap-4">
            {/* Desktop role switcher */}
            <div className="hidden lg:block">
              <RoleSwitcher />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              {/* Search - Mobile */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="md:hidden glass-card h-12 w-12 hover:shadow-medium hover:scale-105 transition-all duration-200 rounded-2xl" 
              >
                <Search className="h-5 w-5" />
              </Button>
              
              {/* Language Toggle */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="glass-card h-12 w-12 hover:shadow-medium hover:bg-primary/10 transition-all duration-200 rounded-2xl" 
                  onClick={() => dispatch({ 
                    type: 'SET_LANGUAGE', 
                    payload: state.language === 'en' ? 'ar' : state.language === 'ar' ? 'fr' : 'en' 
                  })}
                >
                  <Globe className="h-5 w-5" />
                </Button>
              </motion.div>

              {/* Notifications */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="glass-card h-12 w-12 hover:shadow-medium hover:bg-primary/10 transition-all duration-200 rounded-2xl relative" 
                >
                  <Bell className="h-5 w-5" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full animate-pulse" />
                </Button>
              </motion.div>

              {/* Cart */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="relative glass-card h-12 w-12 hover:shadow-medium hover:bg-primary/10 transition-all duration-200 rounded-2xl" 
                  onClick={() => setMiniOpen(true)} 
                  data-testid="open-cart"
                >
                  <ShoppingCart className="h-5 w-5" />
                  <AnimatePresence>
                    {itemCount > 0 && (
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="absolute -top-2 -right-2 h-6 w-6 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-xs font-bold shadow-glow"
                      >
                        {itemCount}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
              
              {/* Account */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="glass-card h-12 w-12 hover:shadow-medium hover:bg-primary/10 transition-all duration-200 rounded-2xl" 
                  onClick={() => navigate(state.user ? '/account' : '/account/login')} 
                  data-testid="account-btn"
                >
                  <User className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
        
        {/* Mobile Search Bar - Enhanced */}
        <AnimatePresence>
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden pb-6"
          >
            <form onSubmit={onSearchSubmit} className="relative">
              <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input 
                placeholder="Search products..."
                className="pl-14 pr-4 py-4 glass-premium border-0 shadow-floating focus:shadow-glow transition-all duration-300 rounded-2xl"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </form>
          </motion.div>
        </AnimatePresence>
      </div>
      
      <MiniCart open={miniOpen} onOpenChange={setMiniOpen} />
    </motion.header>
  );
};