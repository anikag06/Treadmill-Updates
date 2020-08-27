import { Component, OnInit, ElementRef } from '@angular/core';
import {IbgameHelpService} from '@/main/games/games-list/common-game/interpretation-bias-game/ibgame-help.service';

declare var startIBGame: any;
declare var sentence_array: any;


@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss'],
})
export class IbGameInstructionsComponent implements OnInit {
  game_element!: any;

  constructor(private elementRef: ElementRef,
              private ibgameHelpService: IbgameHelpService) {}

  ngOnInit() {}

  onPlayClicked() {
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    // startIBGame();
    if (
      document.readyState !== 'complete' ||
      sentence_array.length === 0
    ) {
      this.ibgameHelpService.showLoadingBar();
    }
  }
}
