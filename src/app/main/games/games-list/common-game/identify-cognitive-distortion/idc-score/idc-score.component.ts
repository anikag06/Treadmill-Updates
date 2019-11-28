import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-score',
  templateUrl: './idc-score.component.html',
  styleUrls: ['./idc-score.component.scss']
})
export class IdcScoreComponent implements OnInit {

  constructor(private gameService: IdcGameService) {}

  ngOnInit() {
  }

}
