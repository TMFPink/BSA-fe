import { Routes } from '@angular/router';
import { FriendsManagementComponent } from '../Components/friends-management/friends-management.component';
import { FriendsAddingComponent } from '../Components/friends-adding/friends-adding.component';
import { importProvidersFrom } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { FriendsState } from '../store';

export const FRIENDS_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: FriendsManagementComponent,
        runGuardsAndResolvers: 'always',
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
    providers: [importProvidersFrom(NgxsModule.forFeature([FriendsState]))],
  },
];
