import { Component, OnInit, ElementRef } from '@angular/core';
import { IbgameHelpService } from '@/main/games/games-list/common-game/interpretation-bias-game/ibgame-help.service';
import {GamePlayService} from "@/main/games/shared/game-play.service";

declare var startIBGame: any;
declare var sentence_array: any;
declare var ibGameResume: any;
declare var ibGameShowTutorial: boolean;


@Component({
  selector: 'app-ib-game-instructions',
  templateUrl: './ib-game-instructions.component.html',
  styleUrls: ['./ib-game-instructions.component.scss'],
})
export class IbGameInstructionsComponent implements OnInit {
  game_element!: any;

  constructor(
    private elementRef: ElementRef,
    private ibgameHelpService: IbgameHelpService,

  ) {}

  ngOnInit() {}

  onPlayClicked() {
    console.log('ib tutorial', ibGameShowTutorial);
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    if (ibGameShowTutorial) {
      this.ibgameHelpService.showLoadingBar();
      const tid = setInterval(() => {
      if (document.readyState !== 'complete' || sentence_array.length === 0) {
          return;
        }
        clearInterval(tid);
        startIBGame();
        }, 1000);
      ibGameShowTutorial = false;
      } else {
      ibGameResume();
    }
  }
}
