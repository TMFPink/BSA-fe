import {
  ApplicationConfig,
  provideZoneChangeDetection,
  importProvidersFrom,
} from '@angular/core';

import { icons } from './icons-provider';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { en_US, provideNzI18n } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import {
  RouteReuseStrategy,
  provideRouter,
  withPreloading,
  PreloadAllModules,
  DetachedRouteHandle,
  ActivatedRouteSnapshot,
} from '@angular/router';
import {
  IonicRouteStrategy,
  provideIonicAngular,
} from '@ionic/angular/standalone';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ApiModule } from './api/api.module';
import { NgxsModule } from '@ngxs/store';
import { AuthState } from './store/auth';
import { authInterceptorProvider } from './interceptors/auth.interceptor';
import { FriendsState } from './store';
registerLocaleData(en);

// Custom route reuse strategy that never reuses routes to ensure components are always initialized
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  shouldDetach(): boolean {
    return false;
  }
  store(): void {}
  shouldAttach(): boolean {
    return false;
  }
  retrieve(): DetachedRouteHandle | null {
    return null;
  }
  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // This forces the component to be recreated every time
    return false;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideIonicAngular(),

    provideRouter(routes, withPreloading(PreloadAllModules)),

    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
    importProvidersFrom(
      ApiModule.forRoot({ rootUrl: environment.ApiUrl }),
      NgxsModule.forRoot([FriendsState])
    ),
    provideAnimationsAsync('noop'),
    authInterceptorProvider,
  ],
};
