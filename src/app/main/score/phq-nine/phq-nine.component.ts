import { Component, OnInit, ViewChild } from '@angular/core';
import {PlotScoreGraphService} from '@/main/score/plot-score-graph.service';
import { AuthService } from '@/shared/auth/auth.service';


@Component({
  selector: 'app-phq-nine',
  templateUrl: './phq-nine.component.html',
  styleUrls: ['./phq-nine.component.scss']
})
export class PhqNineComponent implements OnInit {

  getData!: any;

  @ViewChild('phqLineChart', { static: false }) private chartRef: any;

  constructor( private authService: AuthService,
    private plotScoreGraphService: PlotScoreGraphService
    ) { }

  ngOnInit() {
    this.showData();

  }
  showData() {
    this.plotScoreGraphService.getPhqScores()
      .subscribe((data) =>  {
          this.plotScoreGraphService.setDataPoints(data.data.size, data.data.scores);
          this.plotScoreGraphService.plotGraph(this.chartRef, data.data.size, 27);
      });
  }


}
