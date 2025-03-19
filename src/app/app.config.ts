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
  RouterModule,
  withRouterConfig,
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
import { IonicModule } from '@ionic/angular';
registerLocaleData(en);

export class CustomRouteReuseStrategy extends IonicRouteStrategy {
  private getComponent(snapshot: ActivatedRouteSnapshot): any {
    if (snapshot.routeConfig && snapshot.routeConfig.component) {
      return snapshot.routeConfig.component;
    }
    for (const child of snapshot.children) {
      const cmp = this.getComponent(child);
      if (cmp) {
        return cmp;
      }
    }
    return null;
  }

  override shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    curr: ActivatedRouteSnapshot
  ): boolean {
    // Force recreation by returning false if components differ (or are not found)
    return false;
  }

  override shouldDetach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  override store(
    route: ActivatedRouteSnapshot,
    handle: DetachedRouteHandle | null
  ): void {}

  override shouldAttach(route: ActivatedRouteSnapshot): boolean {
    return false;
  }

  override retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    return null;
  }
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideNzIcons(icons),
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideIonicAngular(),
    provideRouter(routes),
    importProvidersFrom(
      ApiModule.forRoot({ rootUrl: environment.ApiUrl }),
      NgxsModule.forRoot([]),
      IonicModule.forRoot({
        mode: 'ios',
        swipeBackEnabled: false,
      })
    ),
    provideAnimationsAsync('noop'),
    authInterceptorProvider,
    // Move the custom RouteReuseStrategy here so it overrides any previously provided strategy
    { provide: RouteReuseStrategy, useClass: CustomRouteReuseStrategy },
  ],
};
