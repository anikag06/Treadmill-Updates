import { Component, OnInit, ElementRef } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
declare var unsolvable_game_counter: any;
declare var lhcolorReverseGame: any;




@Component({
  selector: 'app-lhg-instructions',
  templateUrl: './lhg-instructions.component.html',
  styleUrls: ['./lhg-instructions.component.scss']
})
export class LhgInstructionsComponent implements OnInit {

  colorReverseGame!: boolean;
  game1!: boolean;
  game2!: boolean;
  game3!: boolean;

  constructor(private elementRef: ElementRef,
    private gamePlayService: GamePlayService) { }

  ngOnInit() {
  if (lhcolorReverseGame) {
    this.colorReverseGame = true;
  } else if (unsolvable_game_counter === 1) {
    this.game1 = true;
  } else if (unsolvable_game_counter === 2) {
    this.game2 = true;
  } else if (unsolvable_game_counter === 3) {
    this.game3 = true;
  }
}

  

  onPlay() {
    console.log(unsolvable_game_counter);
    const domEvent = new CustomEvent('removeOverlayEvent', { bubbles: true });
    this.elementRef.nativeElement.dispatchEvent(domEvent);
    const game2_start = document.getElementById('frog-game-row');
    if(game2_start) {
      game2_start.focus();
    }
    const game3_start = document.getElementById('box-up-game-row');
    if(game3_start) {
      game3_start.focus();
    }
  }
}
