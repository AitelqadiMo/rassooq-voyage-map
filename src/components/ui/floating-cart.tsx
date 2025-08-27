import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface FloatingCartProps {
  itemCount?: number;
  onCartClick?: () => void;
}

export const FloatingCart = ({ itemCount = 0, onCartClick }: FloatingCartProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
    >
      <motion.div
        className="relative"
        onHoverStart={() => setIsHovered(true)}
        onHoverEnd={() => setIsHovered(false)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button
          size="lg"
          onClick={onCartClick}
          className="w-16 h-16 rounded-full shadow-floating hover:shadow-glow glass-premium hover:glass-card transition-spring border border-primary/20"
        >
          <ShoppingCart className="w-6 h-6" />
        </Button>

        {/* Item Count Badge */}
        <AnimatePresence>
          {itemCount > 0 && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="absolute -top-2 -right-2"
            >
              <Badge 
                variant="destructive" 
                className="w-6 h-6 rounded-full p-0 flex items-center justify-center text-xs font-bold shadow-large"
              >
                {itemCount > 99 ? "99+" : itemCount}
              </Badge>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple Effect on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-primary/30"
              initial={{ scale: 1, opacity: 1 }}
              animate={{ scale: 1.4, opacity: 0 }}
              exit={{ scale: 1, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          )}
        </AnimatePresence>

        {/* Pulse Animation for Empty Cart */}
        {itemCount === 0 && (
          <motion.div
            className="absolute inset-0 rounded-full bg-primary/10"
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        )}
      </motion.div>

      {/* Quick Add Button (on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-20 right-0"
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <Button
              size="sm"
              variant="secondary"
              className="rounded-full w-12 h-12 shadow-large glass-premium"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};