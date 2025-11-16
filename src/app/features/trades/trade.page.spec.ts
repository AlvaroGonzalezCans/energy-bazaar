import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TradeDetailPage } from './trade.page';
import { ActivatedRoute } from '@angular/router';

describe('TradeDetailPage', () => {
  let component: TradeDetailPage;
  let fixture: ComponentFixture<TradeDetailPage>;

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? 'T123' : null)
      }
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TradeDetailPage], // standalone component
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TradeDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the page', () => {
    expect(component).toBeTruthy();
  });

  it('should read tradeId from ActivatedRoute', () => {
    expect(component.tradeId).toBe('T123');
  });
});
