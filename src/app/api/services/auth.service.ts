/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Login } from '../models/login';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
class AuthService extends __BaseService {
  static readonly authLoginCreatePath = '/auth/login/';
  static readonly authRegisterCreatePath = '/auth/register/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param data undefined
   */
  authLoginCreateResponse(data: Login): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/login/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authLoginCreate(data: Login): __Observable<null> {
    return this.authLoginCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  authRegisterCreateResponse(data: User): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/auth/register/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json'
      });

    return this.http.request<any>(req).pipe(
      __filter(_r => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<User>;
      })
    );
  }
  /**
   * @param data undefined
   */
  authRegisterCreate(data: User): __Observable<User> {
    return this.authRegisterCreateResponse(data).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module AuthService {
}

export { AuthService }
