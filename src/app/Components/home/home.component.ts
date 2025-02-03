import { Component, OnInit } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BsaCardComponent } from 'src/app/UI/bsa-card/bsa-card.component';
import { CommonModule } from '@angular/common';
// import { NgxEchartsModule } from 'ngx-echarts';
// import { EChartsOption, PieSeriesOption, SeriesOption } from 'echarts';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    NzIconModule,
    NzButtonModule,
    BsaCardComponent,
    CommonModule
    // NgxEchartsModule,
  ],
})
export class HomePage {
  constructor() {
    
  }
  cardType: string = 'Create Bill';
  
  
  // pieChartOptions: EChartsOption = {
  //   title: {
  //     text: 'Expense Breakdown',
  //     left: 'center',
  //   },
  //   tooltip: {
  //     trigger: 'item',
  //   },
  //   legend: {
  //     orient: 'vertical',
  //     left: 'left',
  //   },
  //   series: [
  //     {
  //       name: 'Expenses',
  //       type: 'pie',
  //       radius: '50%',
  //       data: [
  //         { value: 500000, name: 'Rent' },
  //         { value: 300000, name: 'Food' },
  //         { value: 200000, name: 'Transport' },
  //         { value: 150000, name: 'Entertainment' },
  //         { value: 100000, name: 'Others' },
  //       ],
  //       emphasis: {
  //         itemStyle: {
  //           shadowBlur: 10,
  //           shadowOffsetX: 0,
  //           shadowColor: 'rgba(0, 0, 0, 0.5)',
  //         },
  //       },
  //     },
  //   ],
  // };
}
