import { Injectable,
  OnChanges, SimpleChanges, SimpleChange, } from '@angular/core';
import { map } from 'rxjs/operators';
import {GamesService} from '@/main/shared/games.service';
import {GamesAuthService} from '@/main/games/shared/games-auth.service';
import { ECGameData, ECGameFlankerTask, ECGameDiscriminationTask, ECGameUserData,
    LHGameColorReverseData, LHGameUserLevel, LHGamePerformance } from './game-play.model';


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

declare var lhGameGetColorReverseData: any;
declare var lhGameGetTask1Data: any;
declare var lhGameGetTask2Data: any;
declare var lhGameGetTask3Data: any;

// for friendly face game
declare var ffGameStart: any;
declare var ffGPauseResumeGame: any;
declare var ffGRestartGame: any;
declare var ffg_no_positive_images_clicked_level1: any;
declare var ffg_no_positive_images_clicked_level2: any;
declare var ffg_no_positive_images_clicked_level3: any;
declare var ffg_total_time_taken_level1: any;
declare var ffg_total_time_taken_level2: any;
declare var ffg_total_time_taken_level3: any;
declare var ffGameSongCounter: number;
declare var ffg_music_current_order: number;

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

  // initialising the variables
  ecGameDataObject = new ECGameData(1, null, 1, 0, null, false);
  ecGameUserDataObject = new ECGameUserData(1, 0, 0, false, false, false);
  ecGameFlankerData = new ECGameFlankerTask(1, null, 0, 0, 0, 1);
  ecGameDiscriminationData = new ECGameDiscriminationTask(1, null, 0, 0);

  // variables for lh game
  LHGAME_PAGE_SIZE = 20;
  lhGamePageNumber!: number;
  lhGameCRNumberOfLevels!: number;
  lhGameIslastData = false;
  lhGameStarted = false;
  lhGameColorReverse = new LHGameColorReverseData(0, 0, 0, false);
  lhGameUserLevel = new LHGameUserLevel(0);
  lhGamePerformanceData = new LHGamePerformance(0, 0, 0);

  // for mental imagery games

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
    let showTutorial = false;
    this.gamesAuthService.ecGameGetTaskInfo()
      .subscribe((task_info) => {
        if (task_info.flanker_tasks_count === 0) {
          showTutorial = true;
        } else if (task_info.flanker_tasks_count > 0) {
          this.gamesAuthService.ecGameGetFlankerTaskInfo()
            .subscribe( (task_count) => {
              if (task_count.flanker_tasks_count === 0) {
                showTutorial = true;
              } else {
                showTutorial = false;
              }
            });
        }
        this.gamesAuthService.ecGameGetGameInfo()
          .subscribe((game_data) => {
            const length = game_data.data.length;
            this.ecGameID = 1;            // should not be 0
            if (length > 0) {
              this.ecGameID = game_data.data[length - 1].id;
            }
            this.gamesAuthService.ecGameGetUserData()
              .subscribe( (data) => {
                startExecControlGame(showTutorial, data, this.ecGameID, isSoundOn);
              });
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
    pause_resume_game(true);
  }
  resumeExecControlGame() {
    pause_resume_game(false);
  }
  restartExecControlGame(isSoundOn: any)  {
    closeECGame();
    this.storeDataExecControlGame();
    this.playExecControlGame(isSoundOn);
  }
  closeExecControlGame() {
    closeECGame();
    if (this.ecGameStarted) {
      this.storeDataExecControlGame();
    }
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

    this.gamesAuthService.lhGameGetUserLevel()
      .subscribe((level_data) => {
        lhGameLevelCounter = level_data.level;
        this.lhGamePageNumber = Math.floor(lhGameLevelCounter / this.LHGAME_PAGE_SIZE) + 1;
        this.lhGameStarted = true;
        this.lhGameDataColorReverse(this.lhGamePageNumber, this.lhGameStarted);

        this.lhGameDataTask2();
    });
  }

  lhGameDataColorReverse(pageNumber: number, startGame: boolean) {
    this.gamesAuthService.lhGameGetColorReverseData(pageNumber, this.LHGAME_PAGE_SIZE)
      .subscribe( (game_data) => {
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
          lhGameArrayIndex = lhGameLevelCounter % this.LHGAME_PAGE_SIZE;
          lhGameStart();
          this.lhGameStarted = false;
          this.lhGameDataColorReverse(1, this.lhGameStarted);
          lhGameLevelStrings = [];
          lhGameLengths = [];
          lhGameHeights = [];
          lhGameArrayIndex = lhGameLevelCounter;
        } else {
          if ( this.lhGameIslastData === false) {
            pageNumber = pageNumber + 1;
            this.lhGameDataColorReverse(pageNumber, this.lhGameStarted);
          }
        }
      });
  }

  lhGameDataTask2() {
    this.gamesAuthService.lhGameGetUnsolvableTask2Data()
      .subscribe((task2_data) => {
        for ( let i = 0; i < task2_data.count ; i++ ) {
          lh_frog_levels.push(task2_data.results[i].game_string);
          lh_frog_lengths.push(task2_data.results[i].length);
          lh_frog_heights.push(task2_data.results[i].height);
          lh_frog_face_directions.push(task2_data.results[i].face_direction);
        }
        this.lhGameDataTask3();
      });
  }
  lhGameDataTask3() {
    this.gamesAuthService.lhGameGetUnsolvableTask3Data()
      .subscribe((task3_data) => {      // enter the data in the arrays for task 3
        for ( let i = 0; i < task3_data.count ; i++) {
          lh_ball_position_initials.push([task3_data.results[i].ball_x, task3_data.results[i].ball_y]);

          lh_box_up_grid_dimensions.push(task3_data.results[i].grid_dimensions);

          const task_3_element_length = task3_data.results[i].task_3_element.length;

          this.lhGameGetTask3Elements(task_3_element_length, task3_data, i);
        }
      } );
  }

  lhGameGetTask3Elements(task_3_element_length: number, task3_data: any, i: number) {
    const small_obstacle_info = [];
    const big_obstacle_info = [];
    for ( let j = 0; j < task_3_element_length; j++) {
      const task3_element_info = task3_data.results[i].task_3_element[j];
      const x_value = task3_element_info.x;
      const y_value =  task3_element_info.y;
      const orientation_value = task3_element_info.orientation;

      // store the value position and orientation of inner and outer arc
      if (task3_element_info.inner_element === true && task3_element_info.outer_element === false) {

        lh_inner_position_initials.push({x: x_value, y: y_value, orientation: orientation_value});

      } else if (task3_element_info.inner_element === false && task3_element_info.outer_element === true) {

        lh_outer_position_initials.push({x: x_value, y: y_value, orientation: orientation_value});

      }
      // store the position and orientation of obstacles, also check their sizes
      if (task3_element_info.inner_element === false && task3_element_info.outer_element === false) {
        if (task3_element_info.size === 'small') {
          small_obstacle_info.push({x: x_value, y: y_value, orientation: orientation_value});
        } else if (task3_element_info.size === 'big') {
          big_obstacle_info.push({x: x_value, y: y_value, orientation: orientation_value});
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

    this.gamesAuthService.lhGameStoreColorReverse(this.lhGameColorReverse)
      .subscribe ( (data) => {
        if (this.lhGameColorReverse.success) {
          this.lhGameUserLevel.level = this.lhGameColorReverse.level;
          this.gamesAuthService.lhGameUpdateUserLevel(this.lhGameUserLevel)
            .subscribe(() => { });
        }
      });
  }
  lhGameStoreTask1Data(isFirstLevel: boolean) {
    let storeTask1Data;
    storeTask1Data = lhGameGetTask1Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask1Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask1Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask1Data[2];

    const task1performance = { performance: this.lhGamePerformanceData};

    this.gamesAuthService.lhGameUpdateTask1Data(task1performance, isFirstLevel)
      .subscribe( () => { });
  }
  lhGameStoreTask2Data() {
    let storeTask2Data;
    storeTask2Data = lhGameGetTask2Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask2Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask2Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask2Data[2];
    const task2performance = { performance: this.lhGamePerformanceData};

    this.gamesAuthService.lhGameUpdateTask2Data(task2performance, storeTask2Data[3])
      .subscribe( () => { });
  }
  lhGameStoreTask3Data() {
    let storeTask3Data;
    storeTask3Data = lhGameGetTask3Data();
    this.lhGamePerformanceData.time_to_give_up = storeTask3Data[0];
    this.lhGamePerformanceData.no_of_moves = storeTask3Data[1];
    this.lhGamePerformanceData.no_of_resets = storeTask3Data[2];
    const task3performance = { performance: this.lhGamePerformanceData};

    this.gamesAuthService.lhGameUpdateTask3Data(task3performance, storeTask3Data[3])
      .subscribe( () => { });
  }
  pauseLHGame() {
    lhGamePause();
  }

  resumeLHGame() {
    lhGameResume();
  }

  // for friendly face game
// functions for getting data(images and music) are in face game component ts file, as data is loaded before the game starts
  playFriendlyFaceGame(device_type: string) {
    // data is according to user order
    ffGameSongCounter = 0;
    this.ffGameTotalPerformance(1, device_type);      // as the game starts from level 1(i.e. grid row = 1)
  }

  ffGameTotalPerformance(levelNumber: number, device_type: string) {
    this.gamesAuthService.ffGameGetTotalPerformance(levelNumber, device_type)
      .subscribe( (levelData) => {
        if (levelNumber === 1) {
          ffg_no_positive_images_clicked_level1 = levelData.total_positive_images;
          ffg_total_time_taken_level1 = levelData.total_time_taken;
          // if user plays for the first time
          if (ffg_no_positive_images_clicked_level1 == null || ffg_total_time_taken_level1 == null) {
            ffg_no_positive_images_clicked_level1 = 1;
            if (device_type === 'touch') {
              ffg_total_time_taken_level1 = 950;
            } else {
              ffg_total_time_taken_level1 = 1050;
            }
          }
          this.ffGameTotalPerformance(2, device_type);
        } else if (levelNumber === 2) {
          ffg_no_positive_images_clicked_level2 = levelData.total_positive_images;
          ffg_total_time_taken_level2 = levelData.total_time_taken;
          if (ffg_no_positive_images_clicked_level2 == null || ffg_total_time_taken_level2 == null) {
            ffg_no_positive_images_clicked_level2 = 1;
            if (device_type === 'touch') {
              ffg_total_time_taken_level2 = 1050;
            } else {
              ffg_total_time_taken_level2 = 1150;
            }
          }
          this.ffGameTotalPerformance(3, device_type);
        } else if (levelNumber === 3) {
          ffg_no_positive_images_clicked_level3 = levelData.total_positive_images;
          ffg_total_time_taken_level3 = levelData.total_positive_images;
          if (ffg_no_positive_images_clicked_level3 == null || ffg_total_time_taken_level3 == null) {
            ffg_no_positive_images_clicked_level3 = 1;
            if (device_type === 'touch') {
              ffg_total_time_taken_level3 = 1150;
            } else {
              ffg_total_time_taken_level3 = 1250;
            }
          }
          ffGameStart(device_type);
        }
      });
  }
  pauseFaceGame() {
    ffGPauseResumeGame();
  }
  resumeFaceGame() {
    ffGPauseResumeGame();
  }
  restartFaceGame() {
    ffGRestartGame();
  }
  musicFaceGame() {

  }

  // for mental imagery game
  playMentalImageryGame() {
  }
}

