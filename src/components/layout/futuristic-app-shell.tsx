import React, { useMemo, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useCart } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarInput,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { 
  Home, ShoppingBag, Flame, Star, Package, Heart, User, Search, Bell,
  BarChart3, Boxes, ClipboardList, Truck, DollarSign, LineChart, Megaphone, LifeBuoy, Settings,
  LayoutDashboard, Box, Users, Paintbrush, ServerCog, Store, AlertCircle, Plus
} from "lucide-react";

type MenuItem = { 
  icon: React.ComponentType<any>; 
  label: string; 
  to: string; 
  badge?: string | number;
  alert?: boolean;
};

type MenuGroup = { 
  label: string; 
  items: MenuItem[];
  collapsed?: boolean;
};

function useRoleMenu(role: string): { title: string; groups: MenuGroup[]; cta?: { label: string; onClick: () => void } } {
  const navigate = useNavigate();
  
  return useMemo(() => {
    if (role === 'seller') {
      return {
        title: 'Seller Portal',
        groups: [
          { 
            label: 'Overview', 
            items: [
              { icon: BarChart3, label: 'Dashboard', to: '/seller/dashboard' }
            ]
          },
          { 
            label: 'Products', 
            items: [
              { icon: Boxes, label: 'All Products', to: '/seller/catalog/products' },
              { icon: Plus, label: 'Add Product', to: '/seller/catalog/products/new' },
              { icon: ClipboardList, label: 'Approvals', to: '/seller/catalog', badge: '3' }
            ]
          },
          { 
            label: 'Orders & Fulfillment', 
            items: [
              { icon: ClipboardList, label: 'Orders', to: '/seller/orders', badge: 'New' },
              { icon: Truck, label: 'Returns', to: '/seller/returns' }
            ]
          },
          { 
            label: 'Business Intelligence', 
            items: [
              { icon: DollarSign, label: 'Payouts', to: '/seller/payouts' },
              { icon: LineChart, label: 'Analytics', to: '/seller/analytics' },
              { icon: Megaphone, label: 'Promotions', to: '/seller/promotions' }
            ]
          },
          { 
            label: 'Support & Settings', 
            items: [
              { icon: LifeBuoy, label: 'Help Center', to: '/seller/help' },
              { icon: Settings, label: 'Settings', to: '/seller/settings' }
            ]
          }
        ],
        cta: { label: '+ Add Product', onClick: () => navigate('/seller/catalog/products/new') }
      }
    }
    
    if (role === 'admin') {
      return {
        title: 'Admin Control Center',
        groups: [
          { 
            label: 'Command Center', 
            items: [
              { icon: LayoutDashboard, label: 'Overview', to: '/admin/overview', alert: true }
            ]
          },
          { 
            label: 'Catalog Management', 
            items: [
              { icon: Box, label: 'Approvals & Categories', to: '/admin/catalog', badge: '12' }
            ]
          },
          { 
            label: 'Order Operations', 
            items: [
              { icon: ShoppingBag, label: 'Orders', to: '/admin/orders', badge: 'Urgent' },
              { icon: Truck, label: 'Returns & Refunds', to: '/admin/returns' }
            ]
          },
          { 
            label: 'Marketplace Management', 
            items: [
              { icon: Store, label: 'Sellers', to: '/admin/sellers' },
              { icon: Users, label: 'Users', to: '/admin/users' }
            ]
          },
          { 
            label: 'Finance & Reports', 
            items: [
              { icon: DollarSign, label: 'Finance', to: '/admin/finance' }
            ]
          },
          { 
            label: 'Content & System', 
            items: [
              { icon: Paintbrush, label: 'CMS', to: '/admin/cms' },
              { icon: ServerCog, label: 'System/Logs', to: '/admin/system' }
            ]
          }
        ],
        cta: { label: 'Bulk Approve', onClick: () => navigate('/admin/catalog') }
      }
    }
    
    return {
      title: 'Rassooq Marketplace',
      groups: [
        { 
          label: 'Shop', 
          items: [
            { icon: Home, label: 'Home', to: '/' },
            { icon: ShoppingBag, label: 'Categories', to: '/c/electronics' },
            { icon: Flame, label: 'Promotions', to: '/search?q=deal' },
            { icon: Star, label: 'Rassooq+', to: '/plus' }
          ]
        },
        { 
          label: 'My Account', 
          items: [
            { icon: Package, label: 'My Orders', to: '/account/orders' },
            { icon: Heart, label: 'Wishlist', to: '/account/wishlist' },
            { icon: User, label: 'Account', to: '/account' }
          ]
        }
      ],
      cta: { label: 'View Cart', onClick: () => navigate('/cart') }
    }
  }, [role, navigate]);
}

function generateBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs = [] as Array<{ name: string; href: string }>;
  let acc = '';
  
  for (const part of parts) {
    acc += '/' + part;
    let name = decodeURIComponent(part.replace(/[-_]/g, ' '));
    
    // Beautify common route names
    const nameMap: Record<string, string> = {
      'admin': 'Admin',
      'seller': 'Seller',
      'overview': 'Overview',
      'catalog': 'Catalog',
      'orders': 'Orders',
      'users': 'Users',
      'products': 'Products',
      'dashboard': 'Dashboard'
    };
    
    name = nameMap[name.toLowerCase()] || name.charAt(0).toUpperCase() + name.slice(1);
    crumbs.push({ name, href: acc });
  }
  
  return crumbs;
}

function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative h-9 w-9 rounded-xl hover:bg-primary/10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-4 w-4" />
        <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs">3</Badge>
      </Button>
      
      {isOpen && (
        <div className="absolute right-0 top-12 w-80 glass-panel rounded-xl shadow-floating z-50 p-4">
          <h3 className="font-semibold mb-3">Notifications</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50">
              <AlertCircle className="h-4 w-4 text-amber-500" />
              <span>3 products pending approval</span>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50">
              <Package className="h-4 w-4 text-primary" />
              <span>New order received</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function MobileBottomNav({ role, navigate, itemCount }: { role: string; navigate: any; itemCount: number }) {
  if (role !== 'buyer') return null;
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 glass-nav border-t md:hidden">
      <div className="grid grid-cols-4 py-2">
        <NavLink to="/" className="flex flex-col items-center gap-1 py-2 text-xs font-medium">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </NavLink>
        <NavLink to="/c/electronics" className="flex flex-col items-center gap-1 py-2 text-xs font-medium">
          <ShoppingBag className="h-5 w-5" />
          <span>Categories</span>
        </NavLink>
        <button 
          onClick={() => navigate('/cart')} 
          className="flex flex-col items-center gap-1 py-2 text-xs font-medium relative"
        >
          <Package className="h-5 w-5" />
          <span>Cart</span>
          {itemCount > 0 && (
            <Badge className="absolute -top-1 -right-2 h-5 w-5 rounded-full p-0 text-xs">{itemCount}</Badge>
          )}
        </button>
        <NavLink to="/account" className="flex flex-col items-center gap-1 py-2 text-xs font-medium">
          <User className="h-5 w-5" />
          <span>Account</span>
        </NavLink>
      </div>
    </div>
  );
}

export function FuturisticAppShell({ children }: { children: React.ReactNode }) {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const isMobile = useIsMobile();
  const menu = useRoleMenu(currentRole);
  const crumbs = generateBreadcrumbs(location.pathname);

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-subtle">
        <Sidebar 
          variant="floating" 
          collapsible="icon"
          className="glass-nav border-r-0 shadow-nav"
        >
          <SidebarHeader className="border-b border-border/10 pb-4">
            <div className="px-2 py-1.5 rounded-xl bg-gradient-primary text-primary-foreground text-xs font-semibold text-center shadow-glow">
              {menu.title}
            </div>
            <div className="relative mt-3">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <SidebarInput 
                placeholder="Quick search..." 
                className="pl-8 rounded-xl glass-panel border-border/20 focus:border-primary/30" 
              />
            </div>
          </SidebarHeader>
          
          <SidebarContent className="px-2 py-4">
            {menu.groups.map((group, idx) => (
              <SidebarGroup key={idx} className="mb-6">
                <SidebarGroupLabel className="text-xs font-semibold text-muted-foreground/80 mb-2">
                  {group.label}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu className="space-y-1">
                    {group.items.map((item) => {
                      const isActive = location.pathname === item.to;
                      return (
                        <SidebarMenuItem key={item.to}>
                          <SidebarMenuButton asChild tooltip={item.label}>
                            <NavLink 
                              to={item.to}
                              className={cn(
                                "nav-item",
                                isActive && "nav-item-active"
                              )}
                            >
                              <item.icon className="h-4 w-4" />
                              <span className="flex-1">{item.label}</span>
                              {item.badge && (
                                <Badge 
                                  variant={item.alert ? "destructive" : "secondary"} 
                                  className="text-xs px-1.5 py-0.5 h-5"
                                >
                                  {item.badge}
                                </Badge>
                              )}
                              {item.alert && !item.badge && (
                                <div className="h-2 w-2 rounded-full bg-destructive animate-pulse" />
                              )}
                            </NavLink>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    })}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>

        <SidebarInset className="flex-1 flex flex-col">
          {/* Header */}
          <div className="sticky top-0 z-40 glass-nav border-b border-border/10 shadow-nav">
            <div className="container mx-auto px-4 py-3 flex items-center gap-4">
              <SidebarTrigger className="hover:bg-primary/10 rounded-xl" />
              
              <Breadcrumb className="flex-1">
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink href="/" className="hover:text-primary transition-colors">
                      Home
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {crumbs.slice(0, -1).map((c) => (
                    <React.Fragment key={c.href}>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbLink href={c.href} className="hover:text-primary transition-colors">
                          {c.name}
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </React.Fragment>
                  ))}
                  {crumbs.length > 0 && (
                    <>
                      <BreadcrumbSeparator />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="font-semibold">
                          {crumbs[crumbs.length - 1].name}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="flex items-center gap-2">
                <NotificationCenter />
                {menu.cta && (
                  <Button 
                    size="sm" 
                    onClick={menu.cta.onClick}
                    className="rounded-xl shadow-nav hover:shadow-glow transition-all"
                  >
                    {menu.cta.label}
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content */}
          <main className="flex-1 container mx-auto px-4 py-6">
            {children}
          </main>

          {/* Floating Cart for Buyers */}
          {currentRole === 'buyer' && !isMobile && (
            <button 
              onClick={() => navigate('/cart')}
              className="fixed bottom-6 right-6 z-40 rounded-full bg-gradient-primary text-primary-foreground shadow-floating px-4 py-3 flex items-center gap-2 hover:shadow-glow transition-all hover:scale-105"
            >
              <Package className="h-4 w-4" />
              <span className="font-medium">Cart ({itemCount})</span>
            </button>
          )}

          {/* Mobile Bottom Navigation */}
          <MobileBottomNav role={currentRole} navigate={navigate} itemCount={itemCount} />
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}