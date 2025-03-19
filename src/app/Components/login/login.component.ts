import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { select, Store } from '@ngxs/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthAction, AuthState } from 'src/app/store/auth';
import { AuthFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
  ],
})
export class LoginComponent implements OnInit {
  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private router: Router,
    private store: Store,
    private fb: FormBuilder,
    private facade: AuthFacade
  ) {
    effect(() => {
      // const loginStatus = this.statusSignal();
      // if (loginStatus === 'success') {
      //   this.router.navigate(['/home']);
      // }
    });
  }

  statusSignal = select(AuthState.status);

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.invalid) return;

    const payload = {
      username: this.loginForm.get('username')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    this.facade.login(payload);
  }
}
