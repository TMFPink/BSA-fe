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
import { BillFromImageResponse } from '../models/bill-from-image-response';
@Injectable({
  providedIn: 'root',
})
class BillsService extends __BaseService {
  static readonly billsListPath = '/bills/';
  static readonly billsCreatePath = '/bills/';
  static readonly billsAddParticipantsCreatePath = '/bills/add-participants/';
  static readonly billsBalanceListPath = '/bills/balance/';
  static readonly billsPayCreatePath = '/bills/pay/';
  static readonly billsProcessImageCreatePath = '/bills/process-image/';
  static readonly billsSpendingListPath = '/bills/spending/';
  static readonly billsReadPath = '/bills/{hashed_id}/';

  constructor(config: __Configuration, http: HttpClient) {
    super(config, http);
  }

  /**
   * @param params The `BillsService.BillsListParams` containing the following parameters:
   *
   * - `date`: Filter by bill date (YYYY-MM-DD)
   *
   * - `category`: Filter by category
   *
   * - `billName`: Filter by bill name
   *
   * - `all_paid`: Filter by payment status (true/false)
   */
  billsListResponse(
    params: BillsService.BillsListParams
  ): __Observable<__StrictHttpResponse<Array<Bill>>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.date != null)
      __params = __params.set('date', params.date.toString());
    if (params.category != null)
      __params = __params.set('category', params.category.toString());
    if (params.billName != null)
      __params = __params.set('billName', params.billName.toString());
    if (params.allPaid != null)
      __params = __params.set('all_paid', params.allPaid.toString());
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
  /**
   * @param params The `BillsService.BillsListParams` containing the following parameters:
   *
   * - `date`: Filter by bill date (YYYY-MM-DD)
   *
   * - `category`: Filter by category
   *
   * - `billName`: Filter by bill name
   *
   * - `all_paid`: Filter by payment status (true/false)
   */
  billsList(params: BillsService.BillsListParams): __Observable<Array<Bill>> {
    return this.billsListResponse(params).pipe(
      __map((_r) => _r.body as Array<Bill>)
    );
  }

  /**
   * @param data undefined
   */
  billsCreateResponse(data: {
    billName: string;
    category: string;
    date: any;
    shared: boolean;
    billDetails: Array<{
      description?: string;
      amount?: number;
      user?: string;
    }>;
    participants: Array<{
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    }>;
    payer?: {
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    };
    allPaid?: boolean;
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
    billDetails: Array<{
      description?: string;
      amount?: number;
      user?: string;
    }>;
    participants: Array<{
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    }>;
    payer?: {
      id?: string;
      name?: string;
      split_amount?: number;
      paid?: boolean;
    };
    allPaid?: boolean;
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
  billsBalanceListResponse(): __Observable<__StrictHttpResponse<null>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/bills/balance/`,
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
  billsBalanceList(): __Observable<null> {
    return this.billsBalanceListResponse().pipe(__map((_r) => _r.body as null));
  }

  /**
   * @param data undefined
   * @return Payment status updated successfully
   */
  billsPayCreateResponse(data: {
    bill_id: string;
    user_id: string;
  }): __Observable<
    __StrictHttpResponse<{
      message?: string;
      participation?: {
        id?: string;
        user?: {};
        bill_id?: string;
        bill_name?: string;
        split_amount?: number;
        is_paid?: boolean;
      };
    }>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    __body = data;
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/bills/pay/`,
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
        return _r as __StrictHttpResponse<{
          message?: string;
          participation?: {
            id?: string;
            user?: {};
            bill_id?: string;
            bill_name?: string;
            split_amount?: number;
            is_paid?: boolean;
          };
        }>;
      })
    );
  }
  /**
   * @param data undefined
   * @return Payment status updated successfully
   */
  billsPayCreate(data: {
    bill_id: string;
    user_id: string;
  }): __Observable<{
    message?: string;
    participation?: {
      id?: string;
      user?: {};
      bill_id?: string;
      bill_name?: string;
      split_amount?: number;
      is_paid?: boolean;
    };
  }> {
    return this.billsPayCreateResponse(data).pipe(
      __map(
        (_r) =>
          _r.body as {
            message?: string;
            participation?: {
              id?: string;
              user?: {};
              bill_id?: string;
              bill_name?: string;
              split_amount?: number;
              is_paid?: boolean;
            };
          }
      )
    );
  }

  /**
   * Upload a bill image to extract information without saving the image
   * @param image undefined
   */
  billsProcessImageCreateResponse(
    image: Blob
  ): __Observable<__StrictHttpResponse<BillFromImageResponse>> {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    let __formData = new FormData();
    __body = __formData;
    if (image != null) {
      __formData.append('image', image as string | Blob);
    }
    let req = new HttpRequest<any>(
      'POST',
      this.rootUrl + `/bills/process-image/`,
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
        return _r as __StrictHttpResponse<BillFromImageResponse>;
      })
    );
  }
  /**
   * Upload a bill image to extract information without saving the image
   * @param image undefined
   */
  billsProcessImageCreate(image: Blob): __Observable<BillFromImageResponse> {
    return this.billsProcessImageCreateResponse(image).pipe(
      __map((_r) => _r.body as BillFromImageResponse)
    );
  }

  /**
   * @param params The `BillsService.BillsSpendingListParams` containing the following parameters:
   *
   * - `start_date`: Start date (YYYY-MM-DD), defaults to 7 days ago
   *
   * - `end_date`: End date (YYYY-MM-DD), defaults to today
   *
   * @return User's spending summary
   */
  billsSpendingListResponse(
    params: BillsService.BillsSpendingListParams
  ): __Observable<
    __StrictHttpResponse<{
      total_spent?: number;
      period_start?: string;
      period_end?: string;
      spending_by_category?: { [key: string]: number };
      daily_spending?: Array<{ date?: string; amount?: number }>;
    }>
  > {
    let __params = this.newParams();
    let __headers = new HttpHeaders();
    let __body: any = null;
    if (params.startDate != null)
      __params = __params.set('start_date', params.startDate.toString());
    if (params.endDate != null)
      __params = __params.set('end_date', params.endDate.toString());
    let req = new HttpRequest<any>(
      'GET',
      this.rootUrl + `/bills/spending/`,
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
        return _r as __StrictHttpResponse<{
          total_spent?: number;
          period_start?: string;
          period_end?: string;
          spending_by_category?: { [key: string]: number };
          daily_spending?: Array<{ date?: string; amount?: number }>;
        }>;
      })
    );
  }
  /**
   * @param params The `BillsService.BillsSpendingListParams` containing the following parameters:
   *
   * - `start_date`: Start date (YYYY-MM-DD), defaults to 7 days ago
   *
   * - `end_date`: End date (YYYY-MM-DD), defaults to today
   *
   * @return User's spending summary
   */
  billsSpendingList(
    params: BillsService.BillsSpendingListParams
  ): __Observable<{
    total_spent?: number;
    period_start?: string;
    period_end?: string;
    spending_by_category?: { [key: string]: number };
    daily_spending?: Array<{ date?: string; amount?: number }>;
  }> {
    return this.billsSpendingListResponse(params).pipe(
      __map(
        (_r) =>
          _r.body as {
            total_spent?: number;
            period_start?: string;
            period_end?: string;
            spending_by_category?: { [key: string]: number };
            daily_spending?: Array<{ date?: string; amount?: number }>;
          }
      )
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
   * Parameters for billsList
   */
  export interface BillsListParams {
    /**
     * Filter by bill date (YYYY-MM-DD)
     */
    date?: string;

    /**
     * Filter by category
     */
    category?: string;

    /**
     * Filter by bill name
     */
    billName?: string;

    /**
     * Filter by payment status (true/false)
     */
    allPaid?: boolean;
  }

  /**
   * Parameters for billsSpendingList
   */
  export interface BillsSpendingListParams {
    /**
     * Start date (YYYY-MM-DD), defaults to 7 days ago
     */
    startDate?: string;

    /**
     * End date (YYYY-MM-DD), defaults to today
     */
    endDate?: string;
  }

  /**
   * Parameters for billsRead
   */
  export interface BillsReadParams {
    /**
     * Hashed bill ID
     */
    hashedId: string;
  }
}

export { BillsService };
