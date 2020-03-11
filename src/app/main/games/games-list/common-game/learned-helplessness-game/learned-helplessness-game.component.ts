import {
  Component,
  OnInit,
  HostListener,
  Output,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { LoadFilesService } from '@/main/games/shared/load-files.service';
import { LhgInstructionsComponent } from './lhg-instructions/lhg-instructions.component';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { LhgPlaynextgameComponent } from './lhg-playnextgame/lhg-playnextgame.component';
import { Router } from '@angular/router';
import { GamesAuthService } from '@/main/games/shared/games-auth.service';
import { LhgGreatComponent } from './lhg-great/lhg-great.component';
import { GamesFeedbackComponent } from '../games-feedback/games-feedback.component';
import { GameFeedback } from '../games-feedback/game-feedback.model';
import { GamesFeedbackService } from '../games-feedback/games-feedback.service';

@Component({
  selector: 'app-learned-helplessness-game',
  templateUrl: './learned-helplessness-game.component.html',
  styleUrls: ['./learned-helplessness-game.component.scss'],
})
export class LearnedHelplessnessGameComponent implements OnInit, OnDestroy {
  ask_feedback: any;
  playAgain!: boolean;
  goHome!: boolean;
  constructor(
    private gamePlayService: GamePlayService,
    private loadFileService: LoadFilesService,
    private dialogBoxService: DialogBoxService,
    private router: Router,
    private gamesAuthService: GamesAuthService,
    private gamesFeedbackService: GamesFeedbackService,
  ) {}

  @ViewChild('infoElement', { static: false }) element!: ElementRef;
  @HostListener('window:CallLevelChangeStoreFun')
  onLevelChangeLHGame() {
    this.updateColorReverseGameData();
  }

  @HostListener('window:CallPlayNext')
  openPlayNextPopup() {
    console.log('open play next popup');
    this.dialogBoxService.setDialogChild(LhgPlaynextgameComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:CallGreatPopUp')
  openGreatPopup() {
    this.dialogBoxService.setDialogChild(LhgGreatComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('window:CallGameComplete')
  onGameComplete(userData: any) {
    this.updateOverallData(userData);
  }

  ngOnInit() {
    this.loadFileService
      .loadExternalScript(
        './assets/games/learning-helplessness/js/unsolvable_puzzle_1.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        './assets/games/learning-helplessness/js/unsolvable_puzzle_2.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        './assets/games/learning-helplessness/js/unsolvable_puzzle_3.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalScript(
        './assets/games/learning-helplessness/js/color_reverse_game.js',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalStyles(
        './assets/games/learning-helplessness/css/color_reverse_game.css',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalStyles(
        './assets/games/learning-helplessness/css/unsolvable_puzzle_1.css',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalStyles(
        './assets/games/learning-helplessness/css/unsolvable_puzzle_1.css',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalStyles(
        './assets/games/learning-helplessness/css/unsolvable_puzzle_2.css',
      )
      .then(() => {})
      .catch(() => {});
    this.loadFileService
      .loadExternalStyles(
        './assets/games/learning-helplessness/css/unsolvable_puzzle_3.css',
      )
      .then(() => {})
      .catch(() => {});
    this.gamesAuthService.lhGameGetOverallData().subscribe(overall_data => {
      console.log('overall data', overall_data);
      this.gamePlayService.lhgShowSummary = overall_data.show_summary_button;
      this.ask_feedback = overall_data.ask_for_feedback;
    });
    this.gamesFeedbackService.feedback.subscribe(() => {
      if (this.playAgain) {
        this.onPlayAgain();
      }
      if (this.goHome) {
        this.onGoToHome();
      }
      console.log('STATUS', this.playAgain, this.goHome);
    });
  }

  ngOnDestroy(): void {}

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

  updateOverallData(userData: any) {
    this.gamePlayService.lhGameStoreOverallData(userData);
  }

  openInstructionsPopup() {
    this.dialogBoxService.setDialogChild(LhgInstructionsComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }

  onGoToHome() {
    this.goHome = true;
    this.gamePlayService.lhGameHome = this.goHome;
    if (this.ask_feedback) {
      this.openFeedbackPopup();
      this.ask_feedback = false;
    } else {
      const showSummary = document.getElementById('explanation-row');
      if (showSummary) {
        showSummary.classList.add('d-none');
      }
      this.router.navigate(['/']);
    }
  }

  onPlayAgain() {
    this.playAgain = true;
    this.gamePlayService.lhGamePlayAgain = this.playAgain;
    if (this.ask_feedback) {
      this.openFeedbackPopup();
      this.ask_feedback = false;
    } else {
      const showSummary = document.getElementById('explanation-row');
      if (showSummary) {
        showSummary.classList.add('d-none');
      }
      this.gamePlayService.playLearnedHelplessnessGame();
    }
  }

  openFeedbackPopup() {
    this.dialogBoxService.setDialogChild(GamesFeedbackComponent);
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.element.nativeElement.dispatchEvent(domEvent);
  }
}
