import { Component, OnInit, OnDestroy } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss']
})
export class ExecutiveControlGameComponent implements OnInit, OnDestroy {
  thisGame = 'Executive Control Game';

  constructor(
    private playGameService: GamePlayService,
  ) {    }

  ngOnInit() {

  }

  ngOnDestroy() {
    this.playGameService.closeExecControlGame();
  }

}
