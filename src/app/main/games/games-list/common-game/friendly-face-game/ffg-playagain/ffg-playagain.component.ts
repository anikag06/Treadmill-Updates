import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material';
declare var ffGRestartGame: any;
declare var ffGResumeGame: any;
declare var ffg_score: any;
declare var ffgExtraTime: any;
declare var ffg_extra_points: any;

@Component({
  selector: 'app-ffg-playagain',
  templateUrl: './ffg-playagain.component.html',
  styleUrls: ['./ffg-playagain.component.scss'],
})
export class FfgPlayagainComponent implements OnInit {

  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;
  constructor(private elementRef: ElementRef) { }
  tooltipData!: any;
  ffgExtraPoints!: number;

  ngOnInit() {
    this.tooltipData = "You don't have sufficient points to buy extra time. Instead, click on replay.";
    this.ffgExtraPoints = ffg_extra_points;
  }
  continuePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffGRestartGame();
  }

  addTimePlay() {
    if (ffg_score <= ffg_extra_points) {
      this.tooltipShow();
    } else {
      const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
      this.elementRef.nativeElement.dispatchEvent(domEvent);
      ffgExtraTime = true;
      ffGResumeGame();
    }
  }

  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    this.showToolTip.position = 'below';
    this.showToolTip.toggle();
  }
}
