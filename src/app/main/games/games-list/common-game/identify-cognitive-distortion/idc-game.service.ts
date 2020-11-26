import { Injectable, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Subject } from 'rxjs';
import { environment } from 'environments/environment';
import {
  IDC_SITUATION_DATA,
  IDC_USER_DATA,
  IDC_USER_ANSWER_DATA,
} from '@/app.constants';
import { BadgesInfo } from '@/main/games/shared/game-badges.model';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
import {
  ICDGameUserData,
  ICDGameUserAnswerData,
} from '@/main/games/shared/game-play.model';

@Injectable({
  providedIn: 'root',
})
export class IdcGameService implements OnInit {
  startPlayingIdc = new EventEmitter();
  resumeGame = new EventEmitter();
  // levelInitialise = new EventEmitter();
  levelInitialise = new Subject();
  stopTimer = new Subject();
  startTimer = new EventEmitter();
  replay = false;
  playing = false;
  selectedCorrectOptionsSet = new Set();
  game!: any;
  questionId!: any;
  optionStatus!: string;
  optionStatusCount = 0;
  optionSelected!: string;
  optionMessage!: string;
  score!: number;
  sendScore = 0;
  correctOptionsLength!: number;
  correctOptionFound = -1;
  userData = new ICDGameUserData(0, 0, 0);
  userAnswerData = new ICDGameUserAnswerData(0, 0, 0);

  level = new BehaviorSubject(0);
  title = new BehaviorSubject('title');
  nat = new BehaviorSubject('nat');
  situation = new BehaviorSubject('situation');
  correct = new BehaviorSubject(['options']);
  optionOne = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });
  optionTwo = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });
  optionThree = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });
  optionFour = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });
  optionFive = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });
  optionSix = new BehaviorSubject({
    id: -1,
    distortion: 'distortion',
    message: 'message',
  });

  ask_feedback!: boolean;
  time!: any;
  situation_displayed_at!: any;
  BRONZE_CONSTANT!: any;
  SILVER_CONSTANT!: any;
  GOLD_CONSTANT!: any;
  bronzeValue!: any;
  silverValue!: any;
  goldValue!: any;
  bronzeNumber!: any;
  silverNumber!: any;
  goldNumber!: any;
  showTutorial!: boolean;
  nextCall = false;
  numCorrectAnswers!: any;
  allBadgesInfo: BadgesInfo = new BadgesInfo(0, 0, 0, 0, 0, 0);
  difficultyValue!: number;

  maxTime = 120;
  minTime = 30;
  timeLeft!: number;
  diffConst!: number;
  timeActualLeft!: number;
  timeAlloted!: number;
  extraTimeTaken = false;
  interval!: any;
  levelOrder: any;
  totalSituations!: number;
  last_completed_order!: number;
  dataLoaded = false;
  constructor(
    private http: HttpClient,
    private badgesService: GamesBadgesService,
  ) {}

  ngOnInit() {}

  serviceCall() {
    console.log('question id', this.questionId);

    this.time = new Date();
    this.situation_displayed_at = this.time.toJSON();
    // this.level.next(this.game.results[this.questionId - 1].order);
    // this.title.next(this.game.results[this.questionId - 1].title);
    // this.nat.next(this.game.results[this.questionId - 1].nat);
    // this.situation.next(this.game.results[this.questionId - 1].situation);
    // this.correct.next(this.game.results[this.questionId - 1].correct);
    // this.optionOne.next(this.game.results[this.questionId - 1].options[0]);
    // this.optionTwo.next(this.game.results[this.questionId - 1].options[1]);
    // this.optionThree.next(this.game.results[this.questionId - 1].options[2]);
    // this.optionFour.next(this.game.results[this.questionId - 1].options[3]);
    // this.optionFive.next(this.game.results[this.questionId - 1].options[4]);
    // this.optionSix.next(this.game.results[this.questionId - 1].options[5]);
    this.level.next(this.game[this.questionId].order);
    this.title.next(this.game[this.questionId].title);
    this.nat.next(this.game[this.questionId].nat);
    this.situation.next(this.game[this.questionId].situation);
    this.correct.next(this.game[this.questionId].correct);
    this.optionOne.next(this.game[this.questionId].options[0]);
    this.optionTwo.next(this.game[this.questionId].options[1]);
    this.optionThree.next(this.game[this.questionId].options[2]);
    this.optionFour.next(this.game[this.questionId].options[3]);
    this.optionFive.next(this.game[this.questionId].options[4]);
    this.optionSix.next(this.game[this.questionId].options[5]);
    this.optionStatus = '';
    this.optionStatusCount = 0;
    this.getUserData();
    // this.initScoreComponentData();
    this.updateBadgesValue();
    this.setDifficultyFactor();
    this.setDifficultyValue();
    this.getLevel();
  }

  getGameData() {
    return this.http
      .get(environment.API_ENDPOINT + IDC_SITUATION_DATA)
      .subscribe(data => {
        this.game = data;
        console.log('Game Data', this.game);
        console.log('last_completed_order', this.last_completed_order);
        this.totalSituations = this.game.length;
        if (this.last_completed_order === this.totalSituations) {
          this.questionId = 0;
        } else {
          this.questionId = this.last_completed_order;
        }
        this.serviceCall();
        this.dataLoaded = true;
      });
  }

  startPlaying() {
    this.playing = true;
    this.startPlayingIdc.emit();
  }

  updateBadgesValue() {
    this.allBadgesInfo = this.badgesService.getBadgesInfo(
      this.BRONZE_CONSTANT,
      this.SILVER_CONSTANT,
      this.GOLD_CONSTANT,
      this.numCorrectAnswers,
    );
    this.bronzeNumber = this.allBadgesInfo.bronzeBadges;
    this.silverNumber = this.allBadgesInfo.silverBadges;
    this.goldNumber = this.allBadgesInfo.goldBadges;

    this.bronzeValue = this.allBadgesInfo.bronzePercent;
    this.silverValue = this.allBadgesInfo.silverPercent;
    this.goldValue = this.allBadgesInfo.goldPercent;
  }

  initUserData() {
    this.fetchUserData().subscribe((data: any) => {
      console.log(
        'user data, last_completed_order',
        data,
        data.last_completed_order,
      );
      this.score = data.points;
      this.numCorrectAnswers = data.no_of_correct_answers;
      this.BRONZE_CONSTANT = data.BRONZE_CONSTANT;
      this.SILVER_CONSTANT = data.SILVER_CONSTANT;
      this.GOLD_CONSTANT = data.GOLD_CONSTANT;
      this.showTutorial = data.show_tutorial;
      this.ask_feedback = data.ask_for_feedback;
      this.timeLeft = data.time;
      this.timeAlloted = data.time;
      this.last_completed_order = data.last_completed_order;
    });
  }

  initScoreComponentData() {
    this.updateBadgesValue();
    this.setDifficultyFactor();
    this.setDifficultyValue();
    this.getLevel();
  }

  getUserData() {
    this.fetchUserData().subscribe((data: any) => {
      console.log('user data', data);
      this.score = data.points;
      this.timeLeft = data.time;
      this.timeAlloted = data.time;
      this.last_completed_order = data.last_completed_order;
      if (!this.nextCall) {
        this.levelInitialise.next();
        console.log('level initialise called');
      }
      this.nextCall = false;
    });
  }

  updateDifficultyLevel() {
    this.setDifficultyFactor();
    if (
      this.timeActualLeft > Math.floor(0.2 * this.timeLeft) &&
      this.timeActualLeft > this.minTime
    ) {
      this.timeLeft -= 20;
      this.timeAlloted = this.timeLeft;
    } else {
      this.timeAlloted = this.minTime;
    }
  }

  setDifficultyValue() {
    this.difficultyValue = this.diffConst * 100;
  }

  setDifficultyFactor() {
    this.diffConst =
      (this.maxTime - this.timeAlloted) / (this.maxTime - this.minTime);
  }

  fetchUserData() {
    return this.http.get(environment.API_ENDPOINT + IDC_USER_DATA);
  }

  saveUserData(data: any) {
    return this.http.patch(environment.API_ENDPOINT + IDC_USER_DATA, data);
  }

  getLevel() {
    this.level.subscribe(data => {
      this.levelOrder = data;
    });
  }

  updateUserData() {
    this.userData.last_completed_order = this.levelOrder;
    this.userData.points = this.score;
    this.userData.time = this.timeAlloted;
    console.log('Update user data', this.userData);
    this.saveUserData(this.userData).subscribe();
  }

  saveUserAnswerData(data: any) {
    return this.http.post(
      environment.API_ENDPOINT + IDC_USER_ANSWER_DATA,
      data,
    );
  }
}
