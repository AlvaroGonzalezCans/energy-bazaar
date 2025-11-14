// features/trades/components/trade-actions.component.ts
import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { TradeService } from '../trade.service';
import { HasPermissionDirective } from '../../../core/auth/permissions.directive';
import { DashboardStore } from '../../dashboard/dashboard.store';
import { AuthService } from '../../../core/auth/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-trade-actions',
	standalone: true,
	imports: [CommonModule, ReactiveFormsModule, HasPermissionDirective],
	templateUrl: 'trade-actions.component.html',
	styleUrls: ['trade-actions.component.scss']
})
export class TradeActionsComponent {
	private fb = inject(FormBuilder);
	private dashboardStore = inject(DashboardStore);
	private trade = inject(TradeService);
	private auth = inject(AuthService);
	private router = inject(Router);

	openModal = signal(false);
	loading = signal(false);
	kind = signal<'BUY' | 'SELL'>('BUY');
	errorMsg  = signal<string | null>(null);

	form: FormGroup = this.fb.nonNullable.group({
		planet: ['Earth', Validators.required],
		amount: [null, [Validators.required, Validators.min(1)]],
		price: [null]
	});

	open(k: 'BUY' | 'SELL') {
		this.kind.set(k);
		this.openModal.set(true);
	}

	close() {
		this.openModal.set(false);
	}

	submit() {
		if (this.form.invalid) return;

		if (!this.auth.isTokenValid()) {
      this.errorMsg.set('Tu sesión ha expirado. Vuelve a iniciar sesión.');
      this.auth.logout();                 // limpia estado
      this.router.navigateByUrl('/login');
      return;
    }

		this.loading.set(true);

		const raw = this.form.getRawValue();
		const payload = {
			kind: this.kind(),
			planet: raw.planet!,
			amount: Number(raw.amount),
			...(raw.price != null ? { price: Number(raw.price) } : {})
		} as const;

		this.trade.create(payload).subscribe({
			next: executed => {
				this.dashboardStore.appendTrade(executed);
				this.loading.set(false);
				this.close();
			},
			error: () => this.loading.set(false)
		});
	}
}
