import { Component, OnInit, ElementRef } from '@angular/core';
declare var playnextsong: any;

@Component({
  selector: 'app-ffg-nextgame',
  templateUrl: './ffg-nextgame.component.html',
  styleUrls: ['./ffg-nextgame.component.scss']
})
export class FfgNextgameComponent implements OnInit {

  constructor(private elementRef: ElementRef) { }

  ngOnInit() {
  }

  onPlayNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    playnextsong();
  }
}
