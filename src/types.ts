export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Testimonial {
  id: string;
  name: string;
  car: string;
  content: string;
  rating: number;
}
