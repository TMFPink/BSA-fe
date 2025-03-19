import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton,
  IonIcon,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { createDispatchMap, createSelectMap } from '@ngxs/store';
import { addIcons } from 'ionicons';
import {
  add,
  checkmarkOutline,
  closeOutline,
  personAddOutline,
  send,
} from 'ionicons/icons';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FriendsAction } from 'src/app/store/friends/friends.action';
import { FriendsState } from 'src/app/store/friends/friends.state';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
import { Subject } from 'rxjs';
import { takeUntil, filter, debounceTime } from 'rxjs/operators';
import { FriendsFacade } from 'src/app/store/friends/friends.facade';

@Component({
  selector: 'app-friends-management',
  templateUrl: './friends-management.component.html',
  styleUrls: ['./friends-management.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    // IonHeader,
    // IonTitle,
    // IonToolbar,
    IonButton,
    IonSearchbar,
    // IonIcon,
    RouterLink,
    UserCardComponent,
    NzFormModule,
    ReactiveFormsModule,
    NzInputModule,
    CommonModule,
  ],
})
export class FriendsManagementComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  friendsFilterForm = this.fb.group({
    username: [''],
  });

  selectors = createSelectMap({
    friendsSuggestion: FriendsState.friendsSuggestionsList,
    friends: FriendsState.friendsList,
    friendsRequest: FriendsState.friendsRequestsList,
  });

  action = createDispatchMap({
    getFriends: FriendsAction.GetFriends,
    getFriendsRequest: FriendsAction.GetFriendsRequest,
    sendFriendRequest: FriendsAction.SendFriendRequest,
    addFriend: FriendsAction.AddFriend,
    rejectFriendRequest: FriendsAction.RejectFriendRequest,
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private friendsFacade: FriendsFacade
  ) {
    addIcons({ checkmarkOutline, closeOutline, personAddOutline });
    this.friendsFilterForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((value) => {
        this.action.getFriends(value.username);
      });
  }

  ngOnInit() {}
  ionViewWillEnter() {
    this.loadFriendsData();
  }

  private loadFriendsData() {
    this.action.getFriends('');
    this.action.getFriendsRequest();
  }

  acceptFriendRequest(userId: string) {
    const payload = {
      friend_id: userId,
    };
    this.friendsFacade.addFriend(payload);
  }

  rejectFriendRequest(userId: string) {
    const payload = {
      friend_id: userId,
    };
    this.action.rejectFriendRequest(payload);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
