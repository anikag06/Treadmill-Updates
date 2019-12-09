import { Component, OnInit, HostListener, Output, ViewChild, ElementRef } from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { LhgInstructionsComponent } from './lhg-instructions/lhg-instructions.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { LhgPlaynextgameComponent } from './lhg-playnextgame/lhg-playnextgame.component';


@Component({
  selector: 'app-learned-helplessness-game',
  templateUrl: './learned-helplessness-game.component.html',
  styleUrls: ['./learned-helplessness-game.component.scss']
})
export class LearnedHelplessnessGameComponent implements OnInit {

  

  constructor(
    private gamePlayService: GamePlayService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService
  ) { }

  @ViewChild('infoElement', { static: false }) element!: ElementRef;
  @HostListener('window:CallLevelChangeStoreFun')
  onLevelChangeLHGame() {
    this.updateColorReverseGameData();
  }

  @HostListener('window:CallPlayNext')
  openPlayNextPopup() {
    this.dialogBoxService.setDialogChild(LhgPlaynextgameComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  ngOnInit() {
    this.loadFileService.loadExternalScript("./assets/games/learning-helplessness/js/unsolvable_puzzle_1.js").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalScript("./assets/games/learning-helplessness/js/unsolvable_puzzle_2.js").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalScript("./assets/games/learning-helplessness/js/unsolvable_puzzle_3.js").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalScript("./assets/games/learning-helplessness/js/color_reverse_game.js").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalStyles("./assets/games/learning-helplessness/css/color_reverse_game.css").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalStyles("./assets/games/learning-helplessness/css/unsolvable_puzzle_1.css").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalStyles("./assets/games/learning-helplessness/css/unsolvable_puzzle_1.css").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalStyles("./assets/games/learning-helplessness/css/unsolvable_puzzle_2.css").then(() => { }).catch(() => { });
    this.loadFileService.loadExternalStyles("./assets/games/learning-helplessness/css/unsolvable_puzzle_3.css").then(() => { }).catch(() => { });

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

  openInstructionsPopup() {
    this.dialogBoxService.setDialogChild(LhgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

}
