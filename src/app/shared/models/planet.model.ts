export interface Planet {
  id: string;
  name: string;
  shortDescription: string;
  climateRiskIndex: number;          // 0–100
  avgDailyEnergyConsumption: number; // MWh
  creditRating?: string;             // 'AAA', 'BBB', etc.
  creditLine?: number;               // millones
  tradeExposureIndex?: number;       // 0–100
}
