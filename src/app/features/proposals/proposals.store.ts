import { Injectable, signal, computed, inject } from '@angular/core';
import { ProposalsService } from './proposals.service';
import { Proposal } from '../../shared/models/proposal.model';
import { Trade, TradeKind } from '../../shared/models/trade.model';
import { TradeService } from '../trades/trade.service';

@Injectable()
export class ProposalsStore {
	private service = inject(ProposalsService);
	private tradeEvents = inject(TradeService);

	private _proposals = signal<Proposal[]>([]);
	private _loading = signal(true);

	readonly proposals = computed(() => this._proposals());
	readonly loading = computed(() => this._loading());

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

			if (updated.status === 'APPROVED') {
				const trade = this.proposalToTrade(updated);
				this.tradeEvents.emitExecuted(trade);
			}
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

	private proposalToTrade(p: Proposal): Trade {
		const lastApproval = p.approvals[p.approvals.length - 1];

		return {
			id: 'T' + p.id.replace(/^P/, ''),
			planet: p.planet,
			type: p.type,
			amount: p.amount,
			time: lastApproval?.at ?? new Date().toISOString(),
		};
	}
}
