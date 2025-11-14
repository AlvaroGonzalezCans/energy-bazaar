// src/app/features/proposals/proposals.store.ts
import { Injectable, signal, computed, inject } from '@angular/core';
import { ProposalsService } from './proposals.service';
import { Proposal } from '../../shared/models/proposal.model';
import { TradeKind } from '../../shared/models/trade.model';

@Injectable()
export class ProposalsStore {
  private service = inject(ProposalsService);

  private _proposals = signal<Proposal[]>([]);
  private _loading = signal(true);

  readonly proposals = computed(() => this._proposals());
  readonly loading   = computed(() => this._loading());

  load() {
    this._loading.set(true);
    this.service.list().subscribe(list => {
      this._proposals.set(list);
      this._loading.set(false);
    });
  }

  create(input: { planet: string; type: TradeKind; amount: number }) {
    this._loading.set(true);
    this.service.createProposal(input).subscribe(p => {
      this._proposals.update(prev => [p, ...prev]);
      this._loading.set(false);
    });
  }

  approve(id: string) {
    const current = this._proposals().find(p => p.id === id);
    if (!current) return;

    this.service.approve(current).subscribe(updated => {
      this.updateProposal(updated);
    });
  }

  reject(id: string) {
    const current = this._proposals().find(p => p.id === id);
    if (!current) return;

    this.service.reject(current).subscribe(updated => {
      this.updateProposal(updated);
    });
  }

  private updateProposal(updated: Proposal) {
    this._proposals.update(prev =>
      prev.map(p => (p.id === updated.id ? updated : p))
    );
  }
}
