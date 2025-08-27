import { SouqLogo } from "@/components/ui/souq-logo";
import { Link } from "react-router-dom";
import React from "react";
import { ShellContext } from "@/components/layout/app-shell";

export const Footer = ({ forceVisible = false }: { forceVisible?: boolean }) => {
  const inShell = React.useContext(ShellContext);
  const hidden = inShell && !forceVisible;
  return (
    <footer className={hidden ? "hidden" : "bg-tertiary text-tertiary-foreground mt-auto"}>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {/* Logo & Description */}
          <div className="col-span-2 md:col-span-1">
            <SouqLogo className="text-tertiary-foreground mb-4" />
            <p className="text-sm text-tertiary-foreground/80">
              Your trusted marketplace for quality products across the Middle East
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm text-tertiary-foreground/80">
              <li><Link to="/about" className="hover:text-tertiary-foreground transition-colors">About</Link></li>
              <li><Link to="/faq" className="hover:text-tertiary-foreground transition-colors">FAQ</Link></li>
              <li><Link to="/help" className="hover:text-tertiary-foreground transition-colors">Help Center</Link></li>
              <li><Link to="/sell" className="hover:text-tertiary-foreground transition-colors">Sell with Rassooq</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Customer Service</h3>
            <ul className="space-y-2 text-sm text-tertiary-foreground/80">
              <li><Link to="/returns" className="hover:text-tertiary-foreground transition-colors">Returns</Link></li>
              <li><Link to="/terms" className="hover:text-tertiary-foreground transition-colors">Shipping Policy</Link></li>
              <li><Link to="/orders" className="hover:text-tertiary-foreground transition-colors">Track Order</Link></li>
              <li><Link to="/help" className="hover:text-tertiary-foreground transition-colors">Support</Link></li>
            </ul>
          </div>
          
          {/* Legal */}
          <div>
            <h3 className="font-heading font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-tertiary-foreground/80">
              <li><Link to="/terms" className="hover:text-tertiary-foreground transition-colors">Terms</Link></li>
              <li><Link to="/privacy" className="hover:text-tertiary-foreground transition-colors">Privacy</Link></li>
              <li><Link to="/faq" className="hover:text-tertiary-foreground transition-colors">Cookie Policy</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-tertiary-foreground/20 mt-8 pt-6 text-center text-sm text-tertiary-foreground/60">
          <p>&copy; 2024 Rassooq. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};