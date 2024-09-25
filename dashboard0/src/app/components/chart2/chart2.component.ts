// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as echarts from 'echarts';

// @Component({
//   selector: 'app-chart2',
//   standalone: true,
//   imports: [],
//   templateUrl: './chart2.component.html',
//   styleUrl: './chart2.component.css',
// })
// export class MyChartComponent implements OnInit, AfterViewInit {
//   private chart: any;

//   constructor() {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     this.initChart();
//   }

//   private initChart(): void {
//     const chartDom = document.getElementById('main2')!;
//     this.chart = echarts.init(chartDom);
//     const option = {
//       xAxis: {
//         type: 'category',
//         data: [
//           'Jan',
//           'Feb',
//           'Mar',
//           'Apr',
//           'May',
//           'Jun',
//           'Jul',
//           'Aug',
//           'Sep',
//           'Oct',
//           'Nov',
//           'Dec',
//         ],
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           name: 'Income',
//           data: [
//             1200, 1100, 1300, 1400, 1800, 1700, 1600, 1500, 1900, 2100, 2300,
//             2400,
//           ],
//           type: 'line',
//           smooth: true,
//         },
//         {
//           name: 'Expense',
//           data: [
//             800, 900, 950, 1020, 980, 1050, 1100, 1000, 1200, 1250, 1350, 1400,
//           ],
//           type: 'line',
//           smooth: true,
//         },
//       ],
//       legend: {
//         top: '5%',
//         left: 'center',
//       },
//       tooltip: {
//         trigger: 'axis',
//       },
//     };

//     this.chart.setOption(option);
//   }
// }
import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import * as echarts from 'echarts';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-chart2',
  standalone: true,
  templateUrl: './chart2.component.html',
  styleUrls: ['./chart2.component.css'], // Fixed typo: 'styleUrl' -> 'styleUrls'
})
export class MyChartComponent implements OnInit, AfterViewInit {
  private chart: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if we're in a browser environment
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initChart();
    }
  }

  private initChart(): void {
    const chartDom = document.getElementById('main2');
    if (chartDom) {
      this.chart = echarts.init(chartDom);
      const option = {
        xAxis: {
          type: 'category',
          data: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            name: 'Income',
            data: [
              1200, 1100, 1300, 1400, 1800, 1700, 1600, 1500, 1900, 2100, 2300,
              2400,
            ],
            type: 'line',
            smooth: true,
          },
          {
            name: 'Expense',
            data: [
              800, 900, 950, 1020, 980, 1050, 1100, 1000, 1200, 1250, 1350,
              1400,
            ],
            type: 'line',
            smooth: true,
          },
        ],
        legend: {
          top: '5%',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
        },
      };

      this.chart.setOption(option);
    }
  }
}
