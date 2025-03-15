import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  BillsService,
  FriendsService,
  UsersService,
} from 'src/app/api/services';

import { Bill, User } from 'src/app/api/models';
import { catchError, tap } from 'rxjs';
import { HandleErrorService } from 'src/app/service/handle-error.service';
import { BaseState } from 'src/app/utils/base-state/base-state-model';
import { FriendsAction } from './friends.action';

interface friendSuggestionModel {
  user: User;
  has_sent_request: boolean;
}

interface FriendsStateModel {
  status: 'loading' | 'success' | 'error' | null;
  friends: User[];
  suggest_friends: friendSuggestionModel[];
  friend_requests: User[];
  loading: boolean;
}

@Injectable()
@State<FriendsStateModel>({
  name: 'friends',
  defaults: {
    status: null,
    friends: [],
    suggest_friends: [],
    friend_requests: [],
    loading: false,
  },
})
export class FriendsState extends BaseState<FriendsStateModel> {
  constructor(
    private friendService: FriendsService,
    private handleErrorService: HandleErrorService
  ) {
    super();
  }

  @Selector()
  static friendsList({ friends }: FriendsStateModel) {
    return friends;
  }

  @Selector()
  static friendsSuggestionsList({ suggest_friends }: FriendsStateModel) {
    return suggest_friends;
  }

  @Selector()
  static friendsRequestsList({ friend_requests }: FriendsStateModel) {
    return friend_requests;
  }

  @Action(FriendsAction.GetFriends)
  getFriends(
    ctx: StateContext<FriendsStateModel>,
    action: FriendsAction.GetFriends
  ) {
    this.setLoading(ctx);
    return this.friendService.friendsList(action.payload).pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error fetching friends',
          (data: any) => {
            ctx.patchState({ friends: data });
          }
        );
      })
    );
  }

  @Action(FriendsAction.AddFriend)
  acceptFriendRequest(
    ctx: StateContext<FriendsStateModel>,
    action: FriendsAction.AddFriend
  ) {
    this.setLoading(ctx);
    return this.friendService.friendsAddCreate(action.payload).pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error adding friend',
          (data: any) => {
            ctx.dispatch(new FriendsAction.GetFriendsRequest());
            ctx.dispatch(new FriendsAction.GetFriends(''));
          }
        );
      })
    );
  }

  @Action(FriendsAction.RejectFriendRequest)
  rejectFriendRequest(
    ctx: StateContext<FriendsStateModel>,
    action: FriendsAction.RejectFriendRequest
  ) {
    this.setLoading(ctx);
    return this.friendService.friendsRejectRequestCreate(action.payload).pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error rejecting friend request',
          (data: any) => {
            ctx.dispatch(new FriendsAction.GetFriendsRequest());
          }
        );
      })
    );
  }

  @Action(FriendsAction.SendFriendRequest)
  SendFriendRequest(
    ctx: StateContext<FriendsStateModel>,
    action: FriendsAction.SendFriendRequest
  ) {
    this.setLoading(ctx);
    return this.friendService.friendsSendRequestCreate(action.payload).pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error adding friend',
          (data: any) => {
            ctx.dispatch(new FriendsAction.GetFriendsSuggestions(''));
          }
        );
      })
    );
  }

  @Action(FriendsAction.GetFriendsRequest)
  getFriendRequest(ctx: StateContext<FriendsStateModel>) {
    this.setLoading(ctx);
    return this.friendService.friendsRequestsList().pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error fetching friends list',
          (response: any) => {
            ctx.patchState({ friend_requests: response });
          }
        );
      })
    );
  }

  @Action(FriendsAction.GetFriendsSuggestions)
  getSuggestionFriends(
    ctx: StateContext<FriendsStateModel>,
    action: FriendsAction.GetFriendsSuggestions
  ) {
    this.setLoading(ctx);
    return this.friendService.friendsSuggestionsList(action.payload).pipe(
      tap((friends) => {
        this.handleApiResponse(
          ctx,
          friends,
          'Error fetching friends suggestions',
          (response: any) => {
            let suggest_friends = [] as friendSuggestionModel[];
            response.forEach((data: any) => {
              suggest_friends.push({
                user: data.user,
                has_sent_request: data.has_sent_request,
              });
            });
            ctx.patchState({ suggest_friends });
          }
        );
      })
    );
  }
}
