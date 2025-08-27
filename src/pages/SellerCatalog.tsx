import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AppContext";
import { 
  Package, 
  Plus, 
  BarChart3, 
  FileText, 
  Upload,
  Eye,
  Edit,
  AlertCircle
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SellerCatalog = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  // Redirect if not seller
  if (currentRole !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <p className="text-muted-foreground mb-4">You need seller access to view this page.</p>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const catalogStats = {
    totalProducts: 142,
    published: 128,
    drafts: 8,
    pending: 6,
    outOfStock: 12
  };

  const quickActions = [
    {
      title: "Add New Product",
      description: "Create a new product listing",
      icon: Plus,
      href: "/seller/catalog/products/new",
      color: "bg-primary hover:bg-primary/90"
    },
    {
      title: "Manage Products",
      description: "View and edit existing products",
      icon: Package,
      href: "/seller/catalog/products",
      color: "bg-secondary hover:bg-secondary/80"
    },
    {
      title: "Bulk Import",
      description: "Upload products via CSV",
      icon: Upload,
      href: "/seller/catalog/import",
      color: "bg-accent hover:bg-accent/90"
    },
    {
      title: "Analytics",
      description: "View product performance",
      icon: BarChart3,
      href: "/seller/analytics",
      color: "bg-tertiary hover:bg-tertiary/90"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Catalog Management</h1>
            <p className="text-muted-foreground">Manage your product listings and inventory</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/seller/catalog/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="products">Products</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{catalogStats.totalProducts}</div>
                  <p className="text-xs text-muted-foreground">All listings</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-success">{catalogStats.published}</div>
                  <p className="text-xs text-muted-foreground">Live products</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Drafts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-warning">{catalogStats.drafts}</div>
                  <p className="text-xs text-muted-foreground">Unpublished</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Review</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary">{catalogStats.pending}</div>
                  <p className="text-xs text-muted-foreground">Awaiting approval</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Out of Stock</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-destructive">{catalogStats.outOfStock}</div>
                  <p className="text-xs text-muted-foreground">Need restocking</p>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <div>
              <h2 className="font-heading text-xl font-semibold mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {quickActions.map((action, index) => (
                  <Card key={index} className="hover:shadow-medium transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <Link to={action.href} className="block">
                        <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-4`}>
                          <action.icon className="h-6 w-6 text-white" />
                        </div>
                        <h3 className="font-semibold mb-2">{action.title}</h3>
                        <p className="text-sm text-muted-foreground">{action.description}</p>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Samsung Galaxy S24 Ultra</p>
                      <p className="text-sm text-muted-foreground">Product updated</p>
                    </div>
                    <Badge variant="outline">2h ago</Badge>
                  </div>
                  <div className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">Traditional Moroccan Kaftan</p>
                      <p className="text-sm text-muted-foreground">Published successfully</p>
                    </div>
                    <Badge variant="outline">4h ago</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Argan Oil Set</p>
                      <p className="text-sm text-muted-foreground">Inventory updated</p>
                    </div>
                    <Badge variant="outline">1d ago</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="products" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Product Management</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Manage Your Products</h3>
                  <p className="text-muted-foreground mb-4">
                    View, edit, and organize your product catalog
                  </p>
                  <Button asChild>
                    <Link to="/seller/catalog/products">
                      <Eye className="h-4 w-4 mr-2" />
                      View All Products
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Product Performance</h3>
                  <p className="text-muted-foreground mb-4">
                    Track views, conversions, and sales metrics
                  </p>
                  <Button variant="outline">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default SellerCatalog;