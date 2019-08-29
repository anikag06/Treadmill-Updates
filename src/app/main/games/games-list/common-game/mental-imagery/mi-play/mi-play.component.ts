import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { MIUser } from '../mi-user.model';
import { Level } from '../level.model';
import { Scenario } from '../scenario.model';
import { MICurrentStateService } from '../mi-current-state.service';

@Component({
  selector: 'app-mi-play',
  templateUrl: './mi-play.component.html',
  styleUrls: ['./mi-play.component.scss']
})
export class MiPlayComponent implements OnInit {

  @ViewChild('inputEl', {static: false}) inputEl!: ElementRef;
  // @ViewChild('submitBtn') submitBtn: ElementRef;
  // @Output() scoreUpdated = new EventEmitter<number>();

  @Output() onNvHelp = new EventEmitter<void>();
  @Output() onNvHome = new EventEmitter<void>();

  user!: MIUser;
  currentLevel!: Level;
  currentScenario!: Scenario;
  replayMode = false;
 // continuePlaying = false;
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
  // retry = false;
  sentiment = require('../../../../../../../../node_modules/wink-sentiment/src/wink-sentiment.js');
  nlp = require('../../../../../../../../node_modules/compromise/builds/compromise.min.js');
  openNavBar = false;



  constructor(private getCurrentState: MICurrentStateService) { }

  ngOnInit() {
    this.getCurrentState.getContent();
  }

  ngAfterContentInit() {
    // this.getCurrentState.getCurrentLevel();
    this.currentLevel = this.getCurrentState.getCurrentLevel();

    this.getCurrentState.getScenario();
    this.currentScenario = MICurrentStateService.currentScenario;

    this.previousText = MICurrentStateService.previousText;
    this.extraContent = MICurrentStateService.extraContent;
    this.notificationHeader = MICurrentStateService.notificationHeader ;
    this.notificationBody = MICurrentStateService.notificationBody;
    this.disabled = MICurrentStateService.disabled;
    this.blank = MICurrentStateService.blank;

    this.user = MICurrentStateService.user;

    if (this.inputEl) {
      this.inputEl.nativeElement.focus();
    }
    MICurrentStateService.count += 1;
  }

  // getCurrentLevel() {
  //   this.currentLevel =  this.levelList[this.user.level];
  // }

  // resetScenario() {
  //   this.currentScenario = this.currentLevel.scenario;
  // }

  // getScenario() {
  //   if (this.currentScenario) {
  //     if (this.currentScenario.scenarioNext) {
  //       this.currentScenario = this.currentScenario.scenarioNext;
  //     }
  //   } else {
  //     this.resetScenario();
  //   }
  // }


  storeTypedLetters() {
    MICurrentStateService.blank = this.blank;
  }

  onSubmit() {
    this.blank = this.blank.trim();
    this.invalidInput = false;
    MICurrentStateService.blank = '';
    // this.inputEl.nativeElement.focus();
    if (this.blank && this.blank.length > 0) {
      this.situationHandler();
    }
    // this.inputEl.nativeElement.focus();
  }

  situationHandler() {
    if (MICurrentStateService.retry) {
      MICurrentStateService.retry = false;
      if (this.findMatching(this.YES, this.blank)) {
        this.resetCurrent();
        MICurrentStateService.user.points.push(-Math.abs(MICurrentStateService.user.currentPoints() - 1000 * MICurrentStateService.user.level));

        this.getCurrentState.resetScenario();
        this.currentScenario = MICurrentStateService.currentScenario;
      } else {
        this.exit();
      }
    } else if (MICurrentStateService.continuePlaying) {
      if (this.findMatching(this.YES, this.blank)) {
        MICurrentStateService.continuePlaying = false;
        this.resetCurrent();
        this.getCurrentState.levelUpdate();
        this.currentLevel = this.getCurrentState.getCurrentLevel();
        // MICurrentStateService.currentScenario = this.currentLevel.scenario;
        // this.currentScenario= MICurrentStateService.currentScenario;

        this.getCurrentState.updateScenario();
        this.currentScenario = MICurrentStateService.currentScenario;
      } else {
        this.exit();
      }
    } else if (MICurrentStateService.currentScenario) {
      this.scenarioHandler();
    }
  }

  scenarioHandler() {
    if (this.ifPositive(this.blank) === 1) {
      this.updatePreviousText();
      this.updateScore();
      if (MICurrentStateService.currentScenario.scenarioNext) {
        this.getCurrentState.updateScenario();
        this.currentScenario = MICurrentStateService.currentScenario;
      } else {
        this.updateExtraContent(this.currentScenario.correctText);
        delete MICurrentStateService.currentScenario;
        delete this.currentScenario;
        if (MICurrentStateService.user.level + 1 < this.getCurrentState.levelList.length) {
          // console.log(CurrentStateService.user.level);
          // console.log(this.getCurrentState.levelList.length);
          this.updateNotification('You have won', 'type yes to continue or no exit');
          MICurrentStateService.continuePlaying = true;
        } else {
          this.updateNotification('You have completed', 'Congratulations you have completed all modules');
          MICurrentStateService.disabled = true;
          this.disabled = MICurrentStateService.disabled;
        }
      }
    } else if (this.ifPositive(this.blank) === -1) {
      this.updatePreviousText();
      this.updateExtraContent('<i>' + this.currentScenario.wrongText + '</i>');
      delete MICurrentStateService.currentScenario;
      delete this.currentScenario;
      this.updateNotification('Stuck in a negative thought cycle ?', 'Type yes to retry or any other character to exit?');
      MICurrentStateService.retry = true;
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
            '<strong> ' +
            this.blank +
            ' </strong>' +
            this.currentScenario.problemAfterDash +
            '</p>' + '<p> >> ' + this.blank + '</p>';

    MICurrentStateService.previousText = this.previousText;
  }

  updateExtraContent(content: any) {
    this.extraContent = content;
    MICurrentStateService.extraContent = this.extraContent;
  }

  updateScore() {
    // this.scoreUpdated.emit(this.currentScenario.points);
    MICurrentStateService.user.points.push(this.currentScenario.points);
  }

  updateNotification(header: string, body: string = '') {
    this.notificationHeader = header;
    this.notificationBody = body;

    MICurrentStateService.notificationHeader = this.notificationHeader;
    MICurrentStateService.notificationBody = this.notificationBody;
  }

  exit() {
    MICurrentStateService.disabled = true;
    this.disabled = MICurrentStateService.disabled;
    this.updateNotification('Exiting!!', 'Goodbye hope to see you soon');
  }

  resetCurrent() {
    delete MICurrentStateService.currentScenario;
    delete this.currentScenario;
    MICurrentStateService.extraContent = this.extraContent = '';
    MICurrentStateService.previousText = this.previousText = '';
    MICurrentStateService.notificationBody = this.notificationBody = '';
    MICurrentStateService.notificationHeader = this.notificationHeader = '';
    this.blank = '';
  }

  onAnyWhereClick() {
    this.inputEl.nativeElement.focus();
    this.openNavBar = false;
  }
  // onPause() {
  //   this.openNavBar = true;
  // }
  onNavBarReplay() {
    this.resetCurrent();
    this.getCurrentState.resetScenario();
    this.currentScenario = MICurrentStateService.currentScenario;
    this.openNavBar = false;
    this.invalidInput = false;
    MICurrentStateService.continuePlaying = false;
    MICurrentStateService.retry = false;
    MICurrentStateService.disabled = false;
    this.disabled = false;
    MICurrentStateService.user.points.push(-Math.abs(MICurrentStateService.user.currentPoints() - 1000 * MICurrentStateService.user.level));
  }
  // onNavBarPlay() {
  //   this.openNavBar = false;
  // }
  // onNavBarHelp() {
  //   this.onNvHelp.emit();
  // }
  // onNavBarHome() {
  //   this.onNvHome.emit();
  // }


  // onFormSubmit() {
  //   this.submitBtn.nativeElement.click()
  // }

}
