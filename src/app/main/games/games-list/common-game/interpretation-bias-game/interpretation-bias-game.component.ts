import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/common';
// import 'assets/games/interpretation_bias_game/js/sentence_javascript';
// tslint:disable-next-line: max-line-length
import { InterpretationBiasGameService } from '@/main/games/games-list/common-game/interpretation-bias-game/interpretation-bias-game.service';
// tslint:disable-next-line: max-line-length
import { UserScoreData, UserResponseData } from '@/main/games/games-list/common-game/interpretation-bias-game/interpretation-bias-game-data.model';
import { Router } from '@angular/router';
import { IBG_SENTENCE } from '@/app.constants';
import { environment } from 'environments/environment';
import { GamePlayService } from '@/main/games/shared/game-play.service';

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
declare function getUpdatedVariables(): any;

@Component({
  selector: 'app-interpretation-bias-game',
  templateUrl: './interpretation-bias-game.component.html',
  styleUrls: ['./interpretation-bias-game.component.scss'],
  providers: [InterpretationBiasGameService]
})
export class InterpretationBiasGameComponent implements OnInit, OnDestroy {

  NO_OF_SENTENCES_RECEIVED = 20;      // order of first sentence is 0
  // LEVEL_UP_SEN = 5;       // level up after how many sentences, here after 5 sentences;

  firstSentence = true;
  userScoreData = new UserScoreData(ibGameUserOrder, ibGamelevel, ibGameScore, ibGameStreak, ibGameTime, ibGameWordsHidden);
  userResponseData = new UserResponseData(1, false, 0) ;

  // for getting the sentence information
  INPUT_ORDER!: any;
  FIRST_SENTENCE_ID!: number;
  NEXT_SEN_URL!: any;
  sentencesPageInUrl!: number;
  sentencePage!: any;
  lastSentenceReceived = this.NO_OF_SENTENCES_RECEIVED;
  index = ibGameUserOrder;

  // whether level > 0 or not
  showAllHints = false;
  // levelUpElement!: HTMLElement;

  SEN_URL = environment.API_ENDPOINT + IBG_SENTENCE;
  // if the user started from the first sentence instructions should be shown
  instructElement!: HTMLElement;
  gameElement!: HTMLElement;

  constructor( private interpretationbiasgameService: InterpretationBiasGameService,
    private router: Router,
    private gamePlayService: GamePlayService,
    @Inject(DOCUMENT) document: any) {
  }

  ngOnInit() {
    this.scoresRelatedInfo();
  }

  sentenceInfo(URL: string) {
    this.sentencesPageInUrl = Math.floor(ibGameUserOrder / this.NO_OF_SENTENCES_RECEIVED);
    this.interpretationbiasgameService.getSentencesInfo(URL, this.firstSentence, this.sentencesPageInUrl)
      .subscribe( (data) => {
          console.log(data, ibGameUserOrder);
          if ( ibGameUserOrder === data.count - 1) {
            this.lastSentenceReceived = data.count % this.NO_OF_SENTENCES_RECEIVED ;
          }
          if (data.count < this.lastSentenceReceived) {
            this.lastSentenceReceived = data.count - 1;
          }
          this.FIRST_SENTENCE_ID = data.results[0].id;
          if (this.firstSentence) {
            this.index = ibGameUserOrder % this.NO_OF_SENTENCES_RECEIVED ;
          }
          if ( ibGamelevel > 0) {
            this.showAllHints = true;
          }
          console.log(this.lastSentenceReceived);
          for (let i = this.index;
                i < (this.lastSentenceReceived); i++) {
              this.NEXT_SEN_URL = data.next;
              sentence_ids.push(data.results[i].id);
              sentence_array.push(data.results[i].sentence_text);
              sentence_word_array.push(data.results[i].word.word);
              sentence_response_array.push(data.results[i].word.response);
              sentence_word_valence.push(data.results[i].word.valence);
              sentence_trick.push(data.results[i].trick_sentence);
              sentence_order_array.push(data.results[i].order);
              if (ibGameUserOrder >= (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {
                if (data.next && this.firstSentence) {
                  this.index = 0;
                  this.firstSentence = false;
                  this.sentenceInfo(this.NEXT_SEN_URL);
                }
              }
          }
        },
        (error) => {
          // console.log(error);
        }
      );
  }
  scoresRelatedInfo() {
    this.interpretationbiasgameService.getScoresInfo()
      .subscribe((data) => {
          this.INPUT_ORDER = data.data.order;
          ibGameScore = data.data.score;
          ibGamelevel = data.data.level;
          console.log('level:', ibGamelevel);
          ibGameStreak = data.data.streak;
          ibGameUserOrder = this.INPUT_ORDER;
          ibGameTime = data.data.time;
          ibGameWordsHidden = data.data.words_hidden;
          if ( ibGameWordsHidden > 0 ) {
            this.showAllHints = true;
          } else if (ibGameWordsHidden === 0) {
            this.showAllHints = false;
          }
          this.sentenceInfo(this.SEN_URL);
          this.gameElement = document.getElementById('game_main_div') as HTMLElement;
          this.instructElement = document.getElementById('instruct-div') as HTMLElement;
          if  (ibGameUserOrder > 0) {
            this.gameElement.classList.remove('d-none');
            this.instructElement.classList.add('d-none');
          } else if ( ibGameUserOrder === 0) {
            this.instructElement.classList.remove('d-none');
            this.gameElement.classList.add('d-none');
          }
        },
        (error) => {
          // console.log(error);
        }
      );
  }
  storeUserScoreInfo() {
    this.getScoreVariablesValue();
    this.interpretationbiasgameService.storeUserScoreInfo(this.userScoreData)
      .subscribe( (data) => {
          if (ibGameUserOrder === (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {

            this.index = 0;
            this.firstSentence = false;
            this.sentenceInfo(this.NEXT_SEN_URL);
          }
        },
        (error) => {

        }
      );
      this.storeUserResponse();
  }
  getScoreVariablesValue() {
    let userData = getUpdatedVariables();                  // from sentence_javascript
    this.userScoreData.order = userData[0];
    ibGameUserOrder = userData[0];                              // used for getting the sentences 
    this.userScoreData.level = userData[1];
    // this.levelUpElement = document.getElementById('levelup') as HTMLElement;
    // if (ibGameUserOrder % ( this.LEVEL_UP_SEN) === 0) {
    //   this.userScoreData.level = userData[1] + 1;
    //   if (ibGamelevel > 2) {
    //     this.userScoreData.level = 3;
    //   }
    //   this.levelUpElement.classList.remove('d-none');
    // }
    // ibGamelevel = this.userScoreData.level;
    this.userScoreData.score = userData[2];
    this.userScoreData.streak = userData[3];
    this.userScoreData.time  = userData[4];
    this.userScoreData.words_hidden = userData[5];
    console.log('score data' , this.userScoreData);

    this.userResponseData.sentence = userData[6];
    this.userResponseData.user_response = userData[7];
    this.userResponseData.response_time = userData[8];

  }
  onPlayClicked() {
    this.gamePlayService.playIBGame();
  }
  storeUserResponse() {
    this.interpretationbiasgameService.storeUserResponseInfo(this.userResponseData)
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
    console.log('hint btn clicked');
      this.gamePlayService.hintsIBGame();
  }

  ngOnDestroy() {
    clearInterval(inactivity_check_interval);
  }
}
