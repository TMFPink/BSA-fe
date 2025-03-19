import { createDispatchMap, Store } from '@ngxs/store';

import { Injectable } from '@angular/core';
import { ToastService } from 'src/app/service/toast.service';
import { Router } from '@angular/router';
import { FriendsAction } from './friends.action';

@Injectable({
  providedIn: 'root',
})
export class FriendsFacade {
  constructor(
    private store: Store,
    private toast: ToastService,
    private router: Router
  ) {}

  actionMap = createDispatchMap({
    addFriend: FriendsAction.AddFriend,
    getFriends: FriendsAction.GetFriends,
    getFriendsSuggestions: FriendsAction.GetFriendsSuggestions,
    getFriendsRequests: FriendsAction.GetFriendsRequest,
    sendFriendRequest: FriendsAction.SendFriendRequest,
    rejectFriendRequest: FriendsAction.RejectFriendRequest,
  });

  addFriend(payload: any) {
    this.actionMap.addFriend(payload).subscribe({
      complete: () => {
        this.toast.showSnackBar('Friend added successfully', 'success');
      },
    });
  }
  sendFriendRequest(payload: any) {
    this.actionMap.sendFriendRequest(payload).subscribe({
      complete: () => {
        this.toast.showSnackBar('Friend request sent successfully', 'success');
      },
    });
  }
}
