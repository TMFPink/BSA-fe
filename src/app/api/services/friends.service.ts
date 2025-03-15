/* tslint:disable */
import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
class FriendsService extends __BaseService {
  static readonly friendsListPath = '/friends/';
  static readonly friendsAddCreatePath = '/friends/add/';
  static readonly friendsRejectRequestCreatePath = '/friends/reject-request/';
  static readonly friendsRemoveCreatePath = '/friends/remove/';
  static readonly friendsRequestsListPath = '/friends/requests/';
  static readonly friendsSendRequestCreatePath = '/friends/send-request/';
  static readonly friendsSuggestionsListPath = '/friends/suggestions/';

  constructor(
    config: __Configuration,
    http: HttpClient
  ) {
    super(config, http);
  }

  /**
   * @param username Username to filter friends by
   */
  friendsListResponse(username?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (username != null) __params = __params.set('username', username.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/friends/`,
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
   * @param username Username to filter friends by
   */
  friendsList(username?: string): __Observable<null> {
    return this.friendsListResponse(username).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  friendsAddCreateResponse(data: {friend_id: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/friends/add/`,
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
  friendsAddCreate(data: {friend_id: string}): __Observable<null> {
    return this.friendsAddCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  friendsRejectRequestCreateResponse(data: {friend_id: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/friends/reject-request/`,
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
  friendsRejectRequestCreate(data: {friend_id: string}): __Observable<null> {
    return this.friendsRejectRequestCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  friendsRemoveCreateResponse(data: {friend_id: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/friends/remove/`,
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
  friendsRemoveCreate(data: {friend_id: string}): __Observable<null> {
    return this.friendsRemoveCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }
  friendsRequestsListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/friends/requests/`,
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
  }  friendsRequestsList(): __Observable<null> {
    return this.friendsRequestsListResponse().pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param data undefined
   */
  friendsSendRequestCreateResponse(data: {friend_id: string}): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/friends/send-request/`,
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
  friendsSendRequestCreate(data: {friend_id: string}): __Observable<null> {
    return this.friendsSendRequestCreateResponse(data).pipe(
      __map(_r => _r.body as null)
    );
  }

  /**
   * @param username Username to search for
   */
  friendsSuggestionsListResponse(username?: string): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (username != null) __params = __params.set('username', username.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/friends/suggestions/`,
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
   * @param username Username to search for
   */
  friendsSuggestionsList(username?: string): __Observable<null> {
    return this.friendsSuggestionsListResponse(username).pipe(
      __map(_r => _r.body as null)
    );
  }
}

module FriendsService {
}

export { FriendsService }
