import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  CUSTOM_ELEMENTS_SCHEMA,
  effect,
} from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { BackButtonComponent } from 'src/app/UI/back-button/back-button.component';
import { BillCardComponent } from 'src/app/UI/bill-card/bill-card.component';
import { IonicModule, ModalController } from '@ionic/angular';
import { BillListFilterComponent } from 'src/app/UI/bill-list-filter/bill-list-filter.component';
import { FormBuilder } from '@angular/forms';
import { createDispatchMap, createSelectMap } from '@ngxs/store';
import { BillAction, BillsState } from 'src/app/store';

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
    effect(() => {
      if (this.selectors.bills()) {
        console.log(this.selectors.bills());
      }
    });
  }

  actions = createDispatchMap({
    loadBills: BillAction.LoadBills,
  });
  selectors = createSelectMap({
    bills: BillsState.billsList,
  });

  ngOnInit() {
    this.actions.loadBills({});
  }

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

  toBillDetail(id: number) {
    this.router.navigate(['bills/bill-detail', id]);
  }
}
