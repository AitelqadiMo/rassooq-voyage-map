import { Home, Grid3X3, ShoppingCart, User } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MobileBottomNavProps {
  cartItems?: number;
}

export const MobileBottomNav = ({ cartItems = 0 }: MobileBottomNavProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      id: "home",
      label: "Home",
      icon: Home,
      path: "/",
      active: location.pathname === "/",
    },
    {
      id: "categories",
      label: "Categories",
      icon: Grid3X3,
      path: "/categories",
      active: location.pathname.startsWith("/c") || location.pathname === "/categories",
    },
    {
      id: "cart",
      label: "Cart",
      icon: ShoppingCart,
      path: "/cart",
      active: location.pathname === "/cart",
      badge: cartItems,
    },
    {
      id: "account",
      label: "Account",
      icon: User,
      path: "/account",
      active: location.pathname.startsWith("/account"),
    },
  ];

  return (
    <motion.nav
      className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-t border-border/50 md:hidden"
      initial={{ y: 100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="flex items-center justify-around py-2 px-4 safe-area-bottom">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={cn(
                "relative flex flex-col items-center justify-center p-3 rounded-xl transition-all duration-300 min-w-[60px]",
                item.active
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="relative">
                <Icon className="h-6 w-6 mb-1" />
                
                {/* Active indicator */}
                {item.active && (
                  <motion.div
                    className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full"
                    layoutId="active-indicator"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}

                {/* Cart badge */}
                {item.badge && item.badge > 0 && (
                  <motion.div
                    className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full min-w-[18px] h-[18px] flex items-center justify-center font-semibold"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {item.badge > 99 ? "99+" : item.badge}
                  </motion.div>
                )}
              </div>
              
              <span
                className={cn(
                  "text-xs font-medium transition-colors",
                  item.active ? "text-primary" : "text-muted-foreground"
                )}
              >
                {item.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};