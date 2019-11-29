import { Component, OnInit } from '@angular/core';
import { IdcGameService } from '../idc-game.service';

@Component({
  selector: 'app-idc-main',
  templateUrl: './idc-main.component.html',
  styleUrls: ['./idc-main.component.scss']
})
export class IdcMainComponent implements OnInit {

  constructor( private gameService:IdcGameService) { }

  ngOnInit() {
    this.gameService.getGameData();
  }

}
