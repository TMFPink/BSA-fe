const enum billsActionTypes {
  ADD_BILL = '[Bills] Add Bill',
  REMOVE_BILL = '[Bills] Remove Bill',
  UPDATE_BILL = '[Bills] Update Bill',
  LOAD_BILLS = '[Bills] Load Bills',
}

export namespace BillAction {
  export class LoadBills {
    static readonly type = billsActionTypes.LOAD_BILLS;
    constructor(public payload: any) {}
  }
  export class AddBill {
    static readonly type = billsActionTypes.ADD_BILL;
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
}
