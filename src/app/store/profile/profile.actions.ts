const enum profileActionTypes {
  GET_ME = '[Profile] Get Me',
  GET_PROFILE = '[Profile] Get Profile',
  UPDATE_PROFILE = '[Profile] Update Profile',
  UPDATE_PASSWORD = '[Profile] Update Password',
  UPDATE_QR_CODE = '[Profile] Update QR Code',
}

export namespace profileAction {
  export class GetMe {
    static readonly type = profileActionTypes.GET_ME;
  }
  export class GetProfile {
    static readonly type = profileActionTypes.GET_PROFILE;
  }
  export class UpdateProfile {
    static readonly type = profileActionTypes.UPDATE_PROFILE;
    constructor(public payload: any) {}
  }
  export class UpdatePassword {
    static readonly type = profileActionTypes.UPDATE_PASSWORD;
    constructor(public payload: any) {}
  }

  export class UpdateQrCode {
    static readonly type = profileActionTypes.UPDATE_QR_CODE;
    constructor(public payload: any) {}
  }
}
