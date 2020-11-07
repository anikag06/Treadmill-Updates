import { Component, OnInit, ElementRef } from '@angular/core';
import { MICurrentStateService } from '../mi-current-state.service';
import { MIPlayService } from '../mi-play.service';
import { Level } from '../level.model';
import { PLAYING_GAMES_SCORE } from '@/app.constants';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-mi-win',
  templateUrl: './mi-win.component.html',
  styleUrls: ['./mi-win.component.scss'],
})
export class MiWinComponent implements OnInit {
  nextLevel!: Level;
  currentLevel!: Level;
  sendScoreAfterLevel2 = 0;

  constructor(
    private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private elementRef: ElementRef,
    private commonService: CommonService,
  ) {}

  ngOnInit() {
    this.nextLevel = this.getCurrentStateService.getNextLevel();
  }

  onStartNext() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // this.getCurrentStateService.continuePlaying = true;
    this.miPlayService.levelUpdate.emit();
    this.sendScoreAfterLevel2 += 1;
    this.miPlayService.sendScore += 1;
    if (this.miPlayService.sendScore === 2) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
      console.log('next');
    }
  }
}
