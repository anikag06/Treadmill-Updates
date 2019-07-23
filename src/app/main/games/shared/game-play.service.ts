import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {GamesService} from '@/main/shared/games.service';

// for interpretation bias game
declare var startIBGame: any;
declare var ibGamePause: any;
declare var ibGameResume: any;
declare var ibUsehints: any;
declare var ibGameHelp: any;

// for executive control game
declare var startExecControlGame: any;
declare var pause_resume_game: any;
declare var closeECGame: any;
declare var musicECGame: any;

@Injectable({
  providedIn: 'root'
})
export class GamePlayService {

  gameName !: string;
  ecGameStarted = false;

  constructor(  private gamesService: GamesService) { }

  getGameInfo(slug: string) {
    return this.gamesService.getGames()
      .pipe(
        map(games => games.find(game => game.slug === slug))
      );
  }

// functions for Interpretation Bias Game
  playIBGame() {
    startIBGame();
  }
  pauseIBGame() {
    ibGamePause();
  }
  resumeIBGame() {
    ibGameResume();
  }
  hintsIBGame() {
    ibUsehints();
  }
  helpIBGame() {
    ibGameHelp();
  }

// functions for executive control game
  playExecControlGame() {
    this.ecGameStarted = true;
    startExecControlGame(false);
  }

  helpExecControlGame() {
    if (this.ecGameStarted) {
      closeECGame();
    }
    startExecControlGame(true);
  }
  pauseExecControlGame() {
    pause_resume_game();
  }
  resumeExecControlGame() {
    pause_resume_game();
  }
  restartExecControlGame()  {
    closeECGame();
    startExecControlGame(false);
  }
  closeExecControlGame() {
    closeECGame();
  }
  soundExecControlGame() {
    musicECGame();
  }
}
