import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { addIcons } from 'ionicons';
import { NavigationService } from 'src/app/service/navigation.service';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  fastFoodOutline,
  carOutline,
  gameControllerOutline,
  trailSignOutline,
  caretBackOutline,
} from 'ionicons/icons';
import { IonIcon, IonButton, IonContent } from '@ionic/angular/standalone';
import { formatCurrency } from 'src/app/utils';
import { NzMarks, NzSliderModule } from 'ng-zorro-antd/slider';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
@Component({
  selector: 'bsa-bill-detail',
  templateUrl: './bill-detail.component.html',
  styleUrls: ['./bill-detail.component.scss'],
  standalone: true,
  imports: [
    IonContent,
    CommonModule,
    NzSwitchModule,
    NzIconModule,
    IonIcon,
    NzInputModule,
    FormsModule,
    NzSliderModule,
    NzSelectModule,
    IonIcon,
    IonButton,
    BackButtonComponent,
  ],
})
export class BillDetailComponent implements OnInit, OnDestroy, OnChanges {
  @Input() billInfo: { billName: string; category: string; date: string } = {
    billName: '',
    category: '',
    date: '',
  };
  @Input() billDetails: { description: string; amount: number }[] = [];
  @Input() totalAmount: number = 0;
  @Input() participants: { id: string; name: string; splitAmount: number }[] =
    [];

  selectedCategory: string = 'equal';
  selectedPayerCate: string = 'all';

  totalParticipants: number = 0;

  marks: NzMarks = {};
  step: number = 1;

  newDetailDescription: string = '';
  newDetailAmount: number = 0;

  selectedItems: { [key: number]: any } = {};
  participantSelections: any[] = new Array(this.totalParticipants).fill(null);
  payerOption: string = 'all';

  isBillDetail = false;

  unsubscribe$ = new Subscription();
  isBillDetail$ = this.route.data;

  constructor(
    private route: ActivatedRoute,
    private routeService: NavigationService
  ) {
    addIcons({
      caretBackOutline,
      fastFoodOutline,
      carOutline,
      gameControllerOutline,
      trailSignOutline,
    });

    this.unsubscribe$.add(
      this.route.data.subscribe(({ isBillDetail }) => {
        this.isBillDetail = isBillDetail;

        if (this.isBillDetail) {
        }
      })
    );

    // this.totalParticipants = this.participants.length;
    // console.log(this.participants);
    // console.log(this.participants.length);
  }

  getBillCategoryBG(billCategory: string) {
    switch (billCategory) {
      case 'food':
        return '#FEAE6F';
      case 'transport':
        return '#2d98da';
      case 'entertainment':
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

  formatDate(date: string): string {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, '0');
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
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

  onDetailSelect(details: any[], participantIndex: number) {
    // Clear previous selections for this participant
    const previousSelections = this.selectedItems[participantIndex];
    if (previousSelections) {
      delete this.selectedItems[participantIndex];
    }

    // Add new selections
    this.selectedItems[participantIndex] = details;

    // Calculate total amount for all selected items
    const totalAmount = details.reduce((sum, detail) => sum + detail.amount, 0);
    this.participants[participantIndex].splitAmount = totalAmount;
  }

  getAvailableDetails(participantIndex: number) {
    return this.billDetails.filter((detail) => {
      // Check if this detail is selected by any other participant
      return !Object.entries(this.selectedItems).some(
        ([idx, selectedDetails]) => {
          const otherParticipant = parseInt(idx) !== participantIndex;
          const detailSelected =
            Array.isArray(selectedDetails) &&
            selectedDetails.some((selected) => selected === detail);
          return otherParticipant && detailSelected;
        }
      );
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['participants'] && changes['participants'].currentValue) {
      this.totalParticipants = this.participants.length;
      this.updateSliderConfig();
    }

    if (changes['totalAmount'] && !changes['totalAmount'].firstChange) {
      this.updateSliderConfig();
    }
  }

  ngOnInit() {
    this.totalParticipants = this.participants.length;
    this.updateSliderConfig();
    for (let i = 0; i < this.participants.length; i++) {
      this.participants[i].splitAmount = Math.ceil(
        this.totalAmount / this.participants.length
      );
    }
  }

  updateSliderConfig() {
    if (this.totalAmount > 0 && this.totalParticipants > 0) {
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

  onChangeOptions(value: string, type: string) {
    switch (type) {
      case 'split':
        {
          switch (value) {
            case 'equal':
              for (let i = 0; i < this.participants.length; i++) {
                this.participants[i].splitAmount = Math.ceil(
                  this.totalAmount / this.totalParticipants
                );
              }
              this.selectedCategory = 'equal';
              break;
            case 'custom':
              for (let i = 0; i < this.participants.length; i++) {
                this.participants[i].splitAmount = 0;
              }
              this.selectedCategory = 'custom';
              break;
          }
        }
        break;
      case 'payer':
        {
          switch (value) {
            case 'all':
              this.selectedPayerCate = 'all';
              this.payerOption = 'all';
              break;
            case 'custom-payer':
              this.selectedPayerCate = 'custom-payer';
              break;
          }
        }
        break;
    }
  }

  ngOnDestroy() {
    this.unsubscribe$.unsubscribe();
  }
}
