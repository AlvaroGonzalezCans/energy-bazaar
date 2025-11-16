import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProposalCardComponent } from './proposal-card.component';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../../../core/auth/auth.service';
import { Proposal } from '../../../../shared/models/proposal.model';

describe('ProposalCardComponent', () => {
  let component: ProposalCardComponent;
  let fixture: ComponentFixture<ProposalCardComponent>;

  const mockProposal: Proposal = {
    id: 'P000123',
    planet: 'Earth',
    type: 'BUY',
    amount: 1000,
    createdAt: '2025-01-01T12:00:00.000Z',
    createdBy: 'ulthar.trader',
    status: 'PENDING',
    approvals: [
      { by: 'council-1', at: '2025-01-01T12:30:00.000Z' },
    ],
    requiredApprovals: 2,
  };

  const authServiceMock = {
    hasAnyPermission: jasmine.createSpy('hasAnyPermission').and.returnValue(true),
    user: jasmine.createSpy('user').and.returnValue({
      username: 'admin',
      permissions: ['trade:view', 'trade:approve'],
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ProposalCardComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProposalCardComponent);
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

  it('should calculate progress based on approvals and requiredApprovals', () => {
    expect(component.progress).toBe(50);

    component.proposal = {
      ...mockProposal,
      approvals: [
        ...mockProposal.approvals,
        { by: 'council-2', at: '2025-01-01T13:00:00.000Z' },
      ],
    };
    fixture.detectChanges();

    expect(component.progress).toBe(100);

    component.proposal = {
      ...component.proposal,
      approvals: [
        ...component.proposal.approvals,
        { by: 'council-3', at: '2025-01-01T14:00:00.000Z' },
      ],
    };
    fixture.detectChanges();

    expect(component.progress).toBe(100);
  });

  it('should emit approve event', () => {
    const approveSpy = jasmine.createSpy('approveSpy');
    component.approve.subscribe(approveSpy);

    component.approve.emit();

    expect(approveSpy).toHaveBeenCalled();
  });

  it('should emit reject event', () => {
    const rejectSpy = jasmine.createSpy('rejectSpy');
    component.reject.subscribe(rejectSpy);

    component.reject.emit();

    expect(rejectSpy).toHaveBeenCalled();
  });
});
