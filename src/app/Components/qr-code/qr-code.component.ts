import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonIcon, IonContent, IonButton } from '@ionic/angular/standalone';
import { Store } from '@ngxs/store';
import { addIcons } from 'ionicons';
import { caretBackOutline } from 'ionicons/icons';
import { NavigationService } from 'src/app/service/navigation.service';
import { profileAction } from 'src/app/store';
import { ProfileFacade } from 'src/app/store/profile/profile.facade';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.component.html',
  styleUrls: ['./qr-code.component.scss'],
  standalone: true,
  imports: [IonIcon, IonContent, IonButton, CommonModule],
})
export class QrCodeComponent implements OnInit {
  constructor(
    private navigation: NavigationService,
    private profileFacade: ProfileFacade
  ) {
    addIcons({ caretBackOutline });
  }
  isUploaded = false;
  qrCodeUrl: string | null = null;
  file: File | null = null;

  ngOnInit() {
    const user = localStorage.getItem('user');
    if (user) {
      const parsedUser = JSON.parse(user);
      this.qrCodeUrl = parsedUser.qrCode;

      if (this.qrCodeUrl) {
        const imgElement = document.getElementById(
          'qrCodeImage'
        ) as HTMLImageElement;
        console.log('imgElement', imgElement);
        console.log('this.qrCodeUrl', this.qrCodeUrl);
        if (imgElement) imgElement.src = this.qrCodeUrl;
      }
    }
  }
  onBack() {
    this.navigation.goTo('account');
  }

  onImageUpload(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.isUploaded = true;

      // Dynamically update the QR code image
      const reader = new FileReader();
      reader.onload = () => {
        this.qrCodeUrl = reader.result as string; // Update qrCodeUrl with the new image source
      };
      reader.readAsDataURL(this.file); // Read the file as a Data URL
    }
  }

  onUpload() {
    this.profileFacade.uploadQrCode(this.file);
  }

  // onGetQrCodeUrl() {
  //   if (this.file) {
  //     console.log('this.file', this.file);
  //     return this.file;
  //   }
  //   return this.qrCodeUrl;
  // }
}
