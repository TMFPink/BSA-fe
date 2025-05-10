import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Bill } from 'src/app/api/models';
import { formatCurrency, formatDateToString } from 'src/app/utils';
import { BILL_CATEGORY_COLOR } from 'src/app/utils/Constant';

@Component({
  selector: 'bill-card-ui',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  imports: [CommonModule],
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill = {} as Bill;
  constructor() {}

  ngOnInit() {}

  formatDate(date: string) {
    return formatDateToString(date);
  }

  formatMoney(money: string) {
    return formatCurrency(Number(money));
  }

  getBillCategoryBG(billCategory: string) {
    switch (billCategory) {
      case 'Food':
        return BILL_CATEGORY_COLOR['Food'];
      case 'Transport':
        return BILL_CATEGORY_COLOR['Transport'];
      case 'Entertainment':
        return BILL_CATEGORY_COLOR['Entertainment'];
      case 'Others':
        return BILL_CATEGORY_COLOR['Others'];
      default:
        return BILL_CATEGORY_COLOR['Others'];
    }

    // return BILL_CATEGORY_COLOR[billCategory];
  }
}
