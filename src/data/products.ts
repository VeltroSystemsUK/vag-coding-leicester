import img336 from '../assets/IMG-20260409-WA0336.jpg';
import img337 from '../assets/IMG-20260409-WA0337.jpg';
import img338 from '../assets/IMG-20260409-WA0338.jpg';
import img339 from '../assets/IMG-20260409-WA0339.jpg';
import img340 from '../assets/IMG-20260409-WA0340.jpg';
import img341 from '../assets/IMG-20260409-WA0341.jpg';
import img342 from '../assets/IMG-20260409-WA0342.jpg';
import img343 from '../assets/IMG-20260409-WA0343.jpg';
import img344 from '../assets/IMG-20260409-WA0344.jpg';

export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'Cameras' | 'Retrofits' | 'Repairs' | 'Parts';
  image: string;
  description: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'golf-mk7-camera',
    name: 'Golf MK7 Highline Camera',
    price: '£420.00',
    category: 'Cameras',
    image: img336,
    description: 'High-quality reverse camera with dynamic guidelines for Golf MK7.',
  },
  {
    id: 'front-radar-cal',
    name: 'Front Radar Calibration Service',
    price: '£150.00',
    category: 'Repairs',
    image: img337,
    description: 'Professional ADAS calibration for front radar sensors.',
  },
  {
    id: 'golf-mk7-climatronic',
    name: 'Golf MK7 Digital Climatronic Panel',
    price: '£240.00',
    category: 'Retrofits',
    image: img338,
    description: 'Modern touch-sensitive climate control panel upgrade.',
  },
  {
    id: 'sos-error-fix',
    name: 'SOS Error Fix Repair',
    price: '£150.00',
    category: 'Repairs',
    image: img339,
    description: 'Permanent fix for the common VAG emergency call system error.',
  },
  {
    id: 'vw-t-roc-camera',
    name: 'VW T-Roc Reverse Camera Retrofit',
    price: '£440.00',
    category: 'Cameras',
    image: img340,
    description: 'Full OEM integration reverse camera for VW T-Roc.',
  },
  {
    id: 'discover-media-repair',
    name: 'Discover Media Screen Repair',
    price: '£165.00',
    category: 'Repairs',
    image: img341,
    description: 'LCD and digitizer repair for VAG Discover Media units.',
  },
  {
    id: 'vw-taigo-camera',
    name: 'VW Taigo Reverse Camera Upgrade',
    price: '£420.00',
    category: 'Cameras',
    image: img342,
    description: 'OEM reverse camera upgrade for the new VW Taigo.',
  },
  {
    id: 'golf-mib2-set',
    name: 'Golf Cockpit and MIB2 set',
    price: '£1,400.00',
    category: 'Retrofits',
    image: img343,
    description: 'Complete Virtual Cockpit and MIB2.5 infotainment system upgrade.',
  },
  {
    id: 'most-connection',
    name: 'MOST Connection Straight Wiring',
    price: '£50.00',
    category: 'Parts',
    image: img344,
    description: 'Fiber optic wiring for Virtual Cockpit integration.',
  },
];
