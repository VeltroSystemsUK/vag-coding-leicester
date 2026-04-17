import img001 from '../assets/Shop-001.png'; // Golf Cockpit and MIB2
import img002 from '../assets/Shop-002.png'; // VW Taigo Reverse Camera
import img003 from '../assets/Shop-003.png'; // Discover Media Screen
import img004 from '../assets/Shop-004.png'; // VW T-Roc Reverse
import img005 from '../assets/Shop-005.png'; // SOS Error Fix
import img006 from '../assets/Shop-006.png'; // Golf Mk7 Digital Climatronic
import img007 from '../assets/Shop-007.png'; // Front Calibration Service
import img008 from '../assets/Shop-008.png'; // Golf Mk8 Reverse Camera Retrofit
import img009 from '../assets/Shop-009.png'; // MOST connection straight wiring

export interface Product {
  id: string;
  name: string;
  price: string;
  category: 'Cameras' | 'Retrofits' | 'Repairs' | 'Parts';
  image: string;
  description: string;
  condition: 'new' | 'used';
}

export const PRODUCTS: Product[] = [
  {
    id: 'golf-mk7-camera',
    name: 'Golf MK7 Highline Camera',
    price: '£420.00',
    category: 'Cameras',
    image: img008,
    description: 'High-quality reverse camera with dynamic guidelines for Golf MK7.',
    condition: 'new',
  },
  {
    id: 'front-radar-cal',
    name: 'Front Radar Calibration Service',
    price: '£150.00',
    category: 'Repairs',
    image: img007,
    description: 'Professional ADAS calibration for front radar sensors.',
    condition: 'new',
  },
  {
    id: 'golf-mk7-climatronic',
    name: 'Golf MK7 Digital Climatronic Panel',
    price: '£240.00',
    category: 'Retrofits',
    image: img006,
    description: 'Modern touch-sensitive climate control panel upgrade.',
    condition: 'used',
  },
  {
    id: 'sos-error-fix',
    name: 'SOS Error Fix Repair',
    price: '£150.00',
    category: 'Repairs',
    image: img005,
    description: 'Permanent fix for the common VAG emergency call system error.',
    condition: 'new',
  },
  {
    id: 'vw-t-roc-camera',
    name: 'VW T-Roc Reverse Camera Retrofit',
    price: '£440.00',
    category: 'Cameras',
    image: img004,
    description: 'Full OEM integration reverse camera for VW T-Roc.',
    condition: 'new',
  },
  {
    id: 'discover-media-repair',
    name: 'Discover Media Screen Repair',
    price: '£165.00',
    category: 'Repairs',
    image: img003,
    description: 'LCD and digitizer repair for VAG Discover Media units.',
    condition: 'used',
  },
  {
    id: 'vw-taigo-camera',
    name: 'VW Taigo Reverse Camera Upgrade',
    price: '£420.00',
    category: 'Cameras',
    image: img002,
    description: 'OEM reverse camera upgrade for the new VW Taigo.',
    condition: 'new',
  },
  {
    id: 'golf-mib2-set',
    name: 'Golf Cockpit and MIB2 set',
    price: '£1,400.00',
    category: 'Retrofits',
    image: img001,
    description: 'Complete Virtual Cockpit and MIB2.5 infotainment system upgrade.',
    condition: 'used',
  },
  {
    id: 'most-connection',
    name: 'MOST Connection Straight Wiring',
    price: '£50.00',
    category: 'Parts',
    image: img009,
    description: 'Fiber optic wiring for Virtual Cockpit integration.',
    condition: 'used',
  },
];
