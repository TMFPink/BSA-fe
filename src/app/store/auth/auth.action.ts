const enum authActionTypes {
  LOGIN = '[Auth] Login',
  LOGOUT = '[Auth] Logout',
  REGISTER = '[Auth] Register',
}

export namespace AuthAction {
  export class Login {
    static readonly type = authActionTypes.LOGIN;
    constructor(public payload: { username: string; password: string }) {}
  }

  export class Logout {
    static readonly type = authActionTypes.LOGOUT;
  }

  export class Register {
    static readonly type = authActionTypes.REGISTER;
    constructor(
      public payload: { email: string; username: string; password: string }
    ) {}
  }
}
