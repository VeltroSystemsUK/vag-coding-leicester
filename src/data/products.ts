export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'Cameras' | 'Retrofits' | 'Repairs' | 'Parts';
  image: string;
  description: string;
  condition: 'new' | 'used';
}

export const PRODUCTS: Product[] = [];
