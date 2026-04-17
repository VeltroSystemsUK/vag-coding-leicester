import type { LucideIcon } from 'lucide-react';
import { Camera, Monitor, Cpu, Smartphone, Car } from 'lucide-react';

// ─── Themed showcase images ─────────────────────────────────────────────────────
import virtualCockpitImg    from '../assets/Dashboard-001.webp';
import carplayImg          from '../assets/Dashboard-002.jpg';
import factoryReverseImg   from '../assets/Reverse-01.png';
import androidAutoImg      from '../assets/Dashboard-003.jpg';
import convenienceCodingImg from '../assets/Coding.jpeg';
import drivingMoodImg      from '../assets/Dashboard-004.jpg';
import autoHeadlightsImg   from '../assets/Dashboard-005.jpg';
import oemViewImg          from '../assets/OEM-01.jpg';
import code2Img            from '../assets/Dashboard-006.jpg';

// ─── Client gallery photos ─────────────────────────────────────────────────────
import wa0050 from '../assets/Dashboard-007.jpg';
import wa0052 from '../assets/Dashboard-008.jpg';
import wa0055 from '../assets/Dashboard-009.jpg';
import wa0058 from '../assets/Dashboard-010.jpg';
import wa0060 from '../assets/Dashboard-011.jpg';
import wa0061 from '../assets/Dashboard-012.jpg';
import wa0062 from '../assets/Dashboard-013.jpg';
import wa0064 from '../assets/Dashboard-014.jpg';
import wa0066 from '../assets/Dashboard-015.jpg';
import wa0067 from '../assets/Dashboard-016.jpg';
import wa0068 from '../assets/Dashboard-017.jpg';
import wa0070 from '../assets/Dashboard-018.jpg';
import wa0071 from '../assets/Dashboard-019.jpg';
import wa0072 from '../assets/Dashboard-020.jpg';
import wa0085 from '../assets/Dashboard-021.jpg';
import wa0086 from '../assets/Reverse-02.jpg';
import wa0087 from '../assets/Exterior -01.jpg';
import wa0088 from '../assets/Exterior-02.png';
import wa0090 from '../assets/Exterior-03.png';
import wa0094 from '../assets/Exterior-04.png';
import wa0102 from '../assets/Reverse-03.jpg';
import wa0103 from '../assets/OEM-02.jpg';
import wa0105 from '../assets/Reverse-04.jpg';
import wa0107 from '../assets/Reverse-05.png';
import wa0109 from '../assets/Wiring.jpg';
import wa0110 from '../assets/Reverse-01.png';
import wa0111 from '../assets/Reverse-02.jpg';
import wa0114 from '../assets/Reverse-03.jpg';
import wa0115 from '../assets/Reverse-04.jpg';
import wa0122 from '../assets/Reverse-05.png';
import wa0123 from '../assets/Reverse-01.png';

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

// ─── Categories ────────────────────────────────────────────────────────────────
export const categories: { id: CategoryId; name: string }[] = [
  { id: 'all',      name: 'All Work'   },
  { id: 'retrofit', name: 'Retrofits'  },
  { id: 'coding',   name: 'Coding'     },
  { id: 'camera',   name: 'Cameras'    },
  { id: 'screen',   name: 'Screens'    },
  { id: 'exterior', name: 'Exterior'   },
];

// ─── Gallery items ─────────────────────────────────────────────────────────────
export const galleryItems: GalleryItem[] = [
  { id:  1, title: 'Virtual Cockpit Retrofit',    category: 'retrofit', image: virtualCockpitImg,    description: 'Full digital instrument cluster for VW Golf MK7.5.',                      icon: Monitor    },
  { id:  2, title: 'Apple CarPlay Activation',    category: 'coding',   image: carplayImg,           description: 'Wireless CarPlay and Android Auto on Audi MIB2.',                        icon: Smartphone },
  { id:  3, title: 'High-Line Reverse Camera',    category: 'camera',   image: factoryReverseImg,    description: 'OEM-integrated camera with dynamic guidelines.',                          icon: Camera     },
  { id:  4, title: 'Android Auto Integration',    category: 'screen',   image: androidAutoImg,       description: 'Full Android Auto on MIB2 / MIB3 head unit.',                           icon: Smartphone },
  { id:  5, title: 'Convenience Coding Pack',     category: 'coding',   image: convenienceCodingImg, description: 'Needle sweep, acoustic lock, mirror dip and more.',                      icon: Cpu        },
  { id:  6, title: 'Driving Mood Lighting',       category: 'coding',   image: drivingMoodImg,       description: 'Ambient lighting profiles unlocked via dealer-level tools.',            icon: Cpu        },
  { id:  7, title: 'Auto Headlight Coding',       category: 'coding',   image: autoHeadlightsImg,    description: 'Coming-home / leaving-home lights and cornering enabled.',               icon: Cpu        },
  { id:  8, title: 'OEM vs Aftermarket Compare',  category: 'retrofit', image: oemViewImg,           description: 'Side-by-side OEM finish against stock fitment.',                         icon: Monitor    },
  { id:  9, title: 'Live Coding Session',         category: 'coding',   image: code2Img,             description: 'Dealer-level diagnostic long coding and adaptation work.',               icon: Cpu        },
  { id: 14, title: 'CarPlay + Virtual Cockpit',   category: 'retrofit', image: wa0061,               description: 'MIB2 CarPlay active alongside upgraded digital cockpit.',                   icon: Monitor    },
  { id: 17, title: 'Audi 8Y — Dual Screen',       category: 'screen',   image: wa0085,               description: 'Audi 8Y virtual cockpit and MMI screens active.',                       icon: Monitor    },
  { id: 18, title: 'VW Polo — Beats Audio',        category: 'screen',   image: wa0090,               description: 'VW + Beats Audio bootup after audio coding.',                            icon: Monitor    },
  { id: 19, title: 'Software Update Collage',       category: 'coding',   image: wa0102,               description: 'MIB software update in progress — VAG Leicester.',                        icon: Cpu        },
  { id: 20, title: 'Lane Assist Retrofit',         category: 'retrofit', image: wa0109,               description: 'Lane-keeping assist coded live — front camera calibrated.',                icon: Monitor    },
  { id: 24, title: 'Reverse Camera on Screen',     category: 'camera',   image: wa0052,               description: 'Reverse camera view displayed on MIB screen with guidelines.',              icon: Camera     },
  { id: 27, title: 'MIB2 CarPlay — Pink Theme',   category: 'screen',   image: wa0067,               description: 'CarPlay running on MIB2 with custom pink wallpaper.',                     icon: Monitor    },
  { id: 30, title: 'Start/Stop Disable',           category: 'coding',   image: wa0103,               description: 'Dealer-level diagnostic open — permanent start/stop disable coded.',      icon: Cpu        },
  { id: 31, title: 'Sports HMI Coding',            category: 'coding',   image: wa0107,               description: 'Sport HMI and performance display unlocked.',                             icon: Cpu        },
  { id: 32, title: 'Pulsing Start Button',         category: 'coding',   image: wa0111,               description: 'Animated breathing effect on ignition button enabled.',                    icon: Cpu        },
  { id: 33, title: 'CarPlay Activation',           category: 'coding',   image: wa0115,               description: 'Wireless CarPlay and Android Auto activated via coding.',                  icon: Smartphone },
  { id: 37, title: 'MIB Menu Screen',               category: 'screen',   image: wa0060,               description: 'VW Golf MIB menu navigation screen.',                                    icon: Monitor    },
  { id: 39, title: 'CarPlay on MIB',               category: 'screen',   image: wa0070,               description: 'Apple CarPlay displayed on VW Golf MIB head unit.',                     icon: Monitor    },
  { id: 40, title: 'Audi 360° Surround View',      category: 'camera',   image: wa0086,               description: "Audi 360° bird's-eye surround view on MMI screen.",                     icon: Camera     },
  { id: 43, title: 'Mirror-Integrated Camera',      category: 'camera',   image: wa0114,               description: 'Rear-view mirror camera system — clean wiring.',                        icon: Camera     },
  { id: 45, title: 'CarPlay + Digital Cockpit',   category: 'screen',   image: wa0050,               description: 'CarPlay on large screen alongside active digital cockpit.',               icon: Monitor    },
  { id: 46, title: 'MIB2 CarPlay Icons',           category: 'screen',   image: wa0055,               description: 'Apple CarPlay app grid on VW Golf MIB2.',                               icon: Monitor    },
  { id: 47, title: 'Reverse Camera View',           category: 'camera',   image: wa0058,               description: 'VW reverse camera displayed on MIB screen.',                            icon: Camera     },
  { id: 48, title: 'Audi MMI — CarPlay',           category: 'screen',   image: wa0062,               description: 'Audi A3 MMI with Apple CarPlay active.',                                icon: Monitor    },
  { id: 49, title: 'Start-Stop Coding Screen',     category: 'coding',   image: wa0066,               description: 'Vehicle status / start-stop screen — dealer-level coding.',              icon: Cpu        },
  { id: 50, title: 'MIB Head Unit Swap',           category: 'retrofit', image: wa0071,               description: 'MIB head unit replacement in progress — wiring stage.',                   icon: Monitor    },
  { id: 51, title: 'Audi Interior — CarPlay',       category: 'screen',   image: wa0072,               description: 'Audi interior with CarPlay displayed on MMI.',                          icon: Monitor    },
  { id: 52, title: 'Audi Virtual Cockpit — Dark',  category: 'screen',   image: wa0087,               description: 'Audi interior with virtual cockpit and MMI in dark mode.',              icon: Monitor    },
  { id: 53, title: 'Bentley Infotainment',         category: 'screen',   image: wa0110,               description: 'Bentley MMI infotainment screen.',                                      icon: Monitor    },
  { id: 54, title: 'Screen Retrofit',               category: 'screen',   image: wa0123,               description: 'Large-format glass display upgrade.',                                    icon: Monitor    },
  { id: 57, title: 'Seat Heating Coding',           category: 'coding',   image: wa0064,               description: 'Seat heating control displayed on VW Golf MIB.',                        icon: Cpu        },
  { id: 58, title: 'Start-Stop Climate Screen',    category: 'coding',   image: wa0068,               description: 'VW Golf console and climate with start-stop coding.',                    icon: Cpu        },
  { id: 59, title: 'VW Golf GTI MIB Menu',         category: 'screen',   image: wa0088,               description: 'VW Golf GTI MIB home menu screen.',                                     icon: Monitor    },
  { id: 60, title: 'Race Mode Gauges',             category: 'coding',   image: wa0094,               description: 'VW Golf R Race mode performance gauges on infotainment.',               icon: Cpu        },
  { id: 61, title: 'VW Polo — Upgrade Collage',    category: 'retrofit', image: wa0105,               description: 'VW Polo before/after screen and infotainment upgrade.',                 icon: Monitor    },
];
