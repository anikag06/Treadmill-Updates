import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { MatDialog } from '@angular/material/dialog';
import { IdcPopupComponent } from '../idc-popup/idc-popup.component';

@Component({
  selector: 'app-idc-options',
  templateUrl: './idc-options.component.html',
  styleUrls: ['./idc-options.component.scss']
})
export class IdcOptionsComponent implements OnInit {

  index!: any;
  game!: any;
  correct!: any;
  correctOptionsLength!: any;
  selectedCorrectOptionsLength = 0;
  correctOptionFound = -1;
  optionOne!: any;
  optionOneDistortion!: any;
  optionTwo!: any;
  optionTwoDistortion!: any;
  optionThree!: any;
  optionThreeDistortion!: any;
  optionFour!: any;
  optionFourDistortion!: any;
  optionFive!: any;
  optionFiveDistortion!: any;
  optionSix!: any;
  optionSixDistortion!: any;

  @ViewChild('checkElement', { static: false }) element!: ElementRef;

  constructor(private gameService: IdcGameService, public dialog: MatDialog, private dialogBoxService: DialogBoxService) { }

  openCustomDialog() {
    this.dialogBoxService.setDialogChild(IdcPopupComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  onOptionClick(item:any) {
    this.gameService.optionSelected = item.distortion;
    this.gameService.optionMessage = item.message;
    this.correct.forEach((correctItem:any) => {
      if (correctItem.id === item.id) {
        this.gameService.selectedCorrectOptionsSet.add(item.id);
        this.gameService.optionStatus = "correct";
        this.correctOptionFound = 1;
        this.gameService.score += 10;
      }
    });
    if (this.correctOptionFound != 1) {
      this.gameService.optionStatus = "incorrect";
    }

    if (this.gameService.selectedCorrectOptionsSet.size === this.correct.length) {
      this.gameService.selectedCorrectOptionsSet.clear();
      this.gameService.optionStatus = "allcorrect";
    }
    this.openCustomDialog();
    this.correctOptionFound = -1;
  }

  optionsCall() {
    this.gameService.optionOne.subscribe((data) => {
      this.optionOne = data;
      this.optionOneDistortion = data.distortion;
    });
    this.gameService.optionTwo.subscribe((data) => {
      this.optionTwo = data;
      this.optionTwoDistortion = data.distortion;
    });
    this.gameService.optionThree.subscribe((data) => {
      this.optionThree = data;
      this.optionThreeDistortion = data.distortion;
    });
    this.gameService.optionFour.subscribe((data) => {
      this.optionFour = data;
      this.optionFourDistortion = data.distortion;
    });
    this.gameService.optionFive.subscribe((data) => {
      this.optionFive = data;
      this.optionFiveDistortion = data.distortion;
    });
    this.gameService.optionSix.subscribe((data) => {
      this.optionSix = data;
      this.optionSixDistortion = data.distortion;
    });
    this.gameService.correct.subscribe((data) => {
      this.correct = data;
    });
  }
  ngOnInit() {
    this.optionsCall();
  }

}
