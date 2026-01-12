export type Product = {
  _id: string;
  title: string;
  brand: string;
  description?: string;
  price: number;
  compareAt?: number | null;
  category: string;
  collectionSlug: string;
  tags?: string[];
  images?: string[];
  inStock?: boolean;
};

export type CartItem = {
  productId: string;
  title: string;
  price: number;
  qty: number;
  image?: string;
};

export type Order = {
  _id: string;
  status: string;
  totals: { subtotal: number; shipping: number; grandTotal: number };
  createdAt: string;
};
