import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  HostListener,
  ViewChild,
  ElementRef,
  Output,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { GamesFeedbackComponent } from '@/main/games/games-list/common-game/games-feedback/games-feedback.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { CommonService } from '@/shared/common.service';
import { PLAYING_GAMES_SCORE, TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';

declare var flankerTaskECGame: any;

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss'],
})
export class ExecutiveControlGameComponent
  implements OnInit, OnDestroy, AfterViewInit {
  gameName!: string;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  step_id!: number;
  showLoading = true;
  orientKey = 'orientation';
  imagesPreloaded = false;

  constructor(
    private playGameService: GamePlayService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
    private commonService: CommonService,
  ) {}
  @ViewChild('newElement', { static: false }) element!: ElementRef;
  @ViewChild('scroll', { static: false }) scroll!: ElementRef;

  @Output() showPlayButtons = new EventEmitter();

  @HostListener('window:CallLevelChange')
  onLevelChange() {
    this.commonService.updateScore(PLAYING_GAMES_SCORE);
  }

  @HostListener('window:orientationchange')
  onOrientationChange() {
    window.location.reload();
  }
  @HostListener('window:ecgScrollEvent')
  scrollDown() {
    setTimeout(() => {
      this.scroll.nativeElement.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  }
  ngOnInit() {
    this.gameName = this.playGameService.gameName;
    this.activatedRoute.params.subscribe(v => {
      this.step_id = v.id;
      if (this.step_id) {
        this.stepDataService.getStepData(this.step_id).subscribe((res: any) => {
          const step = res.data;
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
          this.flowService.stepDetail.emit(this.navbarTitle);
        });
      }
    });
    // Action files
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Actions/jump.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Actions/shooting.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Actions/scene_changer.js',
      )
      .then(() => {})
      .catch(() => {});

    //  game elements
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/coin_generator.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/obstacle_generator.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/pit_generator.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/dropping_platform.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/extra_life.js',
      )
      .then(() => {})
      .catch(() => {});
    // tslint:disable-next-line: max-line-length
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Elements/coin_generator_with_obstacle.js',
      )
      .then(() => {})
      .catch(() => {});

    // Executive control tasks
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Tasks/task_generator.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Tasks/flanker_task.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Tasks/discrimination_task.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/Game_Components/Tasks/game_restorer.js',
      )
      .then(() => {})
      .catch(() => {});

    this.loadFileService
      .loadExternalScript('assets/games/executive-control-game/js/init.js')
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/exec_game_javascript.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        'assets/games/executive-control-game/js/ecg_preload_assets.js',
      )
      .then(() => {
        this.imagesPreloaded = true;
      })
      .catch(() => {});
  }

  ngAfterViewInit() {}

  @HostListener('window:CallAngularStoreTaskDataFun')
  onStoreTaskDataECGame() {
    this.playGameService.storeFlankerDiscriTaskData();
  }
  @HostListener('window:CallAngularECScoreFun')
  onStoreScoreDataECGame() {
    this.playGameService.storeDataExecControlGame();
  }
  @HostListener('window:beforeunload')
  onCloseStoreScoreDataECGame() {
    this.playGameService.storeDataExecControlGame();
  }
  @HostListener('window:Feedback')
  openFeedbackPopup() {
    this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  ngOnDestroy() {
    this.playGameService.closeExecControlGame();
  }
  removeLoading() {
    const tid = setInterval(() => {
      if (!this.imagesPreloaded) {
        return;
      }
      clearInterval(tid);
      // called when images loaded
      this.showLoading = false;
      this.showPlayButtons.emit();
    }, 100);
  }
}
