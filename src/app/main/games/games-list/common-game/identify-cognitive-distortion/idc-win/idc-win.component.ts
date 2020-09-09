import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { GamesFeedbackComponent } from '../../games-feedback/games-feedback.component';
import {CommonService} from '@/shared/common.service';
import {PLAYING_GAMES_SCORE} from '@/app.constants';

@Component({
  selector: 'app-idc-win',
  templateUrl: './idc-win.component.html',
  styleUrls: ['./idc-win.component.scss'],
})
export class IdcWinComponent implements OnInit {
  feedbackSub: any;
  sendScoreAfterLevel2 = 0;
  constructor(
    private elementRef: ElementRef,
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
    private commonService: CommonService,
  ) {}

  ngOnInit() {}

  onStartNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gameService.optionStatusCount = 0;
    if (this.gameService.levelOrder === 3 && this.gameService.ask_feedback) {
      this.openFeedback();
    } else {
      this.gameService.serviceCall();
    }
    this.sendScoreAfterLevel2 += 1;
    if (this.sendScoreAfterLevel2 === 2) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
    }
  }
  openFeedback() {
    this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
  }
}
