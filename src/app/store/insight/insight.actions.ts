const enum InsightActionTypes {
  GET_BALANCE = '[Insight] Get balance',
  GET_TOTAL_SPEND = '[Insight] Get total spend',
}

export namespace InsightAction {
  export class GetBalance {
    static readonly type = InsightActionTypes.GET_BALANCE;
    constructor(public payload: any) {}
  }

  export class GetTotalSpend {
    static readonly type = InsightActionTypes.GET_TOTAL_SPEND;
    constructor(public payload: any) {}
  }
}
