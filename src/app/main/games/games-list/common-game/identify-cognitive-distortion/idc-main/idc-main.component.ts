import {Component, OnInit, ElementRef, ViewChild, Input} from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcInfoComponent } from '../idc-info/idc-info.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { GamesFeedbackService } from '../../games-feedback/games-feedback.service';

@Component({
  selector: 'app-idc-main',
  templateUrl: './idc-main.component.html',
  styleUrls: ['./idc-main.component.scss'],
})
export class IdcMainComponent implements OnInit {
  feedbackSub: any;
  constructor(
    private gameService: IdcGameService,
    private gamesFeedbackService: GamesFeedbackService,
  ) {}

  @Input() blurred!: boolean;
  ngOnInit() {
    this.gameService.getGameData();
    // this.gameService.initUserData();
    this.feedbackSub = this.gamesFeedbackService.feedback.subscribe(() => {
      this.gameService.serviceCall();
      console.log('GAME FEEDBACK');
    });
  }
}
