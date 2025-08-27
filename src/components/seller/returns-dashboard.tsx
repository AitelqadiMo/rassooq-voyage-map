import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  RotateCcw, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  MessageSquare,
  AlertTriangle,
  TrendingUp,
  Camera
} from "lucide-react";
import { useState } from "react";

const mockReturns = [
  {
    id: "RMA-2024-001",
    orderId: "ORD-789456",
    customer: { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b692?w=100&h=100&fit=crop" },
    item: "Wireless Bluetooth Headphones",
    reason: "Defective product - no sound from left ear",
    status: "pending",
    createdAt: "2024-01-15T10:30:00Z",
    photos: 2,
    slaHours: 22,
    value: 299
  },
  {
    id: "RMA-2024-002", 
    orderId: "ORD-456123",
    customer: { name: "Mike Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    item: "Smart Watch Pro",
    reason: "Wrong size - need larger band",
    status: "approved",
    createdAt: "2024-01-14T15:20:00Z",
    photos: 1,
    slaHours: 8,
    value: 199
  },
  {
    id: "RMA-2024-003",
    orderId: "ORD-321987",
    customer: { name: "Emma Wilson", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    item: "Premium Coffee Beans",
    reason: "Package damaged during delivery",
    status: "reviewing",
    createdAt: "2024-01-13T09:45:00Z",
    photos: 3,
    slaHours: 4,
    value: 45
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "pending": return "warning";
    case "approved": return "success";
    case "rejected": return "destructive";
    case "reviewing": return "secondary";
    default: return "secondary";
  }
};

const getStatusIcon = (status: string) => {
  switch (status) {
    case "pending": return <Clock className="w-4 h-4" />;
    case "approved": return <CheckCircle className="w-4 h-4" />;
    case "rejected": return <XCircle className="w-4 h-4" />;
    case "reviewing": return <Eye className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

export const ReturnsDashboard = () => {
  const [selectedReturn, setSelectedReturn] = useState<string | null>(null);

  const stats = {
    total: mockReturns.length,
    pending: mockReturns.filter(r => r.status === "pending").length,
    approved: mockReturns.filter(r => r.status === "approved").length,
    avgResolutionTime: "18 hours"
  };

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
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
                  <p className="text-sm font-medium text-muted-foreground">Total Returns</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
                <RotateCcw className="w-8 h-8 text-primary" />
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
                  <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                  <p className="text-2xl font-bold text-warning">{stats.pending}</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-warning" />
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
                  <p className="text-sm font-medium text-muted-foreground">Approved</p>
                  <p className="text-2xl font-bold text-success">{stats.approved}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-success" />
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
                  <p className="text-sm font-medium text-muted-foreground">Avg Resolution</p>
                  <p className="text-2xl font-bold">{stats.avgResolutionTime}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-accent" />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Returns List */}
      <Card className="glass-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <RotateCcw className="w-5 h-5" />
            Return Requests
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockReturns.map((returnItem, index) => (
              <motion.div
                key={returnItem.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="p-4 border border-border/50 rounded-xl hover:shadow-medium transition-spring glass-panel"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4 flex-1">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage src={returnItem.customer.avatar} />
                      <AvatarFallback>{returnItem.customer.name[0]}</AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <h4 className="font-semibold text-foreground">{returnItem.id}</h4>
                        <Badge variant={getStatusColor(returnItem.status) as any} className="flex items-center gap-1">
                          {getStatusIcon(returnItem.status)}
                          {returnItem.status}
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-1">
                        Order: {returnItem.orderId} • Customer: {returnItem.customer.name}
                      </p>
                      
                      <p className="font-medium text-foreground mb-2">{returnItem.item}</p>
                      
                      <p className="text-sm text-muted-foreground mb-3">{returnItem.reason}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Camera className="w-3 h-3" />
                          {returnItem.photos} photos
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {returnItem.slaHours}h remaining
                        </span>
                        <span className="font-medium text-foreground">
                          ${returnItem.value}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 ml-4">
                    <Button 
                      size="sm" 
                      variant="outline"
                      className="hover:shadow-medium transition-spring"
                      onClick={() => setSelectedReturn(returnItem.id)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      Review
                    </Button>
                    
                    {returnItem.status === "pending" && (
                      <>
                        <Button 
                          size="sm"
                          className="hover:shadow-glow transition-spring"
                        >
                          <CheckCircle className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="destructive"
                          className="hover:shadow-medium transition-spring"
                        >
                          <XCircle className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </>
                    )}
                    
                    <Button 
                      size="sm" 
                      variant="ghost"
                      className="hover:shadow-medium transition-spring"
                    >
                      <MessageSquare className="w-4 h-4" />
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