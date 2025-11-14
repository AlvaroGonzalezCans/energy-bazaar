import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div class="p-6">
    <h1 class="text-2xl font-bold text-emerald-500 mb-4">⚙️ Trade Detail</h1>
    <p>Viewing details for trade <strong>#{{ tradeId }}</strong></p>
  </div>
  `
})
export class TradeDetailPage {
  tradeId: string | null = null;
  constructor(private route: ActivatedRoute) {
    this.tradeId = this.route.snapshot.paramMap.get('id');
  }
}
