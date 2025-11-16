import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lang',
  imports: [CommonModule],
  templateUrl: './lang.component.html',
  styleUrl: './lang.component.scss',
})
export class LangComponent {
  auth = inject(AuthService);

  private translate = inject(TranslateService);

  isLangOpen = false;
  currentLang = this.translate.getBrowserLang() || 'en';

  langs = [
    { code: 'es', label: 'Español', flag: '🇪🇸' },
    { code: 'en', label: 'English', flag: '🇬🇧' },
  ];

  toggleLangDropdown() {
    this.isLangOpen = !this.isLangOpen;
  }

  changeLang(code: string, event?: MouseEvent) {
    event?.stopPropagation();
    this.translate.use(code);
    this.currentLang = code;
    this.isLangOpen = false;
  }
}
