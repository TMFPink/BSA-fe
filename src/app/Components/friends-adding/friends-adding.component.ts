import { Component, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { select, Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import { personAddOutline, caretBackOutline } from 'ionicons/icons';
import { NzFormModule } from 'ng-zorro-antd/form';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NavigationService } from 'src/app/service/navigation.service';
import { FriendsAction, FriendsState } from 'src/app/store';
import { FriendsFacade } from 'src/app/store/friends/friends.facade';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
@Component({
  selector: 'app-friends-adding',
  templateUrl: './friends-adding.component.html',
  styleUrls: ['./friends-adding.component.scss'],
  imports: [
    IonContent,
    IonIcon,
    IonButton,
    IonSearchbar,
    UserCardComponent,
    BackButtonComponent,
    NzFormModule,
    ReactiveFormsModule,
  ],
  standalone: true,
})
export class FriendsAddingComponent implements OnInit {
  searchForm = this.fb.group({
    username: [''],
  });

  unsubscribe$ = new Subject<void>();

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private friendsFacade: FriendsFacade
  ) {
    addIcons({ personAddOutline, caretBackOutline });

    this.searchForm.valueChanges
      .pipe(takeUntil(this.unsubscribe$), debounceTime(500))
      .subscribe((value) => {
        this.store.dispatch(
          new FriendsAction.GetFriendsSuggestions(value.username)
        );
      });
  }
  friendsSuggestion = select(FriendsState.friendsSuggestionsList);

  ngOnInit() {
    this.store.dispatch(new FriendsAction.GetFriendsSuggestions(''));
  }

  sendFriendRequest(userId: string) {
    const payload = {
      friend_id: userId,
    };
    this.friendsFacade.sendFriendRequest(payload);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
