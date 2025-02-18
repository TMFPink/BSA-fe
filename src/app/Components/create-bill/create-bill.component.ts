import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  IonContent,
  IonInput,
  IonTitle,
  IonToolbar,
  IonHeader,
  IonButton,
  IonIcon,
  IonSearchbar,
  IonDatetimeButton,
  IonDatetime,
  IonModal,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { NavigationService } from 'src/app/Service/navigation.service';
import {
  personAddOutline,
  caretBackOutline,
  caretForwardOutline,
  fastFoodOutline,
  carOutline,
  gameControllerOutline,
  trailSignOutline,
  addCircleOutline,
} from 'ionicons/icons';
import { UserCardComponent } from 'src/app/UI/user-card/user-card.component';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputModule } from 'ng-zorro-antd/input';
import { CommonModule } from '@angular/common';
import { BillDetailComponent } from '../bill-detail/bill-detail.component';
import {
  FormBuilder,
  FormsModule,
  FormArray,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { formatCurrency } from 'src/app/utils/format-currency';
import { NzFormModule } from 'ng-zorro-antd/form';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.component.html',
  styleUrls: ['./create-bill.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonIcon,
    IonDatetime,
    IonDatetimeButton,
    IonModal,
    RouterLink,
    NzInputModule,
    UserCardComponent,
    NzDatePickerModule,
    BillDetailComponent,
    FormsModule,
    ReactiveFormsModule,
    NzFormModule,
  ],
})
export class CreateBillComponent implements OnInit {
  firstStage: boolean = true;
  secondStage: boolean = false;
  thirdStage: boolean = false;
  currentStage: number = 1;
  selectedCategory: string = '';

  newDetailDescription: string = '';
  newDetailAmount: number = 0;
  totalAmount: number = 0;
  billDetails: { description: string; amount: number }[] = [];

  constructor(private navService: NavigationService, private fb: FormBuilder) {
    addIcons({
      personAddOutline,
      caretBackOutline,
      caretForwardOutline,
      fastFoodOutline,
      carOutline,
      gameControllerOutline,
      trailSignOutline,
      addCircleOutline,
    });
  }

  form: FormGroup = this.fb.group({
    billName: [''],
    date: [null],
    totalAmount: [''],
    category: [''],
    billDetails: this.fb.array([]),
  });

  ngOnInit() {
    // Remove the previous subscription as it's not needed
  }

  onNavigate(): void {
    if (!this.firstStage) this.backStage();
    else this.goBack();
  }

  goBack(): void {
    console.log('Going back');
    this.navService.goBack();
  }

  nextStage(): void {
    switch (this.currentStage) {
      case 1:
        this.secondStage = true;
        this.firstStage = false;
        this.currentStage = 2;
        break;
      case 2:
        this.thirdStage = true;
        this.secondStage = false;
        this.currentStage = 3;
        break;
    }
  }

  backStage(): void {
    switch (this.currentStage) {
      case 2:
        this.secondStage = false;
        this.firstStage = true;
        this.currentStage = 1;
        break;
      case 3:
        this.thirdStage = false;
        this.secondStage = true;
        this.currentStage = 2;
        break;
    }
  }

  formatMoneyDetail(value: number) {
    if (value <= 100000000) return formatCurrency(value);
    return formatCurrency(value, true);
  }

  formatMoney(value: number) {
    return formatCurrency(value);
  }

  addBillDetail() {
    if (this.newDetailDescription && this.newDetailAmount > 0) {
      const billDetailsArray = this.form.get('billDetails') as FormArray;
      billDetailsArray.push(
        this.fb.group({
          description: this.newDetailDescription,
          amount: this.newDetailAmount,
        })
      );

      this.billDetails.push({
        description: this.newDetailDescription,
        amount: this.newDetailAmount,
      });
      this.totalAmount += this.newDetailAmount;
      this.newDetailDescription = '';
      this.newDetailAmount = 0;
    }
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get billDetailsArray() {
    return this.form.get('billDetails') as FormArray;
  }
}
