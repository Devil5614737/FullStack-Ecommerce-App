export interface ProductI {
  _id: number|string;
  title: string;
  image: string;
  description: string;
  category: string;
  price: number;
  inStock?: boolean;
  quantity: number;
}
