export interface Trade {
  id: string;
  planet: string;
  type: 'BUY' | 'SELL';
  amount: number;
  time: string;
}

export type TradeKind = 'BUY' | 'SELL';
export interface TradeOrder {
  planet: string;
  kind: TradeKind;
  amount: number;
  price?: number | null;
}