import { AppProvider } from "@/contexts/AppContext";
import { AdminProvider } from "@/contexts/AdminContext";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "@/components/routing/ProtectedRoute";
import { AppShell } from "@/components/layout/app-shell";

// Buyer Routes
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import NotAuthorized from "./pages/NotAuthorized";
import ProductDetails from "./pages/ProductDetails";
import CategoryResults from "./pages/CategoryResults";
import SearchResults from "./pages/SearchResults";
import Cart from "./pages/Cart";

// Checkout Flow
import Checkout from "./pages/Checkout";
import CheckoutAddress from "./pages/CheckoutAddress";
import CheckoutDelivery from "./pages/CheckoutDelivery";
import CheckoutPayment from "./pages/CheckoutPayment";
import CheckoutReview from "./pages/CheckoutReview";
import OrderConfirmation from "./pages/OrderConfirmation";

// User Account
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import OrderDetails from "./pages/OrderDetails";
import AddressBook from "./pages/AddressBook";
import Returns from "./pages/Returns";
import ReturnRequest from "./pages/ReturnRequest";
import ReturnStatus from "./pages/ReturnStatus";
import SouqPlus from "./pages/SouqPlus";
import Wishlist from "./pages/Wishlist";

// Seller Portal
import SellerOnboarding from "./pages/SellerOnboarding";
import SellerDashboard from "./pages/SellerDashboard";
import SellerCatalog from "./pages/SellerCatalog";
import SellerProducts from "./pages/SellerProducts";
import SellerProductForm from "./pages/SellerProductForm";
import SellerOrders from "./pages/SellerOrders";
import SellerOrderDetails from "./pages/SellerOrderDetails";
import SellerReturns from "./pages/SellerReturns";
import SellerInventory from "./pages/SellerInventory";
import SellerPromotions from "./pages/SellerPromotions";
import SellerPayouts from "./pages/SellerPayouts";
import SellerStaff from "./pages/SellerStaff";
import SellerMarketing from "./pages/SellerMarketing";
import SellerSettings from "./pages/SellerSettings";
import SellerHelp from "./pages/SellerHelp";
import SellerShop from "./pages/SellerShop";

// Admin Backoffice
import AdminOverview from "./pages/AdminOverview";
import AdminCatalog from "./pages/AdminCatalog";
import AdminOrders from "./pages/AdminOrders";
import AdminReturns from "./pages/AdminReturns";
import AdminSellers from "./pages/AdminSellers";
import AdminUsers from "./pages/AdminUsers";
import AdminFinance from "./pages/AdminFinance";
import AdminCMS from "./pages/AdminCMS";
import AdminSystem from "./pages/AdminSystem";
import DocsHub from "./pages/DocsHub";

// Static Pages
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AppProvider>
      <AdminProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Buyer Storefront Routes */}
            <Route path="/" element={<AppShell><Index /></AppShell>} />
            
            {/* Product & Category Routes */}
            <Route path="/product/:id" element={<AppShell><ProductDetails /></AppShell>} />
            <Route path="/p/:slug" element={<AppShell><ProductDetails /></AppShell>} />
            <Route path="/category/:category" element={<AppShell><CategoryResults /></AppShell>} />
            <Route path="/c/:slug" element={<AppShell><CategoryResults /></AppShell>} />
            <Route path="/search" element={<AppShell><SearchResults /></AppShell>} />
            
            {/* Cart & Checkout Flow */}
            <Route path="/cart" element={<AppShell><Cart /></AppShell>} />
            <Route path="/checkout" element={<AppShell><Checkout /></AppShell>} />
            <Route path="/checkout/address" element={<AppShell><CheckoutAddress /></AppShell>} />
            <Route path="/checkout/delivery" element={<AppShell><CheckoutDelivery /></AppShell>} />
            <Route path="/checkout/payment" element={<AppShell><CheckoutPayment /></AppShell>} />
            <Route path="/checkout/review" element={<AppShell><CheckoutReview /></AppShell>} />
            <Route path="/order/:orderId" element={<AppShell><OrderConfirmation /></AppShell>} />
            <Route path="/order-confirmation/:orderId" element={<AppShell><OrderConfirmation /></AppShell>} />
            
            {/* User Account Routes */}
            <Route path="/login" element={<AppShell><Login /></AppShell>} />
            <Route path="/account/login" element={<AppShell><Login /></AppShell>} />
            <Route path="/register" element={<AppShell><Register /></AppShell>} />
            <Route path="/account/register" element={<AppShell><Register /></AppShell>} />
            <Route path="/profile" element={<AppShell><Profile /></AppShell>} />
            <Route path="/account" element={<AppShell><Profile /></AppShell>} />
            <Route path="/orders" element={<AppShell><Orders /></AppShell>} />
            <Route path="/account/orders" element={<AppShell><Orders /></AppShell>} />
            <Route path="/account/wishlist" element={<AppShell><Wishlist /></AppShell>} />
            <Route path="/orders/:orderId" element={<AppShell><OrderDetails /></AppShell>} />
            <Route path="/account/orders/:orderId" element={<AppShell><OrderDetails /></AppShell>} />
            <Route path="/addresses" element={<AppShell><AddressBook /></AppShell>} />
            <Route path="/account/addresses" element={<AppShell><AddressBook /></AppShell>} />
            <Route path="/returns" element={<AppShell><Returns /></AppShell>} />
            <Route path="/account/returns" element={<AppShell><Returns /></AppShell>} />
            <Route path="/returns/request/:orderId" element={<AppShell><ReturnRequest /></AppShell>} />
            <Route path="/account/returns/new" element={<AppShell><ReturnRequest /></AppShell>} />
            <Route path="/returns/:returnId" element={<AppShell><ReturnStatus /></AppShell>} />
            <Route path="/account/returns/:returnId" element={<AppShell><ReturnStatus /></AppShell>} />
            <Route path="/plus" element={<AppShell><SouqPlus /></AppShell>} />
            <Route path="/rassooq-plus" element={<AppShell><SouqPlus /></AppShell>} />
            <Route path="/souq-plus" element={<AppShell><SouqPlus /></AppShell>} />
            <Route path="/seller/store/:id" element={<AppShell><SellerShop /></AppShell>} />
            
            {/* Seller Portal Routes (guarded) */}
            <Route element={<ProtectedRoute allowed={["seller", "admin"]} />}>
              <Route path="/seller/dashboard" element={<AppShell><SellerDashboard /></AppShell>} />
              <Route path="/seller/catalog" element={<AppShell><SellerCatalog /></AppShell>} />
              <Route path="/seller/catalog/products" element={<AppShell><SellerProducts /></AppShell>} />
              <Route path="/seller/catalog/products/new" element={<AppShell><SellerProductForm /></AppShell>} />
              <Route path="/seller/catalog/products/:id" element={<AppShell><SellerProductForm /></AppShell>} />
              <Route path="/seller/orders" element={<AppShell><SellerOrders /></AppShell>} />
              <Route path="/seller/orders/:id" element={<AppShell><SellerOrderDetails /></AppShell>} />
              <Route path="/seller/returns" element={<AppShell><SellerReturns /></AppShell>} />
              <Route path="/seller/inventory" element={<AppShell><SellerInventory /></AppShell>} />
              <Route path="/seller/promotions" element={<AppShell><SellerPromotions /></AppShell>} />
              <Route path="/seller/payouts" element={<AppShell><SellerPayouts /></AppShell>} />
              <Route path="/seller/settings" element={<AppShell><SellerSettings /></AppShell>} />
              <Route path="/seller/staff" element={<AppShell><SellerStaff /></AppShell>} />
              <Route path="/seller/marketing" element={<AppShell><SellerMarketing /></AppShell>} />
            </Route>
            {/* Public seller help and onboarding */}
            <Route path="/sell" element={<SellerOnboarding />} />
            <Route path="/seller/onboarding" element={<SellerOnboarding />} />
            <Route path="/seller/help" element={<SellerHelp />} />
            
            {/* Admin Backoffice Routes (guarded) */}
            <Route element={<ProtectedRoute allowed={["admin"]} />}>
              <Route path="/admin/overview" element={<AppShell><AdminOverview /></AppShell>} />
              <Route path="/admin/catalog" element={<AppShell><AdminCatalog /></AppShell>} />
              <Route path="/admin/orders" element={<AppShell><AdminOrders /></AppShell>} />
              <Route path="/admin/returns" element={<AppShell><AdminReturns /></AppShell>} />
              <Route path="/admin/sellers" element={<AppShell><AdminSellers /></AppShell>} />
              <Route path="/admin/users" element={<AppShell><AdminUsers /></AppShell>} />
              <Route path="/admin/finance" element={<AppShell><AdminFinance /></AppShell>} />
              <Route path="/admin/cms" element={<AppShell><AdminCMS /></AppShell>} />
              <Route path="/admin/system" element={<AppShell><AdminSystem /></AppShell>} />
            </Route>
            
            {/* Static Pages */}
            <Route path="/about" element={<AppShell><About /></AppShell>} />
            <Route path="/faq" element={<AppShell><FAQ /></AppShell>} />
            <Route path="/help" element={<AppShell><FAQ /></AppShell>} />
            <Route path="/terms" element={<AppShell><Terms /></AppShell>} />
            <Route path="/privacy" element={<AppShell><Privacy /></AppShell>} />
            <Route path="/docs" element={<AppShell><DocsHub /></AppShell>} />
            
            {/* 403 and Catch-all */}
            <Route path="/403" element={<NotAuthorized />} />
            <Route path="*" element={<AppShell><NotFound /></AppShell>} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
      </AdminProvider>
    </AppProvider>
  </QueryClientProvider>
);

export default App;
