import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ProposalTimelineComponent } from '../proposal-timeline/proposal-timeline.component';
import { HasPermissionDirective } from '../../../../core/auth/permissions.directive';
import { Proposal } from '../../../../shared/models/proposal.model';

@Component({
  selector: 'app-proposal-card',
  standalone: true,
  imports: [CommonModule, ProposalTimelineComponent, TranslateModule, HasPermissionDirective],
  templateUrl: './proposal-card.component.html',
  styleUrls: ['./proposal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalCardComponent {
  @Input({ required: true }) proposal!: Proposal;
  @Output() approve = new EventEmitter<void>();
  @Output() reject = new EventEmitter<void>();

  get progress() {
    return Math.min(
      100,
      (this.proposal.approvals.length / this.proposal.requiredApprovals) * 100
    );
  }
}
