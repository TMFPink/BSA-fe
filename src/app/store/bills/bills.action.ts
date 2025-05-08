const enum billsActionTypes {
  CREATE_BILL = '[Bills] Create Bill',
  REMOVE_BILL = '[Bills] Remove Bill',
  UPDATE_BILL = '[Bills] Update Bill',
  LOAD_BILLS = '[Bills] Load Bills',
  LOAD_BILL_DETAIL = '[Bills] Load Bill Detail',
}

export namespace BillAction {
  export class LoadBills {
    static readonly type = billsActionTypes.LOAD_BILLS;
    constructor(public payload: any) {}
  }
  export class CreateBill {
    static readonly type = billsActionTypes.CREATE_BILL;
    constructor(public payload: any) {}
  }
  export class RemoveBill {
    static readonly type = billsActionTypes.REMOVE_BILL;
    constructor(public payload: any) {}
  }
  export class UpdateBill {
    static readonly type = billsActionTypes.UPDATE_BILL;
    constructor(public payload: any) {}
  }
  export class LoadBillDetail {
    static readonly type = billsActionTypes.LOAD_BILL_DETAIL;
    constructor(public payload: any) {}
  }
}
