import { Component, OnInit, ViewChild, ElementRef, AfterContentInit } from '@angular/core';
import { MIUser } from '../mi-user.model';
import { Level } from '../level.model';
import { Scenario } from '../scenario.model';
import { MICurrentStateService } from '../mi-current-state.service';
import { MIPlayService } from '../mi-play.service';
import { MiWinComponent } from '../mi-win/mi-win.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
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
  poitiveInputs = ['will', 'do', 'have', 'should', 'must', 'might', 'may', 'shall', 'have to', 'could', 'would'];
  negativeInputs = ['will not', 'not', 'cannot',
    'can\'t', 'shouldn\'t', 'may not',
    'couldn\'t', 'shall not',
    'could not', 'couldn\'t', 'would not', 'wouldn\'t'];
  previousText = '';
  invalidInput = false;
  extraContent = '';
  notificationHeader = '';
  notificationBody = '';
  disabled!: boolean;
  retry = false;
  sentiment = require('../../../../../../../../node_modules/wink-sentiment/src/wink-sentiment.js');
  nlp = require('../../../../../../../../node_modules/compromise/builds/compromise.min.js');
  openNavBar = false;
  goldValue = 20;
  silverValue = 30;
  bronzeValue = 40;
  gameValue = 0;
  scrollTop = 0;
  currentPoints = 500;


  constructor(
    private getCurrentStateService: MICurrentStateService,
    private miPlayService: MIPlayService,
    private dialogBoxService: DialogBoxService
  ) { }

  ngOnInit() {
    this.getCurrentStateService.updateLevelsList();
    this.miPlayService.levelUpdate.subscribe(() => {
      this.getCurrentStateService.continuePlaying = true;
      this.currentLevel = this.getCurrentStateService.getCurrentLevel();
      this.getCurrentStateService.getScenario();
      this.currentScenario = this.getCurrentStateService.currentScenario;
      console.log("ngOnInit, Current Scenario", this.currentScenario);


      this.previousText = this.getCurrentStateService.previousText;
      this.extraContent = this.getCurrentStateService.extraContent;
      this.notificationHeader = this.getCurrentStateService.notificationHeader;
      this.notificationBody = this.getCurrentStateService.notificationBody;
      this.disabled = this.getCurrentStateService.disabled;
      this.blank = this.getCurrentStateService.blank;
      this.user = this.getCurrentStateService.user;



      this.situationHandler();
    });

  }


  ngAfterContentInit() {
    console.log("ngAfterContentInit,  problem after dash", this.currentScenario);

    // this.currentLevel = this.getCurrentStateService.getCurrentLevel();
    // this.getCurrentStateService.getScenario();
    // this.currentScenario = this.getCurrentStateService.currentScenario;
    // this.previousText = this.getCurrentStateService.previousText;
    // this.extraContent = this.getCurrentStateService.extraContent;
    // this.notificationHeader = this.getCurrentStateService.notificationHeader;
    // this.notificationBody = this.getCurrentStateService.notificationBody;
    // this.disabled = this.getCurrentStateService.disabled;
    // this.blank = this.getCurrentStateService.blank;
    // this.user = this.getCurrentStateService.user;

    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
    // this.getCurrentStateService.count += 1;

  }


  storeTypedLetters() {
    this.getCurrentStateService.blank = this.blank;
  }

  onSubmit() {
    this.blank = this.blank.trim();
    this.invalidInput = false;
    this.getCurrentStateService.blank = '';
    if (this.blank && this.blank.length > 0) {
      this.situationHandler();
    }
    this.scrollDown();
  }

  onTryAgain() {
    this.getCurrentStateService.retry = false;
    this.retry = this.getCurrentStateService.retry;
    this.resetCurrent();
    // tslint:disable-next-line:max-line-length
    this.getCurrentStateService.user.points.push(-Math.abs(this.getCurrentStateService.user.currentPoints() - 1000 * this.getCurrentStateService.user.level));
    this.getCurrentStateService.resetScenario();
    this.currentScenario = this.getCurrentStateService.currentScenario;
    this.gameValue = 0;
  }

  situationHandler() {
    if (this.getCurrentStateService.retry) {
      this.getCurrentStateService.retry = false;
      if (this.findMatching(this.YES, this.blank)) {
        this.resetCurrent();
        // tslint:disable-next-line:max-line-length
        this.getCurrentStateService.user.points.push(-Math.abs(this.getCurrentStateService.user.currentPoints() - 1000 * this.getCurrentStateService.user.level));
        this.getCurrentStateService.resetScenario();
        this.currentScenario = this.getCurrentStateService.currentScenario;
      } else {
        this.exit();
      }
    } else if (this.getCurrentStateService.continuePlaying) {
      this.gameValue = 0;
      this.getCurrentStateService.continuePlaying = false;
      this.resetCurrent();
      this.getCurrentStateService.levelUpdate();
      this.currentLevel = this.getCurrentStateService.getCurrentLevel();
      this.getCurrentStateService.updateScenario();
      this.currentScenario = this.getCurrentStateService.currentScenario;
    } else if (this.getCurrentStateService.currentScenario) {
      this.scenarioHandler();
    }
  }

  scenarioHandler() {
    if (this.ifPositive(this.blank) === 1) {
      this.updatePreviousText();
      this.updateScore();
      if (this.getCurrentStateService.currentScenario.scenarioNext) {
        this.getCurrentStateService.updateScenario();
        this.currentScenario = this.getCurrentStateService.currentScenario;
      } else {
        this.updateExtraContent(this.currentScenario.correctText);
        delete this.getCurrentStateService.currentScenario;
        delete this.currentScenario;
        if (this.getCurrentStateService.user.level + 1 < this.getCurrentStateService.levelList.length) {
          this.updateNotification('Great', 'You have completed this task.');
          this.addDoneBtn();
        } else {
          console.log('You have completed');
          this.updateNotification('You have completed', 'Congratulations you have completed all modules');
          this.getCurrentStateService.disabled = true;
          this.disabled = this.getCurrentStateService.disabled;
        }
      }
    } else if (this.ifPositive(this.blank) === -1) {
      this.updatePreviousText();
      this.updateExtraContent('<i>' + this.currentScenario.wrongText + '</i>');
      delete this.getCurrentStateService.currentScenario;
      delete this.currentScenario;
      this.updateNotification('You seem to be stuck in a negative thought cycle ?', '');
      this.getCurrentStateService.retry = true;
      this.retry = this.getCurrentStateService.retry;
    } else {
      this.invalidInput = true;
    }
    this.blank = '';
  }

  findMatching(options: string[], search: string) {
    if (options.includes(search.toLocaleLowerCase())) {
      return true;
    }
  }

  ifPositive(input: string) {

    input = input.replace(/[^\w\s]/gi, '');
    input = input.toLocaleLowerCase();
    let ifNeg;
    console.log(input);
    console.log(1, this.sentiment(input)['score']);
    // console.log(2, this.nlp(input).verbs().data()['0']['interpret']['negative']);
    if (this.sentiment(input)['score'] > 0) {
      return 1;
    } else if (this.sentiment(input)['score'] < 0) {
      return -1;
    } else {
      try {
        ifNeg = this.nlp(input).verbs().data()['0']['interpret']['negative'];
        console.log(2, this.nlp(input).verbs().data());
      } catch (e) {
        return 0;
      }

      if (ifNeg) {
        return -1;
      } else {
        return 1;
      }
    }
  }

  updatePreviousText() {
    this.previousText += '<p>' +
      this.currentScenario.problemBeforeDash +
      '<strong class="small-font"> <u> ' +
      this.blank +
      '</u> </strong>' +
      this.currentScenario.problemAfterDash +
      '</p>' + '<p> >> ' + this.blank + '</p>';

    this.getCurrentStateService.previousText = this.previousText;
  }

  updateExtraContent(content: any) {
    this.extraContent = content;
    this.getCurrentStateService.extraContent = this.extraContent;
  }

  updateScore() {
    this.getCurrentStateService.user.points.push(this.currentPoints);
    if (this.getCurrentStateService.user.level === 0) {
      this.gameValue = this.gameValue + 50;
    }
    if (this.getCurrentStateService.user.level === 1) {
      this.gameValue = this.gameValue + 50;
    }
    if (this.getCurrentStateService.user.level === 2) {
      this.gameValue = this.gameValue + 33.33;
    }
    if (this.getCurrentStateService.user.level === 3) {
      this.gameValue = this.gameValue + 33.33;
    }
  }

  updateNotification(header: string, body: string = '') {
    this.notificationHeader = header;
    this.notificationBody = body;

    this.getCurrentStateService.notificationHeader = this.notificationHeader;
    this.getCurrentStateService.notificationBody = this.notificationBody;
  }

  exit() {
    this.getCurrentStateService.disabled = true;
    this.disabled = this.getCurrentStateService.disabled;
    this.updateNotification('Exiting!!', 'Goodbye hope to see you soon');
  }

  resetCurrent() {
    delete this.getCurrentStateService.currentScenario;
    delete this.currentScenario;
    this.getCurrentStateService.extraContent = this.extraContent = '';
    this.getCurrentStateService.previousText = this.previousText = '';
    this.getCurrentStateService.notificationBody = this.notificationBody = '';
    this.getCurrentStateService.notificationHeader = this.notificationHeader = '';
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
    // tslint:disable-next-line:max-line-length
    this.getCurrentStateService.user.points.push(-Math.abs(this.getCurrentStateService.user.currentPoints() - 1000 * this.getCurrentStateService.user.level));
  }

  onClickDone() {
    this.levelChanged = false;
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    console.log(this.doneBtn.nativeElement);
    this.doneBtn.nativeElement.dispatchEvent(domEvent);
    this.dialogBoxService.setDialogChild(MiWinComponent);
    this.nextLevel = this.getCurrentStateService.levelList[this.getCurrentStateService.user.level + 1];
    console.log(this.nextLevel.title);
  }

  scrollDown() {
    setTimeout(() => {
      this.target.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 10);
  }
}
