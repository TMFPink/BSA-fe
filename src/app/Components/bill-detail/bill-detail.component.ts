import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { addIcons } from 'ionicons';
import { NavigationService } from 'src/app/Service/navigation.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  fastFoodOutline,
  carOutline,
  gameControllerOutline,
  trailSignOutline,
} from 'ionicons/icons';
import { IonIcon } from '@ionic/angular/standalone';
import { formatCurrency } from 'src/app/utils/format-currency';
import { NzMarks, NzSliderModule } from 'ng-zorro-antd/slider';

@Component({
  selector: 'bsa-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    NzSwitchModule,
    NzIconModule,
    IonIcon,
    NzInputModule,
    FormsModule,
    NzSliderModule,
  ],
})
export class BillDetailComponent implements OnInit {
  // @Input() form!: FormGroup;
  @Input() billDetails: { description: string; amount: number }[] = [];
  @Input() totalAmount: number = 0;
  participants = [
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    { avatar: '/assets/images/user-avt.webp', splitAmount: 0 },
    // { avatar: '/assets/images/user-avt.webp' },
  ];

  selectedCategory: string = 'equal';
  defaultSplitAmount: string = '';

  totalParticipants: number = 5;

  marks: NzMarks = {};
  step: number = 1;

  newDetailDescription: string = '';
  newDetailAmount: number = 0;

  constructor() {
    addIcons({
      fastFoodOutline,
      carOutline,
      gameControllerOutline,
      trailSignOutline,
    });
  }

  getBillCategoryBG(billCategory: string) {
    switch (billCategory) {
      case 'food':
        return '#FEAE6F';
      case 'transport':
        return '#2d98da';
      case 'game':
        return '#9333ea';
      case 'others':
        return 'var(--secondary-theme)';
      default:
        return '';
    }
  }

  formatMoney(value: number) {
    return formatCurrency(value);
  }

  formatTooltip(value: number) {
    return formatCurrency(value, true);
  }

  onSplitChange(value: string, index: number) {
    // this.defaultSplitAmount = value;
    // this.defaultSplitAmount = this.defaultSplitAmount.replace(/\D/g, '');
    this.participants[index].splitAmount = value ? parseInt(value) : 0;
  }

  addBillDetail() {
    if (this.newDetailDescription && this.newDetailAmount > 0) {
      this.billDetails.push({
        description: this.newDetailDescription,
        amount: this.newDetailAmount,
      });
      this.newDetailDescription = '';
      this.newDetailAmount = 0;
    }
  }

  ngOnInit() {
    this.updateSliderConfig();
    for (let i = 0; i < this.participants.length; i++) {
      this.participants[i].splitAmount = Math.ceil(
        this.totalAmount / this.totalParticipants
      );
    }
  }

  updateSliderConfig() {
    const step = Math.ceil(this.totalAmount / 10);
    const participantStep = Math.ceil(
      this.totalAmount / this.totalParticipants
    );
    const marks: NzMarks = { 0: '0' };

    for (let i = 1; i <= this.totalParticipants; i++) {
      marks[participantStep * i] = formatCurrency(
        participantStep * i,
        true
      ).toString();
    }

    this.step = step;
    this.marks = marks;
  }
}
