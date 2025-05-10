import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { BillsService } from 'src/app/api/services';
import { BillAction } from './bills.action';
import { Bill } from 'src/app/api/models';
import { catchError, tap } from 'rxjs';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { ToastService } from 'src/app/service/toast.service';
import { NavigationService } from 'src/app/service/navigation.service';

interface BillStateModel {
  status: 'loading' | 'success' | 'error' | null;
  createStatus: 'loading' | 'success' | 'error' | null;
  bills: Bill[];
  billDetail: Bill | null;
  uploadedBill: Bill | null;
  loading: boolean;
  error: string;
}

@Injectable()
@State<BillStateModel>({
  name: 'bills',
  defaults: {
    status: null,
    createStatus: null,
    bills: [],
    billDetail: null,
    uploadedBill: null,
    loading: false,
    error: '',
  },
})
export class BillsState extends BaseState<BillStateModel> {
  constructor(
    private billService: BillsService,
    private handleErrorService: HandleErrorService,
    private toast: ToastService,
    private navService: NavigationService
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

  @Selector()
  static loading({ loading }: BillStateModel) {
    return loading;
  }
  @Selector()
  static status({ createStatus }: BillStateModel) {
    return createStatus;
  }

  @Selector()
  static uploadedBill({ uploadedBill }: BillStateModel) {
    return uploadedBill;
  }

  @Action(BillAction.LoadBills)
  loadBills(ctx: StateContext<BillStateModel>, action: BillAction.LoadBills) {
    return this.billService.billsList(action.payload).pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while getting bills',
          (data: Bill[]) => {
            ctx.patchState({ bills: data, createStatus: null });
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
            this.toast.showSnackBar('Bills create successfully', 'success');
            ctx.patchState({ createStatus: 'success' });
            this.navService.goBack();
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

  @Action(BillAction.ProcessBill)
  processBill(
    ctx: StateContext<BillStateModel>,
    action: BillAction.ProcessBill
  ) {
    ctx.patchState({ loading: true });
    return this.billService.billsProcessImageCreate(action.payload).pipe(
      tap((bill) => {
        this.handleApiResponse(
          ctx,
          bill,
          'Error while processing bill',
          (data: any) => {
            ctx.patchState({ loading: false });
            ctx.patchState({ uploadedBill: data });
            this.toast.showSnackBar('Bills processed successfully', 'success');
          }
        );
      })
    );
  }

  @Action(BillAction.ResetUploadedBill)
  resetUploadedBill(ctx: StateContext<BillStateModel>) {
    ctx.patchState({ uploadedBill: null });
  }
}
