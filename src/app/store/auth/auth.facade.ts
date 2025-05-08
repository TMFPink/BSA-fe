import { createDispatchMap, Store } from '@ngxs/store';
import { AuthAction } from './auth.action';
import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
import { profileAction } from '../profile';

@Injectable({
  providedIn: 'root',
})
export class AuthFacade {
  constructor(
    private store: Store,
    private toast: ToastService,
    private router: Router
  ) {}

  actionMap = createDispatchMap({
    login: AuthAction.Login,
    logout: AuthAction.Logout,
    register: AuthAction.Register,
  });

  login(payload: any) {
    this.actionMap.login(payload).subscribe({
      complete: () => {
        this.store.dispatch(new profileAction.GetMe());
        this.toast.showSnackBar('Login successful', 'success');
        this.router.navigate(['/home']);
      },
    });
  }

  logout() {
    this.actionMap.logout().subscribe({
      complete: () => {
        this.router.navigate(['/auth']);
      },
    });
  }

  register(payload: any) {
    this.actionMap.register(payload).subscribe({
      complete: () => {
        this.toast.showSnackBar('Register successful', 'success');
        this.router.navigate(['/auth']);
      },
    });
  }
}
