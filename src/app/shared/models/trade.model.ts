export type TradeKind = 'BUY' | 'SELL';

export interface Trade {
  id: string;
  planet: string;
  type: TradeKind;
  amount: number;
  time: string;
}

export interface TradeOrder {
  planet: string;
  kind: TradeKind;
  amount: number;
  price?: number | null;
}