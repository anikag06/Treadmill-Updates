import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { MatDialog } from '@angular/material/dialog';
import { IdcWinComponent } from '../idc-win/idc-win.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-idc-options-popup-proceed',
  templateUrl: './idc-options-popup-proceed.component.html',
  styleUrls: ['./idc-options-popup-proceed.component.scss']
})
export class IdcOptionsPopupProceedComponent implements OnInit {

  displayButton = "Default Option";

  constructor(private gameService: IdcGameService, 
    private dialogBoxService: DialogBoxService,
              private element: ElementRef) {
    if (this.gameService.optionStatus == "correct") {
      this.displayButton = "Find Remaining Error";
    } else if (this.gameService.optionStatus == "incorrect") {
      this.displayButton = "Try again";
    } else if (this.gameService.optionStatus == "allcorrect") {
      this.displayButton = "Done";
    }
  }
  ngOnInit() {
  }
  closePopup() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
    if (this.gameService.optionStatus === "allcorrect") {
      this.gameService.updateDifficultyLevel();
      this.gameService.updateUserData();
      console.log('question id, level order', this.gameService.questionId, this.gameService.levelOrder);
      if (this.gameService.levelOrder === 6) {
        this.gameService.questionId = 1;
        this.gameService.getGameData();
      } else {
        this.gameService.questionId++;
      }
      this.openWinPopup();
    }
  }

  openWinPopup() {
    this.dialogBoxService.setDialogChild(IdcWinComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
    this.gameService.optionStatus = '';
  }
}
