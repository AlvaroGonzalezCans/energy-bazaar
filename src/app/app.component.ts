import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AuthService } from './core/auth/auth.service';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  auth = inject(AuthService);
  private translateService = inject(TranslateService);
  protected readonly title = signal('energy-bazaar');

  constructor() {
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['en', 'es']);
    this.translateService.use(this.translateService.getBrowserLang() || 'en');
  }
}
