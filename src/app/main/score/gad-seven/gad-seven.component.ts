import { Component, OnInit, ViewChild } from '@angular/core';
import {PlotScoreGraphService} from '@/main/score/plot-score-graph.service';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-gad-seven',
  templateUrl: './gad-seven.component.html',
  styleUrls: ['./gad-seven.component.scss']
})
export class GadSevenComponent implements OnInit {
  getData!: any;

  @ViewChild('gadLineChart', { static: false }) private chartRef: any;

  constructor( private authService: AuthService,
    private plotScoreGraphService: PlotScoreGraphService
    ) { }

  ngOnInit() {
    this.showData();

  }
  showData() {
    this.plotScoreGraphService.getGadScores()
    .subscribe((data) =>  {
      this.plotScoreGraphService.setDataPoints(data.data.size, data.data.scores);
      this.plotScoreGraphService.plotGraph(this.chartRef, data.data.size, 21);
  });
  }


}
