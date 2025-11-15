// features/trades/trade.service.ts
import { Injectable } from '@angular/core';
import {
  Observable, of, interval, map, mergeMap, range, takeUntil, Subject
} from 'rxjs';
import { Trade, TradeOrder } from '../../shared/models/trade.model';

type TradeKind = 'BUY'|'SELL';

@Injectable({ providedIn: 'root' })
export class TradeService {
  private executedSubject = new Subject<Trade>();
  private _executed: Trade[] = [];

  readonly executed$: Observable<Trade> = this.executedSubject.asObservable();

  create(order: TradeOrder): Observable<Trade> {
    const t = this.buildTrade(order.kind as TradeKind, order.planet, order.amount);
    return of(t);
  }

  streamOrders(options?: {
    burstsPerSecond?: number;    // cuántas ráfagas por segundo
    burstSize?: number;          // nº de órdenes por ráfaga
    planets?: string[];          // catálogo de planetas
    kindWeights?: { BUY: number; SELL: number }; // pesos para distribuir tipos
    stop$?: Observable<unknown>; // señal externa para parar
  }): Observable<Trade> {
    const {
      burstsPerSecond = 1,      // 10 ráfagas/seg → ~ cada 100ms
      burstSize = 5,            // 50 órdenes por ráfaga → 500 ops/s
      planets = ['Earth','Mars','Ulthar','Jovia','Vega'],
      kindWeights = { BUY: 1, SELL: 1 },
      stop$ = new Subject<void>()
    } = options ?? {};

    const periodMs = Math.max(1, Math.floor(1000 / burstsPerSecond));

    return interval(periodMs).pipe(
      mergeMap(() =>
        range(0, burstSize).pipe(
          map(() => this.randomTrade(planets, kindWeights))
        )
      ),
      takeUntil(stop$)
    );
  }

  emitExecuted(trade: Trade) {
    this._executed.unshift(trade);
    this.executedSubject.next(trade);
  }

  getExecutedSnapshot(): Trade[] {
    return [...this._executed];
  }

  private randomTrade(planets: string[], weights: { BUY: number; SELL: number }): Trade {
    const total = weights.BUY + weights.SELL;
    const r = Math.random() * total;
    const kind: TradeKind = r < weights.BUY ? 'BUY' : 'SELL';
    const planet = planets[Math.floor(Math.random() * planets.length)];
    const amount = Math.floor(Math.random() * 9000 + 1000);
    return this.buildTrade(kind, planet, amount);
  }

  private buildTrade(kind: TradeKind, planet: string, amount: number): Trade {
    return {
      id: 'T' + Math.floor(Math.random() * 1e9).toString(36),
      planet,
      type: kind,
      amount,
      time: new Date().toISOString(),
    };
  }
}
