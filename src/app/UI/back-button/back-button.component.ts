import { Component, OnInit } from '@angular/core';
import { NavigationService } from 'src/app/Service/navigation.service';
import { IonIcon, IonButton } from '@ionic/angular/standalone';
import { caretBackOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
@Component({
  selector: 'back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton],
})
export class BackButtonComponent implements OnInit {
  constructor(private routeService: NavigationService) {
    addIcons({
      caretBackOutline,
    });
  }

  ngOnInit() {}
  onNavigate() {
    this.routeService.goBack();
  }
}
