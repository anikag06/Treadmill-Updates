import { Injectable } from '@angular/core';
import * as Chart from 'chart.js';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { GAD_SEVEN_SCORE, PHQ_NINE_SCORE } from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class PlotScoreGraphService {
  chart: any;
  dataPoints: any;
  constructor(private http: HttpClient) {}

  setDataPoints(length: number, scoreArray: any) {
    this.dataPoints = [{}];
    for (let i = 0; i < length; i++) {
      this.dataPoints.push({ x: scoreArray[i][0], y: scoreArray[i][1] });
    }
  }
  plotGraph(chartRef: any, length: number, maxValue: number) {
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
          },
        ],
      },

      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.5,
        showLines: true,
        legend: {
          display: false,
        },

        scales: {
          xAxes: [
            {
              type: 'linear',
              position: 'bottom',
              display: true,
              stacked: true,
              ticks: {
                max: length + 1,
                stepSize: 1,
                fontSize: 16,
              },
              scaleLabel: {
                display: true,
                labelString: 'Questionnaire number',
                fontSize: 18,
              },
            },
          ],
          yAxes: [
            {
              display: true,
              stacked: true,
              ticks: {
                max: maxValue,
                stepSize: 3,
                fontSize: 16,
              },
              scaleLabel: {
                display: true,
                labelString: 'Score',
                fontSize: 18,
              },
            },
          ],
        },
        animation: {
          duration: 0,
        },
      },
    });
  }
  // function for getting the questionnaire scores of the user
  getPhqScores(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + PHQ_NINE_SCORE);
  }
  getGadScores(): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + GAD_SEVEN_SCORE);
  }
}
