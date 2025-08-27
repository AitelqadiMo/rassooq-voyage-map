import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/contexts/AppContext";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus, 
  Search, 
  Filter,
  Edit,
  Eye,
  MoreHorizontal,
  AlertCircle,
  Package,
  TrendingUp,
  TrendingDown
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const SellerProducts = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("created");

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

  // Mock products data
  const products = [
    {
      id: "1",
      name: "Samsung Galaxy S24 Ultra",
      sku: "SGS24U-256-BLK",
      category: "Electronics",
      price: 4999,
      stock: 25,
      status: "published",
      views: 1250,
      sales: 12,
      image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=80&h=80&fit=crop",
      created: "2024-01-15"
    },
    {
      id: "2", 
      name: "Traditional Moroccan Kaftan",
      sku: "TMK-001-RED",
      category: "Fashion",
      price: 899,
      stock: 15,
      status: "published",
      views: 890,
      sales: 8,
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=80&h=80&fit=crop",
      created: "2024-01-10"
    },
    {
      id: "3",
      name: "Premium Argan Oil Set",
      sku: "AOS-PREM-100",
      category: "Beauty",
      price: 299,
      stock: 0,
      status: "out_of_stock",
      views: 456,
      sales: 23,
      image: "https://images.unsplash.com/photo-1556228578-dd7f2b4cd4cd?w=80&h=80&fit=crop",
      created: "2024-01-05"
    },
    {
      id: "4",
      name: "Handwoven Berber Carpet",
      sku: "HBC-L-BLU",
      category: "Home & Decor",
      price: 1599,
      stock: 8,
      status: "draft",
      views: 234,
      sales: 0,
      image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=80&h=80&fit=crop",
      created: "2024-01-12"
    },
    {
      id: "5",
      name: "Moroccan Mint Tea Blend",
      sku: "MTB-ORG-500",
      category: "Food & Beverages",
      price: 85,
      stock: 45,
      status: "pending",
      views: 167,
      sales: 5,
      image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=80&h=80&fit=crop",
      created: "2024-01-08"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "published":
        return <Badge className="bg-success text-success-foreground">Published</Badge>;
      case "draft":
        return <Badge variant="secondary">Draft</Badge>;
      case "pending":
        return <Badge className="bg-warning text-warning-foreground">Pending Review</Badge>;
      case "out_of_stock":
        return <Badge variant="destructive">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleQuickEdit = (productId: string, field: string, value: string) => {
    toast({
      title: "Product Updated",
      description: `${field} has been updated successfully.`,
    });
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-foreground">Product Management</h1>
            <p className="text-muted-foreground">Manage your product catalog and inventory</p>
          </div>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link to="/seller/catalog/products/new">
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search products by name or SKU..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="out_of_stock">Out of Stock</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="created">Date Created</SelectItem>
                  <SelectItem value="name">Product Name</SelectItem>
                  <SelectItem value="price">Price</SelectItem>
                  <SelectItem value="stock">Stock Level</SelectItem>
                  <SelectItem value="sales">Sales</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Package className="h-5 w-5 mr-2" />
              Products ({filteredProducts.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Product</TableHead>
                    <TableHead>SKU</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Price</TableHead>
                    <TableHead>Stock</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Performance</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProducts.map((product) => (
                    <TableRow key={product.id}>
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-10 h-10 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium">{product.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Created {new Date(product.created).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                      <TableCell>{product.category}</TableCell>
                      <TableCell className="font-medium">{product.price} MAD</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className={product.stock === 0 ? "text-destructive" : product.stock < 10 ? "text-warning" : ""}>
                            {product.stock}
                          </span>
                          {product.stock < 10 && product.stock > 0 && (
                            <AlertCircle className="h-4 w-4 text-warning" />
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(product.status)}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <Eye className="h-4 w-4 mr-1 text-muted-foreground" />
                            {product.views}
                          </div>
                          <div className="flex items-center">
                            {product.sales > 10 ? (
                              <TrendingUp className="h-4 w-4 mr-1 text-success" />
                            ) : (
                              <TrendingDown className="h-4 w-4 mr-1 text-muted-foreground" />
                            )}
                            {product.sales} sold
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                          >
                            <Link to={`/seller/catalog/products/${product.id}`}>
                              <Edit className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => window.open(`/p/${product.id}`, '_blank')}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
                <p className="text-muted-foreground mb-4">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your filters or search terms"
                    : "Start by adding your first product to the catalog"
                  }
                </p>
                <Button asChild>
                  <Link to="/seller/catalog/products/new">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Product
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  );
};

export default SellerProducts;