import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { MatTooltip } from '@angular/material';

@Component({
  selector: 'app-idc-time',
  templateUrl: './idc-time.component.html',
  styleUrls: ['./idc-time.component.scss'],
})
export class IdcTimeComponent implements OnInit {
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;
  constructor(
    private elementRef: ElementRef,
    private gameService: IdcGameService,
  ) {}

  tooltipData!: any;
  idcExtraScore = 20;

  ngOnInit() {
    this.tooltipData =
      "You don't have sufficient points to buy extra time. Instead, click on replay.";
  }

  continuePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gameService.optionStatusCount = 0;
    this.gameService.optionStatus = '';
    this.gameService.selectedCorrectOptionsSet.clear();
    this.gameService.getUserData();
  }

  addTimePlay() {
    if (this.gameService.score < this.idcExtraScore) {
      this.tooltipShow();
    } else {
      const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
      this.elementRef.nativeElement.dispatchEvent(domEvent);
      this.gameService.timeLeft = 20;
      this.gameService.score -= this.idcExtraScore;
      // this.gameService.levelInitialise.next();
      this.gameService.resumeGame.emit();
      this.gameService.extraTimeTaken = true;
    }
  }

  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    this.showToolTip.showDelay = 300;
    this.showToolTip.hideDelay = 100;
    this.showToolTip.toggle();
    this.showToolTip.position = 'below';
  }
}
