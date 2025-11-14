import { Trade } from "../shared/models/trade.model";


export const MOCK_TRADES: Trade[] = [
  { id: 'T001', planet: 'Earth', type: 'BUY', amount: 5200, time: new Date().toISOString() },
  { id: 'T002', planet: 'Mars', type: 'SELL', amount: 4100, time: new Date().toISOString() },
  { id: 'T003', planet: 'Ulthar', type: 'BUY', amount: 6500, time: new Date().toISOString() },
  { id: 'T004', planet: 'Earth', type: 'SELL', amount: 7200, time: new Date().toISOString() },
];
