import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PlanetDetailComponent } from './planet-detail.component';
import { ActivatedRoute } from '@angular/router';
import { PlanetsService } from '../../planets.service';
import { Planet } from '../../../../shared/models/planet.model';
import { of } from 'rxjs';
import { AuthService } from '../../../../core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

describe('PlanetDetailComponent', () => {
  let component: PlanetDetailComponent;
  let fixture: ComponentFixture<PlanetDetailComponent>;

  const mockPlanet: Planet = {
    id: 'earth',
    name: 'Earth',
    shortDescription: 'Home planet',
    climateRiskIndex: 42,
    avgDailyEnergyConsumption: 1234,
    creditRating: 'AAA',
    creditLine: 1000,
    tradeExposureIndex: 50,
  };

  const mockActivatedRoute = {
    snapshot: {
      paramMap: {
        get: (key: string) => (key === 'id' ? 'earth' : null),
      },
    },
  };

  const planetsServiceMock = {
    getById: jasmine.createSpy('getById').and.returnValue(of(mockPlanet)),
  };

  const authServiceMock = {
    hasAnyPermission: jasmine.createSpy('hasAnyPermission').and.returnValue(true),
    user: jasmine.createSpy('user').and.returnValue({
      username: 'admin',
      permissions: ['planet:read', 'planet:financial:read'],
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        PlanetDetailComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: PlanetsService, useValue: planetsServiceMock },
        { provide: AuthService, useValue: authServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PlanetDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call PlanetsService.getById with id from route and set planet signal', () => {
    expect(planetsServiceMock.getById).toHaveBeenCalledWith('earth');

    expect(component.planet()).toEqual(mockPlanet);
  });

  it('should initialize activeTab as "overview"', () => {
    expect(component.activeTab()).toBe('overview');
  });

  it('should change activeTab when selectTab is called', () => {
    component.selectTab('risk');
    expect(component.activeTab()).toBe('risk');

    component.selectTab('financials');
    expect(component.activeTab()).toBe('financials');
  });
});
