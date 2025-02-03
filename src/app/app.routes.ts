import { Routes } from '@angular/router';
import { HomePage } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { ContentLayoutComponent } from './Components/content-layout/content-layout.component';
import { AccountComponent } from './Components/account/account.component';
import { CreateBillComponent } from './Components/create-bill/create-bill.component';

export const routes: Routes = [
  {
    path:'',
    component: ContentLayoutComponent,
    children:[
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
        component: AccountComponent,
      },
      {
        path:'create',
        component: CreateBillComponent,
      }
    ],
    providers: [],
  },
  {
    path: 'auth',
    children:[
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      }, 
      {
        path:'**',
        redirectTo: 'login',
      }   
    ],
    providers: [],
  },
  
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full',
  },
];
