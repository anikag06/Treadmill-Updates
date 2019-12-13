import { Component, OnInit, ElementRef } from '@angular/core';
declare var ffGRestartGame:any;

@Component({
  selector: 'app-ffg-nolife',
  templateUrl: './ffg-nolife.component.html',
  styleUrls: ['./ffg-nolife.component.scss']
})
export class FfgNolifeComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }
  onPlayAgain() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    ffGRestartGame();

  }
}
