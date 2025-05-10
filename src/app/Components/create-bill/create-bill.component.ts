import {
  Component,
  effect,
  OnDestroy,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
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
import {
  BillAction,
  BillsState,
  FriendsAction,
  FriendsState,
  ProfileState,
} from 'src/app/store';
import { debounceTime, Subject, takeUntil } from 'rxjs';
import { User } from 'src/app/api/models';
import { NzSpinModule } from 'ng-zorro-antd/spin';

interface Participant {
  id: string;
  split_amount: number;
  paid: boolean;
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
    NzSpinModule,
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
  billDetails: { description: string; amount: number; user?: string }[] = [];
  participants: Participant[] = [];

  splitOptions: string = 'equal';

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
    total_amount: [0],
    category: ['', Validators.required],
    billDetails: this.fb.array([]),

    // stage3
    payer: [''],
    shared: [true],
  });

  billInfo = {
    billName: '',
    category: '',
    date: '',
  };

  @ViewChild('fileInput') fileInput!: ElementRef;

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

    effect(() => {
      if (this.selectors.user()) {
        this.participantsArray.push(
          this.fb.group({
            id: [this.selectors.user()?.id, Validators.required],
            split_amount: [0],
            name: [this.selectors.user()?.username],
            paid: [false],
          })
        );
      }
    });
  }

  ngOnInit() {
    this.actions.getFriends('');
  }

  selectors = createSelectMap({
    friends: FriendsState.friendsList,
    user: ProfileState.user,
    billStatus: BillsState.status,
    loadingProcess: BillsState.loading,
  });

  actions = createDispatchMap({
    getFriends: FriendsAction.GetFriends,
    createBill: BillAction.CreateBill,
    processBillImage: BillAction.ProcessBill,
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
          // Update billDetails array in the form with current values including user assignments
          const billDetailsArray = this.billForm.get(
            'billDetails'
          ) as FormArray;
          billDetailsArray.clear();
          this.billDetails.forEach((detail) => {
            billDetailsArray.push(
              this.fb.group({
                description: detail.description,
                amount: detail.amount,
                user: detail.user || null,
              })
            );
          });

          this.thirdStage = true;
          this.secondStage = false;
          this.currentStage = 3;
          break;
        case 3:
          this.calculateSplitAmounts();
          this.actions.createBill(this.billForm.value);
      }
    }
  }

  calculateSplitAmounts(): void {
    const totalAmount = this.totalAmount || 0;
    const payer = this.payer;
    const participants = this.participantsArray.controls;

    if (this.splitOptions === 'equal') {
      console.log('Shared equally');
      // Split equally among all participants
      const splitAmount = totalAmount / participants.length;

      participants.forEach((participant) => {
        participant.get('split_amount')?.setValue(splitAmount.toFixed(2));

        // Set paid status for the payer
        if (participant.get('id')?.value === payer) {
          participant.get('paid')?.setValue(true);
        } else {
          participant.get('paid')?.setValue(false);
        }
      });
    } else {
      console.log('Not shared');
      participants.forEach((participant) => {
        const userId = participant.get('id')?.value;
        let userAmount = 0;

        // Sum up amounts from bill details assigned to this user
        this.billDetails.forEach((detail) => {
          if (detail.user === userId) {
            userAmount += detail.amount;
          }
        });

        participant
          .get('split_amount')
          ?.setValue(Number(userAmount.toFixed(2)));

        // Set paid status for the payer
        if (userId === payer) {
          participant.get('paid')?.setValue(true);
        } else {
          participant.get('paid')?.setValue(false);
        }
      });
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
      const currentTotal = this.billForm.get('total_amount')?.value || 0;
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
      this.billForm
        .get('total_amount')
        ?.setValue(currentTotal + this.newDetailAmount);
      this.newDetailDescription = '';
      this.newDetailAmount = 0;
    }
  }

  deleteBillDetail(index: number) {
    const billDetailsArray = this.billForm.get('billDetails') as FormArray;
    const currentTotal = this.billForm.get('total_amount')?.value || 0;
    const detail = this.billDetails[index];
    this.billForm.get('total_amount')?.setValue(currentTotal - detail.amount);

    this.billDetails.splice(index, 1);
    billDetailsArray.removeAt(index);
  }

  selectCategory(category: string) {
    this.selectedCategory = category;
    this.billForm.patchValue({ category });
  }

  get billDetailsArray() {
    return this.billForm.get('billDetails') as FormArray;
  }

  get participantsArray() {
    return this.billForm.get('participants') as FormArray;
  }

  get payer() {
    return this.billForm.get('payer')?.value;
  }

  get shared() {
    return this.billForm.get('shared')?.value;
  }

  get totalAmount() {
    return this.billForm.get('total_amount')?.value;
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
          split_amount: [0],
          name: [user.username],
          paid: [false],
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

  updatePayer(payer: string) {
    this.billForm.patchValue({ payer });
  }

  updateShared(shared: boolean) {
    this.billForm.patchValue({ shared });
  }
  onSplitChange(split: string) {
    this.splitOptions = split;
  }

  onBillDetailsChange(
    details: { description: string; amount: number; user?: string }[]
  ): void {
    this.billDetails = details;
    // This ensures the billDetails FormArray stays in sync
    const billDetailsArray = this.billForm.get('billDetails') as FormArray;
    billDetailsArray.clear();
    this.billDetails.forEach((detail) => {
      billDetailsArray.push(
        this.fb.group({
          description: detail.description,
          amount: detail.amount,
          user: detail.user || null,
        })
      );
    });
  }

  triggerFileInput(): void {
    this.fileInput.nativeElement.click();
  }

  onImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.actions.processBillImage(file);
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
