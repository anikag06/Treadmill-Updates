import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { IdcTimeComponent } from '../idc-time/idc-time.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

@Component({
  selector: 'app-idc-score',
  templateUrl: './idc-score.component.html',
  styleUrls: ['./idc-score.component.scss']
})
export class IdcScoreComponent implements OnInit {

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
  timeLeft! : number;

  @ViewChild('checkElement', { static: false }) element!: ElementRef;

  constructor(private gameService: IdcGameService,
              private dialogBoxService: DialogBoxService) { }


  ngOnInit() {
    
    this.score = this.gameService.score;
    this.gameService.updateBadgesValue();
      // this.timeLeft = this.gameService.timeLeft;
      // this.startTimer();
      this.gameService.levelFinish.subscribe( () => {
          this.stopTimer();
        });
      this.gameService.levelUpdate.subscribe( () => {
        this.timeLeft = this.gameService.timeLeft;
        this.difficultyValue = this.gameService.difficultyValue;
        console.log("this.difficulty value", this.difficultyValue);

        this.startTimer();
        this.updateBadges();
        
      });
  }

  openCustomDialog() {
    this.dialogBoxService.setDialogChild(IdcTimeComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  openPopup() {
    this.stopTimer();
    this.openCustomDialog();
  }

  startTimer() {
    this.interval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.openPopup();
        }
        console.log("set interval ",this.interval);
      },1000);
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
}
