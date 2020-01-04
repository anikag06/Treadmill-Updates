import { Component, OnInit, ElementRef, HostListener, ViewChild } from '@angular/core';
import { MatTooltip } from '@angular/material';
declare var ffGRestartGame: any;
declare var ffGResumeGame: any;
declare var ffg_score: any;
declare var ffgExtraTime: any;

@Component({
  selector: 'app-ffg-playagain',
  templateUrl: './ffg-playagain.component.html',
  styleUrls: ['./ffg-playagain.component.scss'],
})
export class FfgPlayagainComponent implements OnInit {

  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;
  constructor(private elementRef: ElementRef) { }
  tooltipData!: any;

  ngOnInit() {
    this.tooltipData = "You don't have sufficient points to buy extra time. Instead, click on replay.";
  }
  continuePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffGRestartGame();
  }

  addTimePlay() {
    if (ffg_score <= 20) {
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
