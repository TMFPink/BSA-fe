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
    console.log(this.store.selectSnapshot(ProfileState.user));
    this.user = this.store.selectSnapshot(ProfileState.user);
  }
  onLogout() {
    this.authFc.logout();
  }

  onClick() {
    const payload = {};
    this.store.dispatch(new BillAction.LoadBills(payload));
  }
}
