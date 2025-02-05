import { CommonModule } from '@angular/common';
import { Component, ElementRef, Input, ViewChild, OnInit } from '@angular/core';

@Component({
  selector: 'bsa-card-ui',
  templateUrl: './bsa-card.component.html',
  styleUrls: ['./bsa-card.component.scss'],
  imports: [CommonModule],
})
export class BsaCardComponent implements OnInit {

  typeColor: string = '';

  constructor() {}

  ngOnInit() {
    if (this.cardType) {
      switch (this.cardType) {
        case 'Pay':
          this.typeColor = 'green';
          break;
        case 'Create Bill':
          this.typeColor = 'blue';
          break;
        case 'Request':
          this.typeColor = 'red';
          break;
        default:
          this.typeColor = 'yellow';
          break;
      }
    }
  }

  @Input() center = true;
  @Input() containerClass = '';
  @ViewChild('cardUI') cardUI!: ElementRef;
  @ViewChild('cardTitle') cardTitle!: ElementRef;
  @Input() cardType: string = '';
}
