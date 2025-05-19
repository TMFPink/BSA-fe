import { Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { IonContent } from '@ionic/angular/standalone';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { formatCurrency } from 'src/app/utils';
import { NgxEchartsModule } from 'ngx-echarts';
import { EChartsOption } from 'echarts';
import { createSelectMap, Store } from '@ngxs/store';
import { InsightAction, insightState } from 'src/app/store/insight';
import { map } from 'rxjs';
import { BILL_CATEGORY_COLOR } from 'src/app/utils/Constant';
import * as echarts from 'echarts';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { PayCardComponent } from 'src/app/UI/pay-card/pay-card.component';
import { BillAction } from 'src/app/store';
import { qrCode } from 'ionicons/icons';

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
    NzModalModule,
    PayCardComponent,
  ],
})
export class HomePage implements OnDestroy {
  constructor(private store: Store, private modal: NzModalService) {}

  listUser: any[] = [];
  allUser: any[] = [];
  totalOwedToMe: number = 0;
  totalIOwe: number = 0;
  totalSpent: number = 0;
  selectedFilter: string = 'all';
  cardType: string = 'Create Bill';
  isDataLoaded: boolean = false;

  @ViewChild('barChart', { static: false }) barChartElement!: ElementRef;
  @ViewChild('pieChart', { static: false }) pieChartElement!: ElementRef;
  chartInstanceBar: any;
  chartInstancePie: any;

  initCharts() {
    this.chartInstanceBar = echarts.init(this.barChartElement.nativeElement);
    this.chartInstancePie = echarts.init(this.pieChartElement.nativeElement);
    this.chartInstanceBar.setOption(this.chartOptionBar);
    this.chartInstancePie.setOption(this.chartOptionPie);
  }

  destroyCharts() {
    if (this.chartInstanceBar) {
      this.chartInstanceBar.dispose();
    }
    if (this.chartInstancePie) {
      this.chartInstancePie.dispose();
    }
  }

  updateChart(spending: any) {
    // Destroy the existing charts before updating
    this.destroyCharts();

    if (spending && spending.daily_spending) {
      this.totalSpent = spending.total_spent || 0;
      if (this.chartOptionBar.xAxis && 'data' in this.chartOptionBar.xAxis) {
        this.chartOptionBar.xAxis.data = spending.daily_spending.map(
          (item: any) => item.date
        );
      }
      if (
        Array.isArray(this.chartOptionBar.series) &&
        this.chartOptionBar.series[0]
      ) {
        this.chartOptionBar.series[0].data = spending.daily_spending.map(
          (item: any) => item.amount
        );
      }
    }

    if (spending && spending.spending_by_category) {
      // Update pie chart (spending by category)
      const categoryData = Object.entries(spending.spending_by_category).map(
        ([category, amount]) => ({
          name: category,
          value: amount,
        })
      );

      if (
        Array.isArray(this.chartOptionPie.series) &&
        this.chartOptionPie.series[0]
      ) {
        this.chartOptionPie.series[0].data = categoryData;
      }

      this.isDataLoaded = true; // Mark data as loaded
    }

    // Reinitialize the charts with updated data
    this.initCharts();
  }

  chartOptionBar: EChartsOption = {
    grid: {
      left: '1%',
      right: '1%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: [],
      axisLabel: {
        color: '#000',
        fontSize: 14,
        formatter: (value: string) => {
          const date = new Date(value);
          const day = String(date.getDate()).padStart(2, '0');
          const month = String(date.getMonth() + 1).padStart(2, '0');
          return `${day}/${month}`;
        },
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
        data: [],
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
  };

  chartOptionPie: EChartsOption = {
    series: [
      {
        name: 'Spending by Category',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,

        data: [],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
        labelLine: {
          show: false,
        },
        itemStyle: {
          borderRadius: 10,

          borderWidth: 10,
          // Set colors for each category based on BILL_CATEGORY_COLOR
          color: (params: any) =>
            BILL_CATEGORY_COLOR[
              params.name as keyof typeof BILL_CATEGORY_COLOR
            ] || '#1d4ed8',
        },
      },
    ],
    tooltip: {
      trigger: 'item',
    },
    legend: {
      top: '1%',
      left: 'center',
    },
  };

  ionViewWillEnter() {
    this.store.dispatch(new InsightAction.GetBalance({}));
    this.store.dispatch(new InsightAction.GetTotalSpend({}));

    // Load user balances
    this.store.select(insightState.data).subscribe((data: any) => {
      if (data) {
        this.totalOwedToMe = data.total_owed_to_me || 0;
        this.totalIOwe = data.total_i_owe || 0;
        this.allUser = [
          ...data.owed_to_me_by_user.map((item: any) => ({
            id: item.user.id,
            avt: item.user.avatarUrl || 'assets/images/user-avt.webp',
            name: item.user.username,
            amount: item.total_amount,
            qrCode: item.user.qrCode,
            owed: true,
          })),
          ...data.i_owe_to_user.map((item: any) => ({
            id: item.user.id,
            avt: item.user.avatarUrl || 'assets/images/user-avt.webp',
            name: item.user.username,
            amount: item.total_amount,
            qrCode: item.user.qrCode,
            owed: false,
          })),
        ];
        this.listUser = this.allUser;
      }
    });

    // Load spending data
    this.store.select(insightState.total_spent).subscribe((spending: any) => {
      this.updateChart(spending);
    });
  }

  selectFilter(filter: string) {
    this.selectedFilter = filter;
    if (filter === 'all') {
      this.updateUserList(this.allUser); // Show all users
    } else if (filter === 'owed') {
      this.updateUserList(this.allUser.filter((user) => user.owed)); // Show only users who owe
    } else if (filter === 'you-owed') {
      this.updateUserList(this.allUser.filter((user) => !user.owed)); // Show only users you owe
    }
  }

  updateUserList(filteredUsers: any[]) {
    this.listUser = filteredUsers;
  }

  formatMoney(value: number) {
    return formatCurrency(value);
  }
  imageUrl = (url: string) => `/assets/images/${url}`;

  showPaymentPopup(user: any) {
    console.log('User selected for payment:', user);
    setTimeout(() => {
      const modalRef = this.modal.create({
        nzContent: PayCardComponent,
        nzData: {
          user: user, // Pass user data to the component
          number: 1,
          onProcessPayment: () => this.processPayment(user),
        },
        nzFooter: null,
        nzMaskStyle: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        nzBodyStyle: {
          background: 'transparent',
          boxShadow: 'none',
          padding: '0',
        },
        nzClassName: 'custom-payment-modal',
      });
    }, 0);
  }

  processPayment(user: any) {
    console.log('Processing payment for user:', user);
    this.store.dispatch(new BillAction.PayBill({ user_id: user.id }));
  }

  ngOnDestroy() {
    console.log('HomePage destroyed');
  }
}
