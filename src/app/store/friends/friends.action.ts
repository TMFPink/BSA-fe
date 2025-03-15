const enum FriendsActionTypes {
  GET_FRIENDS = '[Friends] Get friends list',
  ADD_FRIEND = '[Friends] Add friend',
  REMOVE_FRIEND = '[Friends] Remove friend',

  GET_FRIENDS_SUGGESTIONS = '[Friends] Get friends suggestions',

  GET_FRIENDS_REQUEST = '[Friends] Get friends request',
  SEND_FRIEND_REQUEST = '[Friends] Send friend request',
}

export namespace FriendsAction {
  export class GetFriends {
    static readonly type = FriendsActionTypes.GET_FRIENDS;
  }
  export class AddFriend {
    static readonly type = FriendsActionTypes.ADD_FRIEND;
    constructor(public payload: any) {}
  }
  export class RemoveFriend {
    static readonly type = FriendsActionTypes.REMOVE_FRIEND;
    constructor(public payload: any) {}
  }
  export class GetFriendsSuggestions {
    static readonly type = FriendsActionTypes.GET_FRIENDS_SUGGESTIONS;
    constructor(public payload: any) {}
  }
  export class GetFriendsRequest {
    static readonly type = FriendsActionTypes.GET_FRIENDS_REQUEST;
  }
  export class SendFriendRequest {
    static readonly type = FriendsActionTypes.SEND_FRIEND_REQUEST;
    constructor(public payload: any) {}
  }
}
