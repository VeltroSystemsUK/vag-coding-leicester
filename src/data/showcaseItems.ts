import type { LucideIcon } from 'lucide-react';
import { Camera, Monitor, Cpu, Smartphone, Car } from 'lucide-react';

// ─── Named imports for existing themed assets ────────────────────────────────
import virtualCockpitImg    from '../assets/VirtualCockpit.png';
import carplayImg           from '../assets/CarplayActivate.png';
import factoryReverseImg    from '../assets/FactoryReverse.png';
import androidAutoImg       from '../assets/AndroidAuto.png';
import convenienceCodingImg from '../assets/Aconveniencecoding.png';
import drivingMoodImg       from '../assets/DrivingMood.png';
import autoHeadlightsImg    from '../assets/AutoHeadrors.png';
import oemViewImg           from '../assets/OEM & AftermarketView.png';
import code2Img             from '../assets/code2.webp';

// ─── Real client photos ───────────────────────────────────────────────────────
import wa0043 from '../assets/IMG-20260409-WA0043.jpg';
import wa0044 from '../assets/IMG-20260409-WA0044.jpg';
import wa0045 from '../assets/IMG-20260409-WA0045.jpg';
import wa0046 from '../assets/IMG-20260409-WA0046.jpg';
import wa0047 from '../assets/IMG-20260409-WA0047.jpg';
import wa0048 from '../assets/IMG-20260409-WA0048.jpg';
import wa0049 from '../assets/IMG-20260409-WA0049.jpg';
import wa0050 from '../assets/IMG-20260409-WA0050.jpg';
import wa0051 from '../assets/IMG-20260409-WA0051.jpg';
import wa0052 from '../assets/IMG-20260409-WA0052.jpg';
import wa0053 from '../assets/IMG-20260409-WA0053.jpg';
import wa0054 from '../assets/IMG-20260409-WA0054.jpg';
import wa0055 from '../assets/IMG-20260409-WA0055.jpg';
import wa0056 from '../assets/IMG-20260409-WA0056.jpg';
import wa0057 from '../assets/IMG-20260409-WA0057.jpg';
import wa0058 from '../assets/IMG-20260409-WA0058.jpg';
import wa0059 from '../assets/IMG-20260409-WA0059.jpg';
import wa0060 from '../assets/IMG-20260409-WA0060.jpg';
import wa0061 from '../assets/IMG-20260409-WA0061.jpg';
import wa0062 from '../assets/IMG-20260409-WA0062.jpg';
import wa0063 from '../assets/IMG-20260409-WA0063.jpg';
import wa0064 from '../assets/IMG-20260409-WA0064.jpg';
import wa0065 from '../assets/IMG-20260409-WA0065.jpg';
import wa0066 from '../assets/IMG-20260409-WA0066.jpg';
import wa0067 from '../assets/IMG-20260409-WA0067.jpg';
import wa0068 from '../assets/IMG-20260409-WA0068.jpg';
import wa0070 from '../assets/IMG-20260409-WA0070.jpg';
import wa0071 from '../assets/IMG-20260409-WA0071.jpg';
import wa0072 from '../assets/IMG-20260409-WA0072.jpg';
import wa0073 from '../assets/IMG-20260409-WA0073.jpg';
import wa0078 from '../assets/IMG-20260409-WA0078.jpg';
import wa0080 from '../assets/IMG-20260409-WA0080.jpg';
import wa0085 from '../assets/IMG-20260409-WA0085.jpg';
import wa0086 from '../assets/IMG-20260409-WA0086.jpg';
import wa0087 from '../assets/IMG-20260409-WA0087.jpg';
import wa0088 from '../assets/IMG-20260409-WA0088.jpg';
import wa0090 from '../assets/IMG-20260409-WA0090.jpg';
import wa0091 from '../assets/IMG-20260409-WA0091.jpg';
import wa0092 from '../assets/IMG-20260409-WA0092.jpg';
import wa0094 from '../assets/IMG-20260409-WA0094.jpg';
import wa0098 from '../assets/IMG-20260409-WA0098.jpg';
import wa0102 from '../assets/IMG-20260409-WA0102.jpg';
import wa0103 from '../assets/IMG-20260409-WA0103.jpg';
import wa0105 from '../assets/IMG-20260409-WA0105.jpg';
import wa0107 from '../assets/IMG-20260409-WA0107.jpg';
import wa0108 from '../assets/IMG-20260409-WA0108.jpg';
import wa0109 from '../assets/IMG-20260409-WA0109.jpg';
import wa0110 from '../assets/IMG-20260409-WA0110.jpg';
import wa0111 from '../assets/IMG-20260409-WA0111.jpg';
import wa0113 from '../assets/IMG-20260409-WA0113.jpg';
import wa0114 from '../assets/IMG-20260409-WA0114.jpg';
import wa0115 from '../assets/IMG-20260409-WA0115.jpg';
import wa0122 from '../assets/IMG-20260409-WA0122.jpg';
import wa0123 from '../assets/IMG-20260409-WA0123.jpg';
import wa0124 from '../assets/IMG-20260409-WA0124.jpg';
import wa0125 from '../assets/IMG-20260409-WA0125.jpg';
import wa0126 from '../assets/IMG-20260409-WA0126.jpg';
import wa0127 from '../assets/IMG-20260409-WA0127.jpg';
import wa0128 from '../assets/IMG-20260409-WA0128.jpg';

// ─── Types ────────────────────────────────────────────────────────────────────
export type CategoryId = 'all' | 'retrofit' | 'coding' | 'camera' | 'screen' | 'exterior';

export interface GalleryItem {
  id: number;
  title: string;
  category: Exclude<CategoryId, 'all'>;
  image: string;
  description: string;
  icon: LucideIcon;
}

// ─── Categories ───────────────────────────────────────────────────────────────
export const categories: { id: CategoryId; name: string }[] = [
  { id: 'all',      name: 'All Work'   },
  { id: 'retrofit', name: 'Retrofits'  },
  { id: 'coding',   name: 'Coding'     },
  { id: 'camera',   name: 'Cameras'    },
  { id: 'screen',   name: 'Screens'    },
  { id: 'exterior', name: 'Exterior'   },
];

// ─── Gallery items ────────────────────────────────────────────────────────────
export const galleryItems: GalleryItem[] = [
  { id:  1, title: 'Virtual Cockpit Retrofit',    category: 'retrofit', image: virtualCockpitImg,    description: 'Full digital instrument cluster for VW Golf MK7.5.',                      icon: Monitor    },
  { id:  2, title: 'Apple CarPlay Activation',    category: 'coding',   image: carplayImg,           description: 'Wireless CarPlay and Android Auto on Audi MIB2.',                        icon: Smartphone },
  { id:  3, title: 'High-Line Reverse Camera',    category: 'camera',   image: factoryReverseImg,    description: 'OEM-integrated camera with dynamic guidelines.',                          icon: Camera     },
  { id:  4, title: 'Android Auto Integration',    category: 'screen',   image: androidAutoImg,       description: 'Full Android Auto on MIB2 / MIB3 head unit.',                           icon: Smartphone },
  { id:  5, title: 'Convenience Coding Pack',     category: 'coding',   image: convenienceCodingImg, description: 'Needle sweep, acoustic lock, mirror dip and more.',                      icon: Cpu        },
  { id:  6, title: 'Driving Mood Lighting',       category: 'coding',   image: drivingMoodImg,       description: 'Ambient lighting profiles unlocked via VCDS.',                           icon: Cpu        },
  { id:  7, title: 'Auto Headlight Coding',       category: 'coding',   image: autoHeadlightsImg,    description: 'Coming-home / leaving-home lights and cornering enabled.',               icon: Cpu        },
  { id:  8, title: 'OEM vs Aftermarket Compare',  category: 'retrofit', image: oemViewImg,           description: 'Side-by-side OEM finish against stock fitment.',                         icon: Monitor    },
  { id:  9, title: 'Live Coding Session',         category: 'coding',   image: code2Img,             description: 'VCDS long coding and adaptation channel work.',                          icon: Cpu        },
  { id: 10, title: 'Starlight Headliner — Blue',  category: 'retrofit', image: wa0043,  description: 'Starlight headliner fitted — blue/cyan fibre-optic stars.',                      icon: Monitor    },
  { id: 11, title: 'Audi — Post Coding',          category: 'exterior', image: wa0047,  description: 'Customer Audi after coding session — quattro badge.',                             icon: Car        },
  { id: 12, title: 'VW Golf GTI Exterior',        category: 'exterior', image: wa0051,  description: 'Customer VW Golf GTI after service.',                                             icon: Car        },
  { id: 13, title: 'Black Audi — Snow Day',       category: 'exterior', image: wa0057,  description: 'Customer Audi photographed after winter coding visit.',                           icon: Car        },
  { id: 14, title: 'CarPlay + Virtual Cockpit',   category: 'retrofit', image: wa0061,  description: 'MIB2 CarPlay active alongside upgraded digital cockpit.',                         icon: Monitor    },
  { id: 15, title: 'VW Transporter T6',           category: 'exterior', image: wa0073,  description: 'Black VW Transporter T6 — custom stripe, after coding.',                         icon: Car        },
  { id: 16, title: 'Audi S3 — Exterior',          category: 'exterior', image: wa0080,  description: 'Grey Audi S3 Sportback after full VAG Leicester package.',                        icon: Car        },
  { id: 17, title: 'Audi 8Y — Dual Screen',       category: 'screen',   image: wa0085,  description: 'Audi 8Y virtual cockpit and MMI screens active.',                                 icon: Monitor    },
  { id: 18, title: 'VW Polo — Beats Audio',       category: 'screen',   image: wa0090,  description: 'VW + Beats Audio bootup after audio coding.',                                     icon: Monitor    },
  { id: 19, title: 'Software Update Collage',     category: 'coding',   image: wa0102,  description: 'MIB software update in progress — VAG Leicester.',                               icon: Cpu        },
  { id: 20, title: 'Lane Assist Retrofit',        category: 'retrofit', image: wa0109,  description: 'Lane-keeping assist coded live — front camera calibrated.',                       icon: Monitor    },
  { id: 21, title: 'Starlight Retrofit',          category: 'retrofit', image: wa0122,  description: 'Starlight headliner retrofit — bespoke install.',                                 icon: Monitor    },
  { id: 22, title: 'Starlight Headliner — Green', category: 'retrofit', image: wa0044,  description: 'Starlight headliner — green fibre-optic stars, convertible.',                    icon: Monitor    },
  { id: 23, title: 'Starlight Headliner — Purple',category: 'retrofit', image: wa0048,  description: 'Starlight headliner with purple stars and red ambient lighting.',                 icon: Monitor    },
  { id: 24, title: 'Reverse Camera on Screen',    category: 'camera',   image: wa0052,  description: 'Reverse camera view displayed on MIB screen with guidelines.',                   icon: Camera     },
  { id: 25, title: 'Red Audi A3 — Exterior',      category: 'exterior', image: wa0059,  description: 'Customer red Audi A3 after CarPlay and coding session.',                         icon: Car        },
  { id: 26, title: 'Starlight Headliner — Red',   category: 'retrofit', image: wa0063,  description: 'Starlight headliner with red fibre-optic stars — Golf GTI.',                     icon: Monitor    },
  { id: 27, title: 'MIB2 CarPlay — Pink Theme',   category: 'screen',   image: wa0067,  description: 'CarPlay running on MIB2 with custom pink wallpaper.',                            icon: Monitor    },
  { id: 28, title: 'Gold Golf R — Rear',          category: 'exterior', image: wa0078,  description: 'Gold VW Golf R — quad exhausts, after coding package.',                          icon: Car        },
  { id: 29, title: 'Red VW — GTD Badge',          category: 'exterior', image: wa0091,  description: 'Red VW wheel arch and GTD badge detail shot.',                                    icon: Car        },
  { id: 30, title: 'Start/Stop Disable',          category: 'coding',   image: wa0103,  description: 'VCDS open — permanent start/stop disable coded.',                                 icon: Cpu        },
  { id: 31, title: 'Sports HMI Coding',           category: 'coding',   image: wa0107,  description: 'Sport HMI and performance display unlocked.',                                     icon: Cpu        },
  { id: 32, title: 'Pulsing Start Button',        category: 'coding',   image: wa0111,  description: 'Animated breathing effect on ignition button enabled.',                           icon: Cpu        },
  { id: 33, title: 'CarPlay Activation',          category: 'coding',   image: wa0115,  description: 'Wireless CarPlay and Android Auto activated via coding.',                         icon: Smartphone },
  { id: 34, title: 'Starlight Headliner — White', category: 'retrofit', image: wa0045,  description: 'Starlight headliner with red and white fibre-optic stars.',                      icon: Monitor    },
  { id: 35, title: 'White VW Golf R',             category: 'exterior', image: wa0049,  description: 'White VW Golf R Mk7.5 — exterior after full coding.',                            icon: Car        },
  { id: 36, title: 'Starlight — Red (GTI)',       category: 'retrofit', image: wa0054,  description: 'Red starlight headliner fitted to VW Golf GTI interior.',                         icon: Monitor    },
  { id: 37, title: 'MIB Menu Screen',             category: 'screen',   image: wa0060,  description: 'VW Golf MIB menu navigation screen.',                                             icon: Monitor    },
  { id: 38, title: 'Starlight — Purple (CUPRA)',  category: 'retrofit', image: wa0065,  description: 'Starlight headliner with purple stars — SEAT/CUPRA headrest.',                   icon: Monitor    },
  { id: 39, title: 'CarPlay on MIB',              category: 'screen',   image: wa0070,  description: 'Apple CarPlay displayed on VW Golf MIB head unit.',                              icon: Monitor    },
  { id: 40, title: 'Audi 360° Surround View',     category: 'camera',   image: wa0086,  description: "Audi 360° bird's-eye surround view on MMI screen.",                              icon: Camera     },
  { id: 41, title: 'Blue Golf R — Wheel Arch',    category: 'exterior', image: wa0092,  description: 'Blue VW Golf R — yellow caliper wheel arch detail at sunset.',                   icon: Car        },
  { id: 42, title: 'Blue Golf R — Sunset',        category: 'exterior', image: wa0098,  description: 'Blue VW Golf R full car shot at golden hour.',                                    icon: Car        },
  { id: 43, title: 'Mirror-Integrated Camera',    category: 'camera',   image: wa0114,  description: 'Rear-view mirror camera system — clean wiring.',                                  icon: Camera     },
  { id: 44, title: 'Starlight Headliner — Blue 2',category: 'retrofit', image: wa0046,  description: 'Starlight headliner — blue fibre-optic stars with tan interior.',               icon: Monitor    },
  { id: 45, title: 'CarPlay + Digital Cockpit',   category: 'screen',   image: wa0050,  description: 'CarPlay on large screen alongside active digital cockpit.',                       icon: Monitor    },
  { id: 46, title: 'MIB2 CarPlay Icons',          category: 'screen',   image: wa0055,  description: 'Apple CarPlay app grid on VW Golf MIB2.',                                        icon: Monitor    },
  { id: 47, title: 'Reverse Camera View',         category: 'camera',   image: wa0058,  description: 'VW reverse camera displayed on MIB screen.',                                      icon: Camera     },
  { id: 48, title: 'Audi MMI — CarPlay',          category: 'screen',   image: wa0062,  description: 'Audi A3 MMI with Apple CarPlay active.',                                         icon: Monitor    },
  { id: 49, title: 'Start-Stop Coding Screen',    category: 'coding',   image: wa0066,  description: 'Vehicle status / start-stop screen — VAG coding.',                               icon: Cpu        },
  { id: 50, title: 'MIB Head Unit Swap',          category: 'retrofit', image: wa0071,  description: 'MIB head unit replacement in progress — wiring stage.',                          icon: Monitor    },
  { id: 51, title: 'Audi Interior — CarPlay',     category: 'screen',   image: wa0072,  description: 'Audi interior with CarPlay displayed on MMI.',                                   icon: Monitor    },
  { id: 52, title: 'Audi Virtual Cockpit — Dark', category: 'screen',   image: wa0087,  description: 'Audi interior with virtual cockpit and MMI in dark mode.',                       icon: Monitor    },
  { id: 53, title: 'Bentley Infotainment',        category: 'screen',   image: wa0110,  description: 'Bentley MMI infotainment screen.',                                               icon: Monitor    },
  { id: 54, title: 'Screen Retrofit',             category: 'screen',   image: wa0123,  description: 'Large-format glass display upgrade.',                                             icon: Monitor    },
  { id: 55, title: 'VW Golf R — Exterior',        category: 'exterior', image: wa0053,  description: 'White VW Golf R with black bonnet — after coding.',                              icon: Car        },
  { id: 56, title: 'Starlight Headliner — Blue/Purple', category: 'retrofit', image: wa0056, description: 'Starlight headliner with blue/purple stars and red ambient.',             icon: Monitor    },
  { id: 57, title: 'Seat Heating Coding',         category: 'coding',   image: wa0064,  description: 'Seat heating control displayed on VW Golf MIB.',                                 icon: Cpu        },
  { id: 58, title: 'Start-Stop Climate Screen',   category: 'coding',   image: wa0068,  description: 'VW Golf console and climate with start-stop coding.',                            icon: Cpu        },
  { id: 59, title: 'VW Golf GTI MIB Menu',        category: 'screen',   image: wa0088,  description: 'VW Golf GTI MIB home menu screen.',                                             icon: Monitor    },
  { id: 60, title: 'Race Mode Gauges',            category: 'coding',   image: wa0094,  description: 'VW Golf R Race mode performance gauges on infotainment.',                        icon: Cpu        },
  { id: 61, title: 'VW Polo — Upgrade Collage',   category: 'retrofit', image: wa0105,  description: 'VW Polo before/after screen and infotainment upgrade.',                          icon: Monitor    },
  { id: 62, title: 'Client Vehicle',              category: 'exterior', image: wa0108,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 63, title: 'Client Vehicle',              category: 'exterior', image: wa0113,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 64, title: 'Client Vehicle',              category: 'exterior', image: wa0124,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 65, title: 'Client Vehicle',              category: 'exterior', image: wa0125,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 66, title: 'Client Vehicle',              category: 'exterior', image: wa0126,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 67, title: 'Client Vehicle',              category: 'exterior', image: wa0127,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
  { id: 68, title: 'Client Vehicle',              category: 'exterior', image: wa0128,  description: 'Customer vehicle after VAG Leicester service.',                                   icon: Car        },
];
