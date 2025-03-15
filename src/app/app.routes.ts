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
import { NgxsModule } from '@ngxs/store';

import { authGuard, unAuthGuard } from './guards/auth.guard';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthState, BillsState, FriendsState } from './store';

export const routes: Routes = [
  {
    path: 'auth',
    canActivateChild: [unAuthGuard],
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
    providers: [
      importProvidersFrom(NgxsModule.forFeature([AuthState])),
      MatSnackBarModule,
    ],
  },
  {
    path: '',
    component: ContentLayoutComponent,
    canActivateChild: [authGuard],
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
        data: { preload: false, reuse: false },
        loadChildren: async () =>
          (await import('./routing/friends.routing')).FRIENDS_ROUTES,
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
        }),
        NgxsModule.forFeature([BillsState, AuthState, FriendsState]),
        MatSnackBarModule
      ),
    ],
  },
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
