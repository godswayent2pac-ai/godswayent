export type Role = 'SUPER_ADMIN' | 'WAREHOUSE_MANAGER' | 'EMPLOYEE' | 'VIEWER';

export interface Warehouse {
  id: string;
  name: string;
  address: string;
  manager_id?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  parent_id?: string;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  images: string[]; // Cloudinary URLs
  qr_code_data?: string;
}

export interface ProductWarehouse {
  product_id: string;
  warehouse_id: string;
  quantity: number;
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email?: string;
  address?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'ready' | 'delivered' | 'cancelled';

export interface Order {
  id: string;
  customer_id: string;
  user_id: string; // employee
  warehouse_id?: string; // fulfillment point
  total: number;
  status: OrderStatus;
  created_at: string;
  receipt_qr?: string;
}

export interface OrderItem {
  order_id: string;
  product_id: string;
  quantity: number;
  price_at_time: number;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author_id: string;
  image?: string;
  published_at: string;
}

export interface CRMNote {
  id: string;
  customer_id: string;
  note: string;
  created_by: string;
  created_at: string;
}

export interface CartItem extends Product {
  cartQuantity: number;
}
