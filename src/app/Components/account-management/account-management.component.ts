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
  constructor(private router: Router, private store: Store) {}

  ngOnInit() {}
  onLogout() {
    this.router.navigate(['/auth']);
  }

  onClick() {
    const payload = {};
    this.store.dispatch(new BillAction.LoadBills(payload));
  }
}
