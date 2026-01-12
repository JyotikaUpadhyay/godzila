export type Product = {
  _id: string;
  title: string;
  brand: string;
  category?: string;
  collectionSlug: string;
  price: number;
  compareAt?: number | null;
  images: string[];
  description?: string;
  tags?: string[];
  inStock?: boolean;
};
