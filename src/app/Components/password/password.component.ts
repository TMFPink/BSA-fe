import { Component, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { Subject } from 'rxjs';
import { NavigationService } from 'src/app/service/navigation.service';
import { addIcons } from 'ionicons';
import { caretBackOutline } from 'ionicons/icons';
import { ProfileFacade } from 'src/app/store/profile/profile.facade';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, IonContent, IonButton, IonIcon],
})
export class PasswordComponent implements OnDestroy {
  destroy$ = new Subject<void>();
  showPasswordFields = {
    currentPassword: false,
    newPassword: false,
    confirmPassword: false,
  };

  passwordForm = this.fb.group(
    {
      current_password: ['', Validators.required],
      confirm_password: ['', [Validators.required, Validators.minLength(6)]],
      new_password: ['', [Validators.required, Validators.minLength(6)]],
    },
    { validators: this.passwordsMatchValidator }
  );

  constructor(
    private fb: FormBuilder,
    private navigation: NavigationService,
    private facade: ProfileFacade
  ) {
    addIcons({ caretBackOutline: caretBackOutline });
  }

  passwordsMatchValidator(control: AbstractControl): ValidationErrors | null {
    const newPassword = control.get('new_password')?.value;
    const confirmPassword = control.get('confirm_password')?.value;
    return newPassword === confirmPassword ? null : { passwordsMismatch: true };
  }

  onChangePassword() {
    const { current_password, new_password } = this.passwordForm.value;

    this.facade.updatePassword({ current_password, new_password });
  }
  onBack() {
    this.navigation.goTo('account');
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
