import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
  OnInit,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { createDispatchMap, createSelectMap } from '@ngxs/store';
import { BillAction, BillsState } from 'src/app/store';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
import { BillCardComponent } from 'src/app/UI/bill-card/bill-card.component';
import { BillListFilterComponent } from 'src/app/UI/bill-list-filter/bill-list-filter.component';

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
  ) {
    effect(() => {});
  }

  actions = createDispatchMap({
    loadBills: BillAction.LoadBills,
  });
  selectors = createSelectMap({
    bills: BillsState.billsList,
  });

  ngOnInit() {}
  ionViewWillEnter() {
    this.actions.loadBills({});
  }

  filterForm = this.fb.group({
    billName: [''],
    category: [''],
    all_paid: [''],
    date: [''],
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
    const payload = { ...data };

    // Format date to yyyy-mm-dd if it exists
    if (payload.date) {
      const date = new Date(payload.date);
      payload.date = date.toISOString().split('T')[0]; // Format as yyyy-mm-dd
    }

    console.log('payload', payload);
    this.actions.loadBills(payload);
  }

  toBillDetail(id: number) {
    this.router.navigate(['bills/bill-detail', id]);
  }
}
