import { Component, OnInit, signal } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { select, Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import { personAddOutline, caretBackOutline } from 'ionicons/icons';
import { NavigationService } from 'src/app/service/navigation.service';
import { FriendsAction, FriendsState } from 'src/app/store';
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
  ],
  standalone: true,
})
export class FriendsAddingComponent implements OnInit {
  constructor(private store: Store) {
    addIcons({ personAddOutline, caretBackOutline });
  }
  friendsSuggestion = select(FriendsState.friendsSuggestionsList);

  ngOnInit() {
    this.store.dispatch(new FriendsAction.GetFriendsSuggestions(''));
  }
}
