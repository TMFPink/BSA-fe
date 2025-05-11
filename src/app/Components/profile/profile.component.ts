import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonContent, IonButton, IonIcon } from '@ionic/angular/standalone';
import { createSelectMap, Store } from '@ngxs/store';
import { profileAction, ProfileState } from 'src/app/store';
import { User } from 'src/app/api/models';
import { Subject, takeUntil } from 'rxjs';
import { NavigationService } from 'src/app/service/navigation.service';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ProfileFacade } from 'src/app/store/profile/profile.facade';
import { addIcons } from 'ionicons';
import { caretBackOutline } from 'ionicons/icons';
import { IonSearchbar } from '@ionic/angular/standalone';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  standalone: true,
  imports: [
    IonIcon,
    CommonModule,
    IonContent,
    IonButton,
    BackButtonComponent,
    NzFormModule,
    ReactiveFormsModule,
    IonButton,
    IonSearchbar,
  ],
})
export class ProfileComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  user!: User;
  userInfoForm = this.fb.group({
    username: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^\d+$/)]], // Ensure numeric input
  });

  user$ = this.store.select(ProfileState.user);
  availableAvatars: string[] = [
    'avatar1.jpeg',
    'avatar2.jpeg',
    'avatar3.jpeg',
    'avatar4.jpeg',
    'avatar5.jpeg',
    'avatar6.jpeg',
    'avatar7.jpeg',
    'avatar8.jpeg',
    'avatar9.jpeg',
  ];
  showAvatarSelection = false;

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private facade: ProfileFacade,
    private navigation: NavigationService
  ) {
    addIcons({
      caretBackOutline,
    });
    this.user$.pipe(takeUntil(this.destroy$)).subscribe((user) => {
      if (!user) return;
      this.user = user;
      this.userInfoForm.patchValue({
        username: user.username,
        email: user.email,
        phone: user.phone,
      });
    });
  }

  imageUrl = (url: string) => `/assets/images/${url}`;

  onBack() {
    this.navigation.goTo('account');
  }

  onUpdateProfile() {
    if (this.userInfoForm.valid) {
      const { username, email, phone } = this.userInfoForm.value;
      this.facade.updateProfile({
        username,
        email,
        phone,
      });
    }
  }

  // Toggle avatar selection modal
  toggleAvatarSelection() {
    this.showAvatarSelection = !this.showAvatarSelection;
  }

  // Update the user's avatar
  onSelectAvatar(avatar: string) {
    this.user.avatarUrl = avatar;
    const { username, email, phone } = this.userInfoForm.value;
    const payload = {
      username,
      email,
      phone,
      avatarUrl: avatar,
    };
    this.facade.updateProfile(payload);
    this.toggleAvatarSelection();
  }

  ngOnInit() {
    this.store.dispatch(new profileAction.GetProfile());
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
