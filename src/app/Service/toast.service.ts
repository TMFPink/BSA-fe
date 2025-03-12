import { inject, Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable({ providedIn: 'root' })
export class ToastService {
  private _snackBar = inject(MatSnackBar);

  showSnackBar(
    message: string,
    snackType: 'success' | 'warning' | 'error' = 'success'
  ) {
    this._snackBar.open(message, undefined, {
      panelClass: ['snack_style', snackType],
      duration: 2000,
    });
  }
}
