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
@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
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
  constructor(
    private _handlerError: HandleErrorService,
    private _toast: ToastService
  ) {
    this._handlerError.messageError$
      .pipe(takeUntilDestroyed())
      .subscribe((message) => {
        if (!message) return;
        this._toast.showSnackBar(message, 'error');
      });
  }
}
