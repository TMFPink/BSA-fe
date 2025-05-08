/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { User } from '../models/user';
@Injectable({
  providedIn: 'root',
})
class UsersService extends __BaseService {
  static readonly usersAllListPath = '/users/all/';
  static readonly usersMeListPath = '/users/me/';
  static readonly usersPasswordCreatePath = '/users/password';
  static readonly usersProfileReadPath = '/users/profile/';
  static readonly usersProfilePartialUpdatePath = '/users/profile/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }
  usersAllListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/all/`,
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
  }  usersAllList(): __Observable<null> {
    return this.usersAllListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }
  usersMeListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/me/`,
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
  }  usersMeList(): __Observable<null> {
    return this.usersMeListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Change user password
   * @param data undefined
   */
  usersPasswordCreateResponse(data: {current_password: string, new_password: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/users/password`,
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
   * Change user password
   * @param data undefined
   */
  usersPasswordCreate(data: {current_password: string, new_password: string}): __Observable<null> {
    return this.usersPasswordCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * Get user profile information
   */
  usersProfileReadResponse(): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/users/profile/`,
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
   * Get user profile information
   */
  usersProfileRead(): __Observable<User> {
    return this.usersProfileReadResponse().pipe(
      __map(_r => _r.body as User)
    );
  }

  /**
   * Update user profile information
   * @param data undefined
   */
  usersProfilePartialUpdateResponse(data: {username?: string, first_name?: string, last_name?: string, email?: string, phone?: string, avatarUrl?: string}): __Observable<__StrictHttpResponse<User>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/users/profile/`,
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
   * Update user profile information
   * @param data undefined
   */
  usersProfilePartialUpdate(data: {username?: string, first_name?: string, last_name?: string, email?: string, phone?: string, avatarUrl?: string}): __Observable<User> {
    return this.usersProfilePartialUpdateResponse(data).pipe(
      __map(_r => _r.body as User)
    );
  }
}

module UsersService {
}

export { UsersService }
