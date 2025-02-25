import { Component } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { formatCurrency } from 'src/app/utils';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';

@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: 'home.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    NzIconModule,
    NzButtonModule,
    CommonModule,
    RouterModule,
    NzCollapseModule,
    NgxEchartsModule,
  ],
})
export class HomePage {
  constructor() {}
  cardType: string = 'Create Bill';

  selectedFilter: string = 'all';

  formatMoney(value: number) {
    return formatCurrency(value);
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
  }

  listUser = [
    {
      avt: 'assets/images/user-avt.webp',
      name: 'John',
      amount: 100,
      owed: true,
    },
    {
      avt: 'assets/images/user-avt.webp',
      name: 'Doe',
      amount: 200,
      owed: false,
    },
    {
      avt: 'assets/images/user-avt.webp',
      name: 'Smith',
      amount: 300,
      owed: true,
    },
  ];

  chartOption = {
    grid: {
      left: '1%',
      right: '1%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
      axisLabel: {
        color: '#000',
        fontSize: 14,
      },
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        color: '#000',
        fontSize: 10,
        formatter: (value: number) => formatCurrency(value, true) + ' VND',
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: '#ddd',
          type: 'dashed',
        },
      },
    },
    series: [
      {
        data: [150000, 230000, 180000, 280000, 170000, 190000],
        type: 'bar',
        barWidth: '40%',
        barCategoryGap: '20%',
        itemStyle: {
          color: '#6dcfd1',
          borderRadius: [3, 3, 0, 0],
        },
      },
    ],
    tooltip: {
      trigger: 'axis',
      backgroundColor: 'rgba(0,0,0,0.7)',
      textStyle: {
        color: '#fff',
      },
      formatter: (params: any) => {
        return `${params[0].name}: ${formatCurrency(
          params[0].value,
          true
        )} VND`;
      },
    },
  } as EChartsOption;
}
