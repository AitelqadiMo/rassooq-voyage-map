// Extended mock data for all Souq e-commerce features

// User and account data
export const mockUser = {
  id: "user_123",
  name: "Ahmed Al-Rashid", 
  email: "ahmed@example.com",
  phone: "+971 50 123 4567",
  avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
  isPlusSubscriber: true,
  joinDate: "2023-01-15"
};

export const mockAddresses = [
  {
    id: "addr_1",
    type: "home",
    label: "Home",
    name: "Ahmed Al-Rashid",
    phone: "+971 50 123 4567",
    street: "Sheikh Zayed Road, Building 123",
    area: "Business Bay",
    city: "Dubai",
    emirate: "Dubai",
    postalCode: "12345",
    isDefault: true,
    coordinates: { lat: 25.1972, lng: 55.2744 }
  },
  {
    id: "addr_2", 
    type: "work",
    label: "Office",
    name: "Ahmed Al-Rashid",
    phone: "+971 50 123 4567",
    street: "Downtown Dubai, Boulevard Plaza",
    area: "Downtown",
    city: "Dubai", 
    emirate: "Dubai",
    postalCode: "12346",
    isDefault: false,
    coordinates: { lat: 25.1975, lng: 55.2747 }
  }
];

// Orders and order history
export const mockOrders = [
  {
    id: "ORD_001",
    status: "delivered" as const,
    orderDate: "2024-01-15T10:30:00Z",
    deliveryDate: "2024-01-17T14:20:00Z",
    total: 599,
    items: [
      {
        id: "1",
        title: "Wireless Bluetooth Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=80&h=80&fit=crop",
        price: 299,
        quantity: 2,
        brand: "TechSound"
      }
    ],
    deliveryAddress: mockAddresses[0],
    paymentMethod: "Credit Card ending in 1234",
    trackingNumber: "TRK123456789"
  },
  {
    id: "ORD_002",
    status: "shipped" as const,
    orderDate: "2024-01-20T15:45:00Z",
    estimatedDelivery: "2024-01-22T18:00:00Z",
    total: 199,
    items: [
      {
        id: "2",
        title: "Smart Watch with Health Monitoring",
        image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=80&h=80&fit=crop",
        price: 199,
        quantity: 1,
        brand: "FitTech"
      }
    ],
    deliveryAddress: mockAddresses[1],
    paymentMethod: "Cash on Delivery",
    trackingNumber: "TRK987654321"
  },
  {
    id: "ORD_003",
    status: "processing" as const,
    orderDate: "2024-01-22T09:15:00Z",
    estimatedDelivery: "2024-01-25T17:00:00Z",
    total: 45,
    items: [
      {
        id: "3",
        title: "Premium Coffee Beans - Ethiopian Blend",
        image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=80&h=80&fit=crop",
        price: 45,
        quantity: 1,
        brand: "ArabicaCo"
      }
    ],
    deliveryAddress: mockAddresses[0],
    paymentMethod: "Credit Card ending in 5678"
  }
];

// Returns data
export const mockReturns = [
  {
    id: "RET_001",
    orderId: "ORD_001",
    itemId: "1",
    status: "approved" as const,
    reason: "Defective product",
    requestDate: "2024-01-18T10:00:00Z",
    refundAmount: 299,
    description: "One earcup stopped working after 2 days of use",
    images: ["https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"]
  }
];

// Cart data
export const mockCartItems = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    brand: "TechSound",
    price: 299,
    originalPrice: 399,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    quantity: 1,
    inStock: true,
    discount: 25
  },
  {
    id: "4",
    title: "Luxury Skincare Set - Anti-Aging Collection", 
    brand: "GlowBeauty",
    price: 159,
    originalPrice: 199,
    image: "https://images.unsplash.com/photo-1556228578-dd339928ed2d?w=200&h=200&fit=crop",
    quantity: 2,
    inStock: true,
    discount: 20
  }
];

// Delivery options
export const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery",
    description: "3-5 business days",
    price: 15,
    estimated: "Jan 25 - 27",
    icon: "📦"
  },
  {
    id: "express", 
    name: "Express Delivery",
    description: "1-2 business days",
    price: 25,
    estimated: "Jan 23 - 24", 
    icon: "⚡"
  },
  {
    id: "souq-plus",
    name: "Souq+ Free Delivery",
    description: "2-3 business days",
    price: 0,
    estimated: "Jan 24 - 26",
    icon: "👑",
    plusOnly: true
  }
];

// Payment methods
export const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    description: "Pay when you receive your order",
    icon: "💵",
    fee: 5
  },
  {
    id: "card",
    name: "Credit/Debit Card", 
    description: "Visa, Mastercard, Amex",
    icon: "💳",
    fee: 0
  }
];

// FAQ data
export const faqData = [
  {
    id: 1,
    category: "Orders",
    question: "How do I track my order?",
    answer: "You can track your order by going to 'My Orders' in your account and clicking on the order you want to track. You'll see real-time updates on your order status."
  },
  {
    id: 2,
    category: "Delivery",
    question: "What are the delivery charges?",
    answer: "Standard delivery is AED 15, Express delivery is AED 25. Souq+ members get free delivery on orders over AED 100."
  },
  {
    id: 3,
    category: "Returns",
    question: "How do I return an item?",
    answer: "You can return items within 30 days of delivery. Go to 'My Orders', find your order, and click 'Return Item'. Our team will guide you through the process."
  },
  {
    id: 4,
    category: "Payment",
    question: "What payment methods do you accept?",
    answer: "We accept Credit/Debit cards (Visa, Mastercard, Amex), Cash on Delivery, and digital wallets."
  },
  {
    id: 5,
    category: "Souq+",
    question: "What are the benefits of Souq+ membership?",
    answer: "Souq+ members enjoy free delivery, exclusive deals, early access to sales, and priority customer support."
  }
];

// Seller data
export const mockSellerData = {
  profile: {
    businessName: "TechMart Electronics",
    contactPerson: "Mohammed Hassan",
    email: "mohammed@techmart.com",
    phone: "+971 4 123 4567",
    tradeLicense: "DED-123456",
    status: "approved"
  },
  dashboard: {
    totalProducts: 156,
    activeOrders: 23,
    monthlyRevenue: 45600,
    pendingPayouts: 12300,
    rating: 4.7,
    totalReviews: 890
  },
  products: [
    {
      id: "SP_001",
      title: "Gaming Laptop - RTX 4060",
      price: 3499,
      stock: 15,
      sold: 8,
      status: "active",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=100&h=100&fit=crop"
    },
    {
      id: "SP_002", 
      title: "Wireless Mouse",
      price: 99,
      stock: 0,
      sold: 156,
      status: "out_of_stock",
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=100&h=100&fit=crop"
    }
  ],
  orders: [
    {
      id: "SO_001",
      product: "Gaming Laptop - RTX 4060",
      customer: "Ahmed Al-Mansouri",
      amount: 3499,
      status: "pending_shipment",
      orderDate: "2024-01-22T14:30:00Z"
    },
    {
      id: "SO_002",
      product: "Wireless Mouse", 
      customer: "Fatima Al-Zahra",
      amount: 99,
      status: "shipped",
      orderDate: "2024-01-21T09:15:00Z"
    }
  ]
};