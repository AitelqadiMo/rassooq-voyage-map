import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useState } from "react";
import { User, MapPin, Shield, CreditCard, Crown, Settings as SettingsIcon, Package, Heart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Profile = () => {
  const { toast } = useToast();
  const [name, setName] = useState("Rassooq User");
  const [phone, setPhone] = useState("+966 55 123 4567");
  const [email, setEmail] = useState("user@rassooq.com");
  const [gender, setGender] = useState("");
  const [birth, setBirth] = useState("");
  const [addresses, setAddresses] = useState<Array<{ id: string; line: string; isDefault: boolean }>>([
    { id: 'addr1', line: '123 King Fahd Road, Riyadh 12345, Saudi Arabia', isDefault: true },
    { id: 'addr2', line: '456 Olaya Street, Riyadh 11564, Saudi Arabia', isDefault: false },
  ]);
  const [newAddress, setNewAddress] = useState("");
  
  const addAddress = () => { 
    if (!newAddress.trim()) return; 
    setAddresses(a => [...a, { id: 'addr'+Date.now(), line: newAddress, isDefault: false }]); 
    setNewAddress(""); 
    toast({ title: "Address added successfully" });
  };
  
  const removeAddress = (id: string) => {
    setAddresses(a => a.filter(x => x.id !== id));
    toast({ title: "Address removed" });
  };

  const setDefaultAddress = (id: string) => {
    setAddresses(a => a.map(addr => ({ ...addr, isDefault: addr.id === id })));
    toast({ title: "Default address updated" });
  };

  const handleSaveProfile = () => {
    toast({ title: "Profile updated successfully", description: "Your changes have been saved." });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-mesh">
      <Header />
      <main className="flex-1 container mx-auto px-4 py-12">
        {/* Profile Header */}
        <div className="glass-premium rounded-3xl p-8 mb-8 hover-float">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="relative group">
              <Avatar className="w-24 h-24 border-4 border-primary/20 transition-all duration-300 group-hover:border-primary/40">
                <AvatarFallback className="bg-gradient-primary text-primary-foreground text-2xl font-bold">
                  {name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center cursor-pointer">
                <User className="w-6 h-6 text-primary" />
              </div>
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-display font-bold text-foreground mb-2">{name}</h1>
              <p className="text-muted-foreground mb-4">{email}</p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="bg-gradient-primary border-0">
                  <Crown className="w-3 h-3 mr-1" />
                  Rassooq+ Member
                </Badge>
                <Badge variant="outline" className="border-tertiary text-tertiary">
                  <Shield className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </div>

        <Tabs defaultValue="details" className="space-y-8">
          <TabsList className="glass-nav p-2 h-auto gap-2 bg-transparent border border-border/20">
            <TabsTrigger value="details" className="nav-item rounded-xl">
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="addresses" className="nav-item rounded-xl">
              <MapPin className="w-4 h-4" />
              Addresses
            </TabsTrigger>
            <TabsTrigger value="orders" className="nav-item rounded-xl">
              <Package className="w-4 h-4" />
              Orders
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="nav-item rounded-xl">
              <Heart className="w-4 h-4" />
              Wishlist
            </TabsTrigger>
            <TabsTrigger value="payments" className="nav-item rounded-xl">
              <CreditCard className="w-4 h-4" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="plus" className="nav-item rounded-xl">
              <Crown className="w-4 h-4" />
              Rassooq+
            </TabsTrigger>
            <TabsTrigger value="settings" className="nav-item rounded-xl">
              <SettingsIcon className="w-4 h-4" />
              Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Personal Details</CardTitle>
                <p className="text-muted-foreground">Update your personal information and preferences.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Full Name</Label>
                    <Input 
                      value={name} 
                      onChange={(e)=>setName(e.target.value)}
                      className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Phone Number</Label>
                    <Input 
                      value={phone} 
                      onChange={(e)=>setPhone(e.target.value)}
                      className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="+966 55 123 4567"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Email Address</Label>
                    <Input 
                      type="email" 
                      value={email} 
                      onChange={(e)=>setEmail(e.target.value)}
                      className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Gender (Optional)</Label>
                    <Input 
                      placeholder="Select gender" 
                      value={gender} 
                      onChange={(e)=>setGender(e.target.value)}
                      className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label className="text-sm font-medium text-foreground">Date of Birth</Label>
                    <Input 
                      type="date" 
                      value={birth} 
                      onChange={(e)=>setBirth(e.target.value)}
                      className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all w-full md:w-auto"
                    />
                  </div>
                </div>
                <div className="pt-4">
                  <Button 
                    onClick={handleSaveProfile}
                    className="bg-gradient-primary border-0 hover-premium px-8 py-2.5 font-medium"
                  >
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="addresses" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Manage Addresses</CardTitle>
                <p className="text-muted-foreground">Add and manage your delivery addresses.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  {addresses.map(addr => (
                    <div key={addr.id} className="glass-panel p-4 rounded-xl hover-lift">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <MapPin className="w-4 h-4 text-primary" />
                            {addr.isDefault && (
                              <Badge variant="secondary" className="bg-primary/10 text-primary border-0 text-xs">
                                Default
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-foreground font-medium">{addr.line}</p>
                        </div>
                        <div className="flex gap-2 ml-4">
                          {!addr.isDefault && (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              onClick={() => setDefaultAddress(addr.id)}
                              className="border-primary/20 text-primary hover:bg-primary/10"
                            >
                              Set Default
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            onClick={() => removeAddress(addr.id)}
                            className="border-destructive/20 text-destructive hover:bg-destructive/10"
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">Add New Address</Label>
                    <div className="flex gap-3">
                      <Input 
                        placeholder="Enter complete address with area and postal code" 
                        value={newAddress} 
                        onChange={(e) => setNewAddress(e.target.value)}
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all flex-1"
                      />
                      <Button 
                        onClick={addAddress}
                        className="bg-gradient-primary border-0 hover-premium px-6"
                      >
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Order History</CardTitle>
                <p className="text-muted-foreground">Track your recent orders and purchases.</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="glass-panel p-4 rounded-xl hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">#RS-10001</p>
                        <p className="text-sm text-muted-foreground">Ordered on Dec 15, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-tertiary/10 text-tertiary border-0">Delivered</Badge>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                          View Details
                        </Button>
                        <Button size="sm" className="bg-gradient-primary border-0">
                          Return Item
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="glass-panel p-4 rounded-xl hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-muted rounded-xl flex items-center justify-center">
                        <Package className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">#RS-10002</p>
                        <p className="text-sm text-muted-foreground">Ordered on Dec 10, 2024</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge className="bg-destructive/10 text-destructive border-0">Cancelled</Badge>
                      <Button size="sm" variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                        View Details
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="wishlist" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Wishlist</CardTitle>
                <p className="text-muted-foreground">Items you've saved for later.</p>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Your wishlist is waiting to be filled with amazing products.</p>
                  <Button variant="outline" className="border-primary/20 text-primary hover:bg-primary/10">
                    Browse Products
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Payment Methods</CardTitle>
                <p className="text-muted-foreground">Manage your saved payment options.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="glass-panel p-4 rounded-xl hover-lift">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                        <CreditCard className="w-5 h-5 text-primary-foreground" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
                        <p className="text-sm text-muted-foreground">VISA • Expires 12/27</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="border-destructive/20 text-destructive hover:bg-destructive/10">
                      Remove
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Add New Card</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Cardholder Name</Label>
                      <Input 
                        placeholder="Full name on card" 
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Card Number</Label>
                      <Input 
                        placeholder="1234 5678 9012 3456" 
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Expiry Date</Label>
                      <Input 
                        placeholder="MM/YY" 
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">CVV</Label>
                      <Input 
                        placeholder="123" 
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Checkbox id="savecard" />
                    <label htmlFor="savecard" className="text-sm text-foreground">
                      Save card securely for future purchases
                    </label>
                  </div>
                  <Button className="bg-gradient-primary border-0 hover-premium">
                    Add Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plus" className="animate-fade-in">
            <Card className="glass-premium border-0 shadow-premium overflow-hidden">
              <div className="bg-gradient-primary p-8 text-primary-foreground">
                <div className="flex items-center gap-3 mb-4">
                  <Crown className="w-8 h-8" />
                  <h2 className="text-3xl font-display font-bold">Rassooq+</h2>
                </div>
                <p className="text-primary-foreground/90 text-lg">Premium membership benefits</p>
              </div>
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-medium text-foreground">Membership Status</span>
                    <Badge className="bg-tertiary/10 text-tertiary border-0 px-3 py-1">Active</Badge>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="glass-panel p-4 rounded-xl text-center">
                      <Package className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Free Delivery</p>
                      <p className="text-sm text-muted-foreground">On all orders</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                      <Shield className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Priority Support</p>
                      <p className="text-sm text-muted-foreground">24/7 assistance</p>
                    </div>
                    <div className="glass-panel p-4 rounded-xl text-center">
                      <Crown className="w-8 h-8 text-primary mx-auto mb-2" />
                      <p className="font-medium text-foreground">Exclusive Deals</p>
                      <p className="text-sm text-muted-foreground">Member-only offers</p>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <Button className="bg-gradient-primary border-0 hover-premium">
                      Renew Membership
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="animate-fade-in">
            <Card className="glass-card border-0 shadow-premium">
              <CardHeader className="pb-6">
                <CardTitle className="text-2xl font-display">Account Settings</CardTitle>
                <p className="text-muted-foreground">Manage your account security and preferences.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Security</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">Current Password</Label>
                      <Input 
                        type="password" 
                        placeholder="Enter current password"
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">New Password</Label>
                      <Input 
                        type="password" 
                        placeholder="Enter new password"
                        className="glass-panel border-0 focus:ring-2 focus:ring-primary/20 transition-all"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">Notifications</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Checkbox id="news" />
                      <label htmlFor="news" className="text-sm text-foreground">
                        Email me about promotions and special offers
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="sms" />
                      <label htmlFor="sms" className="text-sm text-foreground">
                        SMS notifications for order updates
                      </label>
                    </div>
                    <div className="flex items-center gap-3">
                      <Checkbox id="newsletter" />
                      <label htmlFor="newsletter" className="text-sm text-foreground">
                        Subscribe to newsletter and product updates
                      </label>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4">
                  <Button className="bg-gradient-primary border-0 hover-premium">
                    Update Settings
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

export default Profile;