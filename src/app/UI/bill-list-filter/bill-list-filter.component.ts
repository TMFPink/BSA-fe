import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { BILL_CATEGORY } from 'src/app/utils/Constant';
import { NzInputModule } from 'ng-zorro-antd/input';

@Component({
  selector: 'app-bill-list-filter',
  templateUrl: './bill-list-filter.component.html',
  styleUrls: ['./bill-list-filter.component.scss'],
  imports: [
    CommonModule,
    IonicModule,
    NzSelectModule,
    NzFormModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzInputModule,
  ],
  standalone: true,
})
export class BillListFilterComponent implements OnInit {
  constructor(private modalCtrl: ModalController) {}

  @Input() form!: FormGroup;
  billCategories = BILL_CATEGORY;

  async confirm() {
    await this.modalCtrl.dismiss(this.form.value);
    this.form.reset();
  }
  async clear() {
    await this.form.reset();
  }

  ngOnInit() {}
}
