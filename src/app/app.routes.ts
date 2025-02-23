import { Routes } from '@angular/router';
import { HomePage } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ContentLayoutComponent } from './Components/content-layout/content-layout.component';
import { AccountManagementComponent } from './Components/account-management/account-management.component';
import { CreateBillComponent } from './Components/create-bill/create-bill.component';
import { FriendsManagementComponent } from './Components/friends-management/friends-management.component';
import { FriendsAddingComponent } from './Components/friends-adding/friends-adding.component';
import { BillDetailComponent } from './Components/bill-detail/bill-detail.component';
import { BillListComponent } from './Components/bill-list/bill-list.component';
import { importProvidersFrom } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';

export const routes: Routes = [
  {
    path: '',
    component: ContentLayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: HomePage,
      },
      {
        path: 'account',
        component: AccountManagementComponent,
      },
      {
        path: 'friends',
        children: [
          {
            path: '',
            component: FriendsManagementComponent,
          },
          {
            path: 'add-friends',
            component: FriendsAddingComponent,
          },
          {
            path: '**',
            redirectTo: '',
          },
        ],
      },
      {
        path: 'bills',
        children: [
          {
            path: '',
            component: BillListComponent,
          },
          {
            path: 'create-bill',
            component: CreateBillComponent,
          },
          {
            path: 'bill-detail/:id',
            component: BillDetailComponent,
            data: { isBillDetail: true },
          },

          {
            path: '**',
            redirectTo: '',
            pathMatch: 'full',
          },
        ],
      },
    ],
    providers: [
      importProvidersFrom(
        NgxEchartsModule.forRoot({
          echarts: () => import('echarts'),
        })
      ),
    ],
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: '**',
        redirectTo: 'login',
      },
    ],
    providers: [],
  },

  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
