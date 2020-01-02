import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcInfoComponent } from '../idc-info/idc-info.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-idc-main',
  templateUrl: './idc-main.component.html',
  styleUrls: ['./idc-main.component.scss'],
})
export class IdcMainComponent implements OnInit {
  constructor(
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
  ) {}

  ngOnInit() {
    this.gameService.getGameData();
    // this.gameService.initUserData();
  }
}
