import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcWinComponent } from '../idc-win/idc-win.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-idc-options-popup-proceed',
  templateUrl: './idc-options-popup-proceed.component.html',
  styleUrls: ['./idc-options-popup-proceed.component.scss'],
})
export class IdcOptionsPopupProceedComponent implements OnInit {
  displayButton = 'Default Option';

  constructor(
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
    private element: ElementRef,
  ) {
    if (this.gameService.optionStatus === 'correct') {
      this.displayButton = 'Find Remaining Error';
    } else if (this.gameService.optionStatus === 'incorrect') {
      this.displayButton = 'Try again';
    } else if (this.gameService.optionStatus === 'allcorrect') {
      this.displayButton = 'Done';
    }
  }
  ngOnInit() {}
  closePopup() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
    if (this.gameService.optionStatus === 'allcorrect') {
      if (!this.gameService.extraTimeTaken) {
        this.gameService.updateDifficultyLevel();
      }
      this.gameService.extraTimeTaken = false;
      this.gameService.updateUserData();
      // level order reset
      console.log(
        'game level and total situations ',
        this.gameService.totalSituations,
        this.gameService.levelOrder,
      );
      if (this.gameService.levelOrder === this.gameService.totalSituations) {
        this.gameService.questionId = 0;
        this.gameService.getGameData();
        this.gameService.nextCall = true;
      } else {
        this.gameService.questionId++;
      }
      console.log(
        'question id',
        this.gameService.questionId,
        this.gameService.levelOrder,
      );
      this.openWinPopup();
    } else {
      this.gameService.resumeGame.emit();
    }
  }

  openWinPopup() {
    this.dialogBoxService.setDialogChild(IdcWinComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
    this.gameService.optionStatus = '';
  }
}
