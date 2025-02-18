import { Component, OnInit } from '@angular/core';
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
import { addIcons } from 'ionicons';
import {
  checkmarkOutline,
  closeOutline,
  personAddOutline,
} from 'ionicons/icons';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
@Component({
  selector: 'app-friends-management',
  templateUrl: './friends-management.component.html',
  styleUrls: ['./friends-management.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    RouterLink,
    UserCardComponent,
  ],
})
export class FriendsManagementComponent implements OnInit {
  constructor() {
    addIcons({ checkmarkOutline, closeOutline, personAddOutline });
  }

  ngOnInit() {}
}
