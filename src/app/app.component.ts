import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TranslateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true
})
export class AppComponent {
  private translateService = inject(TranslateService);
  protected readonly title = signal('energy-bazaar');

  constructor() {
    this.translateService.setDefaultLang('en');
    this.translateService.addLangs(['en', 'es']);
    this.translateService.use(this.translateService.getBrowserLang() || 'en');
  }
}
