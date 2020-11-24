import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { GamesFeedbackComponent } from '../../games-feedback/games-feedback.component';
import { CommonService } from '@/shared/common.service';
import { PLAYING_GAMES_SCORE } from '@/app.constants';
import { GamesFeedbackService } from '@/main/games/games-list/common-game/games-feedback/games-feedback.service';

@Component({
  selector: 'app-idc-win',
  templateUrl: './idc-win.component.html',
  styleUrls: ['./idc-win.component.scss'],
})
export class IdcWinComponent implements OnInit {
  feedbackSub: any;
  showLoading = false;
  sendScoreAfterLevel2 = 0;
  constructor(
    private elementRef: ElementRef,
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
    private commonService: CommonService,
    private idcGameServie: IdcGameService,
    private gamesFeedbackService: GamesFeedbackService,
  ) {}

  ngOnInit() {}

  onStartNext() {
    this.showLoading = true;
    setTimeout(() => {
      const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
      this.elementRef.nativeElement.dispatchEvent(domEvent);
    }, 500);
    this.gameService.optionStatusCount = 0;
    if (this.gameService.levelOrder === 3 && this.gameService.ask_feedback) {
      setTimeout(() => {
        this.gamesFeedbackService.idcfeedback.emit();
      }, 1500);
    }
    this.gameService.serviceCall();
    this.sendScoreAfterLevel2 += 1;
    this.idcGameServie.sendScore += 1;
    if (this.idcGameServie.sendScore === 2) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
    }
  }
}
