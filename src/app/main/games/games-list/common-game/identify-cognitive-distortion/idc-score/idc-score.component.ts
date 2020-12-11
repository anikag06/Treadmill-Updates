import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  OnDestroy,
  Input,
} from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcTimeComponent } from '../idc-time/idc-time.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-idc-score',
  templateUrl: './idc-score.component.html',
  styleUrls: ['./idc-score.component.scss'],
})
export class IdcScoreComponent implements OnInit, OnDestroy {
  bronzeValue: any;
  silverValue: any;
  goldValue: any;
  bronzeNumber: any;
  silverNumber: any;
  goldNumber: any;
  interval!: any;
  difficultyValue!: number;
  numCorrectAnswers!: number;
  score!: number;
  timeLeft!: number;
  levelinitaliseSub!: any;
  startTimerSub: any;
  stopTimerSub: any;
  idcTimer: any[] = [];

  @ViewChild('checkElement', { static: false }) element!: ElementRef;

  constructor(
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
  ) {}

  ngOnInit() {
    this.stopTimerSub = this.gameService.stopTimer.subscribe(() => {
      this.stopTimer();
      this.gameService.timeLeft = this.timeLeft;
    });
    this.startTimerSub = this.gameService.startTimer.subscribe(() => {
      this.startTimer();
    });
    this.levelinitaliseSub = this.gameService.levelInitialise.subscribe(() => {
      this.score = this.gameService.score;
      this.timeLeft = this.gameService.timeLeft;
      this.difficultyValue = this.gameService.difficultyValue;
      this.gameService.resumeGame.emit();
      this.updateBadges();
    });
    this.gameService.resumeGame.subscribe(() => {
      this.score = this.gameService.score;
      console.log(
        'replay, timeAlloted',
        this.gameService.replay,
        this.gameService.timeAlloted,
      );
      if (this.gameService.replay === true) {
        this.timeLeft = this.gameService.timeAlloted;
      } else {
        this.timeLeft = this.gameService.timeLeft;
      }
    });
  }
  ngOnDestroy(): void {
    this.levelinitaliseSub.unsubscribe();
    this.startTimerSub.unsubscribe();
    this.stopTimerSub.unsubscribe();
    this.idcTimer.forEach(() => {
      clearInterval(this.interval);
    });
  }

  openCustomDialog() {
    this.dialogBoxService.setDialogChild(IdcTimeComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  openPopup() {
    this.openCustomDialog();
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.stopTimer();
        this.openPopup();
      }
    }, 1000);
    this.idcTimer.push(this.interval);
  }

  stopTimer() {
    console.log('TIME LEFT', this.timeLeft, this.gameService.infoOpen);
    clearInterval(this.interval);
    this.gameService.timeActualLeft = this.timeLeft;
    if (this.gameService.infoOpen) {
      this.gameService.timeLeft = this.timeLeft;
    }
  }

  updateBadges() {
    this.goldNumber = this.gameService.goldNumber;
    this.goldValue = this.gameService.goldValue;
    this.bronzeNumber = this.gameService.bronzeNumber;
    this.bronzeValue = this.gameService.bronzeValue;
    this.silverNumber = this.gameService.silverNumber;
    this.silverValue = this.gameService.silverValue;
  }
  onPause() {
    this.stopTimer();
  }
}
