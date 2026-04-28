export interface VehicleCompatibility {
  brand: string;
  models: {
    name: string;
    years: {
      range: string;
      platform: string;
      features: string[];
    }[];
  }[];
}

export const compatibilityData: VehicleCompatibility[] = [
  {
    brand: 'Volkswagen',
    models: [
      {
        name: 'Golf',
        years: [
          {
            range: '2013-2020 (Mk7/7.5)',
            platform: 'MQB',
            features: [
              'Apple CarPlay / Android Auto (MIB2)',
              'Virtual Cockpit Retrofit',
              'Needle Sweep',
              'Mirror Dip on Reverse',
              'Acoustic Lock/Unlock',
              'Video in Motion',
              'Dynamic Tail Light Retrofit',
            ],
          },
          {
            range: '2020+ (Mk8)',
            platform: 'MQB Evo',
            features: [
              'Wireless CarPlay Activation',
              'Performance Monitor',
              'Ambient Lighting Expansion',
              'Travel Assist Activation',
              'Sign Recognition',
            ],
          },
        ],
      },
      {
        name: 'Tiguan',
        years: [
          {
            range: '2016+ (Mk2)',
            platform: 'MQB',
            features: [
              'Virtual Cockpit Retrofit',
              'App-Connect Activation',
              'Area View Calibration',
              'Lane Assist Activation',
              'High Beam Assist',
            ],
          },
        ],
      },
    ],
  },
  {
    brand: 'Audi',
    models: [
      {
        name: 'A3 / S3 / RS3',
        years: [
          {
            range: '2013-2020 (8V)',
            platform: 'MQB',
            features: [
              'Smartphone Interface (CarPlay)',
              'Virtual Cockpit Retrofit',
              'Dynamic Indicator Activation',
              'Beep on Lock',
              'Oil Temperature Display',
              'Lap Timer',
            ],
          },
          {
            range: '2020+ (8Y)',
            platform: 'MQB Evo',
            features: [
              'Wireless Smartphone Interface',
              'Matrix LED Animations',
              'Adaptive Cruise Activation',
              'Theme Changes',
            ],
          },
        ],
      },
      {
        name: 'A4 / A5 / Q5',
        years: [
          {
            range: '2016+ (B9)',
            platform: 'MLB Evo',
            features: [
              'Smartphone Interface',
              'Virtual Cockpit Sport Layout',
              'Traffic Sign Recognition',
              'Active Lane Assist',
              'Needle Sweep',
            ],
          },
        ],
      },
    ],
  },
  {
    brand: 'SEAT',
    models: [
      {
        name: 'Leon',
        years: [
          {
            range: '2013-2020 (5F)',
            platform: 'MQB',
            features: [
              'Full Link Activation',
              'Virtual Cockpit Retrofit',
              'CUPRA Mode Cluster',
              'Needle Sweep',
              'Mirror Fold on Lock',
            ],
          },
        ],
      },
    ],
  },
  {
    brand: 'Skoda',
    models: [
      {
        name: 'Octavia',
        years: [
          {
            range: '2013-2020 (5E)',
            platform: 'MQB',
            features: [
              'SmartLink Activation',
              'Virtual Cockpit Retrofit',
              'VRS Mode Cluster',
              'High Beam Assist',
              'Cornering Fog Lights',
            ],
          },
        ],
      },
    ],
  },
];
