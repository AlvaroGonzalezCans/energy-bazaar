import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-trade-detail-page',
  standalone: true,
  imports: [CommonModule],
  template: 'trade.page.html'
})
export class TradeDetailPage {
  tradeId: string | null = null;

  constructor(private route: ActivatedRoute) {
    this.tradeId = this.route.snapshot.paramMap.get('id');
  }
}
