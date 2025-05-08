
import { Product, Collection, Order } from "@/types";

export const products: Product[] = [
  {
    id: "1",
    name: "Luminous Silk Evening Gown",
    description: "A stunning silk gown with delicate beadwork that catches the light. Perfect for red carpet events and gala dinners.",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "dresses",
    gender: "women",
    collection: "evening",
    featured: true,
  },
  {
    id: "2",
    name: "Designer Leather Combat Boots",
    description: "Edgy combat boots made with premium Italian leather, featuring gold hardware and signature red soles.",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1605812860427-4024433a70fd?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    category: "footwear",
    gender: "women",
    collection: "autumn",
  },
  {
    id: "3",
    name: "Tailored Italian Wool Suit",
    description: "Impeccably tailored suit crafted from the finest Italian wool. Features a modern slim fit with subtle check pattern.",
    price: 3499.99,
    image: "https://images.unsplash.com/photo-1593032465175-481ac7f401a0?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "suits",
    gender: "men",
    collection: "business",
    featured: true,
  },
  {
    id: "4",
    name: "Luxury Cashmere Overcoat",
    description: "Stay stylish in colder weather with this premium cashmere overcoat, featuring a timeless silhouette and exquisite craftsmanship.",
    price: 4250.00,
    image: "https://images.unsplash.com/photo-1544022613-e87ca75a784a?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "outerwear",
    gender: "men",
    collection: "winter",
  },
  {
    id: "5",
    name: "Embellished Couture Handbag",
    description: "A statement accessory crafted from the finest leather with signature hardware and hand-applied crystal embellishments.",
    price: 8999.99,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "accessories",
    gender: "women",
    collection: "accessories",
  },
  {
    id: "6",
    name: "Limited Edition Sneakers",
    description: "These exclusive sneakers blend luxury and street style with premium materials and distinctive design features.",
    price: 895.00,
    image: "https://images.unsplash.com/photo-1579338559194-a162d19bf842?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "footwear",
    gender: "unisex",
    collection: "streetwear",
    featured: true,
  },
  {
    id: "7",
    name: "Silk Designer Scarf",
    description: "Hand-painted silk scarf featuring the season's signature print and hand-rolled edges.",
    price: 450.00,
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "accessories",
    gender: "women",
    collection: "accessories",
  },
  {
    id: "8",
    name: "Designer Denim Jacket",
    description: "Iconic denim jacket featuring vintage-inspired wash and distinctive embroidered details on the back.",
    price: 1750.00,
    image: "https://images.unsplash.com/photo-1578681994506-b8f463449011?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "outerwear",
    gender: "unisex",
    collection: "casual",
  },
  {
    id: "9",
    name: "Crystal-Embellished Heels",
    description: "Statement heels featuring dazzling crystal embellishments that catch the light with every step.",
    price: 2499.99,
    image: "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "footwear",
    gender: "women",
    collection: "evening",
  },
  {
    id: "10",
    name: "Signature Leather Loafers",
    description: "Classic loafers handcrafted in Italy from the finest calf leather with signature horse-bit detail.",
    price: 895.00,
    image: "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "footwear",
    gender: "men",
    collection: "business",
  },
  {
    id: "11",
    name: "Monogram Belt",
    description: "Iconic belt featuring signature hardware and premium leather, the perfect finishing touch to any outfit.",
    price: 490.00,
    image: "https://images.unsplash.com/photo-1603223792137-c0a3f4817b79?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "accessories",
    gender: "unisex",
    collection: "accessories",
  },
  {
    id: "12",
    name: "Couture Cocktail Dress",
    description: "Stunning cocktail dress featuring intricate beadwork and a flattering silhouette perfect for special occasions.",
    price: 3950.00,
    image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    category: "dresses",
    gender: "women",
    collection: "evening",
  },
];

export const collections: Collection[] = [
  {
    id: "1",
    name: "Evening Elegance",
    description: "Exquisite evening wear designed for those unforgettable moments. From gala events to award ceremonies, make a statement with our curated selection of red-carpet-worthy pieces.",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    gender: "women"
  },
  {
    id: "2",
    name: "Business Elite",
    description: "Command respect with our impeccably tailored business collection. Each piece is crafted to perfection, ensuring you make the right impression from boardroom to business dinner.",
    image: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    gender: "men"
  },
  {
    id: "3",
    name: "Winter Luxe",
    description: "Embrace the colder months without compromising on style. Our winter collection features sumptuous fabrics and expert craftsmanship to keep you warm and sophisticated.",
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1351&q=80",
    gender: "women"
  },
  {
    id: "4",
    name: "Urban Streetwear",
    description: "Where luxury meets street style. Our urban collection fuses high-end craftsmanship with contemporary street aesthetics for the fashion-forward trendsetter.",
    image: "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    gender: "men"
  }
];

export const sampleOrders: Order[] = [
  {
    id: "ORD-12345",
    items: [
      { product: products[0], quantity: 1 },
      { product: products[4], quantity: 1 }
    ],
    totalAmount: 11499.98,
    status: "processing",
    trackingNumber: "LUXE-TRACK-123456",
    orderDate: new Date("2023-04-15"),
    estimatedDeliveryDate: new Date("2023-04-22"),
    shippingAddress: {
      fullName: "Jane Doe",
      streetAddress: "123 Luxury Lane",
      city: "Fashion City",
      county: "Style County",
      postalCode: "90210",
      phoneNumber: "+254712345678"
    }
  },
  {
    id: "ORD-67890",
    items: [
      { product: products[2], quantity: 1 }
    ],
    totalAmount: 3499.99,
    status: "shipped",
    trackingNumber: "LUXE-TRACK-789012",
    orderDate: new Date("2023-04-10"),
    estimatedDeliveryDate: new Date("2023-04-17"),
    shippingAddress: {
      fullName: "John Smith",
      streetAddress: "456 Elegant Avenue",
      city: "Couture Town",
      county: "Prestige County",
      postalCode: "10001",
      phoneNumber: "+254723456789"
    }
  }
];

export const categories = [
  "dresses", 
  "suits", 
  "footwear", 
  "outerwear", 
  "accessories"
];

export const genders = ["men", "women", "unisex"];
