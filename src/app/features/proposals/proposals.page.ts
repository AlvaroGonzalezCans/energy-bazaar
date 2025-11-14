import { Component, OnInit, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProposalsStore } from './proposals.store';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalFormComponent } from './components/proposal-form/proposal-form.component';
import { ProposalCardComponent } from './components/proposal-card/proposal-card.component';

@Component({
	selector: 'app-proposals-page',
	standalone: true,
	imports: [CommonModule, TranslateModule, ProposalFormComponent, ProposalCardComponent],
	templateUrl: './proposals.page.html',
	styleUrls: ['./proposals.page.scss'],
	providers: [ProposalsStore],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalsPage implements OnInit {
	store = inject(ProposalsStore);

	ngOnInit() {
		this.store.load();
	}
}
