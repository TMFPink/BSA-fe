import { StateContext } from '@ngxs/store';
import { throwError } from 'rxjs';

export interface BaseStateModel {
  status: 'loading' | 'success' | 'error' | null;
}

export class BaseState<T extends BaseStateModel> {
  protected handleError(ctx: StateContext<T>, error: any) {
    ctx.patchState({ status: 'error' } as Partial<T>);
    return throwError(() => error?.message ?? error);
  }

  protected handleSuccess(ctx: StateContext<T>) {
    ctx.patchState({ status: 'success' } as Partial<T>);
  }

  protected setLoading(ctx: StateContext<T>) {
    ctx.patchState({ status: 'loading' } as Partial<T>);
  }

  protected handleApiResponse<U>(
    ctx: StateContext<T>,
    response: any,
    errorMessage: string,
    successCallback: (data: U) => void
  ) {
    // if (response.error) {
    //   console.log('error');
    //   ctx.patchState({ status: 'error' } as Partial<T>);
    //   throw new Error(response.error || errorMessage);
    // }

    if (response) {
      this.handleSuccess(ctx);
      successCallback(response);
    }
  }
}
