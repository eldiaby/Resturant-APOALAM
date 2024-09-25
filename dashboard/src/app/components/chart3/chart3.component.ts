// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as echarts from 'echarts';

// @Component({
//   selector: 'app-chart3',
//   standalone: true,
//   imports: [],
//   templateUrl: './chart3.component.html',
//   styleUrl: './chart3.component.css',
// })
// export class ChartsComponent implements OnInit, AfterViewInit {
//   private chart: any;

//   constructor() {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     this.initChart();
//   }

//   private initChart(): void {
//     const chartDom = document.getElementById('main3')!;
//     this.chart = echarts.init(chartDom);

//     const option = {
//       xAxis: {
//         type: 'category',
//         data: Array.from({ length: 30 }, (_, i) => i + 1),
//       },
//       yAxis: {
//         type: 'value',
//       },
//       series: [
//         {
//           data: [
//             8, 16, 24, 7, 14, 35, 23, 39, 13, 17, 26, 18, 25, 35, 16, 14, 12,
//             11, 20, 27, 34, 16, 35, 20, 10, 28, 34, 12, 30, 12,
//           ],
//           type: 'bar',
//         },
//       ],
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
  selector: 'app-chart3',
  standalone: true,
  templateUrl: './chart3.component.html',
  styleUrls: ['./chart3.component.css'], // Fix typo: 'styleUrl' -> 'styleUrls'
})
export class ChartsComponent implements OnInit, AfterViewInit {
  private chart: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      this.initChart();
    }
  }

  private initChart(): void {
    const chartDom = document.getElementById('main3');
    if (chartDom) {
      this.chart = echarts.init(chartDom);

      const option = {
        xAxis: {
          type: 'category',
          data: Array.from({ length: 30 }, (_, i) => i + 1),
        },
        yAxis: {
          type: 'value',
        },
        series: [
          {
            data: [
              8, 16, 24, 7, 14, 35, 23, 39, 13, 17, 26, 18, 25, 35, 16, 14, 12,
              11, 20, 27, 34, 16, 35, 20, 10, 28, 34, 12, 30, 12,
            ],
            type: 'bar',
          },
        ],
      };

      this.chart.setOption(option);
    }
  }
}
