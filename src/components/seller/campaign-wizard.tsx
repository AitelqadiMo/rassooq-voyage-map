import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { 
  Zap, 
  Target, 
  Gift, 
  Megaphone, 
  Calendar, 
  DollarSign,
  Users,
  TrendingUp,
  Settings,
  Check,
  ChevronRight
} from "lucide-react";
import { useState } from "react";

const campaignTypes = [
  {
    id: "discount",
    title: "Percentage Discount",
    description: "Offer percentage off on selected products",
    icon: <DollarSign className="w-6 h-6" />,
    color: "bg-gradient-primary"
  },
  {
    id: "flash-sale",
    title: "Flash Sale",
    description: "Limited time deals with countdown",
    icon: <Zap className="w-6 h-6" />,
    color: "bg-gradient-flash"
  },
  {
    id: "bundle",
    title: "Bundle Deal",
    description: "Buy multiple products for discounted price",
    icon: <Gift className="w-6 h-6" />,
    color: "bg-gradient-premium"
  },
  {
    id: "targeted",
    title: "Targeted Promotion",
    description: "Promote to specific customer segments",
    icon: <Target className="w-6 h-6" />,
    color: "bg-gradient-hero"
  }
];

const activeCampaigns = [
  {
    id: "1",
    name: "Winter Sale 2024",
    type: "Percentage Discount",
    status: "active",
    clicks: 2450,
    conversions: 187,
    revenue: 12870,
    endDate: "2024-02-15"
  },
  {
    id: "2", 
    name: "Flash Weekend Deal",
    type: "Flash Sale",
    status: "active", 
    clicks: 892,
    conversions: 67,
    revenue: 4290,
    endDate: "2024-01-21"
  },
  {
    id: "3",
    name: "Bundle Electronics",
    type: "Bundle Deal", 
    status: "draft",
    clicks: 0,
    conversions: 0,
    revenue: 0,
    endDate: "2024-02-01"
  }
];

export const CampaignWizard = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div className="space-y-6">
      {/* Campaign Stats */}
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
                  <p className="text-sm font-medium text-muted-foreground">Active Campaigns</p>
                  <p className="text-2xl font-bold">2</p>
                </div>
                <Megaphone className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Total Clicks</p>
                  <p className="text-2xl font-bold">3,342</p>
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
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-2xl font-bold">7.6%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-success" />
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
                  <p className="text-sm font-medium text-muted-foreground">Revenue</p>
                  <p className="text-2xl font-bold">$17,160</p>
                </div>
                <DollarSign className="w-8 h-8 text-tertiary" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Campaign Creation */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="w-5 h-5" />
            Create New Campaign
          </CardTitle>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Choose Campaign Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaignTypes.map((type, index) => (
                  <motion.div
                    key={type.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className={`p-6 rounded-xl border-2 cursor-pointer transition-spring hover:shadow-premium ${
                      selectedType === type.id 
                        ? 'border-primary shadow-premium' 
                        : 'border-border/50 hover:border-primary/50'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className={`w-12 h-12 rounded-lg ${type.color} flex items-center justify-center text-white mb-4`}>
                      {type.icon}
                    </div>
                    <h4 className="font-semibold mb-2">{type.title}</h4>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                    {selectedType === type.id && (
                      <div className="mt-4 flex items-center gap-2 text-primary">
                        <Check className="w-4 h-4" />
                        <span className="text-sm font-medium">Selected</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
              
              {selectedType && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-end"
                >
                  <Button 
                    onClick={() => setCurrentStep(2)}
                    className="hover:shadow-glow transition-spring"
                  >
                    Continue
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </motion.div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <h3 className="text-lg font-semibold">Campaign Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Campaign Name</label>
                    <Input placeholder="e.g., Summer Electronics Sale" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Discount Percentage</label>
                    <Input placeholder="e.g., 25" type="number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Start Date</label>
                    <Input type="date" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Target Audience</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Customers</SelectItem>
                        <SelectItem value="new">New Customers</SelectItem>
                        <SelectItem value="returning">Returning Customers</SelectItem>
                        <SelectItem value="vip">VIP Customers</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Budget Limit</label>
                    <Input placeholder="e.g., 5000" type="number" />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">End Date</label>
                    <Input type="date" />
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Campaign Description</label>
                <Textarea placeholder="Describe your campaign for customers..." rows={3} />
              </div>
              
              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setCurrentStep(1)}>
                  Back
                </Button>
                <Button className="hover:shadow-glow transition-spring">
                  Create Campaign
                  <Settings className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {/* Active Campaigns */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            Active Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {activeCampaigns.map((campaign, index) => (
              <motion.div
                key={campaign.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-border/50 rounded-xl hover:shadow-medium transition-spring glass-panel"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold">{campaign.name}</h4>
                      <Badge variant={campaign.status === "active" ? "default" : "secondary"}>
                        {campaign.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{campaign.type}</p>
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground">Clicks</p>
                        <p className="font-semibold">{campaign.clicks.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Conversions</p>
                        <p className="font-semibold">{campaign.conversions}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Revenue</p>
                        <p className="font-semibold">${campaign.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Ends</p>
                        <p className="font-semibold">{campaign.endDate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="outline">
                      <Settings className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm">
                      View Details
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};