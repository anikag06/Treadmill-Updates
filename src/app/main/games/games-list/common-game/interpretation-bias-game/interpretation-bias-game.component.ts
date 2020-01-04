import { Component, OnInit, Inject, OnDestroy, HostListener, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { IBGameUserScore, IBGameUserResponse } from '@/main/games/shared/game-play.model';
import { Router } from '@angular/router';
import { IBG_SENTENCE, IBG_LESS_TIME, IBG_MORE_TIME } from '@/app.constants';
import { environment } from 'environments/environment';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { BadgesInfo } from '@/main/games/shared/game-badges.model';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
import { IbTrainingDataService } from './ib-main-training/ib-training-data.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IbMainTrainingComponent } from './ib-main-training/ib-main-training.component';
import { GameMatPropertyService } from '@/main/games/shared/game-mat-property.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { MatTooltip } from '@angular/material';

declare var IBG_MAX_WORDS_HIDDEN: number;
declare var sentence_number: any;
// for sentence and word information
declare var sentence_array: any;
declare var sentence_word_array: any;
declare var sentence_ids: any;
declare var sentence_response_array: any;
declare var sentence_word_valence: any;
declare var sentence_trick: any;
declare var sentence_order_array: any;
// for the information of scores,order,level, streak of the user
declare var ibGameScore: number;
declare var ibGamelevel: number;
declare var ibGameStreak: number;
declare var ibGameUserOrder: number;
declare var ibGameTime: any;
declare var ibGameWordsHidden: number;
declare var ibGameShowTutorial: boolean;
// for storing the score related info of the user
declare var success: any;
declare var inactivity_check_interval: any;
declare var ibGameCorrectResponse: any;
declare function getUpdatedVariables(): any;

declare var ibGDifficultyValue: any;
declare var ibGameMakeGridArray: any;
declare var ibg_word_cost: any;
declare var ibg_coordinate_cost: any;
declare var ibg_time_cost: any;
declare var ibg_score: any;

// score varibles for borrowing extra time
declare var ibg_borrow_time_score: any;
declare var ibg_borrow_time_again_score: any;
declare var ibg_btn_give_up_score: any;
declare var ibg_btn_other_sentence_score: any;


@Component({
  selector: 'app-interpretation-bias-game',
  templateUrl: './interpretation-bias-game.component.html',
  styleUrls: ['./interpretation-bias-game.component.scss'],
})
export class InterpretationBiasGameComponent implements OnInit, OnDestroy {

  @ViewChild('ibgameDiv', { static: false }) ibGameDiv!: ElementRef;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;

  NO_OF_SENTENCES_RECEIVED = 3;      // order of first sentence is 0
  // LEVEL_UP_SEN = 5;       // level up after how many sentences, here after 5 sentences;
  TOTAL_SENTENCES!: number;

  firstSentence = true;
  IBGameUserScore = new IBGameUserScore(0, 0, 0, 0, 0, 0);
  IBGameUserResponse = new IBGameUserResponse(1, false, 0);

  isLastSet = false;
  // for getting the sentence information
  INPUT_ORDER!: any;
  FIRST_SENTENCE_ORDER!: number;
  sentencesPageInUrl!: number;
  sentencePage!: any;
  index: any;

  isResponseCorrect!: boolean;

  // whether level > 0 or not
  showAllHints = false;
  wordHintCost: any;
  coordHintCost: any;
  timeHintCost: any;

  borrow_time_score: any;
  borrow_time_again_score: any;
  btn_give_up_score: any;
  btn_other_sentence_score: any;

  SEN_URL = environment.API_ENDPOINT + IBG_SENTENCE;

  No_progress_bars = 4;

  // badges info
  BRONZE_CONSTANT!: any;
  SILVER_CONSTANT!: any;
  GOLD_CONSTANT!: any;
  bronzeValue!: any;
  silverValue!: any;
  goldValue!: any;
  bronzeNumber!: number;
  silverNumber!: number;
  goldNumber!: number;
  no_correct_responses!: number;
  allBadgesInfo: BadgesInfo = new BadgesInfo(0, 0, 0, 0, 0, 0);

  difficultyValue = 5;
  tooltipData = "You don't have sufficient points.";

  constructor(private gameAuthService: GamesAuthService,
    private gamePlayService: GamePlayService,
    private badgesService: GamesBadgesService,
    private ibTrainingService: IbTrainingDataService,
    private dialogBoxService: DialogBoxService,
    private element: ElementRef,
    private matPropertyService: GameMatPropertyService,
    private loadFileService: LoadFilesService,
  ) {
  }

  @HostListener('window:iBGameSentenceDialogFun')
  showSentence() {
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.ibGameDiv.nativeElement.dispatchEvent(domEvent);
    this.dialogBoxService.setDialogChild(IbMainTrainingComponent);
  }

  @HostListener('window:toolTip')
  showTooltip() {
    this.tooltipShow();
  }

  ngOnInit() {
    this.loadFileService.loadExternalScript('assets/games/interpretation_bias_game/js/sentence_javascript.js').then(() => {
      this.scoresRelatedInfo();
      this.ibTrainingService.ibgScoreDataObservable.subscribe((res) => {
        this.storeUserScoreInfo(res);
      });
      this.initSentencesData();
      this.borrow_time_again_score = ibg_borrow_time_again_score;
      this.borrow_time_score = ibg_borrow_time_score;
      this.btn_give_up_score = ibg_btn_give_up_score;
      this.btn_other_sentence_score = ibg_btn_other_sentence_score;
    }).catch(() => { });

    // do not delete this (this.findValidSentence()) function, it is important
    // this.findValidSentence();        // this function is used to check if sentences in database are valid for generation of letters grid
  }


  ngAfterViewInit() {
    // tslint:disable-next-line: max-line-length
    const difficultyBarEle = this.element.nativeElement.querySelectorAll('.difficultyBarIBG .mat-progress-bar .mat-progress-bar-fill');
    this.matPropertyService.changeMatProperty(difficultyBarEle[0], 'mat-progress-bar-fill', 'background-color', 'black');


  }


  initSentencesData() {
    sentence_array = [];
    sentence_word_array = [];
    sentence_ids = [];
    sentence_response_array = [];
    sentence_order_array = [];
    sentence_word_valence = [];
    sentence_trick = [];
    sentence_order_array = [];
    sentence_number = 0;
  }

  sentenceInfo(pageNumber: number) {
    this.gameAuthService.ibGameGetSentencesInfo(pageNumber, this.NO_OF_SENTENCES_RECEIVED)
      .subscribe((data) => {
        if (data.next === null) {
          this.isLastSet = true;
        } else {
          this.isLastSet = false;
        }
        this.TOTAL_SENTENCES = data.count;
        this.FIRST_SENTENCE_ORDER = data.results[0].order;
        if (this.firstSentence) {
          this.index = ibGameUserOrder % this.NO_OF_SENTENCES_RECEIVED;
        }
        // if ( ibGamelevel > 0) {
        //   this.showAllHints = true;
        // }
        let i = this.index;
        while (data.results[i]) {
          sentence_ids.push(data.results[i].id);
          sentence_array.push(data.results[i].sentence_text);
          sentence_word_array.push(data.results[i].word.word);
          sentence_response_array.push(data.results[i].word.response);
          sentence_word_valence.push(data.results[i].word.valence);
          sentence_trick.push(data.results[i].trick_sentence);
          sentence_order_array.push(data.results[i].order);
          if (this.firstSentence) {
            this.currentSentencesWordsNumber(0);
          }
          i++;
        }
        if ((sentence_array.length - sentence_number === 1) && this.isLastSet) {
          this.index = 0;
          this.firstSentence = false;
          this.sentencesPageInUrl = 0;
          this.sentenceInfo(this.sentencesPageInUrl);
        } else if (sentence_array.length - sentence_number <= Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2)) {
          if (this.firstSentence) {
            this.index = 0;
            this.firstSentence = false;
            if (data.next !== null) {
              pageNumber++;
            } else if (data.next === null) {
              pageNumber = 0;
            }
            this.sentencesPageInUrl = pageNumber;
            this.sentenceInfo(this.sentencesPageInUrl);
          }
        }
      },
        (error) => {
          console.log(error);
        }
      );
  }


  scoresRelatedInfo() {
    this.gameAuthService.ibGameGetScoresInfo()
      .subscribe((data) => {
        this.INPUT_ORDER = data.data.order;
        ibGameScore = data.data.score;
        ibGamelevel = data.data.level;
        ibGameStreak = data.data.streak;
        ibGameUserOrder = this.INPUT_ORDER;
        ibGameTime = data.data.time;
        ibGameWordsHidden = data.data.words_hidden;
        ibGameShowTutorial = data.data.show_tutorial;
        this.BRONZE_CONSTANT = data.data.BRONZE_CONSTANT;
        this.SILVER_CONSTANT = data.data.SILVER_CONSTANT;
        this.GOLD_CONSTANT = data.data.GOLD_CONSTANT;
        this.no_correct_responses = data.data.no_correct_responses;

        this.index = ibGameUserOrder;
        this.wordHintCost = ibg_word_cost;
        this.coordHintCost = ibg_coordinate_cost;
        this.timeHintCost = ibg_time_cost;

        this.updateBadgesValue();
        this.difficultyBarUpdate();

        if (ibGameWordsHidden > 0) {
          this.showAllHints = true;
        } else if (ibGameWordsHidden === 0) {
          this.showAllHints = false;
        }
        this.sentencesPageInUrl = Math.floor(ibGameUserOrder / this.NO_OF_SENTENCES_RECEIVED);
        this.sentenceInfo(this.sentencesPageInUrl);
      },
        (error) => {
          // console.log(error);
        });
  }

  storeUserScoreInfo(response: any) {
    this.checkUserResponse(response);
    this.getScoreVariablesValue();

    this.gameAuthService.ibGameStoreUserScoreInfo(this.IBGameUserScore)
      .subscribe((data) => {
        if ((sentence_array.length - sentence_number === 1) && this.isLastSet) {
          this.index = 0;
          this.firstSentence = false;
          this.sentencesPageInUrl = 0;
          this.sentenceInfo(this.sentencesPageInUrl);    // call next set of sentences
        } else if (sentence_array.length - sentence_number <= Math.ceil(this.NO_OF_SENTENCES_RECEIVED / 2)) {
          this.index = 0;
          this.firstSentence = false;
          if (this.isLastSet) {
            this.sentencesPageInUrl = 0;
          } else {
            this.sentencesPageInUrl++;
          }
          this.sentenceInfo(this.sentencesPageInUrl);    // call next set of sentences
        }
        this.updateBadgesValue();
        this.difficultyBarUpdate();
      },
        (error) => {

        }
      );
    this.storeUserResponse();
  }

  getScoreVariablesValue() {
    const userData = getUpdatedVariables();                  // from sentence_javascript
    this.IBGameUserScore.order = userData[0];
    ibGameUserOrder = userData[0];                              // used for getting the sentences
    this.IBGameUserScore.level = userData[1];
    this.IBGameUserScore.score = userData[2];
    this.IBGameUserScore.streak = userData[3];
    this.IBGameUserScore.time = userData[4];
    this.IBGameUserScore.words_hidden = userData[5];

    this.IBGameUserResponse.sentence = userData[6];
    this.IBGameUserResponse.response_time = userData[7];
  }

  storeUserResponse() {
    this.gameAuthService.ibGameStoreUserResponseInfo(this.IBGameUserResponse)
      .subscribe((data) => {
      },
        (error) => {

        });
  }

  onHintClick() {
    this.gamePlayService.hintsIBGame();
  }

  nextSentenceClicked() {
    this.currentSentencesWordsNumber(sentence_number + 1);
  }

  checkUserResponse(response: any) {
    const correctResponse = ibGameCorrectResponse();
    if (response === correctResponse) {
      this.IBGameUserResponse.user_response = true;
      this.no_correct_responses++;
    } else if (response !== correctResponse) {
      this.IBGameUserResponse.user_response = false;
    }
  }

  difficultyBarUpdate() {
    if (ibGameTime === IBG_MORE_TIME) {
      ibGDifficultyValue = ((2 * ibGameWordsHidden + 1) / (2 * (IBG_MAX_WORDS_HIDDEN + 1))) * 100;
    } else if (ibGameTime === IBG_LESS_TIME) {
      ibGDifficultyValue = ((2 * ibGameWordsHidden + 2) / (2 * (IBG_MAX_WORDS_HIDDEN + 1))) * 100;
    }
    this.difficultyValue = ibGDifficultyValue;
  }

  updateBadgesValue() {
    this.allBadgesInfo = this.badgesService.getBadgesInfo(this.BRONZE_CONSTANT,
      this.SILVER_CONSTANT, this.GOLD_CONSTANT,
      this.no_correct_responses);
    this.bronzeNumber = this.allBadgesInfo.bronzeBadges;
    this.silverNumber = this.allBadgesInfo.silverBadges;
    this.goldNumber = this.allBadgesInfo.goldBadges;

    this.bronzeValue = this.allBadgesInfo.bronzePercent;
    this.silverValue = this.allBadgesInfo.silverPercent;
    this.goldValue = this.allBadgesInfo.goldPercent;
  }

  currentSentencesWordsNumber(num: number) {
    const sentence = sentence_array[num];
    const words = sentence.split(' ');
    this.No_progress_bars = Math.ceil(words.length * 0.50);
  }

  updateProgressBar(element: HTMLElement) {
    const height = Math.ceil(100 / this.No_progress_bars);
    element.style.height = (height) + '%';
  }

  getArray(i: number) {
    return new Array(i);
  }

  // this is for checking if the grid can be formed by using the given sentences
  findValidSentence() {
    this.getAllSentences(0);
  }

  getAllSentences(pageNumber: number) {
    let grid_formed;
    this.gameAuthService.ibGameGetSentencesInfo(pageNumber, 31)     // here 31 is the page size
      .subscribe((data) => {
        let i = 0;
        while (data.results[i]) {
          grid_formed = ibGameMakeGridArray(data.results[i].sentence_text);
          i++;
        }
        if (data.next != null) {
          pageNumber = pageNumber + 1;
          this.getAllSentences(pageNumber);
        }
      });
  }

  ngOnDestroy() {
    clearInterval(inactivity_check_interval);
  }

  forTooltip($event: any) {
    $event.stopPropagation();
    //Another instructions
    this.tooltipShow();
  }
  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    // this.showToolTip.position = 'above';
    this.showToolTip.showDelay = 100;
    this.showToolTip.hideDelay = 1000;
    this.showToolTip.toggle();
  }

}
