import { ApplicationConfig, provideZoneChangeDetection, provideBrowserGlobalErrorListeners, provideAppInitializer, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './core/auth/auth.interceptor';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideTranslateService({
      fallbackLang: "en",
      loader: provideTranslateHttpLoader({
          prefix: "./assets/i18n/",
          suffix: ".json",
          enforceLoading: true,
      })
    }),
    provideAppInitializer(() => {
      const translate = inject(TranslateService);
      translate.addLangs(["en", 'es']);
      translate.use("en");
    }),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideBrowserGlobalErrorListeners(),
  ],
};
