import { Component, OnInit, OnDestroy, OnChanges, SimpleChanges, SimpleChange, HostListener } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

declare var flankerTaskECGame: any;

@Component({
  selector: 'app-executive-control-game',
  templateUrl: './executive-control-game.component.html',
  styleUrls: ['./executive-control-game.component.scss']
})
export class ExecutiveControlGameComponent implements OnInit, OnDestroy {
  thisGame = 'Executive Control Game';

  constructor(
    private playGameService: GamePlayService,
  ) {    }

  ngOnInit() {

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
  // @HostListener('window:CallAngularReplayGame')
  // onGameOverReplayECGame() {
  //   this.playGameService.restartExecControlGame(true, null);
  // }

  // onGameHelpClick() {
  //   this.playGameService.storeDataExecControlGame();
  //   this.playGameService.playExecControlGame(true, true, );
  // }
  ngOnDestroy() {
    console.log('exec- ng on destroy');
    this.playGameService.closeExecControlGame();
  }

}
