import { Component, OnInit } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss']
})
export class ExecutiveControlGameComponent implements OnInit {
  thisGame = 'Executive Control Game';
  constructor(
    private playGameService: GamePlayService
  ) { }

  ngOnInit() {
    this.playGameService.setGameInfo(this.thisGame);
  }


}
