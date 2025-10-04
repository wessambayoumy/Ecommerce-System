import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import {
  provideClientHydration,
  withEventReplay,
} from '@angular/platform-browser';
import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { headersInterceptor } from './core/interceptors/headers-interceptor';
import { errorInterceptor } from './core/interceptors/error-interceptor';
import { successInterceptor } from './core/interceptors/success-interceptor';
import { NgxSpinnerModule } from 'ngx-spinner';
import { loadingInterceptor } from './core/interceptors/loading-interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        headersInterceptor,
        errorInterceptor,
        successInterceptor,
        loadingInterceptor,
      ])
    ),
    provideAnimations(),

    importProvidersFrom([CookieService, NgxSpinnerModule]),
    provideToastr(),
  ],
};
