/* eslint-disable @angular-eslint/no-unused-vars */

import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { HandleErrorService } from './service/handle-error.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToastService } from './service/toast.service';
import { NavigationEnd, Router } from '@angular/router';
@Component({
  selector: 'app-root',
  standalone: true,
  template: `
    <ion-app>
      <ion-router-outlet></ion-router-outlet>
    </ion-app>
  `,
  imports: [
    IonApp,
    IonRouterOutlet,
    IonHeader,
    IonToolbar,
    IonTitle,

    NzIconModule,
  ],
})
export class AppComponent {
  showRouterOutlet = true;
  constructor(
    private _handlerError: HandleErrorService,
    private _toast: ToastService,
    private _router: Router
  ) {
    this._handlerError.messageError$
      .pipe(takeUntilDestroyed())
      .subscribe((message) => {
        if (!message) return;
        this._toast.showSnackBar(message, 'error');
      });

    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showRouterOutlet = false;
        setTimeout(() => (this.showRouterOutlet = true));
      }
    });
  }
}
