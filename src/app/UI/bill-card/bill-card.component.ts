import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';
import { BILL_CATEGORY_COLOR } from 'src/app/utils/Constant';

@Component({
  selector: 'bill-card-ui',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss'],
  imports: [CommonModule],
})
export class BillCardComponent implements OnInit {
  @Input() bill: any;
  constructor() {}

  ngOnInit() {}
  getBillCategoryBG(billCategory: keyof typeof BILL_CATEGORY_COLOR) {
    return BILL_CATEGORY_COLOR[billCategory];
  }
}
