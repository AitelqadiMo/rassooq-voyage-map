import React from "react";
import { RassooqLogo } from "@/components/ui/souq-logo";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Search, User } from "lucide-react";
import { useAuth, useCart, useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { AuthModal } from "@/components/ui/auth-modal";
import { RoleSwitcher } from "@/components/ui/role-switcher";
import { NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";

export function TopBar() {
  const { user, logout } = useAuth();
  const { state, dispatch } = useAppContext();
  const { itemCount } = useCart();
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState("all");
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();

  const submit = (e: React.FormEvent) => { e.preventDefault(); const q = query ? `?q=${encodeURIComponent(query)}`:''; navigate(`/search${q}`)};

  return (
    <div className="sticky top-0 z-50 bg-card/70 backdrop-blur border-b">
      <div className="container mx-auto px-4 py-2 flex items-center gap-3">
        <button className="md:hidden" onClick={()=>document.querySelector('[data-sidebar=trigger]')?.dispatchEvent(new Event('click', { bubbles: true }))}>
          <span className="sr-only">Menu</span>
        </button>
        <RassooqLogo size="md" />

        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent className="p-4 bg-card/95 backdrop-blur border rounded-lg shadow-card">
                  <div className="grid grid-cols-4 gap-6 min-w-[720px]">
                    <div>
                      <div className="font-semibold mb-2">Fashion</div>
                      <ul className="space-y-1 text-sm">
                        <li><button onClick={()=>navigate('/c/fashion')} className="hover:underline">Men</button></li>
                        <li><button onClick={()=>navigate('/c/fashion')} className="hover:underline">Women</button></li>
                        <li><button onClick={()=>navigate('/c/fashion')} className="hover:underline">Kids</button></li>
                        <li><button onClick={()=>navigate('/c/fashion')} className="hover:underline">Accessories</button></li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Electronics</div>
                      <ul className="space-y-1 text-sm">
                        <li><button onClick={()=>navigate('/c/electronics')} className="hover:underline">Mobiles</button></li>
                        <li><button onClick={()=>navigate('/c/electronics')} className="hover:underline">Laptops</button></li>
                        <li><button onClick={()=>navigate('/c/electronics')} className="hover:underline">Audio</button></li>
                        <li><button onClick={()=>navigate('/c/electronics')} className="hover:underline">Cameras</button></li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Home</div>
                      <ul className="space-y-1 text-sm">
                        <li><button onClick={()=>navigate('/c/home')} className="hover:underline">Living</button></li>
                        <li><button onClick={()=>navigate('/c/home')} className="hover:underline">Kitchen</button></li>
                        <li><button onClick={()=>navigate('/c/home')} className="hover:underline">Decor</button></li>
                        <li><button onClick={()=>navigate('/c/home')} className="hover:underline">Garden</button></li>
                      </ul>
                    </div>
                    <div>
                      <div className="font-semibold mb-2">Wellness & Crafts</div>
                      <ul className="space-y-1 text-sm">
                        <li><button onClick={()=>navigate('/c/beauty')} className="hover:underline">Beauty</button></li>
                        <li><button onClick={()=>navigate('/c/sports')} className="hover:underline">Sports</button></li>
                        <li><button onClick={()=>navigate('/c/handcrafts')} className="hover:underline">Handcrafts</button></li>
                        <li><button onClick={()=>navigate('/c/grocery')} className="hover:underline">Grocery</button></li>
                      </ul>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuIndicator />
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <form onSubmit={submit} className="hidden md:flex flex-1 items-center gap-2 max-w-2xl mx-auto">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-40"><SelectValue placeholder="All"/></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="electronics">Electronics</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="beauty">Beauty</SelectItem>
            </SelectContent>
          </Select>
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search products, categories, brands" value={query} onChange={(e)=>setQuery(e.target.value)} className="pl-9" />
          </div>
          <Button type="submit">Search</Button>
        </form>

        <div className="ml-auto flex items-center gap-2">
          <div className="hidden md:block">
            <RoleSwitcher />
          </div>
          <Button variant="ghost" size="sm" onClick={()=>dispatch({ type:'SET_LANGUAGE', payload: state.language==='en' ? 'ar' : 'en' })}> {state.language==='ar' ? 'عربي' : 'EN'} </Button>
          <Button variant="ghost" size="sm" onClick={()=>navigate('/account/wishlist')} className="relative">
            <Heart className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" onClick={()=>navigate('/cart')} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {itemCount>0 && (
              <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">{itemCount}</span>
            )}
          </Button>
          {!user ? (
            <Button size="sm" onClick={()=>setOpen(true)} data-testid="open-auth">Login / Register</Button>
          ) : (
            <div className="relative flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={()=>navigate('/account')}><User className="h-4 w-4 mr-1"/> {user.name}</Button>
              <Button variant="ghost" size="sm" onClick={()=>navigate('/account/orders')}>Orders</Button>
              <Button variant="ghost" size="sm" onClick={logout}>Logout</Button>
            </div>
          )}
        </div>
      </div>
      <AuthModal open={open} onOpenChange={setOpen} />
    </div>
  );
}


