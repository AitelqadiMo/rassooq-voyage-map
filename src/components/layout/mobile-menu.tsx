import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { RassooqLogo } from "@/components/ui/souq-logo";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import { useAppContext } from "@/contexts/AppContext";
import { 
  Menu, 
  Home, 
  Search, 
  ShoppingBag, 
  User, 
  Heart,
  HelpCircle,
  Store,
  BarChart3,
  Package,
  Truck,
  DollarSign,
  Settings,
  Users,
  FileText,
  Database
} from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const { state } = useAppContext();

  const buyerMenuItems = [
    { icon: Home, label: "Home", href: "/" },
    { icon: Search, label: "Search", href: "/search" },
    { icon: ShoppingBag, label: "Categories", href: "/categories" },
    { icon: Package, label: "Deals", href: "/deals" },
    { icon: User, label: "Account", href: "/account" },
    { icon: Truck, label: "Orders", href: "/orders" },
    { icon: Heart, label: "Wishlist", href: "/wishlist" },
    { icon: HelpCircle, label: "Help", href: "/help" },
    { icon: Store, label: "Sell with Rassooq", href: "/seller/onboarding" }
  ];

  const sellerMenuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/seller/dashboard" },
    { icon: Package, label: "Catalog", href: "/seller/catalog" },
    { icon: ShoppingBag, label: "Orders", href: "/seller/orders" },
    { icon: Truck, label: "Returns", href: "/seller/returns" },
    { icon: Database, label: "Inventory", href: "/seller/inventory" },
    { icon: DollarSign, label: "Payouts", href: "/seller/payouts" },
    { icon: Settings, label: "Settings", href: "/seller/settings" },
    { icon: HelpCircle, label: "Help", href: "/seller/help" },
    { icon: Home, label: "View Storefront", href: "/" }
  ];

  const adminMenuItems = [
    { icon: BarChart3, label: "Overview", href: "/admin/overview" },
    { icon: Package, label: "Catalog", href: "/admin/catalog" },
    { icon: ShoppingBag, label: "Orders", href: "/admin/orders" },
    { icon: Truck, label: "Returns", href: "/admin/returns" },
    { icon: Store, label: "Sellers", href: "/admin/sellers" },
    { icon: Users, label: "Users", href: "/admin/users" },
    { icon: DollarSign, label: "Finance", href: "/admin/finance" },
    { icon: FileText, label: "CMS", href: "/admin/cms" },
    { icon: Settings, label: "System", href: "/admin/system" }
  ];

  const getMenuItems = () => {
    switch (state.currentRole) {
      case 'seller':
        return sellerMenuItems;
      case 'admin':
        return adminMenuItems;
      default:
        return buyerMenuItems;
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Open menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b">
            <RassooqLogo />
            <RoleSwitcher />
          </div>

          {/* User Info */}
          {state.user && (
            <div className="py-4 border-b">
              <div className="flex items-center gap-3">
                {state.user.avatar ? (
                  <img 
                    src={state.user.avatar} 
                    alt={state.user.name}
                    className="w-10 h-10 rounded-full"
                  />
                ) : (
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                )}
                <div>
                  <p className="font-medium">{state.user.name}</p>
                  <p className="text-sm text-muted-foreground">{state.user.email}</p>
                </div>
              </div>
            </div>
          )}

          {/* Menu Items */}
          <nav className="flex-1 py-4">
            <div className="space-y-2">
              {getMenuItems().map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    "hover:bg-muted hover:text-foreground",
                    "focus:bg-muted focus:text-foreground focus:outline-none"
                  )}
                >
                  <item.icon className="h-4 w-4" />
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="border-t pt-4">
            <div className="text-xs text-muted-foreground text-center">
              <p>Rassooq Marketplace</p>
              <p>Version 1.0.0</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}