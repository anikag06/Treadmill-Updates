import { Component, OnInit, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-idc-options-popup-proceed',
  templateUrl: './idc-options-popup-proceed.component.html',
  styleUrls: ['./idc-options-popup-proceed.component.scss']
})
export class IdcOptionsPopupProceedComponent implements OnInit {

  displayButton = "Default Option";

  constructor(private gameService: IdcGameService, public dialog: MatDialog, private element: ElementRef) {
    if (this.gameService.optionStatus == "correct")
      this.displayButton = "Find Remaining Error";
    else if (this.gameService.optionStatus == "incorrect")
      this.displayButton = "Try again";
    else if (this.gameService.optionStatus == "allcorrect")
      this.displayButton = "Next Question";
  }
  ngOnInit() {
  }
  closePopup() {
    if (this.gameService.optionStatus === "allcorrect") {
      this.gameService.questionId++;
      this.gameService.serviceCall();
    }
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

}
