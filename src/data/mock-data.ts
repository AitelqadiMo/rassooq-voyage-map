// Mock data for the Souq application

export const categories = [
  {
    id: "fashion",
    title: "Fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
    itemCount: 12500
  },
  {
    id: "electronics",
    title: "Electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
    itemCount: 8900
  },
  {
    id: "grocery",
    title: "Grocery",
    image: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400&h=400&fit=crop",
    itemCount: 15600
  },
  {
    id: "beauty",
    title: "Beauty",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=400&fit=crop",
    itemCount: 6750
  },
  {
    id: "home",
    title: "Home & Garden",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    itemCount: 9200
  },
  {
    id: "sports",
    title: "Sports",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=400&fit=crop",
    itemCount: 4300
  }
];

export const products = [
  {
    id: "1",
    title: "Wireless Bluetooth Headphones with Noise Cancellation",
    brand: "TechSound",
    price: 299,
    originalPrice: 399,
    rating: 4.5,
    reviewCount: 1250,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    discount: 25,
    isFlashSale: true,
    badges: ["Best Seller"]
  },
  {
    id: "2",
    title: "Smart Watch with Health Monitoring",
    brand: "FitTech",
    price: 199,
    originalPrice: 249,
    rating: 4.3,
    reviewCount: 890,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400&h=400&fit=crop",
    discount: 20,
    badges: ["New"]
  },
  {
    id: "3",
    title: "Premium Coffee Beans - Ethiopian Blend",
    brand: "ArabicaCo",
    price: 45,
    rating: 4.8,
    reviewCount: 567,
    image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=400&fit=crop",
    badges: ["Organic", "Fair Trade"]
  },
  {
    id: "4",
    title: "Luxury Skincare Set - Anti-Aging Collection",
    brand: "GlowBeauty",
    price: 159,
    originalPrice: 199,
    rating: 4.6,
    reviewCount: 723,
    image: "https://images.unsplash.com/photo-1556228578-dd339928ed2d?w=400&h=400&fit=crop",
    discount: 20,
    badges: ["Limited Edition"]
  },
  {
    id: "5",
    title: "Professional DSLR Camera with Lens Kit",
    brand: "PhotoPro",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviewCount: 342,
    image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
    discount: 25,
    isFlashSale: true,
    badges: ["Professional"]
  },
  {
    id: "6",
    title: "Ergonomic Office Chair - Premium Comfort",
    brand: "WorkWell",
    price: 299,
    rating: 4.4,
    reviewCount: 445,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
    badges: ["Bestseller"]
  }
];

export const heroBanners = [
  {
    id: "1",
    title: "Flash Sale",
    subtitle: "Up to 70% off on electronics",
    buttonText: "Shop Now",
    buttonVariant: "flash" as const,
    image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=400&fit=crop"
  },
  {
    id: "2",
    title: "New Fashion Collection",
    subtitle: "Discover the latest trends",
    buttonText: "Explore",
    buttonVariant: "hero" as const,
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=400&fit=crop"
  },
  {
    id: "3",
    title: "Souq+ Membership",
    subtitle: "Free delivery & exclusive deals",
    buttonText: "Join Now",
    buttonVariant: "default" as const,
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=400&fit=crop"
  }
];

export const brands = [
  {
    id: "1",
    name: "Samsung",
    logo: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=100&fit=crop"
  },
  {
    id: "2",
    name: "Apple",
    logo: "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=200&h=100&fit=crop"
  },
  {
    id: "3",
    name: "Nike",
    logo: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=200&h=100&fit=crop"
  },
  {
    id: "4",
    name: "Adidas",
    logo: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=200&h=100&fit=crop"
  }
];