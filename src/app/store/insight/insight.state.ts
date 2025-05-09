import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BillsService } from 'src/app/api/services';

import { Bill } from 'src/app/api/models';
import { catchError, tap } from 'rxjs';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { Data } from '@angular/router';
import { InsightAction } from './insight.actions';

export interface InsightModel {
  owed_u: number;
  i_owed: number;
}
export interface DataChart {
  date: Date;
  amount: number;
}

interface InsightStateModel {
  status: 'loading' | 'success' | 'error' | null;
  balance: InsightModel;
  total_spent: DataChart[];
  data: any;
}

@Injectable()
@State<InsightStateModel>({
  name: 'balanceState',
  defaults: {
    status: null,
    balance: {
      owed_u: 0,
      i_owed: 0,
    },
    total_spent: [],
    data: null,
  },
})
export class insightState extends BaseState<InsightStateModel> {
  constructor(
    private billService: BillsService,
    private handleErrorService: HandleErrorService
  ) {
    super();
  }

  @Selector()
  static data({ data }: InsightStateModel) {
    return data;
  }
  @Selector()
  static total_spent({ total_spent }: InsightStateModel) {
    return total_spent;
  }

  @Action(InsightAction.GetBalance)
  getBalance(ctx: StateContext<InsightStateModel>) {
    this.setLoading(ctx);
    return this.billService.billsBalanceList().pipe(
      tap((data) => {
        this.handleApiResponse(
          ctx,
          data,
          'Error fetching balance',
          (data: any) => {
            ctx.patchState({ data });
          }
        );
      })
    );
  }

  @Action(InsightAction.GetTotalSpend)
  getTotalSpend(ctx: StateContext<InsightStateModel>) {
    this.setLoading(ctx);
    return this.billService.billsSpendingList({}).pipe(
      tap((data) => {
        this.handleApiResponse(
          ctx,
          data,
          'Error fetching total spend',
          (data: any) => {
            ctx.patchState({ total_spent: data });
          }
        );
      })
    );
  }
}
