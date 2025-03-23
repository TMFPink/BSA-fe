const enum profileActionTypes {
  GET_ME = '[Profile] Get Me',
}

export namespace profileAction {
  export class GetMe {
    static readonly type = profileActionTypes.GET_ME;
  }
}
