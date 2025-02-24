import { CommonModule } from '@angular/common';
import { Component, OnInit, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
import { BillCardComponent } from 'src/app/UI/bill-card/bill-card.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { BillListFilterComponent } from 'src/app/UI/bill-list-filter/bill-list-filter.component';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-bill-list',
  templateUrl: './bill-list.component.html',
  styleUrls: ['./bill-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    BackButtonComponent,
    RouterModule,
    BillCardComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BillListComponent implements OnInit {
  constructor(
    private router: Router,
    private modalCtrl: ModalController,
    private fb: FormBuilder
  ) {}

  ngOnInit() {}

  filterForm = this.fb.group({
    billName: [''],
    billCategory: [''],
    isPaid: [''],
    billDate: [''],
  });

  async openFilter() {
    const modal = await this.modalCtrl.create({
      component: BillListFilterComponent,
      initialBreakpoint: 0.6,
      componentProps: {
        form: this.filterForm,
      },
    });
    modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) this.filterBill(data);
  }

  filterBill(data: any) {
    const payload = data;
    console.log(payload);
  }

  billList = [
    {
      id: '1',
      billName: 'Cơm ba ghiền',
      billAmount: 600,
      isPaid: false,
      billDate: '2021-10-10',
      billCategory: 'Food',
      billDetail: [
        {
          name: 'Food',
          amount: 100,
        },
        {
          name: 'Drink',
          amount: 200,
        },
        {
          name: 'Dessert',
          amount: 300,
        },
      ],
      users: [
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
        {
          avt: 'assets/images/user-avt.webp',
        },
      ],
    },
    {
      id: '2',
      billName: 'Bill 2',
      billAmount: 100,
      isPaid: true,
      billDate: '2021-10-10',
      billCategory: 'Entertainment',
      billDetail: [
        {
          name: 'Food',
          amount: 100,
        },
        {
          name: 'Drink',
          amount: 200,
        },
        {
          name: 'Dessert',
          amount: 300,
        },
      ],
      users: [
        {
          avt: 'assets/images/user-avt.webp',
        },
      ],
    },
    {
      id: '3',
      billName: 'Bill 3',
      billAmount: 100,
      isPaid: false,
      billDate: '2021-10-10',
      billCategory: 'Transportation',
      billDetail: [
        {
          name: 'Food',
          amount: 100,
        },
        {
          name: 'Drink',
          amount: 200,
        },
        {
          name: 'Dessert',
          amount: 300,
        },
      ],
      users: [
        {
          avt: 'assets/images/user-avt.webp',
        },
      ],
    },
    {
      id: '4',
      billName: 'Bill 4',
      billAmount: 100,
      isPaid: true,
      billDate: '2021-10-10',
      billCategory: 'Others',
      billDetail: [
        {
          name: 'Food',
          amount: 100,
        },
        {
          name: 'Drink',
          amount: 200,
        },
        {
          name: 'Dessert',
          amount: 300,
        },
      ],
      users: [
        {
          avt: 'assets/images/user-avt.webp',
        },
      ],
    },
  ];

  toBillDetail(id: string) {
    this.router.navigate(['bills/bill-detail', id]);
  }
}
