import { Component, Input, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DatePipe } from '@angular/common';
import { Proposal } from '../../../../shared/models/proposal.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proposal-timeline',
  standalone: true,
  imports: [CommonModule, DatePipe, TranslateModule],
  templateUrl: './proposal-timeline.component.html',
  styleUrls: ['./proposal-timeline.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProposalTimelineComponent {
  @Input({ required: true }) proposal!: Proposal;
}
