import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService, UsersService } from 'src/app/api/services';

import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { catchError, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { profileAction } from './profile.actions';
import { User } from 'src/app/api/models';

interface profileStateModel {
  status: 'loading' | 'success' | 'error' | null;
  user: User | null;
  uploadQrStatus: 'loading' | 'success' | 'error' | null;
}

@Injectable()
@State<profileStateModel>({
  name: 'profileState',
  defaults: {
    status: null,
    user: null,
    uploadQrStatus: null,
  },
})
export class ProfileState extends BaseState<profileStateModel> {
  @Selector()
  static status({ status }: profileStateModel) {
    return status;
  }

  @Selector()
  static user({ user }: profileStateModel) {
    return user;
  }
  constructor(
    private profileService: UsersService,
    private cookieService: CookieService,
    private handleErrorService: HandleErrorService
  ) {
    super();
  }

  @Action(profileAction.GetMe)
  getMe(ctx: StateContext<profileStateModel>) {
    this.setLoading(ctx);
    return this.profileService.usersMeList().pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while getting profile',
          (data: User) => {
            console.log(data);
            ctx.patchState({ user: data });
            localStorage.setItem('user', JSON.stringify(data));
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        const errorMessage = error.error.error;
        this.handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }

  @Action(profileAction.GetProfile)
  getProfile(ctx: StateContext<profileStateModel>) {
    this.setLoading(ctx);
    return this.profileService.usersMeList().pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while getting profile',
          (data: User) => {
            ctx.patchState({ user: data });
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        const errorMessage = error.error.error;
        this.handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }

  @Action(profileAction.UpdateProfile)
  updateProfile(
    ctx: StateContext<profileStateModel>,
    { payload }: profileAction.UpdateProfile
  ) {
    this.setLoading(ctx);
    return this.profileService.usersProfilePartialUpdate(payload).pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while updating profile',
          (data: User) => {
            ctx.patchState({ user: data });
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        const errorMessage = error.error.error;
        this.handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }

  @Action(profileAction.UpdatePassword)
  updatePassword(
    ctx: StateContext<profileStateModel>,
    { payload }: profileAction.UpdatePassword
  ) {
    this.setLoading(ctx);
    return this.profileService.usersPasswordCreate(payload).pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while updating password',
          (data: User) => {
            ctx.patchState({ user: data });
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        const errorMessage = error.error.error;
        this.handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }

  @Action(profileAction.UpdateQrCode)
  updateQrCode(
    ctx: StateContext<profileStateModel>,
    { payload }: profileAction.UpdateQrCode
  ) {
    this.setLoading(ctx);
    return this.profileService.usersQRCreate(payload).pipe(
      tap((response) => {
        this.handleApiResponse(
          ctx,
          response,
          'Error while updating QR code',
          (data: User) => {
            ctx.patchState({ uploadQrStatus: 'success' });
            const user = localStorage.getItem('user');
            if (user) {
              const parsedUser = JSON.parse(user);
              parsedUser.qrCode = data.qrCode;
              localStorage.setItem('user', JSON.stringify(parsedUser));
            }
          }
        );
      }),
      catchError((error) => {
        this.handleError(ctx, error);
        ctx.patchState({ uploadQrStatus: 'error' });
        const errorMessage = error.error.error;
        this.handleErrorService.messageError$.next(errorMessage);
        return error;
      })
    );
  }
}
