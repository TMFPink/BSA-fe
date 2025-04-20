/* tslint:disable */
import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpHeaders,
} from '@angular/common/http';
import { BaseService as __BaseService } from '../base-service';
import { ApiConfiguration as __Configuration } from '../api-configuration';
import { StrictHttpResponse as __StrictHttpResponse } from '../strict-http-response';
import { Observable as __Observable } from 'rxjs';
import { map as __map, filter as __filter } from 'rxjs/operators';

import { Bill } from '../models/bill';
import { BillParticipant } from '../models/bill-participant';
@Injectable({
  providedIn: 'root',
})
class BillsService extends __BaseService {
  static readonly billsListPath = '/bills/';
  static readonly billsCreatePath = '/bills/';
  static readonly billsAddParticipantsCreatePath = '/bills/add-participants/';
  static readonly billsPayUpdatePath = '/bills/pay/{id}/';
  static readonly billsPayPartialUpdatePath = '/bills/pay/{id}/';
  static readonly billsReadPath = '/bills/{hashed_id}/';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }
  billsListResponse(): __Observable<__StrictHttpResponse<Array<Bill>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>('GET', this.rootUrl + `/bills/`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json',
    });

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Array<Bill>>;
      })
    );
  }
  billsList(): __Observable<Array<Bill>> {
    return this.billsListResponse().pipe(__map((_r) => _r.body as Array<Bill>));
  }

  /**
   * @param data undefined
   */
  billsCreateResponse(data: {
    billName: string;
    category: string;
    date: any;
    shared: boolean;
    billDetails: Array<{ description?: string; amount?: number }>;
    participants: Array<{
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    }>;
    payer: {
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    };
  }): __Observable<__StrictHttpResponse<Bill>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>('POST', this.rootUrl + `/bills/`, __body, {
      headers: __headers,
      params: __params,
      responseType: 'json',
    });

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Bill>;
      })
    );
  }
  /**
   * @param data undefined
   */
  billsCreate(data: {
    billName: string;
    category: string;
    date: any;
    shared: boolean;
    billDetails: Array<{ description?: string; amount?: number }>;
    participants: Array<{
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    }>;
    payer: {
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    };
  }): __Observable<Bill> {
    return this.billsCreateResponse(data).pipe(__map((_r) => _r.body as Bill));
  }

  /**
   * @param data undefined
   */
  billsAddParticipantsCreateResponse(data: {
    bill_id: string;
    participants: Array<string>;
  }): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/bills/add-participants/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<null>;
      })
    );
  }
  /**
   * @param data undefined
   */
  billsAddParticipantsCreate(data: {
    bill_id: string;
    participants: Array<string>;
  }): __Observable<null> {
    return this.billsAddParticipantsCreateResponse(data).pipe(
      __map((_r) => _r.body as null)
    );
  }

  /**
   * @param params The `BillsService.BillsPayUpdateParams` containing the following parameters:
   *
   * - `pk`: Primary key of the bill participant
   *
   * - `id`:
   *
   * - `data`:
   */
  billsPayUpdateResponse(
    params: BillsService.BillsPayUpdateParams
  ): __Observable<__StrictHttpResponse<BillParticipant>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PUT',
      this.rootUrl + `/bills/pay/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BillParticipant>;
      })
    );
  }
  /**
   * @param params The `BillsService.BillsPayUpdateParams` containing the following parameters:
   *
   * - `pk`: Primary key of the bill participant
   *
   * - `id`:
   *
   * - `data`:
   */
  billsPayUpdate(
    params: BillsService.BillsPayUpdateParams
  ): __Observable<BillParticipant> {
    return this.billsPayUpdateResponse(params).pipe(
      __map((_r) => _r.body as BillParticipant)
    );
  }

  /**
   * @param params The `BillsService.BillsPayPartialUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  billsPayPartialUpdateResponse(
    params: BillsService.BillsPayPartialUpdateParams
  ): __Observable<__StrictHttpResponse<BillParticipant>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    __body = params.data;
    let req = new HttpRequest<any>(
      'PATCH',
      this.rootUrl + `/bills/pay/${encodeURIComponent(String(params.id))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<BillParticipant>;
      })
    );
  }
  /**
   * @param params The `BillsService.BillsPayPartialUpdateParams` containing the following parameters:
   *
   * - `id`:
   *
   * - `data`:
   */
  billsPayPartialUpdate(
    params: BillsService.BillsPayPartialUpdateParams
  ): __Observable<BillParticipant> {
    return this.billsPayPartialUpdateResponse(params).pipe(
      __map((_r) => _r.body as BillParticipant)
    );
  }

  /**
   * @param params The `BillsService.BillsReadParams` containing the following parameters:
   *
   * - `hashed_id`: Hashed bill ID
   *
   * - `hashed_id`:
   */
  billsReadResponse(
    params: BillsService.BillsReadParams
  ): __Observable<__StrictHttpResponse<Bill>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;

    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/bills/${encodeURIComponent(String(params.hashedId))}/`,
      __body,
      {
        headers: __headers,
        params: __params,
        responseType: 'json',
      }
    );

    return this.http.request<any>(req).pipe(
      __filter((_r) => _r instanceof HttpResponse),
      __map((_r) => {
        return _r as __StrictHttpResponse<Bill>;
      })
    );
  }
  /**
   * @param params The `BillsService.BillsReadParams` containing the following parameters:
   *
   * - `hashed_id`: Hashed bill ID
   *
   * - `hashed_id`:
   */
  billsRead(params: BillsService.BillsReadParams): __Observable<Bill> {
    return this.billsReadResponse(params).pipe(__map((_r) => _r.body as Bill));
  }
}

module BillsService {
  /**
   * Parameters for billsPayUpdate
   */
  export interface BillsPayUpdateParams {
    /**
     * Primary key of the bill participant
     */
    pk: number;
    id: string;
    data: BillParticipant;
  }

  /**
   * Parameters for billsPayPartialUpdate
   */
  export interface BillsPayPartialUpdateParams {
    id: string;
    data: BillParticipant;
  }

  /**
   * Parameters for billsRead
   */
  export interface BillsReadParams {
    /**
     * Hashed bill ID
     */
    // hashedId: string;
    hashedId: string;
  }
}

export { BillsService };
