import { Component, OnInit } from '@angular/core';
import {
  IonContent,
  IonIcon,
  IonButton,
  IonSearchbar,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personAddOutline, caretBackOutline } from 'ionicons/icons';
import { NavigationService } from 'src/app/Service/navigation.service';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
@Component({
  selector: 'app-friends-adding',
  templateUrl: './friends-adding.component.html',
  styleUrls: ['./friends-adding.component.scss'],
  imports: [IonContent, IonIcon, IonButton, IonSearchbar, UserCardComponent],
  standalone: true,
})
export class FriendsAddingComponent implements OnInit {
  constructor(private navService: NavigationService) {
    addIcons({ personAddOutline, caretBackOutline });
  }

  ngOnInit() {}

  goBack(): void {
    this.navService.goBack();
  }
}
