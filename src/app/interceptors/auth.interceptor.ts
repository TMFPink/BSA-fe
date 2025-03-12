import { BehaviorSubject, Observable, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HTTP_INTERCEPTORS,
  HttpErrorResponse,
  HttpResponse,
} from '@angular/common/http';
import { Injectable, Provider } from '@angular/core';
import { Store } from '@ngxs/store';
import {
  catchError,
  take,
  filter,
  map,
  retry,
  switchMap,
} from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';

@Injectable({ providedIn: 'root' })
export class AuthInterceptor implements HttpInterceptor {
  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<string | null> =
    new BehaviorSubject<string | null>(null);

  constructor(private store: Store, private cookieService: CookieService) {}

  getAccessToken(): string {
    return this.cookieService.get('token') || '';
  }
  //   getCsrfToken(): string {
  //     return this.cookieService.get('csrf') || '';
  //   }

  setHeaders(
    req: HttpRequest<any>,
    newToken: string | null = null
  ): HttpRequest<any> {
    // const csrf = this.getCsrfToken();

    const token = newToken ? newToken : this.getAccessToken();
    return req.clone({
      setHeaders: {
        Authorization: `JWT ${token}`,
      },
    });
  }

  //   refreshToken(): Observable<string> {
  //     this.isRefreshing = true;
  //     return new Observable<string>((observer) => {
  //       this.store.dispatch(new AuthActions.RefreshToken()).subscribe(
  //         () => {
  //           const newToken = this.getAccessToken();
  //           this.isRefreshing = false;
  //           this.refreshTokenSubject.next(newToken);
  //           observer.next(newToken);
  //           observer.complete();
  //         },
  //         (error) => {
  //           this.isRefreshing = false;
  //           this.refreshTokenSubject.error(error);
  //           observer.error(error);
  //         }
  //       );
  //     });
  //   }
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = this.getAccessToken();
    const authReq = this.setHeaders(req);
    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        // Simple error handling - just pass through the error
        return throwError(() => error);
      })
    );
  }
}

export const authInterceptorProvider: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true,
  deps: [Store, CookieService],
};
