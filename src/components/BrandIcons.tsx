/**
 * Brand data for VAG Group brands.
 * All brands displayed in a clean monochrome style (Black/White).
 */

export interface BrandInfo {
  name: string;
  color: string;
}

export const VAG_BRANDS: BrandInfo[] = [
  { name: 'Volkswagen', color: '#001e50' },
  { name: 'Audi',       color: '#bb0a30' },
  { name: 'Porsche',    color: '#a2845e' },
  { name: 'SEAT',       color: '#f25022' },
  { name: 'Skoda',     color: '#4ba82e' },
  { name: 'Bentley',   color: '#000000' },
  { name: 'CUPRA',      color: '#95683b' },
];
