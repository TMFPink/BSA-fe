import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from 'src/app/api/services';
import { AuthAction } from './auth.action';
import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { catchError, tap } from 'rxjs';

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
  constructor(private authService: AuthService) {
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
            localStorage.setItem('token', data.token);
          }
        );
      }),
      catchError((error) => this.handleError(ctx, error))
    );
  }

  @Action(AuthAction.Logout)
  logout(ctx: StateContext<authStateModel>) {
    console.log('hello');
  }
}
