import { useState } from "react";
import { motion } from "framer-motion";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/contexts/AppContext";
import { 
  AlertCircle, 
  HelpCircle, 
  Search,
  Book,
  CreditCard,
  Package,
  RefreshCw,
  Megaphone,
  Shield,
  Settings,
  MessageSquare,
  Phone,
  Mail,
  ExternalLink,
  Star,
  Clock,
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const helpCategories = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    description: 'Set up your store and start selling',
    icon: Book,
    color: 'primary',
    articles: 15
  },
  {
    id: 'payouts',
    title: 'Payouts & Finance',
    description: 'Understand payments and earnings',
    icon: CreditCard,
    color: 'flash',
    articles: 12
  },
  {
    id: 'catalog',
    title: 'Catalog Management',
    description: 'Add and manage your products',
    icon: Package,
    color: 'tertiary',
    articles: 18
  },
  {
    id: 'orders',
    title: 'Order Management',
    description: 'Process and fulfill orders',
    icon: RefreshCw,
    color: 'secondary',
    articles: 10
  },
  {
    id: 'promotions',
    title: 'Marketing & Promotions',
    description: 'Boost your sales with campaigns',
    icon: Megaphone,
    color: 'primary',
    articles: 8
  },
  {
    id: 'policies',
    title: 'Policies & Guidelines',
    description: 'Platform rules and regulations',
    icon: Shield,
    color: 'muted',
    articles: 6
  }
];

const popularArticles = [
  {
    id: 1,
    title: 'How to set up your seller account',
    category: 'Getting Started',
    views: 2540,
    helpful: 89,
    lastUpdated: '2024-12-15'
  },
  {
    id: 2,
    title: 'Understanding payout schedules and fees',
    category: 'Payouts & Finance',
    views: 1890,
    helpful: 92,
    lastUpdated: '2024-12-10'
  },
  {
    id: 3,
    title: 'Creating effective product listings',
    category: 'Catalog Management',
    views: 1650,
    helpful: 85,
    lastUpdated: '2024-12-08'
  },
  {
    id: 4,
    title: 'Managing inventory and stock levels',
    category: 'Catalog Management',
    views: 1420,
    helpful: 78,
    lastUpdated: '2024-12-05'
  }
];

const faqData = [
  {
    question: 'How long does it take to get approved as a seller?',
    answer: 'The seller approval process typically takes 2-3 business days. We review your business documents, verify your identity, and check your product listings. You\'ll receive an email notification once your account is approved.'
  },
  {
    question: 'What are the commission rates for different product categories?',
    answer: 'Commission rates vary by category: Electronics (5%), Fashion (8%), Home & Garden (6%), Books (10%), and Health & Beauty (7%). Premium sellers with high ratings may qualify for reduced rates.'
  },
  {
    question: 'When and how do I get paid?',
    answer: 'Payments are processed weekly every Tuesday for sales completed 7 days prior. You can choose between bank transfer (free) or instant payout (2% fee). Minimum payout threshold is $50.'
  },
  {
    question: 'How do I handle returns and refunds?',
    answer: 'Returns are automatically approved for eligible items within 30 days. Refunds are processed within 3-5 business days after we receive the returned item. You can set custom return policies for specific products.'
  },
  {
    question: 'Can I use my own shipping methods?',
    answer: 'Yes, you can use your preferred shipping carriers or integrate with our partner logistics providers. We also offer fulfillment services through Rassooq Prime for faster delivery times.'
  }
];

const SellerHelp = () => {
  const { currentRole } = useAuth();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [supportTicket, setSupportTicket] = useState({
    subject: '',
    description: '',
    category: ''
  });

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

  const handleSubmitTicket = () => {
    // In real app, this would submit the support ticket
    console.log('Support ticket submitted:', supportTicket);
    setSupportTicket({ subject: '', description: '', category: '' });
  };

  const filteredArticles = popularArticles.filter(article =>
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            Seller Help Center
          </h1>
          <p className="text-muted-foreground">Find answers, get support, and learn how to grow your business on Rassooq</p>
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
            <CardContent className="p-6">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Search for help articles, guides, and FAQs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 text-lg bg-background/50"
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Help Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="font-heading text-xl font-semibold mb-4">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {helpCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                whileHover={{ scale: 1.02 }}
                className="cursor-pointer"
                onClick={() => setSelectedCategory(category)}
              >
                <Card className="backdrop-blur-sm bg-gradient-to-br from-card to-card/50 border-0 shadow-card hover:shadow-glow transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-${category.color}/20`}>
                        <category.icon className={`h-6 w-6 text-${category.color}`} />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-1">{category.title}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{category.description}</p>
                        <div className="flex items-center justify-between">
                          <Badge variant="secondary" className="text-xs">
                            {category.articles} articles
                          </Badge>
                          <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Popular Articles */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-primary" />
                  Popular Articles
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredArticles.map((article) => (
                    <motion.div
                      key={article.id}
                      whileHover={{ scale: 1.01 }}
                      className="p-4 rounded-lg border border-border/50 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium mb-2 text-primary hover:underline">{article.title}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <Badge variant="outline" className="text-xs">{article.category}</Badge>
                            <span className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Updated {new Date(article.lastUpdated).toLocaleDateString()}
                            </span>
                            <span>{article.views} views</span>
                            <span className="flex items-center gap-1">
                              <CheckCircle className="h-3 w-3 text-primary" />
                              {article.helpful}% helpful
                            </span>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground" />
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Contact Support */}
            <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5 text-primary" />
                  Need More Help?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-primary hover:shadow-glow transition-all duration-300">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Create Support Ticket
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Create Support Ticket</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Subject</label>
                        <Input
                          value={supportTicket.subject}
                          onChange={(e) => setSupportTicket({...supportTicket, subject: e.target.value})}
                          placeholder="Brief description of your issue"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Category</label>
                        <Input
                          value={supportTicket.category}
                          onChange={(e) => setSupportTicket({...supportTicket, category: e.target.value})}
                          placeholder="e.g., Payouts, Orders, Technical"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Description</label>
                        <Textarea
                          value={supportTicket.description}
                          onChange={(e) => setSupportTicket({...supportTicket, description: e.target.value})}
                          placeholder="Detailed description of your issue"
                          rows={4}
                        />
                      </div>
                      <Button onClick={handleSubmitTicket} className="w-full">
                        Submit Ticket
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call Us
                  </Button>
                  <Button variant="outline" size="sm" className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                </div>
                
                <div className="text-center text-sm text-muted-foreground">
                  <p>Average response time: <span className="font-medium text-primary">2 hours</span></p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="backdrop-blur-sm bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-4">
                <h4 className="font-medium mb-3 text-primary">Help Center Stats</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Total Articles</span>
                    <span className="font-medium">69</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Last Updated</span>
                    <span className="font-medium">2 days ago</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Satisfaction Rate</span>
                    <span className="font-medium text-primary">94%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <Card className="backdrop-blur-sm bg-card/80 border-0 shadow-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-primary" />
                Frequently Asked Questions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqData.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </main>

      {/* Floating Help Button */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <Button
          size="lg"
          className="rounded-full h-14 w-14 bg-gradient-primary hover:shadow-glow shadow-lg"
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      </motion.div>

      <Footer />
    </div>
  );
};

export default SellerHelp;