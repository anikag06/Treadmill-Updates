import { Component, OnInit, HostListener } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';

@Component({
  selector: 'app-learned-helplessness-game',
  templateUrl: './learned-helplessness-game.component.html',
  styleUrls: ['./learned-helplessness-game.component.scss']
})
export class LearnedHelplessnessGameComponent implements OnInit {

  constructor(
    private gamePlayService: GamePlayService
  ) { }

  @HostListener('window:CallLevelChangeStoreFun')
  onLevelChangeLHGame() {
    this.updateColorReverseGameData();
  }

  ngOnInit() {
  }

  updateColorReverseGameData() {
    this.gamePlayService.lhGameColorReverseStoreData();
  }
  updateUnsolvableTask1Data(isFirstLevel: boolean) {
    this.gamePlayService.lhGameStoreTask1Data(isFirstLevel);
  }
  updateUnsolvableTask2Data() {
    this.gamePlayService.lhGameStoreTask2Data();
  }
  updateUnsolvableTask3Data() {
    this.gamePlayService.lhGameStoreTask3Data();
  }

}
