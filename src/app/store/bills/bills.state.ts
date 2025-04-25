import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BillsService } from 'src/app/api/services';
import { BillAction } from './bills.action';
import { Bill } from 'src/app/api/models';
import { catchError, tap } from 'rxjs';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { BaseState } from 'src/app/utils/base-state/base-state-model';

interface BillStateModel {
  status: 'loading' | 'success' | 'error' | null;
  bills: Bill[];
  billDetail: Bill | null;
  loading: boolean;
  error: string;
}

@Injectable()
@State<BillStateModel>({
  name: 'bills',
  defaults: {
    status: null,
    bills: [],
    billDetail: null,
    loading: false,
    error: '',
  },
})
export class BillsState extends BaseState<BillStateModel> {
  constructor(
    private billService: BillsService,
    private handleErrorService: HandleErrorService
  ) {
    super();
  }

  @Selector()
  static billsList({ bills }: BillStateModel) {
    return bills;
  }

  @Selector()
  static billDetail({ billDetail }: BillStateModel) {
    return billDetail;
  }

  @Action(BillAction.LoadBills)
  loadBills(ctx: StateContext<BillStateModel>, action: BillAction.LoadBills) {
    ctx.patchState({ loading: true });
    return this.billService.billsList().pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while getting bills',
          (data: Bill[]) => {
            ctx.patchState({ bills: data });
          }
        );
      })
    );
  }

  @Action(BillAction.CreateBill)
  CreateBill(ctx: StateContext<BillStateModel>, action: BillAction.CreateBill) {
    return this.billService.billsCreate(action.payload).pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while adding bill',
          (data: any) => {
            // const bills = ctx.getState().bills;
            // bills.push(data);
            // ctx.patchState({ bills });
          }
        );
      })
    );
  }

  @Action(BillAction.LoadBillDetail)
  loadBillDetail(
    ctx: StateContext<BillStateModel>,
    action: BillAction.LoadBillDetail
  ) {
    return this.billService.billsRead({ hashedId: action.payload }).pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while getting bill detail',
          (data: any) => {
            ctx.patchState({ billDetail: data });
          }
        );
      })
    );
  }
}
