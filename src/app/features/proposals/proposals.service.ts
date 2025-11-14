// src/app/features/proposals/proposals.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Proposal } from '../../shared/models/proposal.model';
import { TradeKind } from '../../shared/models/trade.model';

@Injectable({ providedIn: 'root' })
export class ProposalsService {

	list(): Observable<Proposal[]> {
		const initial: Proposal[] = [];
		return of(initial).pipe(delay(200));
	}

	createProposal(input: { planet: string; type: TradeKind; amount: number }): Observable<Proposal> {
		const proposal: Proposal = {
			id: 'P' + Math.floor(Math.random() * 1e6).toString().padStart(6, '0'),
			planet: input.planet,
			type: input.type,
			amount: input.amount,
			createdAt: new Date().toISOString(),
			createdBy: 'ulthar.trader',
			status: 'PENDING',
			approvals: [],
			requiredApprovals: 2,
		};

		return of(proposal).pipe(delay(400));
	}

	approve(proposal: Proposal): Observable<Proposal> {
		const updated: Proposal = {
			...proposal,
			approvals: [
				...proposal.approvals,
				{
					by: `council-${proposal.approvals.length + 1}`,
					at: new Date().toISOString(),
				},
			],
			status:
				proposal.approvals.length + 1 >= proposal.requiredApprovals
					? 'APPROVED'
					: proposal.status,
		};

		return of(updated).pipe(delay(300));
	}

	reject(proposal: Proposal): Observable<Proposal> {
		const updated: Proposal = {
			...proposal,
			status: 'REJECTED',
		};

		return of(updated).pipe(delay(300));
	}
}
