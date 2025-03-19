import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  personAddOutline,
  caretBackOutline,
  checkmarkOutline,
  closeOutline,
} from 'ionicons/icons';
import {
  IonContent,
  IonInput,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonCheckbox,
} from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { User } from 'src/app/api/models';
import { Store } from '@ngxs/store';
import { FriendsAction } from 'src/app/store';
@Component({
  selector: 'bsa-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonSearchbar,
    IonCheckbox,
  ],
})
export class UserCardComponent implements OnInit {
  @Input() user: User = {} as User;
  @Input() hasSentRequest: boolean = false;
  @Input() isFriendAdd: boolean = false;
  @Input() isFriendRequest: boolean = false;
  @Input() isCreateBill: boolean = false;
  @Input() isSelected: boolean = false;
  @Output() sendFriendRequest: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() acceptFriendRequest: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() rejectFriendRequest: EventEmitter<string> =
    new EventEmitter<string>();
  @Output() toggleParticipantEvent: EventEmitter<User> =
    new EventEmitter<User>();

  defaultCard: boolean = true;

  constructor(private store: Store) {
    addIcons({
      checkmarkOutline,
      closeOutline,
      personAddOutline,
      caretBackOutline,
    });
  }

  ngOnInit() {
    if (this.isFriendAdd || this.isCreateBill) {
      this.defaultCard = false;
    }
    if (this.isCreateBill) {
      this.hasSentRequest = this.isSelected;
    }
  }

  handleSendFriendRequest() {
    this.sendFriendRequest.emit(this.user.id);
    this.hasSentRequest = true;
  }

  toggleParticipant(event: any) {
    if (event.detail.checked) {
      this.toggleParticipantEvent.emit(this.user);
    }
  }
}
