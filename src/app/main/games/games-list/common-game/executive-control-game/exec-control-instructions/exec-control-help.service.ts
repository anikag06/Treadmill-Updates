import { Injectable } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Injectable({
  providedIn: 'root'
})
export class ExecControlHelpService {

  constructor(
    private gamePlayService: GamePlayService,
  ) { }

  startECGame() {
    // this.gamePlayService.storeDataExecControlGame();
    this.gamePlayService.startECGameFunc();
  }
}
