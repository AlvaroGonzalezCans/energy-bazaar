import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutButtonComponent } from './logout-button.component';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateModule } from '@ngx-translate/core';

describe('LogoutButtonComponent', () => {
  let component: LogoutButtonComponent;
  let fixture: ComponentFixture<LogoutButtonComponent>;

  const mockAuthService = {
    logout: jasmine.createSpy('logout'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LogoutButtonComponent,
        TranslateModule.forRoot(),
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LogoutButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call AuthService.logout when onLogout is called', () => {
    component.onLogout();
    expect(mockAuthService.logout).toHaveBeenCalled();
  });
});
