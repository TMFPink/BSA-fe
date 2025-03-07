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
import { Store } from '@ngxs/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthAction, AuthState } from 'src/app/store/auth';

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
    private fb: FormBuilder
  ) {
    effect(() => {
      const loginStatus = this.statusSignal();
      if (loginStatus === 'success') {
        this.router.navigate(['/home']);
      }
    });
  }

  statusSignal = toSignal(this.store.select(AuthState.status));

  ngOnInit() {}

  onLogin() {
    if (this.loginForm.invalid) return;

    const payload = {
      username: this.loginForm.get('username')?.value ?? '',
      password: this.loginForm.get('password')?.value ?? '',
    };

    this.store.dispatch(new AuthAction.Login(payload));
  }
}
