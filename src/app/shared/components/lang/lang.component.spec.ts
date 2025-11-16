import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LangComponent } from './lang.component';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';

describe('LangComponent', () => {
  let component: LangComponent;
  let fixture: ComponentFixture<LangComponent>;
  let translateServiceMock: jasmine.SpyObj<TranslateService>;

  const authServiceMock = {
    isAuthenticated: jasmine.createSpy('isAuthenticated').and.returnValue(true),
  };

  beforeEach(async () => {
    translateServiceMock = jasmine.createSpyObj<TranslateService>(
      'TranslateService',
      ['use', 'getDefaultLang']
    );

    (translateServiceMock as any).currentLang = 'es';
    translateServiceMock.getDefaultLang.and.returnValue('en');

    await TestBed.configureTestingModule({
      imports: [LangComponent],
      providers: [
        { provide: AuthService, useValue: authServiceMock },
        { provide: TranslateService, useValue: translateServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize currentLang from TranslateService', () => {
    expect(component.currentLang).toBe('es');
  });

  it('should toggle isLangOpen when toggleLangDropdown is called', () => {
    expect(component.isLangOpen).toBeFalse();

    component.toggleLangDropdown();
    expect(component.isLangOpen).toBeTrue();

    component.toggleLangDropdown();
    expect(component.isLangOpen).toBeFalse();
  });

  it('should change language, update currentLang and close dropdown on changeLang', () => {
    component.isLangOpen = true;
    const mockEvent = { stopPropagation: jasmine.createSpy('stopPropagation') } as unknown as MouseEvent;

    component.changeLang('en', mockEvent);

    expect(mockEvent.stopPropagation).toHaveBeenCalled();
    expect(translateServiceMock.use).toHaveBeenCalledWith('en');
    expect(component.currentLang).toBe('en');
    expect(component.isLangOpen).toBeFalse();
  });
});
