import { EventEmitter, Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { GamesService } from '@/main/shared/games.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import {
  ECGameData,
  ECGameFlankerTask,
  ECGameDiscriminationTask,
  ECGameUserData,
  LHGameColorReverseData,
  LHGameUserLevel,
  LHGamePerformance,
  LHGameOverallData,
} from './game-play.model';
import { GamesBadgesService } from './games-badges.service';
import { BadgesConstants } from './game-badges.model';
// tslint:disable-next-line:max-line-length
import { IbGameInstructionsComponent } from '../games-list/common-game/interpretation-bias-game/ib-game-instructions/ib-game-instructions.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { MiInstructionsComponent } from '../games-list/common-game/mental-imagery/mi-instructions/mi-instructions.component';
// tslint:disable-next-line:max-line-length
import { ExecControlInstructionsComponent } from '../games-list/common-game/executive-control-game/exec-control-instructions/exec-control-instructions.component';
import { MIPlayService } from '../games-list/common-game/mental-imagery/mi-play.service';
import { MICurrentStateService } from '../games-list/common-game/mental-imagery/mi-current-state.service';
// tslint:disable-next-line:max-line-length
import { IdcInstructionsComponent } from '../games-list/common-game/identify-cognitive-distortion/idc-instructions/idc-instructions.component';
import { FfgInstructionsComponent } from '../games-list/common-game/friendly-face-game/ffg-instructions/ffg-instructions.component';
import { FfgHelpService } from '../games-list/common-game/friendly-face-game/ffg-help.service';
import { IdcGameService } from '../games-list/common-game/identify-cognitive-distortion/idc-game.service';

// for interpretation bias game
declare var startIBGame: any;
declare var ibGamePause: any;
declare var ibGameResume: any;
declare var ibUsehints: any;
declare var ibGameHelp: any;
declare var ibGameShowTutorial: boolean;

// for attribution game
declare var AttributeGame: any;
declare var playAllObject: any;
declare var pauseAllObject: any;
declare var startGame: any;
declare var check: any;

// for executive control game
declare var startExecControlGame: any;
declare var pauseECGame: any;
declare var resumeECGame: any;
declare var closeECGame: any;
declare var musicECGame: any;

declare var getECScoreData: any;
declare var getECGameTaskData: any;

// for learned helplessness game
declare var lhGameStart: any;
declare var lhGamePause: any;
declare var lhGameResume: any;
declare var lhGameLevelStrings: any;
declare var lhGameHeights: any;
declare var lhGameLengths: any;
declare var lhGameLevelCounter: any;
declare var lhGameArrayIndex: number;
declare var lh_frog_levels: any;
declare var lh_frog_lengths: any;
declare var lh_frog_heights: any;
declare var lh_frog_face_directions: any;
declare var lh_inner_position_initials: any;
declare var lh_outer_position_initials: any;
declare var lh_small_obstacle_initials: any;
declare var lh_big_obstacle_initials: any;
declare var lh_ball_position_initials: any;
declare var lh_box_up_grid_dimensions: any;
declare var lhg_first_puzzle: any;

declare var lhGameGetColorReverseData: any;
declare var lhGameGetTask1Data: any;
declare var lhGameGetTask2Data: any;
declare var lhGameGetTask3Data: any;
declare var lhgOverallData: any;

// for friendly face game
declare var ffGameStart: any;
declare var ffGPauseGame: any;
declare var ffGResumeGame: any;
declare var ffGRestartGame: any;
declare var ffg_no_positive_images_clicked_level1: any;
declare var ffg_no_positive_images_clicked_level2: any;
declare var ffg_no_positive_images_clicked_level3: any;
declare var ffg_total_time_taken_level1: any;
declare var ffg_total_time_taken_level2: any;
declare var ffg_total_time_taken_level3: any;
declare var ffGameSongCounter: number;
declare var ffg_music_current_order: number;
declare var fillMusicBar: any;
declare var toneNumber: number;
declare var ffGamePlay: any;
declare var ffg_music: any;

// for mental imagery game
declare var miGameShowTutorial: boolean;

@Injectable({
  providedIn: 'root',
})
export class GamePlayService {
  gameName!: string;

  // variables for ec game
  ecGameStarted = false;
  ecGameSoundOn = true;
  ecGameShowTutorial!: boolean;
  ecGameData!: any;
  ecGameTaskData!: any;
  ecGameUserData!: any;
  ecGameID!: number;

  // initialising the variables
  ecGameDataObject = new ECGameData(1, null, 1, 0, false, 0);
  ecGameUserDataObject = new ECGameUserData(1, 0, 0, false, false, false);
  ecGameFlankerData = new ECGameFlankerTask(1, null, 0, 0, 0, 1);
  ecGameDiscriminationData = new ECGameDiscriminationTask(1, null, 0, 0);

  ecGameBadgeConstants = new BadgesConstants(0, 0, 0);

  // variables for lh game
  lhGameIslastData = false;
  lhGameStarted = false;
  lhGameColorReverse = new LHGameColorReverseData(0, 0, 0, false);
  lhGameUserLevel = new LHGameUserLevel(0);
  lhGamePerformanceData = new LHGamePerformance(0, 0, 0);
  lhGameOverallData = new LHGameOverallData(0, false, false);
  lhgShowSummary!: boolean;
  lhGameSub!: any;

  game!: any;

  // for mental imagery games

  // for friendly face game
  ffg_show_tutorial!: any;

  constructor(
    private gamesService: GamesService,
    private gamesAuthService: GamesAuthService,
    private gameBadgeService: GamesBadgesService,
    private dialogBoxService: DialogBoxService,
    private miPlayService: MIPlayService,
    private miCurrentStateService: MICurrentStateService,
    private ffghelpService: FfgHelpService,
    private idcGameService: IdcGameService,
  ) {}

  getGameInfo(slug: string) {
    return this.gamesService
      .getGames()
      .pipe(map(games => games.find(game => game.slug === slug)));
  }

  // functions for Interpretation Bias Game
  playIBGame(gameDivElement: any) {
    if (ibGameShowTutorial === true) {
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      gameDivElement.nativeElement.dispatchEvent(domEvent);
      this.helpIBGame();
    } else {
      startIBGame();
    }
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
    this.dialogBoxService.setDialogChild(IbGameInstructionsComponent);
    ibGameHelp();
  }

  // for attribution game

  playAttributionStyleGame() {
    // tslint:disable-next-line:no-unused-expression
    this.game = new AttributeGame();
    if (this.game.scene.isActive('QuestionAndAnswer')) {
      console.log(this.game.scene.isActive('QuestionAndAnswer'));
        console.log(this.gamesAuthService.atGetAnswers());
    }
    console.log((this.game));
  }

  restartAttributionStyleGame() {
    this.game.scene.scenes[5].restart();
  }

  resumeAttributionStyleGame() {
    this.game.scene.scenes[5].playAllObject();
  }

  pauseAttributionStyleGame() {
    // tslint:disable-next-line:no-unused-expression
    this.game.scene.scenes[5].pauseAllObject();
    // if (this.game.scene.isActive('ScoreDisplay')) {
    //   this.game.scene.scenes[5].pause();
    // } else if (this.game.scene.isActive('QuestionAndAnswer')) {
    //   this.game.scene.scenes[5].pause();
    // }
  }

  // functions for executive control game
  playExecControlGame(isSoundOn: any, gamePauseDiv: any, helpClicked: boolean) {
    this.gamesAuthService.ecGameGetGameInfo().subscribe(game_data => {
      this.ecGameID = game_data.data.id;
      this.gamesAuthService.ecGameGetUserData().subscribe(user_data => {
        this.ecGameUserData = user_data;
        this.ecGameShowTutorial = user_data.data.show_tutorial;

        if (this.ecGameShowTutorial) {
          this.ecGameSoundOn = isSoundOn;
          const domEvent = new CustomEvent('overlayCalledEvent', {
            bubbles: true,
          });
          gamePauseDiv.nativeElement.dispatchEvent(domEvent);
        } else if (!this.ecGameShowTutorial && !helpClicked) {
          this.ecGameSoundOn = isSoundOn;
          this.startECGameFunc();
        } else if (helpClicked) {
          this.ecGameShowTutorial = true;
        }
      });
    });
  }
  // this function calls the startGame function of executive control game in javascipt
  startECGameFunc() {
    const user_data = this.ecGameUserData;

    const badgeInfo = this.gameBadgeService.getBadgesInfo(
      user_data.data.BRONZE_CONSTANT,
      user_data.data.SILVER_CONSTANT,
      user_data.data.GOLD_CONSTANT,
      user_data.data.no_correct_responses,
    );

    const total_correct_responses = user_data.data.no_correct_responses;
    this.ecGameBadgeConstants.bronzeConstant = user_data.data.BRONZE_CONSTANT;
    this.ecGameBadgeConstants.silverConstant = user_data.data.SILVER_CONSTANT;
    this.ecGameBadgeConstants.goldConstant = user_data.data.GOLD_CONSTANT;

    startExecControlGame(
      this.ecGameShowTutorial,
      user_data,
      this.ecGameID,
      this.ecGameSoundOn,
      badgeInfo,
      total_correct_responses,
      this.ecGameBadgeConstants,
    );
    this.ecGameStarted = true;
  }

  helpExecControlGame(isSoundOn: any, gamePauseDiv: any) {
    this.ecGameSoundOn = isSoundOn;
    this.storeDataExecControlGame();
    // get new updated data on clicking help to start new game from the help dialog
    this.playExecControlGame(isSoundOn, gamePauseDiv, true);
  }
  pauseExecControlGame() {
    pauseECGame();
  }
  resumeExecControlGame() {
    resumeECGame();
  }
  restartExecControlGame(isSoundOn: any, gamePauseDiv: any) {
    if (this.ecGameStarted) {
      this.closeExecControlGame();
      this.playExecControlGame(isSoundOn, gamePauseDiv, false);
    }
  }

  closeExecControlGame() {
    if (this.ecGameStarted) {
      this.storeDataExecControlGame();
      closeECGame();
    }
  }
  soundExecControlGame(isSoundOn: any) {
    if (this.ecGameStarted) {
      musicECGame(!isSoundOn);
    }
  }
  storeDataExecControlGame() {
    if (this.ecGameStarted) {
      this.ecGameData = getECScoreData();
      this.ecGameDataObject.lives_renewed = this.ecGameData[0];
      this.ecGameDataObject.id = this.ecGameData[1];
      this.ecGameDataObject.score = this.ecGameData[2];
      this.ecGameDataObject.level = this.ecGameData[3];
      this.ecGameDataObject.end_time = this.ecGameData[4];
      this.ecGameDataObject.game_over = this.ecGameData[5];

      this.ecGameUserDataObject.max_score = this.ecGameData[6];
      this.ecGameUserDataObject.coins_collected = this.ecGameData[7];
      this.ecGameUserDataObject.double_jump = this.ecGameData[8];
      this.ecGameUserDataObject.shooting_capacity = this.ecGameData[9];
      this.ecGameUserDataObject.double_coins = this.ecGameData[10];

      this.gamesAuthService
        .ecGameStoreGameInfo(this.ecGameDataObject)
        .subscribe(() => {});
      this.gamesAuthService
        .ecGameUpdateUserData(this.ecGameUserDataObject)
        .subscribe(data => {});
    }
  }

  storeFlankerDiscriTaskData() {
    this.ecGameTaskData = getECGameTaskData();
    this.ecGameFlankerData.game_id = this.ecGameTaskData[0];
    this.ecGameFlankerData.starting_time = this.ecGameTaskData[1];
    this.ecGameFlankerData.response_type = this.ecGameTaskData[2];
    this.ecGameFlankerData.time_elapsed = this.ecGameTaskData[3];
    this.ecGameFlankerData.congruency = this.ecGameTaskData[4];
    this.ecGameFlankerData.image_type = this.ecGameTaskData[5];

    this.ecGameDiscriminationData.starting_time = this.ecGameTaskData[6];
    this.ecGameDiscriminationData.response_type = this.ecGameTaskData[7];
    this.ecGameDiscriminationData.time_elapsed = this.ecGameTaskData[8];

    this.gamesAuthService
      .ecGameStoreFlankerData(this.ecGameFlankerData)
      .subscribe((flanker_data: any) => {
        this.ecGameDiscriminationData.flanker_task_id = flanker_data.data.id;
        this.gamesAuthService
          .ecGameStoreDiscriminationTaskData(this.ecGameDiscriminationData)
          .subscribe(dis_data => {});
      });
  }

  // for learned helplessness game

  playLearnedHelplessnessGame() {
    lhGameLevelStrings = [];
    lhGameLengths = [];
    lhGameHeights = [];
    lh_frog_face_directions = [];
    lh_frog_heights = [];
    lh_frog_lengths = [];
    lh_frog_levels = [];

    lh_inner_position_initials = [];
    lh_outer_position_initials = [];
    lh_small_obstacle_initials = [];
    lh_big_obstacle_initials = [];
    lh_ball_position_initials = [];
    lh_box_up_grid_dimensions = [];
    lhg_first_puzzle = true;

    this.lhGameSub = this.gamesAuthService
      .lhGameGetUserLevel()
      .subscribe(level_data => {
        console.log('level data', level_data);
        lhGameLevelCounter = level_data.level;
        this.lhGameStarted = true;
        this.lhGameDataColorReverse(this.lhGameStarted);

        this.lhGameDataTask2();
      });
  }

  // tslint:disable-next-line:no-shadowed-variable
  lhGameDataColorReverse(startGame: boolean) {
    this.gamesAuthService
      .lhGameGetColorReverseData()
      .subscribe((game_data: any) => {
        console.log('game data', game_data);
        if (game_data.next === null) {
          this.lhGameIslastData = true;
        }
        let i = 0;
        while (game_data.results[i]) {
          lhGameLevelStrings.push(game_data.results[i].game_string);
          lhGameLengths.push(game_data.results[i].length);
          lhGameHeights.push(game_data.results[i].height);
          i++;
        }
        if (startGame === true) {
          lhGameArrayIndex = lhGameLevelCounter;
          lhGameStart();
          this.lhGameStarted = false;
          this.lhGameDataColorReverse(this.lhGameStarted);
          lhGameLevelStrings = [];
          lhGameLengths = [];
          lhGameHeights = [];
        }
      });
  }

  lhGameDataTask2() {
    this.gamesAuthService
      .lhGameGetUnsolvableTask2Data()
      .subscribe(task2_data => {
        for (let i = 0; i < task2_data.count; i++) {
          lh_frog_levels.push(task2_data.results[i].game_string);
          lh_frog_lengths.push(task2_data.results[i].length);
          lh_frog_heights.push(task2_data.results[i].height);
          lh_frog_face_directions.push(task2_data.results[i].face_direction);
        }
        this.lhGameDataTask3();
      });
  }
  lhGameDataTask3() {
    this.gamesAuthService
      .lhGameGetUnsolvableTask3Data()
      .subscribe(task3_data => {
        // enter the data in the arrays for task 3
        for (let i = 0; i < task3_data.count; i++) {
          lh_ball_position_initials.push([
            task3_data.results[i].ball_x,
            task3_data.results[i].ball_y,
          ]);

          lh_box_up_grid_dimensions.push(task3_data.results[i].grid_dimensions);

          const task_3_element_length =
            task3_data.results[i].task_3_element.length;

          this.lhGameGetTask3Elements(task_3_element_length, task3_data, i);
        }
      });
  }

  lhGameGetTask3Elements(
    task_3_element_length: number,
    task3_data: any,
    i: number,
  ) {
    const small_obstacle_info = [];
    const big_obstacle_info = [];
    for (let j = 0; j < task_3_element_length; j++) {
      const task3_element_info = task3_data.results[i].task_3_element[j];
      const x_value = task3_element_info.x;
      const y_value = task3_element_info.y;
      const orientation_value = task3_element_info.orientation;

      // store the value position and orientation of inner and outer arc
      if (
        task3_element_info.inner_element === true &&
        task3_element_info.outer_element === false
      ) {
        lh_inner_position_initials.push({
          x: x_value,
          y: y_value,
          orientation: orientation_value,
        });
      } else if (
        task3_element_info.inner_element === false &&
        task3_element_info.outer_element === true
      ) {
        lh_outer_position_initials.push({
          x: x_value,
          y: y_value,
          orientation: orientation_value,
        });
      }
      // store the position and orientation of obstacles, also check their sizes
      if (
        task3_element_info.inner_element === false &&
        task3_element_info.outer_element === false
      ) {
        if (task3_element_info.size === 'small') {
          small_obstacle_info.push({
            x: x_value,
            y: y_value,
            orientation: orientation_value,
          });
        } else if (task3_element_info.size === 'big') {
          big_obstacle_info.push({
            x: x_value,
            y: y_value,
            orientation: orientation_value,
          });
        }
      }
    }
    lh_small_obstacle_initials.push(small_obstacle_info);
    lh_big_obstacle_initials.push(big_obstacle_info);
  }

  lhGameColorReverseStoreData() {
    let storeColorReverseData;
    storeColorReverseData = lhGameGetColorReverseData();
    this.lhGameColorReverse.level = storeColorReverseData[0];
    this.lhGameColorReverse.time_spent = storeColorReverseData[1];
    this.lhGameColorReverse.no_of_moves = storeColorReverseData[2];
    this.lhGameColorReverse.success = storeColorReverseData[3];

    this.gamesAuthService
      .lhGameStoreColorReverse(this.lhGameColorReverse)
      .subscribe(data => {
        if (this.lhGameColorReverse.success) {
          this.lhGameUserLevel.level = this.lhGameColorReverse.level;
          this.gamesAuthService
            .lhGameUpdateUserLevel(this.lhGameUserLevel)
            .subscribe(() => {});
        }
      });
  }

  lhGameStoreOverallData(userData: any) {
    let storeOverallData;
    storeOverallData = lhgOverallData();
    this.lhGameOverallData.end_time = storeOverallData[0];
    this.lhGameOverallData.game_completed = storeOverallData[1];
    this.lhGameOverallData.all_levels_completed = storeOverallData[2];

    this.gamesAuthService
      .lhGameUpdateOverallData(this.lhGameOverallData)
      // tslint:disable-next-line:no-shadowed-variable
      .subscribe(userData => {
        return;
      });
  }
  lhGameStoreTask1Data(isFirstLevel: boolean) {
    let storeTask1Data;
    storeTask1Data = lhGameGetTask1Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask1Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask1Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask1Data[2];

    const task1performance = { performance: this.lhGamePerformanceData };

    this.gamesAuthService
      .lhGameUpdateTask1Data(task1performance, isFirstLevel)
      .subscribe(() => {});
    console.log('task1 data', task1performance);
  }
  lhGameStoreTask2Data() {
    let storeTask2Data;
    storeTask2Data = lhGameGetTask2Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask2Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask2Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask2Data[2];
    const task2performance = { performance: this.lhGamePerformanceData };

    this.gamesAuthService
      .lhGameUpdateTask2Data(task2performance, storeTask2Data[3])
      .subscribe(() => {});
  }
  lhGameStoreTask3Data() {
    let storeTask3Data;
    storeTask3Data = lhGameGetTask3Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask3Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask3Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask3Data[2];
    const task3performance = { performance: this.lhGamePerformanceData };

    this.gamesAuthService
      .lhGameUpdateTask3Data(task3performance, storeTask3Data[3])
      .subscribe(() => {});
  }
  pauseLHGame() {
    lhGamePause();
  }

  resumeLHGame() {
    lhGameResume();
  }

  // for friendly face game
  // functions for getting data(images and music) are in face game component ts file, as data is loaded before the game starts
  playFriendlyFaceGame(device_type: string, gameDivElement: any) {
    // data is according to user order
    ffGameSongCounter = 0;
    this.ffGamePlay(device_type, gameDivElement);
  }

  fillMusicBar() {
    toneNumber = toneNumber + 10;
  }

  ffGamePlay(device_type: string, gameDivElement: any) {
    console.log('Show Tutorial', this.ffg_show_tutorial);
    if (this.ffg_show_tutorial) {
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      gameDivElement.nativeElement.dispatchEvent(domEvent);
      this.dialogBoxService.setDialogChild(FfgInstructionsComponent);
    } else {
      this.ffghelpService.showLoadingBar();
    }

    const tid = setInterval(() => {
      if (document.readyState !== 'complete') {
        return;
      }
      clearInterval(tid);
      // function to be called when document is ready
      ffGameStart(device_type);
    }, 100);
  }
  pauseFaceGame() {
    ffGPauseGame();
  }
  resumeFaceGame() {
    ffGResumeGame();
  }
  restartFaceGame() {
    ffGRestartGame();
  }
  musicFaceGame() {}
  helpFFGGame() {
    this.dialogBoxService.setDialogChild(FfgInstructionsComponent);
    this.resumeFaceGame();
  }

  // for mental imagery game
  playMentalImageryGame(gameDivElement: any) {
    if (this.miCurrentStateService.showTutorial === true) {
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      gameDivElement.nativeElement.dispatchEvent(domEvent);
      this.helpMIGame();
    } else {
      this.miPlayService.startPlaying.emit();
    }
  }
  helpMIGame() {
    this.dialogBoxService.setDialogChild(MiInstructionsComponent);
  }
  // for cognitive distortion game
  playIdentifyCognitiveDistortionGame(gameDivElement: any) {
    if (this.idcGameService.showTutorial) {
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      gameDivElement.nativeElement.dispatchEvent(domEvent);
      this.helpIDCGame();
    } else {
      this.idcGameService.startPlaying();
    }
  }
  helpIDCGame() {
    this.dialogBoxService.setDialogChild(IdcInstructionsComponent);
  }
}
