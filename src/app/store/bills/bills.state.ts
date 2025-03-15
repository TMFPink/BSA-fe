import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BillsService } from 'src/app/api/services';
import { BillAction } from './bills.action';
import { Bill } from 'src/app/api/models';
import { catchError, tap } from 'rxjs';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { BaseState } from 'src/app/utils/base-state/base-state-model';

interface BillStateModel {
  status: 'loading' | 'success' | 'error' | null;
  bills: Bill[];
  loading: boolean;
  error: string;
}

@Injectable()
@State<BillStateModel>({
  name: 'bills',
  defaults: {
    status: null,
    bills: [],
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

  @Action(BillAction.LoadBills)
  loadBills(ctx: StateContext<BillStateModel>, action: BillAction.LoadBills) {
    ctx.patchState({ loading: true });
    this.billService.billsList().subscribe((bills) => console.log(bills));
  }

  @Action(BillAction.AddBill)
  addBill(ctx: StateContext<BillStateModel>, action: BillAction.AddBill) {
    ctx.patchState({ loading: true });
    this.billService.billsCreate(action.payload).pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while adding bill',
          (data: any) => {
            // const bills = ctx.getState().bills;
            // bills.push(data);
            // ctx.patchState({ bills });
            console.log(data);
          }
        );
      })
    );
  }
}
