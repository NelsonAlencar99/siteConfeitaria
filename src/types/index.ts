export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'accepted' | 'preparing' | 'delivering' | 'delivered';
  createdAt: Date;
  paymentMethod: 'pix';
}

export interface Category {
  id: string;
  name: string;
  image: string;
}

export interface ShopSettings {
  phone: string;
  instagram: string;
  logoUrl: string;
  shopName: string;
}