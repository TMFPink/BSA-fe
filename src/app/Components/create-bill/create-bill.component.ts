import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { NavigationService } from 'src/app/service/navigation.service';
import {
  personAddOutline,
  caretBackOutline,
  caretForwardOutline,
  fastFoodOutline,
  carOutline,
  gameControllerOutline,
  trailSignOutline,
  addCircleOutline,
  trashOutline,
  trashBinOutline,
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
  Validators,
} from '@angular/forms';
import { formatCurrency } from 'src/app/utils';
import { NzFormModule } from 'ng-zorro-antd/form';
import { createDispatchMap, createSelectMap } from '@ngxs/store';
import { FriendsAction, FriendsState } from 'src/app/store';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/api/models';

interface Participant {
  id: string;
  splitAmount: number;
}

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
    IonSearchbar,
  ],
})
export class CreateBillComponent implements OnInit, OnDestroy {
  firstStage: boolean = true;
  secondStage: boolean = false;
  thirdStage: boolean = false;
  currentStage: number = 1;
  selectedCategory: string = '';

  newDetailDescription: string = '';
  newDetailAmount: number = 0;
  totalAmount: number = 0;
  billDetails: { description: string; amount: number }[] = [];
  participants: Participant[] = [];

  destroy$ = new Subject<void>();

  searchFriendForm = this.fb.group({
    username: [''],
  });
  billForm = this.fb.group({
    // stage1
    billName: ['', Validators.required],
    date: [null, Validators.required],
    participants: this.fb.array([]),

    // stage2
    totalAmount: [''],
    category: ['', Validators.required],
    billDetails: this.fb.array([]),
  });

  billInfo = {
    billName: '',
    category: '',
    date: '',
  };

  constructor(private navService: NavigationService, private fb: FormBuilder) {
    addIcons({
      caretBackOutline,
      fastFoodOutline,
      gameControllerOutline,
      carOutline,
      trailSignOutline,
      trashOutline,
      personAddOutline,
      caretForwardOutline,
      addCircleOutline,
      trashBinOutline,
    });
    this.searchFriendForm.valueChanges
      .pipe(takeUntil(this.destroy$), debounceTime(500))
      .subscribe((value) => {
        this.actions.getFriends(value.username);
      });
  }

  ngOnInit() {
    this.actions.getFriends('');
  }

  selectors = createSelectMap({
    friends: FriendsState.friendsList,
  });

  actions = createDispatchMap({
    getFriends: FriendsAction.GetFriends,
  });

  onNavigate(): void {
    if (!this.firstStage) this.backStage();
    else this.goBack();
  }

  goBack(): void {
    this.billForm.reset();
    this.navService.goBack();
  }

  nextStage(): void {
    if (this.checkBillForm()) {
      switch (this.currentStage) {
        case 1:
          this.secondStage = true;
          this.firstStage = false;
          this.currentStage = 2;
          break;
        case 2:
          this.billInfo = {
            billName: this.billForm.get('billName')?.value ?? '',
            category: this.selectedCategory,
            date: this.billForm.get('date')?.value ?? '',
          };

          this.thirdStage = true;
          this.secondStage = false;
          this.currentStage = 3;
          break;
      }
    }
  }

  checkBillForm(): boolean {
    let isValid = true;
    switch (this.currentStage) {
      case 1:
        if (!this.billForm.get('billName')?.value) isValid = false;

        if (!this.billForm.get('date')?.value) isValid = false;

        if (this.participantsArray.length === 0) isValid = false;

        break;
      case 2:
        // Check if category is selected and there is at least one bill detail
        if (!this.selectedCategory) {
          isValid = false;
        }
        if (this.billDetails.length === 0) {
          isValid = false;
        }
        break;
    }
    return isValid;
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
      const billDetailsArray = this.billForm.get('billDetails') as FormArray;
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

  deleteBillDetail(index: number) {
    const billDetailsArray = this.billForm.get('billDetails') as FormArray;
    const detail = this.billDetails[index];
    this.totalAmount -= detail.amount;
    this.billDetails.splice(index, 1);
    billDetailsArray.removeAt(index);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
  }

  get billDetailsArray() {
    return this.billForm.get('billDetails') as FormArray;
  }

  get participantsArray() {
    return this.billForm.get('participants') as FormArray;
  }

  handleToggleParticipant(user: User) {
    const participantsArray = this.participantsArray;
    const index = participantsArray.controls.findIndex(
      (control) => control.get('id')?.value === user.id
    );

    if (index === -1) {
      participantsArray.push(
        this.fb.group({
          id: [user.id, Validators.required],
          splitAmount: [0],
          name: [user.username],
        })
      );
    } else {
      participantsArray.removeAt(index);
    }
  }

  isParticipantSelected(userId: string): boolean {
    return this.participantsArray.controls.some(
      (control) => control.get('id')?.value === userId
    );
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
