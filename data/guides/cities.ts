/**
 * EXAMPLE DATA. Starting points for the cost calculator, matched to the cities
 * the example universities sit in. These are illustrative monthly figures that
 * demonstrate how location changes a budget — they are not researched costs
 * for these cities, and the calculator labels them as examples throughout.
 */
export type CityPreset = {
  city: string;
  accommodation: number;
  food: number;
  transport: number;
  other: number;
};

export const cityPresets: CityPreset[] = [
  { city: "London", accommodation: 950, food: 280, transport: 90, other: 220 },
  { city: "Edinburgh", accommodation: 700, food: 250, transport: 55, other: 180 },
  { city: "Bristol", accommodation: 690, food: 250, transport: 60, other: 180 },
  { city: "Manchester", accommodation: 600, food: 230, transport: 55, other: 165 },
  { city: "Birmingham", accommodation: 570, food: 225, transport: 55, other: 160 },
  { city: "Leeds", accommodation: 550, food: 220, transport: 50, other: 155 },
  { city: "Cardiff", accommodation: 520, food: 215, transport: 45, other: 150 },
];

export const defaultTuition = 20000;
