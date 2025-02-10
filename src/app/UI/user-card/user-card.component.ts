import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { personAddOutline, caretBackOutline } from 'ionicons/icons';
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
  @Input() isFriendAdd: boolean = false;
  @Input() isFriendRequest: boolean = false;
  @Input() isCreateBill: boolean = false;

  defaultCard: boolean = true;

  constructor() {
    addIcons({ personAddOutline, caretBackOutline });
  }

  ngOnInit() {
    if (this.isFriendAdd || this.isCreateBill) {
      this.defaultCard = false;
    }
  }
}
