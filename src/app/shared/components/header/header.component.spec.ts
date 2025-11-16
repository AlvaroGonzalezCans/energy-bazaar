import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  let translateService: TranslateService;

  const mockUser = { username: 'admin', permissions: ['trade:view', 'planet:read'] };

  const mockAuthService = {
    user: jasmine.createSpy('user').and.returnValue(mockUser),
    hasAnyPermission: jasmine.createSpy('hasAnyPermission').and.returnValue(true),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HeaderComponent,
        TranslateModule.forRoot(),
        RouterTestingModule,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    translateService = TestBed.inject(TranslateService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should expose user from AuthService', () => {
    expect(component.user()).toEqual((mockUser as any));
  });
});
