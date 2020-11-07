import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { GamesFeedbackComponent } from '@/main/games/games-list/common-game/games-feedback/games-feedback.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import {CommonService} from '@/shared/common.service';
import {PLAYING_GAMES_SCORE} from '@/app.constants';

declare var ASGAnswer: any;

@Component({
  selector: 'app-attribute-style-game',
  templateUrl: './attribute-style-game.component.html',
  styleUrls: ['./attribute-style-game.component.scss'],
})
export class AttributeStyleGameComponent implements OnInit, OnDestroy {
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  gameName!: string;
  showLoading = true;
  constructor(
    private loadFileService: LoadFilesService,
    private gamesAuthService: GamesAuthService,
    private gamePlayService: GamePlayService,
    private dialogBoxService: DialogBoxService,
    private router: Router,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private commonService: CommonService,
  ) {}
  @ViewChild('newElement', { static: false }) element!: ElementRef;
  @Output() showPlayButtons = new EventEmitter();
  @HostListener('window:CallAsgLevelComplete')
    onLevelComplete(userData: any) {
      this.commonService.updateScore(PLAYING_GAMES_SCORE);
  }

  ngOnInit() {
    console.log('game name', this.gamePlayService.gameName);
    this.gameName = this.gamePlayService.gameName;
    this.loadFileService
      .loadExternalScript('./assets/games/Attribution-style-game/src/app.js')
      .then(() => {})
      .catch(() => {});
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
    this.gamePlayService.ASGUserData();

    /* this.gamesAuthService.atGetAnswers().subscribe(
      e => {
        ASGAnswer = e;
        console.log(ASGAnswer);
      }
    );*/
  }

  @HostListener('window:ASGPostIndividualLevelPerformance')
  postIndividualLevelPerformance() {
    console.log('works1');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGPostLevelTwoPerformance')
  postLevelTwoPerformance() {
    console.log('works2');
    this.gamePlayService.postIndividualLevelASG();
  }

  @HostListener('window:ASGpostUserAnswer')
  ASGpostUserAnswer() {
    console.log('works2');
    this.gamePlayService.postUserAnswer();
  }

  @HostListener('window:ASGpostUserExplanation')
  ASGpostUserExplanation() {
    console.log('works2');
    this.gamePlayService.postUserExplanation();
  }

  @HostListener('window:Feedback')
  openFeedbackPopup() {
    this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:ASGPut')
  ASGPutRequest() {
    this.gamePlayService.putUserPerformance();
  }

  @HostListener('window:GoHome')
  ASGgoHome() {
    console.log('gohome');
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    console.log('exec- ng on destroy');
    this.gamePlayService.closeASGame();
  }
  removeLoading() {
    console.log('IMAGE LOADED');
    setTimeout(() => {
      this.showLoading = false;
      this.showPlayButtons.emit();
    }, 100);
  }
}
