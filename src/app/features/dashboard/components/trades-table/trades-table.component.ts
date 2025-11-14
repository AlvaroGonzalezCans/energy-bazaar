import { Component, Input, ChangeDetectionStrategy, signal, computed, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { debounceTime, startWith } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { Trade } from '../../../../shared/models/trade.model';
import { TranslateModule } from '@ngx-translate/core';
import { DashboardStore } from '../../dashboard.store';
import { FiltersBarComponent } from '../filters-bar/filters-bar.component';

@Component({
  selector: 'app-trades-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, FiltersBarComponent],
  templateUrl: './trades-table.component.html',
  styleUrls: ['./trades-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TradesTableComponent implements OnInit {
    store = inject(DashboardStore);
  
  @Input() set trades(value: Trade[]) {
    this._trades.set(value);
  }
  @Input() loading = false;

  private _trades = signal<Trade[]>([]);
  private readonly TABLE_TITLES = 'dashboard.trades-table.table.titles';
  
  searchControl = new FormControl('', { nonNullable: true });
  cols = [
    { key: 'id',     label: `${this.TABLE_TITLES}.tradeId` },
    { key: 'planet', label: `${this.TABLE_TITLES}.planet` },
    { key: 'type',   label: `${this.TABLE_TITLES}.type` },
    { key: 'amount', label: `${this.TABLE_TITLES}.amount`, params: { unit: 'ZJ' } },
    { key: 'time',   label: `${this.TABLE_TITLES}.time` },
  ];
  trackKey = (_: number, c: any) => c.key;

  ngOnInit() {
    this.store.loadInitialData();
    this.store.setSpeedProfile('slow');
  }

  private searchTerm = toSignal(
    this.searchControl.valueChanges.pipe(startWith(''), debounceTime(200)),
    { initialValue: '' }
  );

  filtered = computed(() => {
    const term = this.searchTerm().toLowerCase();
    return this._trades().filter(t =>
      [t.id, t.planet, t.type, t.amount.toString()].some(v =>
        v.toLowerCase().includes(term)
      )
    );
  });
}
