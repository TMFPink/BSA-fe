import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { BillsService } from 'src/app/api/services';
import { BillAction } from './bills.action';
import { Bill } from 'src/app/api/models';

interface BillStateModel {
  bills: Bill[];
  loading: boolean;
  error: string;
}

@Injectable()
@State<BillStateModel>({
  name: 'bills',
  defaults: {
    bills: [],
    loading: false,
    error: '',
  },
})
export class BillsState {
  constructor(private billService: BillsService) {}

  @Action(BillAction.LoadBills)
  loadBills(ctx: StateContext<BillStateModel>, action: BillAction.LoadBills) {
    ctx.patchState({ loading: true });
    this.billService.billsList().subscribe((bills) => console.log(bills));
  }
}
