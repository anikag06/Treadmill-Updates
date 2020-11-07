import { Component, OnInit, ElementRef } from '@angular/core';
import { CommonService } from '@/shared/common.service';
import { PLAYING_GAMES_SCORE } from '@/app.constants';
import {FfgHelpService} from '@/main/games/games-list/common-game/friendly-face-game/ffg-help.service';
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
    private ffgHelpService: FfgHelpService,
  ) {}

  ngOnInit() {
    this.ffg_next_song = ffg_next_song;
  }

  onPlayNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    playnextsong();
    this.sendScoreAfterLevel2 += 1;
    this.ffgHelpService.sendScoreFfg += 1;
    console.log('send', this.ffgHelpService.sendScoreFfg);
    if (this.ffgHelpService.sendScoreFfg === 2) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
    }
  }
}
