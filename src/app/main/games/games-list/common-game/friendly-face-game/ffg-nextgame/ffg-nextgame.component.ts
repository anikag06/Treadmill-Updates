import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '@/shared/common.service';
import { PLAYING_GAMES_SCORE } from '@/app.constants';
declare var playnextsong: any;
declare var ffg_next_song: any;

@Component({
  selector: 'app-ffg-nextgame',
  templateUrl: './ffg-nextgame.component.html',
  styleUrls: ['./ffg-nextgame.component.scss'],
})
export class FfgNextgameComponent implements OnInit {
  ffg_next_song!: any;
  sendScoreAfterLevel2 = 0;
  constructor(
    private elementRef: ElementRef,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.ffg_next_song = ffg_next_song;
  }

  onPlayNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    playnextsong();
    this.sendScoreAfterLevel2 += 1;
    if (this.sendScoreAfterLevel2 === 2) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
    }
  }
}
