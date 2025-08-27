import React, { useMemo } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth, useCart, useAppContext } from "@/contexts/AppContext";
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
import { 
  Home, ShoppingBag, Flame, Star, Package, Heart, User, 
  BarChart3, Boxes, ClipboardList, Truck, DollarSign, LineChart, Megaphone, LifeBuoy, Settings,
  LayoutDashboard, Box, Users, Paintbrush, ServerCog, Search, MessageSquareMore
} from "lucide-react";
import { TopBar } from "@/components/layout/top-bar";
import { Footer } from "@/components/layout/footer";

export const ShellContext = React.createContext<boolean>(false);

function useRoleMenu(role: string): { title: string; groups: Array<{ label: string; items: { icon: any; label: string; to: string }[] }> } {
  return useMemo(() => {
    if (role === 'seller') {
      return {
        title: 'Seller',
        groups: [
          { label: 'Dashboard', items: [ { icon: BarChart3, label: 'Dashboard', to: '/seller/dashboard' } ]},
          { label: 'Products', items: [ { icon: Boxes, label: 'All Products', to: '/seller/catalog/products' }, { icon: Boxes, label: 'Add Product', to: '/seller/catalog/products/new' }, { icon: ClipboardList, label: 'Approvals', to: '/seller/catalog' } ]},
          { label: 'Orders', items: [ { icon: ClipboardList, label: 'Orders', to: '/seller/orders' }, { icon: Truck, label: 'Returns', to: '/seller/returns' } ]},
          { label: 'Promotions', items: [ { icon: Megaphone, label: 'Campaigns', to: '/seller/promotions' } ]},
          { label: 'Analytics', items: [ { icon: LineChart, label: 'Analytics', to: '/seller/dashboard' } ]},
          { label: 'Finance', items: [ { icon: DollarSign, label: 'Payouts', to: '/seller/payouts' } ]},
          { label: 'Support', items: [ { icon: MessageSquareMore, label: 'Messages', to: '/seller/help' }, { icon: LifeBuoy, label: 'Help Center', to: '/seller/help' } ]},
          { label: 'Settings', items: [ { icon: Settings, label: 'Profile & Store', to: '/seller/settings' } ]},
        ]
      }
    }
    if (role === 'admin') {
      return {
        title: 'Admin',
        groups: [
          { label: 'Overview', items: [ { icon: LayoutDashboard, label: 'Dashboard', to: '/admin/overview' } ]},
          { label: 'Catalog', items: [ { icon: Box, label: 'Products & Categories', to: '/admin/catalog' } ]},
          { label: 'Orders', items: [ { icon: ShoppingBag, label: 'Orders Board', to: '/admin/orders' }, { icon: Truck, label: 'Returns', to: '/admin/returns' } ]},
          { label: 'Sellers', items: [ { icon: Users, label: 'Sellers', to: '/admin/sellers' } ]},
          { label: 'Users', items: [ { icon: Users, label: 'Users', to: '/admin/users' } ]},
          { label: 'Finance', items: [ { icon: DollarSign, label: 'Payouts & Reports', to: '/admin/finance' } ]},
          { label: 'CMS', items: [ { icon: Paintbrush, label: 'Homepage & Content', to: '/admin/cms' } ]},
          { label: 'System', items: [ { icon: ServerCog, label: 'Health & Logs', to: '/admin/system' } ]},
        ]
      }
    }
    return {
      title: 'Buyer',
      groups: [
        { label: 'Shop', items: [ { icon: Home, label: 'Home', to: '/' }, { icon: ShoppingBag, label: 'Categories', to: '/c/electronics' }, { icon: Flame, label: 'Promotions', to: '/search?q=deal' }, { icon: Star, label: 'Rassooq+', to: '/plus' } ]},
        { label: 'Manage', items: [ { icon: Package, label: 'My Orders', to: '/account/orders' }, { icon: Heart, label: 'Wishlist', to: '/account/wishlist' } ]},
        { label: 'Me', items: [ { icon: User, label: 'Account', to: '/account' } ]},
      ]
    }
  }, [role]);
}

function generateBreadcrumbs(pathname: string) {
  const parts = pathname.split('/').filter(Boolean);
  const crumbs: Array<{ name: string; href: string }> = []
  let acc = '';
  for (const part of parts) {
    acc += '/' + part;
    crumbs.push({ name: decodeURIComponent(part.replace(/[-_]/g, ' ')), href: acc });
  }
  return crumbs;
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const { currentRole } = useAuth();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { itemCount } = useCart();
  const menu = useRoleMenu(currentRole);

  const cta = useMemo(() => {
    if (currentRole === 'seller') return { label: '+ Add Product', onClick: () => navigate('/seller/catalog/products/new') };
    if (currentRole === 'admin' && location.pathname.startsWith('/admin/catalog')) return { label: 'Bulk Approve', onClick: () => navigate('/admin/catalog') };
    if (currentRole === 'buyer') return { label: 'View Cart', onClick: () => navigate('/cart') };
    return null;
  }, [currentRole, location.pathname, navigate]);

  const crumbs = generateBreadcrumbs(location.pathname);

  return (
    <ShellContext.Provider value={true}>
    <SidebarProvider>
      {/* URL role override for testing: ?role=admin|seller|buyer */}
      {(() => {
        const params = new URLSearchParams(location.search);
        const role = params.get('role') as any;
        if (role && ['buyer','seller','admin'].includes(role)) {
          dispatch({ type: 'SET_ROLE', payload: role });
          params.delete('role');
          window.history.replaceState(null, '', location.pathname + (params.toString()? `?${params.toString()}`:''));
        }
        return null;
      })()}
      {currentRole !== 'buyer' && (
        <Sidebar variant="floating" collapsible="icon" className="[&_[data-sidebar=sidebar]]:bg-white/30 [&_[data-sidebar=sidebar]]:backdrop-blur [&_[data-sidebar=sidebar]]:border border-white/20">
          <SidebarHeader>
            <div className="px-2 py-1 rounded-lg bg-white/40 backdrop-blur border text-xs font-medium shadow">{menu.title}</div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <SidebarInput placeholder="Quick search" className="pl-8 rounded-xl bg-white/60 backdrop-blur focus-visible:ring-primary/40" />
            </div>
          </SidebarHeader>
          <SidebarContent>
            {menu.groups.map(group => (
              <SidebarGroup key={group.label}>
                <SidebarGroupLabel className="uppercase tracking-wide text-[10px] text-foreground/60">{group.label}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map(item => (
                      <SidebarMenuItem key={item.to}>
                        <SidebarMenuButton asChild isActive={location.pathname === item.to} tooltip={item.label} className="transition-all hover:translate-x-[2px]">
                          <NavLink to={item.to}>
                            <item.icon />
                            <span>{item.label}</span>
                          </NavLink>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
      )}
      <SidebarInset>
        <TopBar />
        <div className="sticky top-0 z-40 bg-background/60 backdrop-blur border-b">
          <div className="container mx-auto px-4 py-2 flex items-center gap-2">
            {currentRole !== 'buyer' && <SidebarTrigger />}
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {crumbs.slice(0, -1).map(c => (
                  <React.Fragment key={c.href}>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbLink href={c.href}>{c.name}</BreadcrumbLink>
                    </BreadcrumbItem>
                  </React.Fragment>
                ))}
                {crumbs.length > 0 && (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>{crumbs[crumbs.length - 1].name}</BreadcrumbPage>
                    </BreadcrumbItem>
                  </>
                )}
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto flex items-center gap-2">
              {cta && (
                <Button size="sm" onClick={cta.onClick} className="rounded-full">
                  {cta.label}
                </Button>
              )}
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 py-4">
          {children}
        </div>
        <Footer forceVisible />
        {currentRole === 'buyer' && (
          <>
            <button onClick={() => navigate('/cart')} className="fixed bottom-20 right-4 md:right-6 z-40 rounded-full bg-primary text-primary-foreground shadow-card px-4 py-2 flex items-center gap-2">
              <Package className="h-4 w-4" /> Cart ({itemCount})
            </button>
            <div className="fixed bottom-0 left-0 right-0 z-40 bg-card/80 backdrop-blur border-t md:hidden">
              <div className="grid grid-cols-4">
                <NavLink to="/" className="flex flex-col items-center py-2 text-xs">
                  <Home className="h-5 w-5" /> Home
                </NavLink>
                <NavLink to="/c/electronics" className="flex flex-col items-center py-2 text-xs">
                  <ShoppingBag className="h-5 w-5" /> Categories
                </NavLink>
                <button onClick={() => navigate('/cart')} className="flex flex-col items-center py-2 text-xs">
                  <Package className="h-5 w-5" /> Cart
                </button>
                <NavLink to="/account" className="flex flex-col items-center py-2 text-xs">
                  <User className="h-5 w-5" /> Account
                </NavLink>
              </div>
            </div>
          </>
        )}
      </SidebarInset>
    </SidebarProvider>
    </ShellContext.Provider>
  );
}


