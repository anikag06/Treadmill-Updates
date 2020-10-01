import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import { MIUser } from '../mi-user.model';
import { Level } from '../level.model';
import { Scenario } from '../scenario.model';
import { MICurrentStateService } from '../mi-current-state.service';
import { MIPlayService } from '../mi-play.service';
import { MiWinComponent } from '../mi-win/mi-win.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { MIGameUserData } from '@/main/games/shared/game-play.model';
import { BadgesInfo } from '@/main/games/shared/game-badges.model';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
import { GamesFeedbackComponent } from '../../games-feedback/games-feedback.component';
import { GamesFeedbackService } from '../../games-feedback/games-feedback.service';

declare function require(name: string): any;

@Component({
  selector: 'app-mi-play',
  templateUrl: './mi-play.component.html',
  styleUrls: ['./mi-play.component.scss'],
})
export class MiPlayComponent implements OnInit, AfterContentInit {
  @ViewChild('inputEl', { static: false }) inputEl!: ElementRef;
  @ViewChild('doneBtn', { static: false }) doneBtn!: ElementRef;
  @ViewChild('target', { static: false }) target!: ElementRef;

  levelChanged = false;
  user!: MIUser;
  currentLevel!: Level;
  nextLevel!: Level;

  currentScenario!: Scenario;
  replayMode = false;
  blank = '';
  YES = ['Y', 'y', 'ye', 'yes', 'YE', 'YES', 'Yes', 'yEs', 'yE', 'Ye'];
  NO = ['N', 'n', 'No', 'no', 'nO'];
  poitiveInputs = [
    'will',
    'do',
    'have',
    'should',
    'must',
    'might',
    'may',
    'shall',
    'have to',
    'could',
    'would',
    'can',
  ];
  negativeInputs = [
    'will not',
    'not',
    'cannot',
    "can't",
    "shouldn't",
    'may not',
    "couldn't",
    'shall not',
    'could not',
    "couldn't",
    'would not',
    "wouldn't",
    "won't",
  ];
  previousText = '';
  invalidInput = false;
  invalidInputCount = 0;
  extraContent = '';
  notificationHeader = '';
  notificationBody = '';
  disabled!: boolean;
  retry = false;
  openNavBar = false;

  gameValue = 0;
  points = 5;
  levelPoints = 0;
  currentPoints!: number;
  time!: any;
  startTime!: any;
  endTime!: any;
  userData = new MIGameUserData(0, 0, '', false, this.startTime, this.endTime);

  BRONZE_CONSTANT!: any;
  SILVER_CONSTANT!: any;
  GOLD_CONSTANT!: any;
  bronzeValue!: any;
  silverValue!: any;
  goldValue!: any;
  bronzeNumber!: number;
  silverNumber!: number;
  goldNumber!: number;
  numCorrectAnswers!: number;
  allBadgesInfo: BadgesInfo = new BadgesInfo(0, 0, 0, 0, 0, 0);

  constructor(
    private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private dialogBoxService: DialogBoxService,
    private badgesService: GamesBadgesService,
    private el: ElementRef,
    private gamesFeedbackService: GamesFeedbackService,
  ) {}

  ngOnInit() {
    this.getCurrentStateService.setInitialOrder();
    this.miPlayService.startNext.subscribe(() => {
      this.numCorrectAnswers = this.getCurrentStateService.numCorrectAnswers;
      this.updateBadgesValue();
      this.getCurrentStateService.continuePlaying = true;
      this.getCurrentStateService.initLevelsList();
      this.miPlayService.setLevel.subscribe(() => {
        this.currentLevel = this.getCurrentStateService.getCurrentLevel();
        this.getCurrentStateService.getScenario();
        this.currentScenario = this.getCurrentStateService.currentScenario;
        this.previousText = this.getCurrentStateService.previousText;
        this.extraContent = this.getCurrentStateService.extraContent;
        this.notificationHeader = this.getCurrentStateService.notificationHeader;
        this.notificationBody = this.getCurrentStateService.notificationBody;
        this.disabled = this.getCurrentStateService.disabled;
        this.blank = this.getCurrentStateService.blank;
        this.user = this.getCurrentStateService.user;
        this.currentPoints = this.user.currentPoints();
      });
    });
    this.miPlayService.levelUpdate.subscribe(() => {
      this.getCurrentStateService.continuePlaying = true;
      this.situationHandler();
    });
    this.gamesFeedbackService.feedback.subscribe(() => {
      this.nextLevelPopup();
    });
  }

  ngAfterContentInit() {
    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
  }

  storeTypedLetters() {
    this.getCurrentStateService.blank = this.blank;
  }

  onSubmit() {
    this.time = new Date();
    this.endTime = this.time.toJSON();
    this.blank = this.blank.trim();
    this.invalidInput = false;
    this.getCurrentStateService.blank = '';
    if (this.blank && this.blank.length > 0) {
      this.userData.answer = this.blank;
      this.situationHandler();
    }
    this.scrollDown();
  }

  onTryAgain() {
    this.getCurrentStateService.retry = false;
    this.retry = this.getCurrentStateService.retry;
    this.resetCurrent();
    if (this.currentPoints !== 0) {
      this.getCurrentStateService.user.points.push(-Math.abs(this.levelPoints));
    }
    this.currentPoints = this.user.currentPoints();
    this.getCurrentStateService.resetScenario();
    this.currentScenario = this.getCurrentStateService.currentScenario;
    this.gameValue = 0;
  }

  situationHandler() {
    if (this.getCurrentStateService.count === 0) {
      this.getCurrentStateService.continuePlaying = false;
      this.getCurrentStateService.count += 1;
      this.scenarioHandler();
      return;
    } else
      if (this.getCurrentStateService.continuePlaying) {
      this.gameValue = 0;
      this.levelPoints = 0;
      this.getCurrentStateService.continuePlaying = false;
      this.resetCurrent();
      this.getCurrentStateService.levelUpdate();
      this.currentLevel = this.getCurrentStateService.getCurrentLevel();
      this.getCurrentStateService.updateScenario();
      this.currentScenario = this.getCurrentStateService.currentScenario;
      const lastIndex = this.getCurrentStateService.levelList.length;
      if (
        this.user.level ===
        this.getCurrentStateService.levelList[lastIndex - 1].order
      ) {
        this.getCurrentStateService.updateLevelsList();
      }
    } else if (this.getCurrentStateService.currentScenario) {
      this.scenarioHandler();
    }
  }

  scenarioHandler() {
    if (this.ifPositive(this.blank) === 1) {
      console.log('positive');
      this.invalidInputCount = 0;
      this.setUserData();
      this.numCorrectAnswers += 1;
      this.updateBadgesValue();
      this.updatePreviousText();
      this.updateScore();
      if (this.getCurrentStateService.currentScenario.scenarioNextIndex) {
        this.getCurrentStateService.updateScenario();
        this.currentScenario = this.getCurrentStateService.currentScenario;
      } else {
        this.updateExtraContent(this.currentScenario.correctText);
        delete this.getCurrentStateService.currentScenario;
        delete this.currentScenario;
        this.updateNotification('Great', 'You have completed this task.');
        this.addDoneBtn();
      }
    } else if (this.ifPositive(this.blank) === -1) {
      console.log('negative');
      this.invalidInputCount = 0;

      this.updatePreviousText();
      this.updateExtraContent('<i>' + this.currentScenario.wrongText + '</i>');
      this.updateNotification(
        'You seem to be stuck in a negative thought cycle.',
        '',
      );
      this.addTryAgnBtn();
      this.getCurrentStateService.retry = true;
      this.setUserData();
      delete this.getCurrentStateService.currentScenario;
      delete this.currentScenario;
    } else {
      console.log ('Invalid input');
      this.getCurrentStateService.retry = true;
      this.setUserData();
      this.invalidInput = true;
      this.invalidInputCount += 1;
    }
    this.storeUserData();
    this.blank = '';
  }

  addTryAgnBtn() {
    setTimeout(() => {
      this.retry = this.getCurrentStateService.retry;
    }, 3000);
  }

  findMatching(options: string[], search: string) {
    if (options.includes(search.toLocaleLowerCase())) {
      return true;
    }
  }

  ifPositive(input: string) {
    input = input.toLocaleLowerCase();
    console.log('input: ', input);
    if (this.currentScenario.possibleCorrectAnswerList.indexOf(input) > -1) {
      return 1;
    } else if (
      this.currentScenario.possibleIncorrectAnswerList.indexOf(input) > -1
    ) {
      return -1;
    } else {
      return 0;
    }
  }


  updatePreviousText() {
    this.previousText +=
      '<p>' +
      this.currentScenario.problemBeforeDash +
      '<strong class="small-font"> <u> ' +
      this.blank +
      '</u> </strong>' +
      this.currentScenario.problemAfterDash +
      '</p>' +
      '<p> >> ' +
      this.blank +
      '</p>';

    this.getCurrentStateService.previousText = this.previousText;
  }

  updateExtraContent(content: any) {
    this.extraContent = content;
    this.getCurrentStateService.extraContent = this.extraContent;
  }

  updateScore() {
    this.getCurrentStateService.user.points.push(this.points);
    this.currentPoints = this.user.currentPoints();
    this.levelPoints += this.points;
    const numScenarios = this.getCurrentStateService.numOfScenarios();
    this.gameValue = this.gameValue + 100 / numScenarios;
  }

  updateNotification(header: string, body: string = '') {
    this.notificationHeader = header;
    this.notificationBody = body;
    this.getCurrentStateService.notificationHeader = this.notificationHeader;
    this.getCurrentStateService.notificationBody = this.notificationBody;
  }

  resetCurrent() {
    delete this.getCurrentStateService.currentScenario;
    delete this.currentScenario;
    this.getCurrentStateService.extraContent = this.extraContent = '';
    this.getCurrentStateService.previousText = this.previousText = '';
    this.getCurrentStateService.notificationBody = this.notificationBody = '';
    this.getCurrentStateService.notificationHeader = this.notificationHeader =
      '';
    this.blank = '';
  }

  addDoneBtn() {
    setTimeout(() => {
      this.levelChanged = true;
    }, 4000);
  }

  onAnyWhereClick() {
    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
    this.openNavBar = false;
  }
  onPause() {
    this.getCurrentStateService.disabled = true;
    this.disabled = this.getCurrentStateService.disabled;
  }
  onResumePlay() {
    this.getCurrentStateService.disabled = false;
    this.disabled = this.getCurrentStateService.disabled;
  }

  onNavBarReplay() {
    this.resetCurrent();
    this.getCurrentStateService.resetScenario();
    this.currentScenario = this.getCurrentStateService.currentScenario;
    this.openNavBar = false;
    this.invalidInput = false;
    this.getCurrentStateService.continuePlaying = false;
    this.getCurrentStateService.retry = false;
    this.getCurrentStateService.disabled = false;
    this.disabled = false;
    this.getCurrentStateService.user.points.push(-Math.abs(this.levelPoints));
    this.currentPoints = this.user.currentPoints();
  }

  onClickDone() {
    if (
      this.currentLevel.order === 3 &&
      this.getCurrentStateService.ask_feedback
    ) {
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      this.el.nativeElement.dispatchEvent(domEvent);
      this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    } else {
      this.nextLevelPopup();
    }
  }

  nextLevelPopup() {
    this.levelChanged = false;
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.doneBtn.nativeElement.dispatchEvent(domEvent);
    this.dialogBoxService.setDialogChild(MiWinComponent);
    this.nextLevel = this.getCurrentStateService.getNextLevel();
  }

  scrollDown() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }

  setUserData() {
    this.userData.answer_correct = !this.getCurrentStateService.retry;
    if (!this.getCurrentStateService.retry) {
      this.userData.score = 5;
    } else {
      this.userData.score = 0;
    }
    this.userData.game_sentence_id = this.currentScenario.id;
    this.userData.start_time = this.getCurrentStateService.startTime;
    this.userData.end_time = this.endTime;
  }

  storeUserData() {
    this.getCurrentStateService.saveUserData(this.userData).subscribe();
  }

  updateBadgesValue() {
    this.GOLD_CONSTANT = this.getCurrentStateService.GOLD_CONSTANT;
    this.SILVER_CONSTANT = this.getCurrentStateService.SILVER_CONSTANT;
    this.BRONZE_CONSTANT = this.getCurrentStateService.BRONZE_CONSTANT;
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
}
