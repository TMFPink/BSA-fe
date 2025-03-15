import { CommonModule } from '@angular/common';
import { Component, effect, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { NzFormModule } from 'ng-zorro-antd/form';
import { AuthAction, AuthState } from 'src/app/store';
import { AuthFacade } from 'src/app/store/auth/auth.facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [RouterLink, CommonModule, NzFormModule, ReactiveFormsModule],
})
export class RegisterComponent implements OnInit {
  registerForm = this.fb.group({
    email: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  // registerStatus = signal(this.store.selectSnapshot(AuthState.status));

  constructor(
    private fb: FormBuilder,
    private store: Store,
    private router: Router,
    private facade: AuthFacade
  ) {
    effect(() => {
      // if (this.registerStatus() === 'success') {
      //   this.router.navigate(['/login']);
      // }
    });
  }

  ngOnInit() {}

  onRegister() {
    if (this.registerForm.valid) {
      const payload = {
        email: this.registerForm.get('email')?.value ?? '',
        username: this.registerForm.get('username')?.value ?? '',
        password: this.registerForm.get('password')?.value ?? '',
      };
      this.facade.register(payload);
    }
  }
}
