/**
 * VAG UK Portfolio — structured knowledge base (2008–2026)
 * Used by the compatibility checker and AI chatbot.
 */

export type ServiceType =
  | 'software-coding'
  | 'carplay-android-auto'
  | 'virtual-cockpit'
  | 'reverse-camera'
  | 'screen-upgrade'
  | 'performance-tuning'
  | 'retrofit'
  | 'nav-update'
  | 'health-check';

export const SERVICE_LABELS: Record<ServiceType, string> = {
  'software-coding':      'Software Coding & Activations',
  'carplay-android-auto': 'Apple CarPlay & Android Auto',
  'virtual-cockpit':      'Virtual Cockpit / Digital Cluster',
  'reverse-camera':       'OEM Reverse Camera',
  'screen-upgrade':       'MIB Infotainment Screen Upgrade',
  'performance-tuning':   'Performance Tuning',
  'retrofit':             'Hardware Retrofit',
  'nav-update':           'Navigation Update',
  'health-check':         'Vehicle Health Check',
};

export interface VehicleModel {
  brand: string;
  series: string;
  generation: string;
  designation?: string;        // e.g. 8V, MK7, B9
  yearStart: number;
  yearEnd: number | null;      // null = still in production
  segment: string;
  platform?: string;
  keywords: string[];          // lowercase search terms
  services: ServiceType[];
  notes?: string;
}

export const VAG_PORTFOLIO: VehicleModel[] = [
  // ─── AUDI ───────────────────────────────────────────────────────────────────
  {
    brand: 'Audi', series: 'A1', generation: 'Gen 1', designation: '8X',
    yearStart: 2010, yearEnd: 2018, segment: 'Supermini',
    keywords: ['a1', '8x'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A1', generation: 'Gen 2', designation: 'GB',
    yearStart: 2019, yearEnd: null, segment: 'Supermini',
    keywords: ['a1', 'gb'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A3', generation: 'Gen 2', designation: '8P',
    yearStart: 2003, yearEnd: 2013, segment: 'Premium Hatchback',
    keywords: ['a3', '8p'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A3', generation: 'Gen 3', designation: '8V',
    yearStart: 2012, yearEnd: 2020, segment: 'Premium Hatchback / Saloon',
    keywords: ['a3', '8v'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A3', generation: 'Gen 4', designation: '8Y',
    yearStart: 2020, yearEnd: null, segment: 'Premium Hatchback / Saloon',
    keywords: ['a3', '8y'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A4', generation: 'B8',
    yearStart: 2008, yearEnd: 2015, segment: 'Executive',
    keywords: ['a4', 'b8'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A4', generation: 'B9',
    yearStart: 2015, yearEnd: 2024, segment: 'Executive',
    keywords: ['a4', 'b9'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A5', generation: 'B10',
    yearStart: 2024, yearEnd: null, segment: 'Executive Coupé',
    keywords: ['a5', 'b10'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'screen-upgrade', 'health-check'],
    notes: 'Replaces the ICE A4 from 2024.',
  },
  {
    brand: 'Audi', series: 'A6', generation: 'C7',
    yearStart: 2011, yearEnd: 2018, segment: 'Executive',
    keywords: ['a6', 'c7'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Audi', series: 'A6', generation: 'C8',
    yearStart: 2018, yearEnd: null, segment: 'Executive',
    keywords: ['a6', 'c8'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q3', generation: 'Gen 1', designation: '8U',
    yearStart: 2011, yearEnd: 2018, segment: 'Compact SUV',
    keywords: ['q3', '8u'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q3', generation: 'Gen 2', designation: 'F3',
    yearStart: 2018, yearEnd: null, segment: 'Compact SUV',
    keywords: ['q3', 'f3'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q5', generation: 'Gen 1', designation: '8R',
    yearStart: 2008, yearEnd: 2017, segment: 'Mid-size SUV',
    keywords: ['q5', '8r'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q5', generation: 'Gen 2', designation: 'FY',
    yearStart: 2017, yearEnd: null, segment: 'Mid-size SUV',
    keywords: ['q5', 'fy'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q4 e-tron', generation: 'Gen 1',
    yearStart: 2021, yearEnd: null, segment: 'Electric SUV', platform: 'MEB',
    keywords: ['q4', 'q4 etron', 'q4 e-tron'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Audi', series: 'Q6 e-tron', generation: 'Gen 1',
    yearStart: 2024, yearEnd: null, segment: 'Electric SUV', platform: 'PPE',
    keywords: ['q6', 'q6 etron', 'q6 e-tron'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Audi', series: 'e-tron GT', generation: 'Gen 1',
    yearStart: 2020, yearEnd: null, segment: 'Electric Grand Tourer', platform: 'J1',
    keywords: ['etron gt', 'e-tron gt', 'rs etron gt'],
    services: ['software-coding', 'health-check'],
  },

  // ─── VOLKSWAGEN ─────────────────────────────────────────────────────────────
  {
    brand: 'Volkswagen', series: 'Golf', generation: 'Mk6',
    yearStart: 2008, yearEnd: 2012, segment: 'Family Hatchback',
    keywords: ['golf', 'mk6', 'golf 6', 'golf mk6'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Golf', generation: 'Mk7 / Mk7.5',
    yearStart: 2012, yearEnd: 2020, segment: 'Family Hatchback', platform: 'MQB',
    keywords: ['golf', 'mk7', 'golf 7', 'golf mk7', 'golf 7.5', 'mk7.5', 'gti', 'gtd', 'golf r'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'performance-tuning', 'retrofit', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Golf', generation: 'Mk8',
    yearStart: 2020, yearEnd: null, segment: 'Family Hatchback', platform: 'MQB Evo',
    keywords: ['golf', 'mk8', 'golf 8', 'golf mk8', 'gti', 'gtd', 'golf r'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Polo', generation: 'Mk5', designation: '6R/6C',
    yearStart: 2009, yearEnd: 2017, segment: 'Supermini',
    keywords: ['polo', 'mk5', 'polo 5', 'polo mk5', '6r', '6c'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Polo', generation: 'Mk6', designation: 'AW',
    yearStart: 2017, yearEnd: null, segment: 'Supermini', platform: 'MQB A0',
    keywords: ['polo', 'mk6', 'polo 6', 'polo mk6', 'aw'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Passat', generation: 'B7',
    yearStart: 2010, yearEnd: 2014, segment: 'Executive',
    keywords: ['passat', 'b7'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Passat', generation: 'B8',
    yearStart: 2014, yearEnd: 2023, segment: 'Executive', platform: 'MQB',
    keywords: ['passat', 'b8'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Tiguan', generation: 'Mk1',
    yearStart: 2008, yearEnd: 2016, segment: 'Mid-size SUV',
    keywords: ['tiguan', 'tiguan 1', 'tiguan mk1'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Tiguan', generation: 'Mk2',
    yearStart: 2016, yearEnd: 2024, segment: 'Mid-size SUV', platform: 'MQB',
    keywords: ['tiguan', 'tiguan 2', 'tiguan mk2'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'Tiguan', generation: 'Mk3',
    yearStart: 2024, yearEnd: null, segment: 'Mid-size SUV',
    keywords: ['tiguan', 'tiguan 3', 'tiguan mk3'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'ID.3', generation: 'Gen 1',
    yearStart: 2019, yearEnd: null, segment: 'Electric Hatchback', platform: 'MEB',
    keywords: ['id3', 'id.3', 'id 3'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'ID.4', generation: 'Gen 1',
    yearStart: 2021, yearEnd: null, segment: 'Electric SUV', platform: 'MEB',
    keywords: ['id4', 'id.4', 'id 4'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'ID.5', generation: 'Gen 1',
    yearStart: 2021, yearEnd: null, segment: 'Electric Coupé SUV', platform: 'MEB',
    keywords: ['id5', 'id.5', 'id 5'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Volkswagen', series: 'ID.7', generation: 'Gen 1',
    yearStart: 2023, yearEnd: null, segment: 'Electric Executive', platform: 'MEB',
    keywords: ['id7', 'id.7', 'id 7'],
    services: ['software-coding', 'health-check'],
  },

  // ─── SKODA ──────────────────────────────────────────────────────────────────
  {
    brand: 'Skoda', series: 'Fabia', generation: 'Mk2',
    yearStart: 2007, yearEnd: 2014, segment: 'Supermini',
    keywords: ['fabia', 'fabia 2', 'fabia mk2'],
    services: ['software-coding', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Fabia', generation: 'Mk3',
    yearStart: 2014, yearEnd: 2021, segment: 'Supermini',
    keywords: ['fabia', 'fabia 3', 'fabia mk3'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Fabia', generation: 'Mk4',
    yearStart: 2021, yearEnd: null, segment: 'Supermini', platform: 'MQB A0',
    keywords: ['fabia', 'fabia 4', 'fabia mk4'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Octavia', generation: 'Mk2',
    yearStart: 2004, yearEnd: 2013, segment: 'Family Hatch / Estate',
    keywords: ['octavia', 'octavia 2', 'octavia mk2'],
    services: ['software-coding', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Octavia', generation: 'Mk3',
    yearStart: 2012, yearEnd: 2020, segment: 'Family Hatch / Estate', platform: 'MQB',
    keywords: ['octavia', 'octavia 3', 'octavia mk3'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Octavia', generation: 'Mk4',
    yearStart: 2020, yearEnd: null, segment: 'Family Hatch / Estate',
    keywords: ['octavia', 'octavia 4', 'octavia mk4'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Superb', generation: 'Mk2',
    yearStart: 2008, yearEnd: 2015, segment: 'Executive',
    keywords: ['superb', 'superb 2', 'superb mk2'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Superb', generation: 'Mk3',
    yearStart: 2015, yearEnd: 2024, segment: 'Executive', platform: 'MQB',
    keywords: ['superb', 'superb 3', 'superb mk3'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Kodiaq', generation: 'Mk1',
    yearStart: 2016, yearEnd: 2023, segment: 'Large 7-seat SUV',
    keywords: ['kodiaq', 'kodiaq 1'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Kodiaq', generation: 'Mk2',
    yearStart: 2023, yearEnd: null, segment: 'Large 7-seat SUV',
    keywords: ['kodiaq', 'kodiaq 2'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Karoq', generation: 'Mk1',
    yearStart: 2017, yearEnd: null, segment: 'Compact SUV', platform: 'MQB',
    keywords: ['karoq'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Yeti', generation: 'Mk1',
    yearStart: 2009, yearEnd: 2017, segment: 'Compact SUV',
    keywords: ['yeti'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'Skoda', series: 'Enyaq', generation: 'Gen 1',
    yearStart: 2020, yearEnd: null, segment: 'Electric SUV', platform: 'MEB',
    keywords: ['enyaq', 'enyaq iv'],
    services: ['software-coding', 'health-check'],
  },

  // ─── SEAT ───────────────────────────────────────────────────────────────────
  {
    brand: 'SEAT', series: 'Ibiza', generation: 'Mk4',
    yearStart: 2008, yearEnd: 2017, segment: 'Supermini',
    keywords: ['ibiza', 'ibiza 4', 'ibiza mk4'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Ibiza', generation: 'Mk5',
    yearStart: 2017, yearEnd: null, segment: 'Supermini', platform: 'MQB A0',
    keywords: ['ibiza', 'ibiza 5', 'ibiza mk5'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Leon', generation: 'Mk2',
    yearStart: 2005, yearEnd: 2012, segment: 'Hatchback',
    keywords: ['leon', 'seat leon', 'leon 2', 'leon mk2'],
    services: ['software-coding', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Leon', generation: 'Mk3',
    yearStart: 2012, yearEnd: 2020, segment: 'Hatchback', platform: 'MQB',
    keywords: ['leon', 'seat leon', 'leon 3', 'leon mk3'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'nav-update', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Leon', generation: 'Mk4',
    yearStart: 2020, yearEnd: null, segment: 'Hatchback',
    keywords: ['leon', 'seat leon', 'leon 4', 'leon mk4'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'screen-upgrade', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Ateca', generation: 'Mk1',
    yearStart: 2016, yearEnd: null, segment: 'Compact SUV',
    keywords: ['ateca'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'reverse-camera', 'health-check'],
  },
  {
    brand: 'SEAT', series: 'Arona', generation: 'Mk1',
    yearStart: 2017, yearEnd: null, segment: 'Crossover',
    keywords: ['arona'],
    services: ['software-coding', 'carplay-android-auto', 'reverse-camera', 'health-check'],
  },

  // ─── CUPRA ──────────────────────────────────────────────────────────────────
  {
    brand: 'Cupra', series: 'Leon', generation: 'Mk1',
    yearStart: 2020, yearEnd: null, segment: 'Performance Hatchback',
    keywords: ['cupra leon', 'cupra leon mk1'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'performance-tuning', 'health-check'],
  },
  {
    brand: 'Cupra', series: 'Formentor', generation: 'Mk1',
    yearStart: 2020, yearEnd: null, segment: 'Performance SUV',
    keywords: ['formentor', 'cupra formentor'],
    services: ['software-coding', 'carplay-android-auto', 'virtual-cockpit', 'performance-tuning', 'health-check'],
  },
  {
    brand: 'Cupra', series: 'Born', generation: 'Gen 1',
    yearStart: 2021, yearEnd: null, segment: 'Electric Performance Hatchback', platform: 'MEB',
    keywords: ['born', 'cupra born'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Cupra', series: 'Tavascan', generation: 'Gen 1',
    yearStart: 2023, yearEnd: null, segment: 'Electric SUV Coupé', platform: 'MEB',
    keywords: ['tavascan', 'cupra tavascan'],
    services: ['software-coding', 'health-check'],
  },

  // ─── PORSCHE ────────────────────────────────────────────────────────────────
  {
    brand: 'Porsche', series: '911', generation: '997.2',
    yearStart: 2008, yearEnd: 2012, segment: 'Sports Car',
    keywords: ['911', '997', 'porsche 911'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Porsche', series: '911', generation: '991',
    yearStart: 2011, yearEnd: 2019, segment: 'Sports Car',
    keywords: ['911', '991', 'porsche 911'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: '911', generation: '992',
    yearStart: 2019, yearEnd: null, segment: 'Sports Car',
    keywords: ['911', '992', 'porsche 911'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: 'Macan', generation: 'Gen 1',
    yearStart: 2014, yearEnd: 2024, segment: 'Compact SUV',
    keywords: ['macan', 'porsche macan'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: 'Macan', generation: 'Gen 2 (Electric)',
    yearStart: 2024, yearEnd: null, segment: 'Electric Compact SUV',
    keywords: ['macan', 'macan ev', 'porsche macan'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Porsche', series: 'Cayenne', generation: 'E2',
    yearStart: 2010, yearEnd: 2018, segment: 'Luxury SUV',
    keywords: ['cayenne', 'cayenne e2'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: 'Cayenne', generation: 'E3',
    yearStart: 2018, yearEnd: null, segment: 'Luxury SUV',
    keywords: ['cayenne', 'cayenne e3'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: 'Taycan', generation: 'Gen 1',
    yearStart: 2019, yearEnd: null, segment: 'Electric Grand Tourer', platform: 'J1',
    keywords: ['taycan', 'porsche taycan'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Porsche', series: '718 Boxster', generation: 'Gen 1',
    yearStart: 2016, yearEnd: null, segment: 'Sports Roadster',
    keywords: ['718', 'boxster', '718 boxster'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },
  {
    brand: 'Porsche', series: '718 Cayman', generation: 'Gen 1',
    yearStart: 2016, yearEnd: null, segment: 'Sports Coupé',
    keywords: ['718', 'cayman', '718 cayman'],
    services: ['software-coding', 'carplay-android-auto', 'health-check'],
  },

  // ─── BENTLEY ────────────────────────────────────────────────────────────────
  {
    brand: 'Bentley', series: 'Continental GT', generation: 'Gen 2',
    yearStart: 2011, yearEnd: 2018, segment: 'Grand Tourer',
    keywords: ['continental gt', 'conti gt', 'continental'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Continental GT', generation: 'Gen 3/4',
    yearStart: 2018, yearEnd: null, segment: 'Grand Tourer',
    keywords: ['continental gt', 'conti gt', 'continental'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Flying Spur', generation: 'Gen 2',
    yearStart: 2013, yearEnd: 2019, segment: 'Luxury Saloon',
    keywords: ['flying spur', 'flyingspur'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Flying Spur', generation: 'Gen 3',
    yearStart: 2019, yearEnd: null, segment: 'Luxury Saloon',
    keywords: ['flying spur', 'flyingspur'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Bentayga', generation: 'Mk1',
    yearStart: 2016, yearEnd: 2020, segment: 'Ultra-luxury SUV',
    keywords: ['bentayga'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Bentayga', generation: 'Mk2',
    yearStart: 2020, yearEnd: null, segment: 'Ultra-luxury SUV',
    keywords: ['bentayga'],
    services: ['software-coding', 'health-check'],
  },
  {
    brand: 'Bentley', series: 'Mulsanne', generation: 'Gen 2',
    yearStart: 2010, yearEnd: 2020, segment: 'Flagship Saloon',
    keywords: ['mulsanne'],
    services: ['software-coding', 'health-check'],
    notes: 'Discontinued in 2020.',
  },
];

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Find vehicles matching a free-text query (brand, model, year). */
export function searchVehicles(query: string): VehicleModel[] {
  const q = query.toLowerCase().replace(/[^a-z0-9.\s]/g, '');
  const yearMatch = q.match(/\b(20\d{2}|19\d{2})\b/);
  const year = yearMatch ? parseInt(yearMatch[1]) : null;

  return VAG_PORTFOLIO.filter((v) => {
    const nameMatch = v.keywords.some((kw) => q.includes(kw)) ||
      q.includes(v.brand.toLowerCase()) ||
      q.includes(v.series.toLowerCase());

    if (!nameMatch) return false;
    if (year) {
      return year >= v.yearStart && (v.yearEnd === null || year <= v.yearEnd);
    }
    return true;
  });
}

/** Return all services available across a set of matched vehicles (deduplicated). */
export function availableServices(vehicles: VehicleModel[]): ServiceType[] {
  const set = new Set<ServiceType>();
  vehicles.forEach((v) => v.services.forEach((s) => set.add(s)));
  return Array.from(set);
}

/** All unique brands in the portfolio. */
export const BRANDS = [...new Set(VAG_PORTFOLIO.map((v) => v.brand))];
