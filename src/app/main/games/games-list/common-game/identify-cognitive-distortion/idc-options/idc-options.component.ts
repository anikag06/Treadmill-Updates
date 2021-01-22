import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { IdcGameService } from '../idc-game.service';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IdcPopupComponent } from '../idc-popup/idc-popup.component';
import {
  ICDGameUserData,
  ICDGameUserAnswerData,
} from '@/main/games/shared/game-play.model';

@Component({
  selector: 'app-idc-options',
  templateUrl: './idc-options.component.html',
  styleUrls: ['./idc-options.component.scss'],
})
export class IdcOptionsComponent implements OnInit {
  index!: any;
  game!: any;
  correct!: any;
  correctOptionsLength!: any;
  selectedCorrectOptionsLength = 0;
  correctOptionFound = -1;
  optionOne!: any;
  optionOneDistortion!: any;
  optionTwo!: any;
  optionTwoDistortion!: any;
  optionThree!: any;
  optionThreeDistortion!: any;
  optionFour!: any;
  optionFourDistortion!: any;
  optionFive!: any;
  optionFiveDistortion!: any;
  optionSix!: any;
  optionSixDistortion!: any;
  optionStatus = '';
  optionStatusCount = 0;
  situation_distortion_map_id!: number;
  situation_displayed_at!: any;
  answered_at!: any;
  time!: any;
  userAnswerData = new ICDGameUserAnswerData(0, 0, 0);
  errorBarWidth!: number;
  showBar = false;

  @ViewChild('checkElement', { static: false }) element!: ElementRef;
  @Input() blurred!: boolean;

  constructor(
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
  ) {}

  ngOnInit() {
    this.optionsCall();

    this.gameService.levelInitialise.subscribe(() => {
      this.showBar = true;
      this.optionStatus = this.gameService.optionStatus;
      this.optionStatusCount = this.gameService.optionStatusCount;
      this.errorBarWidth = Math.floor(200 / this.correct.length);
      const button = this.element.nativeElement.querySelectorAll('button');
      for (let i = button.length - 1; i >= 0; i--) {
        button[i].classList.remove('correctOption');
        button[i].classList.remove('incorrectOption');
      }
    });
    this.gameService.resumeGame.subscribe(() => {
      this.optionStatus = this.gameService.optionStatus;
      this.optionStatusCount = this.gameService.optionStatusCount;
      if (this.gameService.replay === true) {
        this.gameService.replay = false;
        const button = this.element.nativeElement.querySelectorAll('button');
        for (let i = button.length - 1; i >= 0; i--) {
          button[i].classList.remove('correctOption');
          button[i].classList.remove('incorrectOption');
        }
      }
    });
  }

  openCustomDialog() {
    this.dialogBoxService.setDialogChild(IdcPopupComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  onOptionClick(item: any, event: any) {
    this.gameService.stopTimer.next();
    this.gameService.optionSelected = item.distortion;
    this.gameService.optionMessage = item.message;
    this.situation_distortion_map_id = item.id;
    this.time = new Date();
    this.answered_at = this.time.toJSON();
    this.updateUserAnswerData();
    this.storeUserAnswerData();
    this.correct.forEach((correctItem: any) => {
      if (correctItem.id === item.id) {
        event.target.classList.add('correctOption');
        if (!this.gameService.selectedCorrectOptionsSet.has(item.id)) {
          this.gameService.optionStatusCount += 1;
          this.gameService.selectedCorrectOptionsSet.add(item.id);
        }
        this.gameService.optionStatus = 'correct';
        this.optionStatusCount = this.gameService.optionStatusCount;
        this.optionStatus = this.gameService.optionStatus;
        this.correctOptionFound = 1;
        this.gameService.score += 10;
        this.gameService.numCorrectAnswers += 1;
      } else {
        event.target.classList.add('incorrectOption');
      }
    });
    if (this.correctOptionFound !== 1) {
      this.gameService.optionStatus = 'incorrect';
    }

    if (
      this.gameService.selectedCorrectOptionsSet.size === this.correct.length
    ) {
      this.gameService.selectedCorrectOptionsSet.clear();
      this.gameService.optionStatus = 'allcorrect';
      this.optionStatus = this.gameService.optionStatus;
      this.gameService.updateBadgesValue();
      this.gameService.stopTimer.next();
      // this.gameService.levelOrder += 1;
      this.gameService.last_completed_order += 1;
      this.showBar = false;
    }
    this.openCustomDialog();
    this.correctOptionFound = -1;
  }

  optionsCall() {
    this.gameService.optionOne.subscribe(data => {
      this.optionOne = data;
      this.optionOneDistortion = data.distortion;
    });
    this.gameService.optionTwo.subscribe(data => {
      this.optionTwo = data;
      this.optionTwoDistortion = data.distortion;
    });
    this.gameService.optionThree.subscribe(data => {
      this.optionThree = data;
      this.optionThreeDistortion = data.distortion;
    });
    this.gameService.optionFour.subscribe(data => {
      this.optionFour = data;
      this.optionFourDistortion = data.distortion;
    });
    this.gameService.optionFive.subscribe(data => {
      this.optionFive = data;
      this.optionFiveDistortion = data.distortion;
    });
    this.gameService.optionSix.subscribe(data => {
      this.optionSix = data;
      this.optionSixDistortion = data.distortion;
    });
    this.gameService.correct.subscribe(data => {
      this.correct = data;
    });
  }

  updateUserAnswerData() {
    this.userAnswerData.situation_distortion_map_id = this.situation_distortion_map_id;
    this.userAnswerData.situation_displayed_at = this.gameService.situation_displayed_at;
    this.userAnswerData.answered_at = this.answered_at;
  }

  storeUserAnswerData() {
    this.gameService.saveUserAnswerData(this.userAnswerData).subscribe();
  }
}
