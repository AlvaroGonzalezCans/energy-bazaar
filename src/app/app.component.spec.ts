import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AuthService } from './core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

describe('AppComponent', () => {
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  const authServiceMock = {
    isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(false),
    user: null,
  };

  beforeEach(async () => {
    translateServiceMock = jasmine.createSpyObj<TranslateService>(
      'TranslateService',
      ['setDefaultLang', 'addLangs', 'use', 'getBrowserLang']
    );

    translateServiceMock.getBrowserLang.and.returnValue('en');

    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should initialize title signal with "energy-bazaar"', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;

    expect(app['title']()).toBe('energy-bazaar');
  });

  it('should configure TranslateService in constructor', () => {
    TestBed.createComponent(AppComponent);

    expect(translateServiceMock.setDefaultLang).toHaveBeenCalledWith('en');
    expect(translateServiceMock.addLangs).toHaveBeenCalledWith(['en', 'es']);
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
  });
});
