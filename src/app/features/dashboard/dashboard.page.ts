import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardStore } from './dashboard.store';
import { LeaderboardComponent } from './components/leader-board/leader-board.component';
import { TradesTableComponent } from './components/trades-table/trades-table.component';
import { TradeActionsComponent } from '../trades/components/trade-actions.component';
import { StreamSpeedControlsComponent } from './components/stream-speed-controls/stream-speed-controls.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, LeaderboardComponent, TradesTableComponent, TradeActionsComponent, StreamSpeedControlsComponent, TranslateModule],
  templateUrl: 'dashboard.page.html',
  styleUrls: ['dashboard.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DashboardStore],
})
export class DashboardPage implements OnInit {
  store = inject(DashboardStore);

  ngOnInit() {
    this.store.loadInitialData();
    this.store.setSpeedProfile('slow');
  }
}
