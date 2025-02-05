import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { RouterLink } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';
import { NavigationService } from 'src/app/Service/navigation.service';
@Component({
  selector: 'app-content-layout',
  templateUrl: './content-layout.component.html',
  styleUrls: ['./content-layout.component.scss'],
  imports: [
    CommonModule,
    NzIconModule,
    IonRouterOutlet,
    RouterLink,
    IonHeader,
    IonToolbar,
    IonTitle,
  ],
})
export class ContentLayoutComponent implements OnInit {
  constructor(private navService: NavigationService) {}

  ngOnInit() {}
}
