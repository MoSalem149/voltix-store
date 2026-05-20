import { Product } from "./product";

export interface CartItem extends Product {
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name?: string;
  image?: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  shippingOption: "standard" | "express" | "overnight";
  shippingCost: number;
  createdAt: Date;
  status: "pending" | "shipped" | "delivered";
}

export interface ShippingOption {
  id: "standard" | "express" | "overnight";
  label: string;
  cost: number;
  days: string;
}
