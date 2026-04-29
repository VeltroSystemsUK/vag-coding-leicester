export const VAG_MAKES = [
  'VW',
  'Audi',
  'SEAT',
  'CUPRA',
  'Skoda',
  'Porsche',
  'Bentley',
  'Lamborghini',
] as const;

export type VehicleMake = typeof VAG_MAKES[number];
