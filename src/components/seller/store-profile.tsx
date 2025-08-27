import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Store, 
  Camera, 
  Globe, 
  Instagram, 
  Facebook,
  Twitter,
  Star,
  Users,
  Package,
  TrendingUp,
  Settings,
  Eye,
  Upload,
  Edit3
} from "lucide-react";
import { useState } from "react";

const storeData = {
  name: "TechWorld Electronics",
  logo: "https://images.unsplash.com/photo-1542909168-82c3e7fdca5c?w=120&h=120&fit=crop",
  banner: "https://images.unsplash.com/photo-1520975661595-6453be3f7070?w=1400&h=400&fit=crop",
  description: "Your trusted destination for the latest electronics and gadgets. We bring you cutting-edge technology at unbeatable prices with premium customer service.",
  rating: 4.8,
  totalRatings: 2456,
  followers: 15200,
  products: 342,
  website: "www.techworld.com",
  socialMedia: {
    instagram: "@techworld_official",
    facebook: "TechWorldElectronics",
    twitter: "@techworld"
  },
  policies: {
    shipping: "Free shipping on orders over $50. Same-day delivery available in major cities.",
    returns: "30-day hassle-free returns. No questions asked.",
    warranty: "Extended warranty available on all electronics."
  }
};

export const StoreProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  return (
    <div className="space-y-6">
      {/* Store Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="glass-card hover:shadow-premium transition-spring">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Store Rating</p>
                  <div className="flex items-center gap-1">
                    <p className="text-2xl font-bold">{storeData.rating}</p>
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  </div>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="glass-card hover:shadow-premium transition-spring">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Followers</p>
                  <p className="text-2xl font-bold">{storeData.followers.toLocaleString()}</p>
                </div>
                <Users className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="glass-card hover:shadow-premium transition-spring">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Products</p>
                  <p className="text-2xl font-bold">{storeData.products}</p>
                </div>
                <Package className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card className="glass-card hover:shadow-premium transition-spring">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Growth</p>
                  <p className="text-2xl font-bold text-success">+24%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Store Configuration */}
      <Card className="glass-card">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Store className="w-5 h-5" />
            Store Profile
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setPreviewMode(!previewMode)}
            >
              <Eye className="w-4 h-4 mr-2" />
              {previewMode ? "Edit Mode" : "Preview"}
            </Button>
            <Button 
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {isEditing ? "Save" : "Edit"}
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {previewMode ? (
            // Store Preview
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Store Banner */}
              <div className="relative h-48 md:h-64 rounded-xl overflow-hidden">
                <img 
                  src={storeData.banner} 
                  alt="Store banner"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-16 h-16 border-4 border-white/20">
                      <AvatarImage src={storeData.logo} />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <div>
                      <h2 className="text-2xl font-bold">{storeData.name}</h2>
                      <div className="flex items-center gap-2 text-sm">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        {storeData.rating} ({storeData.totalRatings.toLocaleString()} reviews)
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Store Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">About Our Store</h3>
                  <p className="text-muted-foreground">{storeData.description}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Store Policies</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-medium">Shipping:</span> {storeData.policies.shipping}</p>
                    <p><span className="font-medium">Returns:</span> {storeData.policies.returns}</p>
                    <p><span className="font-medium">Warranty:</span> {storeData.policies.warranty}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h3 className="font-semibold mb-3">Connect With Us</h3>
                <div className="flex items-center gap-4">
                  <Button variant="outline" size="sm">
                    <Globe className="w-4 h-4 mr-2" />
                    {storeData.website}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Instagram className="w-4 h-4 mr-2" />
                    {storeData.socialMedia.instagram}
                  </Button>
                  <Button variant="outline" size="sm">
                    <Facebook className="w-4 h-4 mr-2" />
                    {storeData.socialMedia.facebook}
                  </Button>
                </div>
              </div>
            </motion.div>
          ) : (
            // Edit Form
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              {/* Store Images */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Logo</label>
                  <div className="relative">
                    <Avatar className="w-24 h-24 mb-4">
                      <AvatarImage src={storeData.logo} />
                      <AvatarFallback>TW</AvatarFallback>
                    </Avatar>
                    <Button size="sm" variant="outline">
                      <Upload className="w-4 h-4 mr-2" />
                      Change Logo
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Store Banner</label>
                  <div className="relative h-32 rounded-lg overflow-hidden mb-4">
                    <img 
                      src={storeData.banner} 
                      alt="Store banner"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button size="sm" variant="outline">
                    <Camera className="w-4 h-4 mr-2" />
                    Change Banner
                  </Button>
                </div>
              </div>

              {/* Store Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Store Name</label>
                    <Input defaultValue={storeData.name} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Website</label>
                    <Input defaultValue={storeData.website} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Description</label>
                    <Textarea 
                      defaultValue={storeData.description} 
                      disabled={!isEditing}
                      rows={4}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Instagram</label>
                    <Input defaultValue={storeData.socialMedia.instagram} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Facebook</label>
                    <Input defaultValue={storeData.socialMedia.facebook} disabled={!isEditing} />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Twitter</label>
                    <Input defaultValue={storeData.socialMedia.twitter} disabled={!isEditing} />
                  </div>
                </div>
              </div>

              {/* Store Policies */}
              <div>
                <h3 className="font-semibold mb-4">Store Policies</h3>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Shipping Policy</label>
                    <Textarea 
                      defaultValue={storeData.policies.shipping} 
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Return Policy</label>
                    <Textarea 
                      defaultValue={storeData.policies.returns} 
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Warranty Policy</label>
                    <Textarea 
                      defaultValue={storeData.policies.warranty} 
                      disabled={!isEditing}
                      rows={2}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};