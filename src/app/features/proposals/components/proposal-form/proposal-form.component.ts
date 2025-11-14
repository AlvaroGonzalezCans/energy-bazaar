import { Component, EventEmitter, Output, inject, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proposal-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule],
  templateUrl: './proposal-form.component.html',
  styleUrls: ['./proposal-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalFormComponent {
  private fb = inject(FormBuilder);

  @Output() submitForm = new EventEmitter<{ planet: string; type: 'BUY' | 'SELL'; amount: number }>();

  form = this.fb.nonNullable.group({
    planet: ['Earth', Validators.required],
    type: ['BUY' as 'BUY' | 'SELL', Validators.required],
    amount: [1000, [Validators.required, Validators.min(1)]],
  });

  onSubmit() {
    if (this.form.invalid) return;
    const { planet, type, amount } = this.form.getRawValue();
    this.submitForm.emit({ planet, type, amount: Number(amount) });
  }
}

