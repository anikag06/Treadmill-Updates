import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlotScoreGraphService {
  chart: any;
  dataPoints: any;
  constructor(private http: HttpClient) { }

  setDataPoints(length: number, scoreArray: any) {
    this.dataPoints = [ { } ];
    let i = 0;
    for (; i < length; i++) {
      this.dataPoints.push( { x: scoreArray[i][0] , y: scoreArray[i][1]});
    }
  }
  plotGraph(chartRef: any, length: number, maxValue: number ) {
    console.log(this.dataPoints);
    this.chart = new Chart(chartRef.nativeElement, {
      type: 'line',
      data: {
        datasets: [
          {
            data: this.dataPoints,
            showLine: true,
            fill: false,
            borderJoinStyle: 'miter',
            lineTension: 0,
          }
        ]
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        showLines: true,
        legend: {
          display: false
        },

        scales: {
          xAxes: [{
            type: 'linear',
            position: 'bottom',
            display: true,
            stacked: true,
            ticks: {
              max: length + 1,
              stepSize: 1,
              fontSize: 16
            },
            scaleLabel: {
              display: true,
              labelString: 'Beginning of the Module',
              fontSize: 18
            }
          }],
          yAxes: [{
            display: true,
            stacked: true,
            ticks: {
              max: maxValue,
              stepSize: 3,
              fontSize: 16
            },
            scaleLabel: {
              display: true,
              labelString: 'Score',
              fontSize: 18
            }
          }],
      },
      animation: {
        duration: 0
        },
      }
    });
  }

}
