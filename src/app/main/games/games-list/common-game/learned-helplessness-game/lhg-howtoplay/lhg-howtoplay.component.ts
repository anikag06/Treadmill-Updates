import { Component, OnInit, ElementRef } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-lhg-howtoplay',
  templateUrl: './lhg-howtoplay.component.html',
  styleUrls: ['./lhg-howtoplay.component.scss']
})
export class LhgHowtoplayComponent implements OnInit {

  constructor(private elementRef: ElementRef,
              private gamePlayService: GamePlayService) { }

  ngOnInit() {
  }

  onStart() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    this.gamePlayService.playLearnedHelplessnessGame();

  }
}