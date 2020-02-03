import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-situation',
  templateUrl: './idc-situation.component.html',
  styleUrls: ['./idc-situation.component.scss'],
})
export class IdcSituationComponent implements OnInit {
  game!: any;
  situation!: any;

  constructor(private gameService: IdcGameService) {}

  ngOnInit() {
    this.gameService.situation.subscribe(data => {
      this.situation = data;
    });
  }
}
