import { inject } from '@angular/core';
import { Store } from '@ngxs/store';

import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard = () => {
  const router = inject(Router);
  const store = inject(Store);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  if (!token) {
    router.navigate(['/auth']);
  }
  return !!token;
};

export const unAuthGuard = () => {
  const navCtrl = inject(NavController);
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  return !token;
};
