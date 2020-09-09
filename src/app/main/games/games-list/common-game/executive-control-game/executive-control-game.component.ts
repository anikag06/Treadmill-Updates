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
} from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { GamesFeedbackComponent } from '@/main/games/games-list/common-game/games-feedback/games-feedback.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { map, switchMap } from 'rxjs/operators';
import { FlowService } from '@/main/flow/flow.service';
import { ActivatedRoute } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';

declare var flankerTaskECGame: any;

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss'],
})
export class ExecutiveControlGameComponent implements OnInit, OnDestroy {
  gameName!: string;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;

  constructor(
    private playGameService: GamePlayService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService,
    private flowService: FlowService,
    private activatedRoute: ActivatedRoute,
    private stepDataService: StepsDataService,
  ) {}
  @ViewChild('newElement', { static: false }) element!: ElementRef;

  ngOnInit() {
    console.log('game name' , this.playGameService.gameName);
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
  }

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
    console.log('exec- ng on destroy');
    this.playGameService.closeExecControlGame();
  }
}
