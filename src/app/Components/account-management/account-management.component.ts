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
import { Store } from '@ngxs/store';
import { User } from 'src/app/api/models';
import { ProfileState } from 'src/app/store';
import { AuthAction } from 'src/app/store/auth';
import { AuthFacade } from 'src/app/store/auth/auth.facade';
import { BillAction } from 'src/app/store/bills/bills.action';

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
  constructor(
    private router: Router,
    private store: Store,
    private authFc: AuthFacade
  ) {}

  user: User | null = null;
  ngOnInit() {
    this.user = this.store.selectSnapshot(ProfileState.user);
    if (this.user) {
      this.user.avatarUrl =
        localStorage.getItem('avatarUrl') || this.user.avatarUrl;
      this.user.username =
        localStorage.getItem('username') || this.user.username;
    }
  }
  onLogout() {
    this.authFc.logout();
  }

  onNavigate(path: string) {
    this.router.navigate(['account', path]);
  }

  imageUrl = (url: string) => `/assets/images/${url}`;
}
