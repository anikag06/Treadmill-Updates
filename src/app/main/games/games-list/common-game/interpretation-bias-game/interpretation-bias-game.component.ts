import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserScoreData, UserResponseData } from '@/main/games/shared/game-play.model';
import { Router } from '@angular/router';
import { IBG_SENTENCE } from '@/app.constants';
import { environment } from 'environments/environment';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';

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
})
export class InterpretationBiasGameComponent implements OnInit, OnDestroy {

  NO_OF_SENTENCES_RECEIVED!: number;      // order of first sentence is 0
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
  index = ibGameUserOrder;

  // whether level > 0 or not
  showAllHints = false;
  // levelUpElement!: HTMLElement;

  SEN_URL = environment.API_ENDPOINT + IBG_SENTENCE;
  // if the user started from the first sentence instructions should be shown
  instructElement!: HTMLElement;
  gameElement!: HTMLElement;

  constructor( private gameAuthService: GamesAuthService,
    private router: Router,
    private gamePlayService: GamePlayService) {
  }

  ngOnInit() {
    this.scoresRelatedInfo();
  }

  sentenceInfo(pageNumber: number) {
    this.gameAuthService.ibGameGetSentencesInfo( this.firstSentence, pageNumber)
      .subscribe( (data) => {
          this.FIRST_SENTENCE_ID = data.results[0].id;
          if (this.firstSentence) {
            this.index = ibGameUserOrder % this.NO_OF_SENTENCES_RECEIVED ;
          }
          if ( ibGamelevel > 0) {
            this.showAllHints = true;
          }
          let i = this.index;
          while (data.results[i]) {
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
                  pageNumber++;
                  this.sentenceInfo(pageNumber);   // call next set of sentences
                }
              }
            i++;
          }
        },
        (error) => {
          // console.log(error);
        }
      );
  }
  scoresRelatedInfo() {
    this.gameAuthService.ibGameGetScoresInfo()
      .subscribe((data) => {
          this.NO_OF_SENTENCES_RECEIVED = data.page_size;
          this.INPUT_ORDER = data.data.order;
          ibGameScore = data.data.score;
          ibGamelevel = data.data.level;
          ibGameStreak = data.data.streak;
          ibGameUserOrder = this.INPUT_ORDER;
          ibGameTime = data.data.time;
          ibGameWordsHidden = data.data.words_hidden;
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
  storeUserScoreInfo() {
    this.getScoreVariablesValue();
    this.gameAuthService.ibGameStoreUserScoreInfo(this.userScoreData)
      .subscribe( (data) => {
          if (ibGameUserOrder === (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {

            this.index = 0;
            this.firstSentence = false;
            this.sentencesPageInUrl++;
            this.sentenceInfo(this.sentencesPageInUrl);    // call next set of sentences
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

    this.userResponseData.sentence = userData[6];
    this.userResponseData.user_response = userData[7];
    this.userResponseData.response_time = userData[8];

  }
  onPlayClicked() {
    this.gamePlayService.playIBGame();
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

  ngOnDestroy() {
    clearInterval(inactivity_check_interval);
  }
}
