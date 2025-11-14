import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProposalTimelineComponent } from './proposal-timeline.component';

describe('ProposalTimelineComponent', () => {
  let component: ProposalTimelineComponent;
  let fixture: ComponentFixture<ProposalTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProposalTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProposalTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
