import { Component, OnInit, ElementRef, ViewChild, OnDestroy } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcTimeComponent } from '../idc-time/idc-time.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-idc-score',
  templateUrl: './idc-score.component.html',
  styleUrls: ['./idc-score.component.scss']
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

  @ViewChild('checkElement', { static: false }) element!: ElementRef;

  constructor(private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService) { }


  ngOnInit() {
    this.gameService.levelFinish.subscribe(() => {
      this.stopTimer();
    });
    this.levelinitaliseSub = this.gameService.levelInitialise.subscribe(() => {
      this.score = this.gameService.score;
      this.timeLeft = this.gameService.timeLeft;
      this.difficultyValue = this.gameService.difficultyValue;
      this.startTimer();
      this.updateBadges();
      console.log('ngoninit called');
    });
    // console.log('ngoninit called');
  }
  ngOnDestroy(): void {
    this.levelinitaliseSub.unsubscribe();
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
        console.log('time left', this.timeLeft, this.interval);
      } else {
        this.stopTimer();
        this.openPopup();
      }
    }, 1000);
    console.log('interval name', this.interval);
  }

  stopTimer() {
    clearInterval(this.interval);
    this.gameService.timeActualLeft = this.timeLeft;
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
