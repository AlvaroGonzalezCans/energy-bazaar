import { Injectable } from '@angular/core';
import { Observable, of, interval, map } from 'rxjs';
import { Trade } from '../../shared/models/trade.model';
import { MOCK_TRADES } from '../../mocks/trades.mock';

@Injectable({ providedIn: 'root' })
export class DashboardService {
  getTrades(): Observable<Trade[]> {
    return of(MOCK_TRADES).pipe();
  }

  connectToStream(): Observable<Trade> {
    return interval(3000).pipe(
      map((i: number): Trade => ({
        id: 'T' + (1000 + i),
        planet: ['Earth', 'Mars', 'Ulthar'][i % 3] as 'Earth' | 'Mars' | 'Ulthar',
        type: (i % 2 === 0 ? 'BUY' : 'SELL') as 'BUY' | 'SELL',
        amount: Math.floor(Math.random() * 9000 + 1000),
        time: new Date().toISOString(),
      }))
    );
  }
}
