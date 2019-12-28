import { Component, OnInit, ElementRef } from '@angular/core';
declare var playnextsong: any;
declare var ffg_next_song: any;

@Component({
  selector: 'app-ffg-nextgame',
  templateUrl: './ffg-nextgame.component.html',
  styleUrls: ['./ffg-nextgame.component.scss'],
})
export class FfgNextgameComponent implements OnInit {
  ffg_next_song!: any;
  constructor(private elementRef: ElementRef) {}

  ngOnInit() {
    this.ffg_next_song = ffg_next_song;
  }

  onPlayNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    playnextsong();
  }
}
