import type { Product } from "./Product";

export type OrderItem = Product & { quantity: number };

export type CheckoutOrder = {
  orderNumber: string;
  createdAt: string;
  customer: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
  };
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
  paymentMethod: "Cash on delivery (demo)";
};
