import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter} from '@angular/core';
import { IdcGameService } from './idc-game.service';
import { IdcScoreComponent } from './idc-score/idc-score.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IdcInfoComponent } from './idc-info/idc-info.component';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-identify-cognitive-distortion',
  templateUrl: './identify-cognitive-distortion.component.html',
  styleUrls: ['./identify-cognitive-distortion.component.scss'],
})
export class IdentifyCognitiveDistortionComponent implements OnInit {
  @ViewChild(IdcScoreComponent, { static: false })
  idcScoreComponent!: IdcScoreComponent;
  @ViewChild('infoElement', { static: false }) element!: ElementRef;
  @Output() showPlayButtons = new EventEmitter();

  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  playing = false;
  gameName!: string;
  blurred = false;
  showLoading = true;

  constructor(
    private gameService: IdcGameService,
    private dialogBoxService: DialogBoxService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private playGameService: GamePlayService,
  ) {}

  ngOnInit() {
    this.gameName = this.playGameService.gameName;
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.stepDataService.getStepData(id)),
      )
      .subscribe((res: any) => {
        const step = res.data;
        console.log('RESPONSE', res.data, step.status);
        // for navbar title
        this.stepGroupSequence = step.step_group_sequence + 1;
        this.stepSequence = step.sequence + 1;
        this.stepName = step.name;
        this.navbarTitle =
          this.stepGroupSequence.toString() +
          '.' +
          this.stepSequence.toString() +
          ' ' +
          this.stepName;
        console.log('STEP DETAIL:', this.navbarTitle);
        this.flowService.stepDetail.emit(this.navbarTitle);
      });

    this.gameService.initUserData();
    this.gameService.startPlayingIdc.subscribe(() => {
      this.startPlaying();
    });
  }

  startPlaying() {
    this.playing = true;
    if (this.idcScoreComponent) {
      this.resumeIDCGame();
    }
  }

  replayIDCGame() {
    this.gameService.optionStatus = '';
    this.gameService.optionStatusCount = 0;
    this.gameService.getUserData();
    // this.gameService.levelInitialise.emit();
    this.removeBlurrBackground();
  }

  pauseIDCGame() {
    this.idcScoreComponent.onPause();
    this.blurrBackground();
  }

  resumeIDCGame() {
    this.idcScoreComponent.startTimer();
    this.removeBlurrBackground();
  }

  blurrBackground() {
    const custom_container = document.getElementById('blurrContainer');
    if (custom_container) {
      custom_container.classList.add('blurrContainer');
    }
    this.blurred = true;
  }

  removeBlurrBackground() {
    const custom_container = document.getElementById('blurrContainer');
    if (custom_container) {
      custom_container.classList.remove('blurrContainer');
    }
    this.blurred = false;
  }
  openInfoPopup() {
    this.dialogBoxService.setDialogChild(IdcInfoComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }
  removeLoading() {
    setTimeout( () => {
      this.showLoading = false;
      this.showPlayButtons.emit();
    }, 1000);
  }
}
