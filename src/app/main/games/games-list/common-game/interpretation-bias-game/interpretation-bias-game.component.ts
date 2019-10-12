import { Component, OnInit, Inject, OnDestroy, HostListener } from '@angular/core';
import { UserScoreData, UserResponseData } from '@/main/games/shared/game-play.model';
import { Router } from '@angular/router';
import { IBG_SENTENCE } from '@/app.constants';
import { environment } from 'environments/environment';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { BadgesInfo } from '@/main/games/shared/game-badges.model';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
import { IbDialogsService } from './ib-dialogs.service';
import { IbTrainingDataService } from './ib-main-training/ib-training-data.service';

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
// for storing the score related info of the user
declare var success: any;
declare var inactivity_check_interval: any;
declare var ibGameCorrectResponse: any;
declare function getUpdatedVariables(): any;

declare var ibGameMakeGridArray: any;

@Component({
  selector: 'app-interpretation-bias-game',
  templateUrl: './interpretation-bias-game.component.html',
  styleUrls: ['./interpretation-bias-game.component.scss'],
})
export class InterpretationBiasGameComponent implements OnInit, OnDestroy {

  NO_OF_SENTENCES_RECEIVED = 5;      // order of first sentence is 0
  // LEVEL_UP_SEN = 5;       // level up after how many sentences, here after 5 sentences;
  TOTAL_SENTENCES!: number;

  firstSentence = true;
  userScoreData = new UserScoreData(ibGameUserOrder, ibGamelevel, ibGameScore, ibGameStreak, ibGameTime, ibGameWordsHidden);
  userResponseData = new UserResponseData(1, false, 0) ;

  // for getting the sentence information
  INPUT_ORDER!: any;
  FIRST_SENTENCE_ID!: number;
  sentencesPageInUrl!: number;
  sentencePage!: any;
  index = ibGameUserOrder;

  isResponseCorrect!: boolean;

  // whether level > 0 or not
  showAllHints = false;

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

  constructor( private gameAuthService: GamesAuthService,
    private router: Router,
    private gamePlayService: GamePlayService,
    private badgesService: GamesBadgesService,
    private ibDialogService: IbDialogsService,
    private ibTrainingService: IbTrainingDataService
  ) {
  }

  @HostListener('window:iBGameSentenceDialogFun')
  showSentence() {
    this.ibDialogService.openSentenceWordDialog();
  }

  ngOnInit() {
    this.scoresRelatedInfo();

    this.ibTrainingService.ibgScoreDataObservable.subscribe((res) => {
      console.log('its done', res);
      this.storeUserScoreInfo(res);
    });
    // do not delete this (this.findValidSentence()) function, it is important
    // this.findValidSentence();        // this function is used to check if sentences in database are valid for generation of letters grid
  }

  sentenceInfo(pageNumber: number) {
    this.gameAuthService.ibGameGetSentencesInfo(pageNumber, this.NO_OF_SENTENCES_RECEIVED)
      .subscribe( (data) => {
        this.TOTAL_SENTENCES = data.count;
        this.FIRST_SENTENCE_ID = data.results[0].id;
        if (this.firstSentence) {
          this.index = ibGameUserOrder % this.NO_OF_SENTENCES_RECEIVED ;
        }
        if ( ibGamelevel > 0) {
          this.showAllHints = true;
        }
        let i = this.index;
        while (data.results[i]) {
          sentence_ids.push(data.results[i].id);
          sentence_array.push(data.results[i].sentence_text);
          sentence_word_array.push(data.results[i].word.word);
          sentence_response_array.push(data.results[i].word.response);
          sentence_word_valence.push(data.results[i].word.valence);
          sentence_trick.push(data.results[i].trick_sentence);
          sentence_order_array.push(data.results[i].order);

          if (ibGameUserOrder >= (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {
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
          i++;
        }
        if (this.firstSentence) {
          this.currentSentencesWordsNumber(0);
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
          if (data.status === true) {
            this.INPUT_ORDER = data.data.order;
            ibGameScore = data.data.score;
            ibGamelevel = data.data.level;
            ibGameStreak = data.data.streak;
            ibGameUserOrder = this.INPUT_ORDER;
            ibGameTime = data.data.time;
            ibGameWordsHidden = data.data.words_hidden;
            this.BRONZE_CONSTANT = data.data.BRONZE_CONSTANT;
            this.SILVER_CONSTANT = data.data.SILVER_CONSTANT;
            this.GOLD_CONSTANT = data.data.GOLD_CONSTANT;
            this.no_correct_responses = data.data.no_correct_responses;
          } else {
            this.initialiseVar();
          }
          this.updateBadgesValue();

          if ( ibGameWordsHidden > 0 ) {
            this.showAllHints = true;
          } else if (ibGameWordsHidden === 0) {
            this.showAllHints = false;
          }
          this.sentencesPageInUrl = Math.floor(ibGameUserOrder / this.NO_OF_SENTENCES_RECEIVED);
          this.sentenceInfo(this.sentencesPageInUrl);
        },
        (error) => {
          // console.log(error);
        }
      );
  }
  initialiseVar() {
    this.INPUT_ORDER = 0;
    ibGameScore = 0;
    ibGamelevel = 0;
    ibGameStreak = 0;
    ibGameUserOrder = this.INPUT_ORDER;
    ibGameTime = 150;
    ibGameWordsHidden = 0;
    // these values should come from database, need to check this
    this.BRONZE_CONSTANT = 4;
    this.SILVER_CONSTANT = 10;
    this.GOLD_CONSTANT = 26;
    this.no_correct_responses = 0;
  }
  storeUserScoreInfo(response: any) {
    this.checkUserResponse(response);
    this.getScoreVariablesValue();
    this.gameAuthService.ibGameStoreUserScoreInfo(this.userScoreData)
      .subscribe( (data) => {
          if (ibGameUserOrder === (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {
            this.index = 0;
            this.firstSentence = false;
            this.sentencesPageInUrl++;
            this.sentenceInfo(this.sentencesPageInUrl);    // call next set of sentences
          }
          this.updateBadgesValue();
        },
        (error) => {

        }
      );
      this.storeUserResponse();
  }
  getScoreVariablesValue() {
    const userData = getUpdatedVariables();                  // from sentence_javascript
    this.userScoreData.order = userData[0];
    ibGameUserOrder = userData[0];                              // used for getting the sentences
    this.userScoreData.level = userData[1];
    this.userScoreData.score = userData[2];
    this.userScoreData.streak = userData[3];
    this.userScoreData.time  = userData[4];
    this.userScoreData.words_hidden = userData[5];

    this.userResponseData.sentence = userData[6];
    this.userResponseData.response_time = userData[7];
  }
  storeUserResponse() {
    this.gameAuthService.ibGameStoreUserResponseInfo(this.userResponseData)
      .subscribe( (data) => {
      },
      (error) => {

      });
  }

  onHomeClick() {
    // this.router.navigate(['/']);
    window.location.reload();
  }

  onExitClick() {
    this.router.navigate(['/games']);
  }

  onHintClick() {
      this.gamePlayService.hintsIBGame();
  }
  nextSentenceClicked() {
    this.currentSentencesWordsNumber(sentence_number + 1);
  }

  checkUserResponse(response: any) {
    const correctResponse = ibGameCorrectResponse();
    if ( response === correctResponse) {
      this.userResponseData.user_response = true;
      this.no_correct_responses++;
    } else if (response !== correctResponse) {
      this.userResponseData.user_response = false;
    }
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

  findValidSentence () {
    this.getAllSentences(0);
  }
  getAllSentences(pageNumber: number) {
    let grid_formed;
    this.gameAuthService.ibGameGetSentencesInfo(pageNumber, 31)     // here 31 is the page size
    .subscribe( (data) => {
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
}
