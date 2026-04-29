export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'Cameras' | 'Retrofits' | 'Repairs' | 'Parts';
  image: string;
  description: string;
  condition: 'new' | 'used';
  vehicle_make?: string;
  vehicle_model?: string;
}

export const PRODUCTS: Product[] = [];
