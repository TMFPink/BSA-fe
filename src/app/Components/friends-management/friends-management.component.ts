import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
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
  checkmarkOutline,
  closeOutline,
  personAddOutline,
} from 'ionicons/icons';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FriendsAction } from 'src/app/store/friends/friends.action';
import { FriendsState } from 'src/app/store/friends/friends.state';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
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
  friendsFilterForm = this.fb.group({
    name: [''],
  });

  selectors = createSelectMap({
    friendsSuggestion: FriendsState.friendsSuggestionsList,
    friends: FriendsState.friendsList,
    friendsRequest: FriendsState.friendsRequestsList,
  });

  action = createDispatchMap({
    getFriends: FriendsAction.GetFriends,
    getFriendsRequest: FriendsAction.GetFriendsRequest,
    acceptRequest: FriendsAction.AddFriend,
  });

  constructor(private fb: FormBuilder) {
    addIcons({ checkmarkOutline, closeOutline, personAddOutline });
  }

  ngOnInit() {
    this.loadFriendsData();
  }

  private loadFriendsData() {
    this.action.getFriends();
    this.action.getFriendsRequest();
  }

  ngOnDestroy() {
    console.log('destroy');
  }
}
