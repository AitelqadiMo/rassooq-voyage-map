import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AppContext";
import { 
  AlertCircle, 
  Search, 
  Send, 
  Paperclip, 
  Star,
  Clock,
  CheckCircle,
  Package,
  User,
  Filter
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const mockConversations = [
  {
    id: 1,
    buyerName: "Sarah Ahmed",
    lastMessage: "When will my order be shipped?",
    orderId: "RSQ-2024-001",
    productName: "Premium Leather Handbag",
    timestamp: "2 hours ago",
    unread: true,
    status: "active"
  },
  {
    id: 2,
    buyerName: "Mohammed Ali",
    lastMessage: "Thank you for the quick response!",
    orderId: "RSQ-2024-002",
    productName: "Wireless Headphones",
    timestamp: "1 day ago",
    unread: false,
    status: "resolved"
  },
  {
    id: 3,
    buyerName: "Fatima Hassan",
    lastMessage: "Can I exchange this item?",
    orderId: "RSQ-2024-003",
    productName: "Cotton T-Shirt",
    timestamp: "3 days ago",
    unread: true,
    status: "pending"
  }
];

const mockMessages = [
  {
    id: 1,
    sender: "buyer",
    message: "Hi, I ordered a handbag 3 days ago but haven't received any shipping updates. Can you help?",
    timestamp: "10:30 AM",
    isRead: true
  },
  {
    id: 2,
    sender: "seller",
    message: "Hello Sarah! Thank you for reaching out. Let me check your order status right away.",
    timestamp: "10:32 AM",
    isRead: true
  },
  {
    id: 3,
    sender: "seller",
    message: "Great news! Your order has been packed and will be shipped today. You'll receive tracking details within 2 hours.",
    timestamp: "10:35 AM",
    isRead: true
  },
  {
    id: 4,
    sender: "buyer",
    message: "That's wonderful! Thank you for the quick response.",
    timestamp: "10:45 AM",
    isRead: false
  }
];

const quickReplies = [
  "Your order is being processed and will ship within 24 hours.",
  "We've issued a full refund. It will appear in your account within 3-5 business days.",
  "Thank you for your purchase! Your tracking number is: [TRACKING_NUMBER]",
  "We're sorry for the inconvenience. Let me resolve this for you right away.",
  "Your return has been approved. Please use the prepaid label to send the item back."
];

const SellerMessages = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [messageText, setMessageText] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  if (currentRole !== 'seller') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Access Restricted</h3>
            <Button onClick={() => navigate('/')}>Go Home</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In real app, this would send the message
      setMessageText("");
    }
  };

  const filteredConversations = mockConversations.filter(conv =>
    conv.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.orderId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted/20">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="font-heading text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent mb-2">
            Messages & Support
          </h1>
          <p className="text-muted-foreground">Communicate with your customers and provide excellent support</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-300px)]">
          {/* Conversations Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-4"
          >
            <Card className="h-full backdrop-blur-sm bg-card/80 border-0 shadow-card">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center text-lg">
                    <User className="h-5 w-5 mr-2 text-primary" />
                    Conversations
                  </CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-background/50"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-2 max-h-[500px] overflow-y-auto">
                  {filteredConversations.map((conversation) => (
                    <motion.div
                      key={conversation.id}
                      whileHover={{ scale: 1.02 }}
                      className={`p-4 cursor-pointer transition-all duration-200 border-l-4 ${
                        selectedConversation.id === conversation.id
                          ? 'bg-primary/10 border-l-primary'
                          : 'hover:bg-muted/50 border-l-transparent'
                      }`}
                      onClick={() => setSelectedConversation(conversation)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm truncate">{conversation.buyerName}</p>
                            {conversation.unread && (
                              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground truncate mb-2">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge 
                              variant={conversation.status === 'active' ? 'default' : 'secondary'}
                              className="text-xs"
                            >
                              {conversation.status}
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              {conversation.timestamp}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Chat Window */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-8"
          >
            <Card className="h-full backdrop-blur-sm bg-card/80 border-0 shadow-card flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b border-border/50">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-lg">{selectedConversation.buyerName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Package className="h-4 w-4" />
                        {selectedConversation.orderId}
                      </span>
                      <span>{selectedConversation.productName}</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    <Star className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0 overflow-hidden">
                <div className="h-full flex flex-col">
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {mockMessages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'seller' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[70%] rounded-lg px-4 py-2 ${
                            message.sender === 'seller'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-secondary text-secondary-foreground'
                          }`}
                        >
                          <p className="text-sm">{message.message}</p>
                          <div className="flex items-center justify-between mt-1">
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                            {message.sender === 'seller' && (
                              <CheckCircle className="h-3 w-3 opacity-70" />
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Quick Replies */}
                  <div className="px-4 py-2 border-t border-border/50 bg-muted/20">
                    <p className="text-xs text-muted-foreground mb-2">Quick Replies:</p>
                    <div className="flex flex-wrap gap-2">
                      {quickReplies.slice(0, 3).map((reply, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          size="sm"
                          className="text-xs h-7"
                          onClick={() => setMessageText(reply)}
                        >
                          {reply.length > 30 ? reply.substring(0, 30) + '...' : reply}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-4 border-t border-border/50">
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Paperclip className="h-4 w-4" />
                      </Button>
                      <div className="flex-1 relative">
                        <Textarea
                          placeholder="Type your message..."
                          value={messageText}
                          onChange={(e) => setMessageText(e.target.value)}
                          className="min-h-[40px] max-h-32 resize-none pr-12"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault();
                              handleSendMessage();
                            }
                          }}
                        />
                        <Button
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={handleSendMessage}
                          disabled={!messageText.trim()}
                        >
                          <Send className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default SellerMessages;