import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { Bill } from 'src/app/api/models';
import { formatDateToString } from 'src/app/utils';
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

  getBillCategoryBG(billCategory: string) {
    switch (billCategory) {
      case 'food':
        return BILL_CATEGORY_COLOR['Food'];
      case 'transportation':
        return BILL_CATEGORY_COLOR['Transportation'];
      case 'entertainment':
        return BILL_CATEGORY_COLOR['Entertainment'];
      case 'others':
        return BILL_CATEGORY_COLOR['Others'];
      default:
        return BILL_CATEGORY_COLOR['Others'];
    }

    // return BILL_CATEGORY_COLOR[billCategory];
  }
}
