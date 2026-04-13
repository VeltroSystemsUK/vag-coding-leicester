/**
 * Brand data using transparent logo assets for VAG Group brands.
 * All logos are displayed in a clean monochrome style (Black/White).
 */

import vwLogo from '../assets/vw.png';
import audiLogo from '../assets/audi.png';
import porscheLogo from '../assets/porsche.png';
import seatLogo from '../assets/SEAT.png';
import skodaLogo from '../assets/skoda.png';
import bentleyLogo from '../assets/bentley.png';
import cupraLogo from '../assets/cupra.png';

export interface BrandInfo {
  name: string;
  logo: string;
  color: string;
}

export const VAG_BRANDS: BrandInfo[] = [
  { name: 'Volkswagen', logo: vwLogo,      color: '#001e50' },
  { name: 'Audi',       logo: audiLogo,    color: '#bb0a30' },
  { name: 'Porsche',    logo: porscheLogo, color: '#a2845e' },
  { name: 'SEAT',       logo: seatLogo,    color: '#f25022' },
  { name: 'Skoda',      logo: skodaLogo,   color: '#4ba82e' },
  { name: 'Bentley',    logo: bentleyLogo, color: '#000000' },
  { name: 'CUPRA',      logo: cupraLogo,   color: '#95683b' },
];
