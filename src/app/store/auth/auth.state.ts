import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/api/services';
import { AuthAction } from './auth.action';
import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HandleErrorService } from 'src/app/service/handle-error.service';

interface authStateModel {
  status: 'loading' | 'success' | 'error' | null;
  token: string;
}

@Injectable()
@State<authStateModel>({
  name: 'AuthState',
  defaults: {
    status: null,
    token: '',
  },
})
export class AuthState extends BaseState<authStateModel> {
  @Selector()
  static status({ status }: authStateModel) {
    return status;
  }
  constructor(
    private authService: AuthService,
    private cookieService: CookieService,
    private _handleErrorService: HandleErrorService
  ) {
    super();
  }

  @Action(AuthAction.Login)
  login(ctx: StateContext<authStateModel>, { payload }: AuthAction.Login) {
    this.setLoading(ctx);
    return this.authService.authLoginCreate(payload).pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while logging in',
          (data: any) => {
            console.log(data);
            var token = data.accessToken;
            localStorage.setItem('token', token);
            this.cookieService.set('token', token, 365, '/');

            ctx.patchState({ token });
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        const errorMessage = error.error.error;
        this._handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }

  @Action(AuthAction.Logout)
  logout(ctx: StateContext<authStateModel>) {
    this.cookieService.delete('token');
    localStorage.removeItem('token');
    ctx.patchState({ token: '' });
  }
}
