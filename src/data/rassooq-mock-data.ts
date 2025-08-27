// Comprehensive mock data for Rassooq marketplace

// Categories with Moroccan/MENA focus
export const categories = [
  {
    id: "fashion",
    title: "Fashion & Beauty",
    titleAr: "الأزياء والجمال",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    itemCount: 25600,
    icon: "👗"
  },
  {
    id: "electronics",
    title: "Electronics",
    titleAr: "الإلكترونيات",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
    itemCount: 18900,
    icon: "📱"
  },
  {
    id: "grocery",
    title: "Grocery & Food",
    titleAr: "البقالة والطعام",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    itemCount: 45300,
    icon: "🛒"
  },
  {
    id: "home",
    title: "Home & Garden",
    titleAr: "المنزل والحديقة",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    itemCount: 32100,
    icon: "🏠"
  },
  {
    id: "traditional",
    title: "Traditional Crafts",
    titleAr: "الحرف التقليدية",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    itemCount: 8750,
    icon: "🏺"
  },
  {
    id: "sports",
    title: "Sports & Fitness",
    titleAr: "الرياضة واللياقة",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    itemCount: 12400,
    icon: "⚽"
  }
];

// Products with MENA-relevant items
export const products = [
  {
    id: "1",
    title: "Traditional Moroccan Lamp - Handcrafted Brass",
    titleAr: "مصباح مغربي تقليدي - نحاس مصنوع يدوياً",
    brand: "Artisan Marrakech",
    brandAr: "حرفي مراكش",
    price: 180,
    originalPrice: 220,
    currency: "MAD",
    rating: 4.8,
    reviewCount: 156,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1571121149283-8c23a0f8c6ba?w=400&h=400&fit=crop"
    ],
    discount: 18,
    isFlashSale: true,
    badges: ["Handcrafted", "Official Store"],
    category: "traditional",
    inStock: true,
    stock: 15,
    seller: {
      name: "Marrakech Artisans",
      isOfficial: true,
      rating: 4.7
    },
    description: "Authentic handcrafted Moroccan brass lamp with intricate geometric patterns. Perfect for creating ambient lighting in any space.",
    specifications: {
      "Material": "Solid Brass",
      "Height": "35 cm",
      "Width": "20 cm",
      "Origin": "Marrakech, Morocco",
      "Bulb Type": "E27 LED Compatible"
    },
    isReturnable: true
  },
  {
    id: "2",
    title: "Premium Argan Oil - Pure & Organic",
    titleAr: "زيت الأركان الممتاز - طبيعي وعضوي",
    brand: "Atlas Beauty",
    brandAr: "جمال الأطلس",
    price: 89,
    originalPrice: 120,
    currency: "MAD",
    rating: 4.9,
    reviewCount: 892,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1556228578-dd339928ed2d?w=400&h=400&fit=crop"
    ],
    discount: 26,
    badges: ["Organic", "Best Seller", "Rassooq+ Eligible"],
    category: "beauty",
    inStock: true,
    stock: 234,
    seller: {
      name: "Atlas Beauty Co.",
      isOfficial: true,
      rating: 4.8
    },
    description: "100% pure, cold-pressed Argan oil from Morocco's Atlas Mountains. Rich in Vitamin E and antioxidants.",
    isReturnable: true,
    expiryDate: "2025-12-31"
  },
  {
    id: "3",
    title: "Samsung Galaxy A54 5G - 128GB",
    titleAr: "سامسونج جالاكسي A54 5G - 128 جيجابايت",
    brand: "Samsung",
    brandAr: "سامسونج",
    price: 2199,
    originalPrice: 2499,
    currency: "MAD",
    rating: 4.5,
    reviewCount: 1250,
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=400&h=400&fit=crop"
    ],
    discount: 12,
    badges: ["Official Store", "Free Delivery"],
    category: "electronics",
    inStock: true,
    stock: 45,
    seller: {
      name: "Samsung Official Store",
      isOfficial: true,
      rating: 4.9
    },
    description: "Latest Samsung Galaxy A54 with 5G connectivity, 50MP triple camera, and long-lasting battery.",
    specifications: {
      "Storage": "128GB",
      "RAM": "6GB",
      "Display": "6.4-inch Super AMOLED",
      "Camera": "50MP + 12MP + 5MP",
      "Battery": "5000mAh",
      "OS": "Android 13"
    },
    isReturnable: true,
    warranty: "24 months"
  },
  {
    id: "4",
    title: "Handwoven Berber Rug - Authentic Beni Ourain",
    titleAr: "سجادة بربرية منسوجة يدوياً - بني أورين أصلية",
    brand: "Atlas Rugs",
    brandAr: "سجاد الأطلس",
    price: 1450,
    originalPrice: 1800,
    currency: "MAD",
    rating: 4.7,
    reviewCount: 89,
    image: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400&h=400&fit=crop",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=400&h=400&fit=crop"
    ],
    discount: 19,
    badges: ["Handmade", "Authentic", "Free Shipping"],
    category: "home",
    inStock: true,
    stock: 8,
    seller: {
      name: "Atlas Carpet Weavers",
      isOfficial: false,
      rating: 4.6
    },
    description: "Authentic Beni Ourain rug handwoven by Berber artisans in the Atlas Mountains. Features traditional diamond patterns.",
    specifications: {
      "Size": "200cm x 300cm",
      "Material": "100% Natural Wool",
      "Origin": "Middle Atlas, Morocco",
      "Thickness": "15mm",
      "Pattern": "Traditional Berber Diamond"
    },
    isReturnable: true
  }
];

// Hero banners for homepage
export const heroBanners = [
  {
    id: "1",
    title: "Flash Sale Weekend",
    titleAr: "تخفيضات نهاية الأسبوع",
    subtitle: "Up to 70% off on electronics & fashion",
    subtitleAr: "خصم يصل إلى 70% على الإلكترونيات والأزياء",
    buttonText: "Shop Now",
    buttonTextAr: "تسوق الآن",
    buttonVariant: "flash" as const,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop",
    endDate: "2024-02-01T23:59:59Z"
  },
  {
    id: "2", 
    title: "Authentic Moroccan Crafts",
    titleAr: "الحرف المغربية الأصيلة",
    subtitle: "Discover handmade treasures from local artisans",
    subtitleAr: "اكتشف الكنوز المصنوعة يدوياً من الحرفيين المحليين",
    buttonText: "Explore Collection",
    buttonTextAr: "استكشف المجموعة",
    buttonVariant: "hero" as const,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Rassooq+ Membership",
    titleAr: "عضوية رسوق بلس",
    subtitle: "Free delivery, exclusive deals & more benefits",
    subtitleAr: "توصيل مجاني وعروض حصرية ومزايا أكثر",
    buttonText: "Join Rassooq+",
    buttonTextAr: "انضم لرسوق+",
    buttonVariant: "default" as const,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
  }
];

// Moroccan/MENA brands
export const brands = [
  {
    id: "1",
    name: "Attijariwafa Bank",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=100&fit=crop"
  },
  {
    id: "2", 
    name: "Maroc Telecom",
    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=100&fit=crop"
  },
  {
    id: "3",
    name: "Royal Air Maroc",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop"
  },
  {
    id: "4",
    name: "OCP Group",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop"
  }
];

// User data
export const mockUsers = {
  buyer: {
    id: "user_buyer_1",
    name: "Aicha Benali",
    nameAr: "عائشة بن علي",
    email: "aicha.benali@gmail.com",
    phone: "+212 6 12 34 56 78",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
    role: "buyer" as const,
    isRassooqPlus: true,
    joinDate: "2023-03-15",
    preferredLanguage: "fr" as const,
    city: "Casablanca",
    country: "Morocco"
  },
  seller: {
    id: "user_seller_1", 
    name: "Hassan El Amrani",
    nameAr: "حسن العمراني",
    email: "hassan@atlascrafts.ma",
    phone: "+212 5 24 45 67 89",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    role: "seller" as const,
    businessName: "Atlas Traditional Crafts",
    businessNameAr: "الحرف التقليدية للأطلس",
    joinDate: "2022-08-20",
    preferredLanguage: "ar" as const,
    city: "Marrakech",
    country: "Morocco",
    isVerified: true
  },
  admin: {
    id: "user_admin_1",
    name: "Youssef Tazi",
    nameAr: "يوسف التازي", 
    email: "youssef.tazi@rassooq.com",
    phone: "+212 5 22 98 76 54",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    role: "admin" as const,
    joinDate: "2022-01-10",
    preferredLanguage: "en" as const,
    permissions: ["full_access"]
  }
};

// Addresses for Morocco
export const mockAddresses = [
  {
    id: "addr_1",
    type: "home",
    label: "Home",
    labelAr: "المنزل",
    name: "Aicha Benali",
    phone: "+212 6 12 34 56 78",
    street: "Boulevard Mohammed V, Résidence Al Andalous, Apt 42",
    streetAr: "شارع محمد الخامس، إقامة الأندلس، شقة 42",
    area: "Maarif",
    areaAr: "المعاريف",
    city: "Casablanca",
    cityAr: "الدار البيضاء",
    region: "Casablanca-Settat",
    regionAr: "الدار البيضاء-سطات",
    postalCode: "20100",
    isDefault: true,
    coordinates: { lat: 33.5731, lng: -7.5898 }
  },
  {
    id: "addr_2",
    type: "work", 
    label: "Office",
    labelAr: "المكتب",
    name: "Aicha Benali",
    phone: "+212 6 12 34 56 78",
    street: "Avenue Hassan II, Twin Center, Tour A, Bureau 1205",
    streetAr: "شارع الحسن الثاني، التوين سنتر، البرج أ، مكتب 1205",
    area: "Maarif",
    areaAr: "المعاريف",
    city: "Casablanca",
    cityAr: "الدار البيضاء",
    region: "Casablanca-Settat",
    regionAr: "الدار البيضاء-سطات", 
    postalCode: "20100",
    isDefault: false,
    coordinates: { lat: 33.5886, lng: -7.6094 }
  }
];

// Seller onboarding data
export const sellerOnboardingSteps = [
  {
    id: "business_info",
    title: "Business Information",
    titleAr: "معلومات الشركة",
    description: "Tell us about your business",
    descriptionAr: "أخبرنا عن شركتك",
    fields: [
      "businessName",
      "businessType", 
      "contactPerson",
      "email",
      "phone",
      "address"
    ]
  },
  {
    id: "documents",
    title: "Legal Documents",
    titleAr: "الوثائق القانونية",
    description: "Upload required business documents",
    descriptionAr: "ارفع الوثائق التجارية المطلوبة",
    fields: [
      "commercialRegister",
      "taxCertificate", 
      "identityDocument",
      "bankStatement"
    ]
  },
  {
    id: "banking",
    title: "Banking Details",
    titleAr: "البيانات المصرفية",
    description: "Setup your payout information",
    descriptionAr: "إعداد معلومات الدفع",
    fields: [
      "bankName",
      "accountNumber",
      "iban",
      "swiftCode"
    ]
  },
  {
    id: "shipping",
    title: "Shipping & Fulfillment", 
    titleAr: "الشحن والتنفيذ",
    description: "Choose your fulfillment method",
    descriptionAr: "اختر طريقة التنفيذ",
    fields: [
      "fulfillmentMethod",
      "warehouseAddress",
      "shippingRegions"
    ]
  },
  {
    id: "contract",
    title: "Terms & Agreement",
    titleAr: "الشروط والاتفاقية", 
    description: "Review and accept seller agreement",
    descriptionAr: "راجع واقبل اتفاقية البائع",
    fields: [
      "termsAccepted",
      "privacyAccepted",
      "commissionAccepted"
    ]
  }
];

// Order statuses with Arabic translations
export const orderStatuses = [
  { key: "placed", label: "Order Placed", labelAr: "تم تقديم الطلب", color: "blue" },
  { key: "confirmed", label: "Confirmed", labelAr: "مؤكد", color: "green" },
  { key: "processing", label: "Processing", labelAr: "قيد المعالجة", color: "orange" },
  { key: "shipped", label: "Shipped", labelAr: "تم الشحن", color: "purple" },
  { key: "out_for_delivery", label: "Out for Delivery", labelAr: "في طريق التسليم", color: "indigo" },
  { key: "delivered", label: "Delivered", labelAr: "تم التسليم", color: "green" },
  { key: "cancelled", label: "Cancelled", labelAr: "ملغي", color: "red" },
  { key: "returned", label: "Returned", labelAr: "مُرجع", color: "gray" }
];

// Payment methods for Morocco
export const paymentMethods = [
  {
    id: "cod",
    name: "Cash on Delivery",
    nameAr: "الدفع عند الاستلام",
    description: "Pay when you receive your order",
    descriptionAr: "ادفع عند استلام طلبك",
    icon: "💵",
    fee: 10,
    currency: "MAD",
    minOrder: 0,
    maxOrder: 5000,
    regions: ["all"]
  },
  {
    id: "card",
    name: "Credit/Debit Card",
    nameAr: "بطاقة ائتمان/خصم",
    description: "Visa, Mastercard, CIB", 
    descriptionAr: "فيزا، ماستركارد، سي آي بي",
    icon: "💳",
    fee: 0,
    currency: "MAD",
    regions: ["all"]
  },
  {
    id: "bank_transfer",
    name: "Bank Transfer",
    nameAr: "حوالة بنكية",
    description: "Direct bank transfer",
    descriptionAr: "حوالة بنكية مباشرة", 
    icon: "🏦",
    fee: 5,
    currency: "MAD",
    regions: ["all"]
  }
];

// Delivery options for Morocco
export const deliveryOptions = [
  {
    id: "standard",
    name: "Standard Delivery", 
    nameAr: "التوصيل العادي",
    description: "3-5 business days",
    descriptionAr: "3-5 أيام عمل",
    price: 25,
    currency: "MAD",
    estimated: "Feb 1 - 3",
    estimatedAr: "1-3 فبراير",
    icon: "📦",
    regions: ["casablanca", "rabat", "marrakech", "fes"]
  },
  {
    id: "express",
    name: "Express Delivery",
    nameAr: "التوصيل السريع", 
    description: "1-2 business days",
    descriptionAr: "1-2 يوم عمل",
    price: 45,
    currency: "MAD",
    estimated: "Tomorrow",
    estimatedAr: "غداً",
    icon: "⚡",
    regions: ["casablanca", "rabat"]
  },
  {
    id: "rassooq_plus",
    name: "Rassooq+ Free Delivery",
    nameAr: "توصيل رسوق+ المجاني",
    description: "2-4 business days", 
    descriptionAr: "2-4 أيام عمل",
    price: 0,
    currency: "MAD",
    estimated: "Jan 31 - Feb 2",
    estimatedAr: "31 يناير - 2 فبراير",
    icon: "👑",
    plusOnly: true,
    regions: ["all"]
  }
];

// Rassooq+ benefits
export const rassooqPlusBenefits = [
  {
    id: "free_delivery",
    title: "Free Delivery",
    titleAr: "توصيل مجاني",
    description: "Free delivery on all orders",
    descriptionAr: "توصيل مجاني على جميع الطلبات",
    icon: "🚚"
  },
  {
    id: "express_shipping",
    title: "Express Shipping",
    titleAr: "شحن سريع", 
    description: "Faster delivery options",
    descriptionAr: "خيارات توصيل أسرع",
    icon: "⚡"
  },
  {
    id: "exclusive_deals",
    title: "Exclusive Deals",
    titleAr: "عروض حصرية",
    description: "Members-only discounts and offers",
    descriptionAr: "خصومات وعروض حصرية للأعضاء",
    icon: "💎"
  },
  {
    id: "early_access", 
    title: "Early Access",
    titleAr: "وصول مبكر",
    description: "Shop sales before everyone else",
    descriptionAr: "تسوق التخفيضات قبل الآخرين",
    icon: "🎯"
  },
  {
    id: "free_returns",
    title: "Free Returns",
    titleAr: "إرجاع مجاني",
    description: "Free returns on all purchases", 
    descriptionAr: "إرجاع مجاني على جميع المشتريات",
    icon: "🔄"
  }
];

// Mock seller dashboard data
export const mockSellerDashboard = {
  stats: {
    todaySales: { amount: 12340, currency: "MAD", change: 12.5 },
    ordersAwaiting: 23,
    lowStock: 8,
    returnsPending: 4,
    nextPayout: "Feb 15, 2024"
  },
  recentOrders: [
    {
      id: "#RS-001234",
      customer: "Ahmed Ben Ali", 
      customerAr: "أحمد بن علي",
      amount: 340,
      currency: "MAD",
      status: "awaiting_shipment",
      time: "2 hours ago",
      timeAr: "منذ ساعتين"
    },
    {
      id: "#RS-001235", 
      customer: "Fatima Zahra",
      customerAr: "فاطمة الزهراء",
      amount: 680,
      currency: "MAD", 
      status: "shipped",
      time: "4 hours ago",
      timeAr: "منذ 4 ساعات"
    },
    {
      id: "#RS-001236",
      customer: "Mohammed Alami",
      customerAr: "محمد العلمي", 
      amount: 1250,
      currency: "MAD",
      status: "delivered", 
      time: "1 day ago",
      timeAr: "منذ يوم واحد"
    }
  ],
  lowStockProducts: [
    {
      name: "Traditional Moroccan Lamp",
      nameAr: "مصباح مغربي تقليدي",
      stock: 3,
      sku: "TML-001"
    },
    {
      name: "Argan Oil Hair Treatment", 
      nameAr: "علاج الشعر بزيت الأرغان",
      stock: 1,
      sku: "AOH-045"
    },
    {
      name: "Handwoven Berber Rug",
      nameAr: "سجادة بربرية منسوجة يدوياً", 
      stock: 2,
      sku: "HBR-103"
    }
  ]
};