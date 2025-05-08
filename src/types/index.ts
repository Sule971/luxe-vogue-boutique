
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  gender: 'men' | 'women' | 'unisex';
  collection?: string;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  trackingNumber: string;
  shippingAddress: Address;
  orderDate: Date;
  estimatedDeliveryDate: Date;
}

export interface Address {
  fullName: string;
  streetAddress: string;
  city: string;
  county: string;
  postalCode: string;
  phoneNumber: string;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  gender: 'men' | 'women' | 'unisex';
}
