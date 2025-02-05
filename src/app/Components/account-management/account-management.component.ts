import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import {
  IonContent,
  IonInput,
  IonTitle,
  IonToolbar,
  IonHeader,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-account',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account.component.scss'],
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    RouterModule,
  ],
  standalone: true,
})
export class AccountManagementComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit() {}
  onLogout() {
    this.router.navigate(['/auth']);
  }
}
