import { Injectable, NgZone } from '@angular/core';
import { NavController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class HandleErrorService {
  constructor(
    private _store: Store,
    private _ngZone: NgZone,
    private _navController: NavController
  ) {}

  messageError$ = new BehaviorSubject<string | null>(null);

  handleGraphError(errorMessage: String, errorCode: string) {
    const error = { message: errorMessage, code: errorCode };

    switch (error.code) {
      default:
        break;
    }
    return error;
  }
}
