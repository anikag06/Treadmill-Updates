import {
  Component,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChanges,
  SimpleChange,
  HostListener, ViewChild, ElementRef,
} from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import {GamesFeedbackComponent} from "@/main/games/games-list/common-game/games-feedback/games-feedback.component";
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';

declare var flankerTaskECGame: any;

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss'],
})
export class ExecutiveControlGameComponent implements OnInit, OnDestroy {
  thisGame = 'Executive Control Game';

  constructor(
    private playGameService: GamePlayService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService,
  ) {}
  @ViewChild('newElement', { static: false }) element!: ElementRef;


  ngOnInit() {
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
