import { createDispatchMap, Store } from '@ngxs/store';

import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
import { profileAction } from '../profile';

@Injectable({
  providedIn: 'root',
})
export class ProfileFacade {
  constructor(
    private store: Store,
    private toast: ToastService,
    private router: Router
  ) {}

  actionMap = createDispatchMap({
    getMe: profileAction.GetMe,
    updateProfile: profileAction.UpdateProfile,
    updatePassword: profileAction.UpdatePassword,
  });

  updateProfile(payload: any) {
    this.actionMap.updateProfile(payload).subscribe({
      complete: () => {
        this.toast.showSnackBar('Profile updated successfully', 'success');
        this.actionMap.getMe();
        this.router.navigate(['/']);
      },
    });
  }
  updatePassword(payload: any) {
    this.actionMap.updatePassword(payload).subscribe({
      complete: () => {
        this.toast.showSnackBar('Password updated successfully', 'success');
        this.router.navigate(['/account']);
      },
    });
  }
}
