import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common'; 
// import 'assets/games/interpretation_bias_game/js/sentence_javascript';
import { InterpretationBiasGameService } from '@/main/games/games-list/interpretation-bias-game/interpretation-bias-game.service';
import { UserScoreData, UserResponseData } from '@/main/games/games-list/interpretation-bias-game/interpretation-bias-game-data.model';
import { Router } from '@angular/router';
import { IBG_SENTENCE } from '@/app.constants';
import { environment } from 'environments/environment';
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
declare var gameScore: any;
declare var level: any;
declare var streak: any;
declare var userOrder: any;
declare var gameTime: any;
// for storing the score related info of the user
declare var success: any;
declare function getUpdatedVariables(): any;

@Component({
  selector: 'app-interpretation-bias-game',
  templateUrl: './interpretation-bias-game.component.html',
  styleUrls: ['./interpretation-bias-game.component.scss']
})
export class InterpretationBiasGameComponent implements OnInit {

  NO_OF_SENTENCES_RECEIVED = 20;      // order of first sentence is 0
  LEVEL_UP_SEN = 5;       // level up after how many sentences, here after 5 sentences;

  firstSentence = true;
  userScoreData = new UserScoreData(userOrder, level, gameScore, streak, gameTime);
  userResponseData = new UserResponseData(1, false, 0) ;

  // for getting the sentence information
  INPUT_ORDER!: any;
  FIRST_SENTENCE_ID!: number;
  NEXT_SEN_URL!: any;
  sentencesPageInUrl!: number;
  sentencePage!: any;
  lastSentenceReceived = this.NO_OF_SENTENCES_RECEIVED;
  index = userOrder;

  //whether level > 0 or not
  showAllHints = false;
  levelUpElement!: HTMLElement;

  SEN_URL = environment.API_ENDPOINT + IBG_SENTENCE;
  // if the user started from the first sentence instructions should be shown
  instructElement!: HTMLElement;
  gameElement!: HTMLElement;

  constructor( private interpretationbiasgameService: InterpretationBiasGameService,
    private router: Router,
    @Inject(DOCUMENT) document: any) {
  }

  ngOnInit() {
    this.scoresRelatedInfo();
  }

  sentenceInfo(URL: string) {
    this.sentencesPageInUrl = Math.floor(userOrder / this.NO_OF_SENTENCES_RECEIVED);
    this.interpretationbiasgameService.getSentencesInfo(URL, this.firstSentence, this.sentencesPageInUrl)
      .subscribe( (data) => {
          if ( userOrder === data.count - 1) {
            this.lastSentenceReceived = data.count % this.NO_OF_SENTENCES_RECEIVED ;
          }
          this.FIRST_SENTENCE_ID = data.results[0].id;
          if (this.firstSentence) {
            this.index = userOrder % this.NO_OF_SENTENCES_RECEIVED ;
          }
          if ( level > 0) {
            this.showAllHints = true;
          }
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
              if (userOrder >= (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {
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
          gameScore = data.data.score;
          level = data.data.level;
          console.log('level:', level);
          streak = data.data.streak;
          userOrder = this.INPUT_ORDER;
          gameTime = data.data.time;
          this.sentenceInfo(this.SEN_URL);
          this.gameElement = document.getElementById('main_div') as HTMLElement;
          this.instructElement = document.getElementById('instruct-div') as HTMLElement;
          if  (userOrder > 0) {
            this.gameElement.classList.remove('d-none');
            this.instructElement.classList.add('d-none');
          } else if ( userOrder === 0) {
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
          if (userOrder === (this.FIRST_SENTENCE_ID + Math.floor(this.NO_OF_SENTENCES_RECEIVED / 2))) {

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
    userOrder = userData[0];                              // used for getting the sentences 
    this.userScoreData.level = userData[1];
    this.levelUpElement = document.getElementById('levelup') as HTMLElement;
    if (userOrder % ( this.LEVEL_UP_SEN) === 0) {
      this.userScoreData.level = userData[1] + 1;
      if (level > 2) {
        this.userScoreData.level = 3;
      }
      level = this.userScoreData.level;
      this.levelUpElement.classList.remove('d-none');
    }
    if ( level > 0 ) {
      this.showAllHints = true;
    } else if (level === 0) {
      this.showAllHints = false;
    }
    console.log("order ", userOrder, " level ", level );
    this.userScoreData.score = userData[2];
    this.userScoreData.streak = userData[3];
    this.userScoreData.time  = userData[4];

    this.userResponseData.sentence = userData[5];
    this.userResponseData.user_response = userData[6];
    this.userResponseData.response_time = userData[7];

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
}
