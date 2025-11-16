import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProposalTimelineComponent } from './proposal-timeline.component';
import { TranslateModule } from '@ngx-translate/core';
import { Proposal } from '../../../../shared/models/proposal.model';

describe('ProposalTimelineComponent', () => {
  let component: ProposalTimelineComponent;
  let fixture: ComponentFixture<ProposalTimelineComponent>;

  const mockProposal: Proposal = {
    id: 'P000123',
    planet: 'Earth',
    type: 'BUY',
    amount: 1000,
    createdAt: '2025-01-01T12:00:00.000Z',
    createdBy: 'ulthar.trader',
    status: 'PENDING',
    approvals: [
      {
        by: 'council-1',
        at: '2025-01-01T12:30:00.000Z',
      },
    ],
    requiredApprovals: 2,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProposalTimelineComponent,
        TranslateModule.forRoot(),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalTimelineComponent);
    component = fixture.componentInstance;

    component.proposal = mockProposal;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should accept proposal input', () => {
    expect(component.proposal).toEqual(mockProposal);
  });
});
