// import { Component, OnInit, AfterViewInit } from '@angular/core';
// import * as echarts from 'echarts';

// @Component({
//   selector: 'app-charts',
//   standalone: true,
//   templateUrl: './charts.component.html',
//   styleUrls: ['./charts.component.css'],
// })
// export class Charts implements OnInit, AfterViewInit {
//   private chart: any;

//   constructor() {}

//   ngOnInit(): void {}

//   ngAfterViewInit(): void {
//     this.initChart();
//   }

//   private initChart(): void {
//     const chartDom = document.getElementById('main')!;
//     this.chart = echarts.init(chartDom);
//     const option = {
//       tooltip: {
//         trigger: 'item',
//       },
//       legend: {
//         top: '5%',
//         left: 'center',
//       },
//       series: [
//         {
//           name: 'Access From',
//           type: 'pie',
//           radius: ['40%', '70%'],
//           avoidLabelOverlap: false,
//           label: {
//             show: false,
//             position: 'center',
//           },
//           emphasis: {
//             label: {
//               show: true,
//               fontSize: 20,
//               fontWeight: 'bold',
//             },
//           },
//           labelLine: {
//             show: false,
//           },
//           data: [
//             {
//               value: 1048,
//               name: 'Completed',
//               itemStyle: {
//                 color: '#3498db', // Green
//               },
//             },
//             {
//               value: 735,
//               name: 'Pending',
//               itemStyle: {
//                 color: '#2ecc71', // Green
//               },
//             },
//             {
//               value: 580,
//               name: 'Canceled',
//               itemStyle: {
//                 color: '#e74c3c', // Green
//               },
//             },
//           ],
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
import { isPlatformBrowser } from '@angular/common';
import * as echarts from 'echarts';

@Component({
  selector: 'app-charts',
  standalone: true,
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.css'],
})
export class Charts implements OnInit, AfterViewInit {
  private chart: any;
  private isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    // Check if the code is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Initialize the chart only if it's running in the browser
    if (this.isBrowser) {
      this.initChart();
    }
  }

  private initChart(): void {
    const chartDom = document.getElementById('main');
    if (chartDom) {
      this.chart = echarts.init(chartDom);
      const option = {
        tooltip: {
          trigger: 'item',
        },
        legend: {
          top: '5%',
          left: 'center',
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: 'center',
            },
            emphasis: {
              label: {
                show: true,
                fontSize: 20,
                fontWeight: 'bold',
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              {
                value: 1048,
                name: 'Completed',
                itemStyle: {
                  color: '#3498db',
                },
              },
              {
                value: 735,
                name: 'Pending',
                itemStyle: {
                  color: '#2ecc71',
                },
              },
              {
                value: 580,
                name: 'Canceled',
                itemStyle: {
                  color: '#e74c3c',
                },
              },
            ],
          },
        ],
      };

      this.chart.setOption(option);
    }
  }
}
