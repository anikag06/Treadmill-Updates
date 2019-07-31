import { Injectable, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { map } from 'rxjs/operators';
import {GamesService} from '@/main/shared/games.service';
import {GamesAuthService} from '@/main/games/shared/games-auth.service';
import { ECGameData, ECGameFlankerTask, ECGameDiscriminationTask, ECGameUserData } from './game-play.model';


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

declare var getECScoreData: any;
declare var getECGameTaskData: any;

@Injectable({
  providedIn: 'root'
})
export class GamePlayService  {

  gameName !: string;

  // variables for ec game
  ecGameStarted = false;
  ecGameData!: any;
  ecGameTaskData!: any;
  ecGameID!: number;

  ecGameDataObject = new ECGameData(1, null, 1, 0, null, false);
  ecGameUserDataObject = new ECGameUserData(1, 0, 0, false, false, false);
  ecGameFlankerData = new ECGameFlankerTask(1, null, 0, 0, 0, 1);
  ecGameDiscriminationData = new ECGameDiscriminationTask(1, null, 0, 0);

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
    this.gamesAuthService.ecGameGetGameInfo()
      .subscribe((game_data) => {
        const length = game_data.data.length;
        this.ecGameID = game_data.data[length - 1].id;
        this.gamesAuthService.ecGameGetUserData()
          .subscribe( (data) => {
            startExecControlGame(false, data, this.ecGameID, isSoundOn);
          });
      });
  }

  helpExecControlGame(isSoundOn: any, isFirstHelpBtn: boolean) {
    if (isFirstHelpBtn) {
      this.playExecControlGame(isSoundOn);
    } else {
      closeECGame();
      this.storeDataExecControlGame();
      this.playExecControlGame(isSoundOn);
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
    this.storeDataExecControlGame();
    this.playExecControlGame(isSoundOn);
  }
  closeExecControlGame() {
    closeECGame();
    this.storeDataExecControlGame();
  }
  soundExecControlGame(isSoundOn: any) {
    if (this.ecGameStarted) {
      musicECGame(!isSoundOn);
    }
  }
  storeDataExecControlGame() {
    this.ecGameData = getECScoreData();
    this.ecGameDataObject.start_time = this.ecGameData[0];
    this.ecGameDataObject.game_id = this.ecGameData[1];
    this.ecGameDataObject.score = this.ecGameData[2];
    this.ecGameDataObject.level = this.ecGameData[3];
    this.ecGameDataObject.end_time = this.ecGameData[4];
    this.ecGameDataObject.game_over = this.ecGameData[5];

    this.ecGameUserDataObject.max_score = this.ecGameData[6];
    this.ecGameUserDataObject.coins_collected = this.ecGameData[7];
    this.ecGameUserDataObject.double_jump = this.ecGameData[8];
    this.ecGameUserDataObject.shooting_capacity = this.ecGameData[9];
    this.ecGameUserDataObject.double_coins = this.ecGameData[10];

    this.gamesAuthService.ecGameStoreGameInfo(this.ecGameDataObject)
      .subscribe(() => {
        this.gamesAuthService.ecGameUpdateUserData(this.ecGameUserDataObject)
          .subscribe((data) => {
          });
      });
  }

  storeFlankerDiscriTaskData() {
    this.ecGameTaskData = getECGameTaskData();

    this.ecGameFlankerData.game_id = this.ecGameTaskData[0];
    this.ecGameFlankerData.starting_time = this.ecGameTaskData[1];
    this.ecGameFlankerData.response_type = this.ecGameTaskData[2];
    this.ecGameFlankerData.time_elasped = this.ecGameTaskData[3];
    this.ecGameFlankerData.congruency   = this.ecGameTaskData[4];
    this.ecGameFlankerData.image_type   = this.ecGameTaskData[5];

    this.ecGameDiscriminationData.game_id = this.ecGameTaskData[0];
    this.ecGameDiscriminationData.starting_time = this.ecGameTaskData[6];
    this.ecGameDiscriminationData.response_type = this.ecGameTaskData[7];
    this.ecGameDiscriminationData.time_elasped  = this.ecGameTaskData[8];

    this.gamesAuthService.ecGameStoreFlankerData(this.ecGameFlankerData)
      .subscribe();
    this.gamesAuthService.ecGameStoreDiscriminationTaskData(this.ecGameDiscriminationData)
      .subscribe();
  }

}
