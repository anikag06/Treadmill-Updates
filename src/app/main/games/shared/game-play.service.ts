import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {GamesService} from '@/main/shared/games.service';
import {GamesAuthService} from '@/main/games/shared/games-auth.service';


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

  constructor(  private gamesService: GamesService,
    private gamesAuthService: GamesAuthService) { }

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
  playExecControlGame(isSoundOn: any) {
    this.ecGameStarted = true;
    this.gamesAuthService.ecGameGetUserData()
      .subscribe( (data) => {
        startExecControlGame(false, data, isSoundOn);
      });
  }

  helpExecControlGame(isSoundOn: any) {
    if (this.ecGameStarted) {
      closeECGame();
      startExecControlGame(true, isSoundOn);
    } else {
      this.ecGameStarted = true;
      startExecControlGame(true, isSoundOn);
    }
  }
  pauseExecControlGame() {
    pause_resume_game();
  }
  resumeExecControlGame() {
    pause_resume_game();
  }
  restartExecControlGame(isSoundOn: any)  {
    closeECGame();
    startExecControlGame(false, isSoundOn);
  }
  closeExecControlGame() {
    closeECGame();
  }
  soundExecControlGame(isSoundOn: any) {
    if (this.ecGameStarted) {
      musicECGame(!isSoundOn);
    }
  }
}
