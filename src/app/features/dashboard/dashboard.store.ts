// features/dashboard/dashboard.store.ts
import { Injectable, signal, computed, inject, OnDestroy } from '@angular/core';
import { Subject, bufferTime, takeUntil } from 'rxjs';
import { Trade } from '../../shared/models/trade.model';
import { DashboardService } from './dashboard.service';
import { TradeService } from '../trades/trade.service';

type SpeedProfile = 'slow'|'normal'|'fast';

const SPEED_PROFILES: Record<SpeedProfile, { burstsPerSecond: number; burstSize: number; bufferMs: number }> = {
  slow:   { burstsPerSecond: 1,  burstSize: 2,  bufferMs: 300 },  // ~50 trades/s
  normal: { burstsPerSecond: 12, burstSize: 25,  bufferMs: 200 },  // ~300 trades/s
  fast:   { burstsPerSecond: 25, burstSize: 40,  bufferMs: 150 },  // ~1000 trades/s
};

@Injectable()
export class DashboardStore implements OnDestroy {
  private service = inject(DashboardService);
  private tradeService = inject(TradeService);

  private destroy$ = new Subject<void>();
  private streamStop$ = new Subject<void>();

  private _trades  = signal<Trade[]>([]);
  private _filters = signal<{ planet?: string; type?: string }>({});
  private _loading = signal(true);
  private _streaming = signal(false);
  private _profile  = signal<SpeedProfile>('normal');

  readonly loading   = computed(() => this._loading());
  readonly streaming = computed(() => this._streaming());
  readonly profile   = computed(() => this._profile());
  readonly trades    = computed(() => this._trades());
  readonly filteredTrades = computed(() => {
    const f = this._filters();
    return this._trades().filter(t =>
      (!f.planet || t.planet === f.planet) && (!f.type || t.type === f.type)
    );
  });
  readonly leaderboard = computed(() => {
    const byPlanet = new Map<string, number>();
    this._trades().forEach(t => byPlanet.set(t.planet, (byPlanet.get(t.planet) || 0) + t.amount));
    return Array.from(byPlanet.entries())
      .map(([planet, amount]) => ({ planet, amount }))
      .sort((a, b) => b.amount - a.amount);
  });

  loadInitialData() {
    this._loading.set(true);
    this.service.getTrades().subscribe(trades => {
      this._trades.set(trades);
      this._loading.set(false);
      // No arrancamos stream aquí; lo hará el usuario con los botones.
    });
  }

  /** Cambia el perfil y (re)inicia el stream con la nueva velocidad */
  setSpeedProfile(profile: SpeedProfile) {
    if (this._profile() === profile && this._streaming()) return; // ya está igual
    this._profile.set(profile);
    this.restartStreamWithProfile(profile);
  }

  private restartStreamWithProfile(profile: SpeedProfile) {
    // Detiene stream actual (si lo hay)
    if (this._streaming()) this.streamStop$.next();

    const cfg = SPEED_PROFILES[profile];
    this._streaming.set(true);

    this.tradeService.streamOrders({
      burstsPerSecond: cfg.burstsPerSecond,
      burstSize: cfg.burstSize,
      planets: ['Earth', 'Mars', 'Ulthar', 'Jovia', 'Vega'],
      kindWeights: { BUY: 3, SELL: 2 },
      stop$: this.streamStop$,
    })
    .pipe(
      bufferTime(cfg.bufferMs),
      takeUntil(this.destroy$)
    )
    .subscribe(batch => {
      if (!batch.length) return;
      this._trades.update(prev => {
        const next = [...batch.reverse(), ...prev];
        return next.slice(0, 5000); // límite para rendimiento
      });
    });
  }

  updateFilters(filters: { planet?: string; type?: string }) {
    this._filters.set(filters);
  }

  appendTrade(trade: Trade) {
    this._trades.update(prev => [trade, ...prev].slice(0, 5000));
  }

  ngOnDestroy(): void {
    this.streamStop$.next();
    this._streaming.set(false);
    this.destroy$.next();
    this.destroy$.complete();
  }
}
