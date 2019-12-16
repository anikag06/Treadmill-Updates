import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
declare var ffGRestartGame:any;
declare var ffGResumeGame:any;

declare var ffgExtraTime:any;

@Component({
  selector: 'app-ffg-playagain',
  templateUrl: './ffg-playagain.component.html',
  styleUrls: ['./ffg-playagain.component.scss']
})
export class FfgPlayagainComponent implements OnInit {

  constructor(private elementRef: ElementRef,) { }

  ngOnInit() {
  }
  continuePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffGRestartGame();

  }

  addTimePlay() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffgExtraTime = true;
    ffGResumeGame();
  }

}
