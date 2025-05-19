import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Store } from '@ngxs/store';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { BillsState, InsightAction } from 'src/app/store';
import { formatCurrency } from 'src/app/utils';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';
import { Share } from '@capacitor/share';

@Component({
  selector: 'app-pay-card',
  templateUrl: './pay-card.component.html',
  styleUrls: ['./pay-card.component.scss'],
  standalone: true,
  imports: [CommonModule, NzIconModule],
})
export class PayCardComponent implements OnInit {
  user: any = null;
  number: number | null = null;
  currentSlider: number = 0;
  onProcessPayment!: () => Promise<void>;
  @ViewChild('sliderThumb') sliderThumb!: ElementRef;

  private isDragging = false;
  private sliderWidth = 0;
  isProcessing$ = this.store.select(BillsState.payLoading);
  slided: boolean = false;

  constructor(private modalRef: NzModalRef, private store: Store) {
    this.isProcessing$.subscribe((isProcessing) => {
      if (!isProcessing && this.slided) {
        this.modalRef.close();
        this.store.dispatch(new InsightAction.GetBalance({}));
      }
    });
  }

  formatCurrency(value: number) {
    return formatCurrency(value);
  }

  // downloadQRCode() {
  //   if (!this.user?.qrCode) return;

  //   fetch(this.user.qrCode, {
  //     method: 'GET',
  //     headers: {
  //       'Content-Type': 'image/png',
  //     },
  //     mode: 'cors', // Ensure the request is made with CORS
  //   })
  //     .then((response) => response.blob())
  //     .then((blob) => {
  //       const url = URL.createObjectURL(blob);
  //       const link = document.createElement('a');
  //       link.href = url;
  //       link.setAttribute('download', `${this.user.name}-QR-code.png`);
  //       document.body.appendChild(link);
  //       link.click();
  //       document.body.removeChild(link);
  //       URL.revokeObjectURL(url); // Clean up the URL object
  //     })
  //     .catch((error) => console.error('Error downloading the QR code:', error));
  // }

  async downloadQRCode() {
    if (!this.user?.qrCode) return;

    try {
      // Fetch the image as a blob
      const response = await fetch(this.user.qrCode);
      const blob = await response.blob();

      // Convert the blob to base64
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = async () => {
        const base64Data = reader.result?.toString().split(',')[1];

        // Save the file to the filesystem
        const fileName = `${this.user.name || 'qr-code'}.png`;
        const result = await Filesystem.writeFile({
          path: fileName,
          data: base64Data || '',
          directory: Directory.Documents,
        });

        // Share the file
        await Share.share({
          title: 'Download QR Code',
          text: 'Your QR Code is ready!',
          url: result.uri,
          dialogTitle: 'Share QR Code',
        });

        console.log('File saved to:', result.uri);
      };
    } catch (error) {
      console.error('Error downloading the QR code:', error);
    }
  }

  ngOnInit() {
    const data = this.modalRef.getConfig().nzData;
    this.user = data.user;
    this.number = data.number;
    this.onProcessPayment = data.onProcessPayment;
  }

  startSlide(event: MouseEvent | TouchEvent) {
    event.preventDefault();
    this.isDragging = true;
    const sliderContainer = (event.target as HTMLElement).closest(
      '.slider-container'
    ) as HTMLElement;
    this.sliderWidth = sliderContainer.offsetWidth;

    const moveHandler = (moveEvent: MouseEvent | TouchEvent) => {
      if (!this.isDragging) return;

      const clientX =
        moveEvent instanceof MouseEvent
          ? moveEvent.clientX
          : moveEvent.touches[0].clientX;
      const sliderRect = sliderContainer.getBoundingClientRect();
      const offsetX = Math.max(
        0,
        Math.min(clientX - sliderRect.left, this.sliderWidth)
      );

      this.sliderThumb.nativeElement.style.left = `${offsetX - 60}px`;

      const track = sliderContainer.querySelector(
        '.slider-track'
      ) as HTMLElement;
      track.style.width = `${(offsetX / this.sliderWidth) * 100}%`;

      if (offsetX == this.sliderWidth) {
        this.isDragging = false;
        this.onPay();
        this.currentSlider = offsetX;
        document.removeEventListener('mousemove', moveHandler);
        document.removeEventListener('touchmove', moveHandler);
      }
    };

    const stopHandler = () => {
      this.isDragging = false;
      document.removeEventListener('mousemove', moveHandler);
      document.removeEventListener('touchmove', moveHandler);
      document.removeEventListener('mouseup', stopHandler);
      document.removeEventListener('touchend', stopHandler);
      if (this.currentSlider == this.sliderWidth) return;
      this.resetSlider();
    };

    document.addEventListener('mousemove', moveHandler);
    document.addEventListener('touchmove', moveHandler);
    document.addEventListener('mouseup', stopHandler);
    document.addEventListener('touchend', stopHandler);
  }

  resetSlider() {
    this.sliderThumb.nativeElement.style.left = '0px';
    const track = document.querySelector('.slider-track') as HTMLElement;
    track.style.width = '0';
  }

  onPay() {
    this.slided = true;
    this.onProcessPayment();
  }
}
