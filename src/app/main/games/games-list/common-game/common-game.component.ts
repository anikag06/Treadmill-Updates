import { Component, OnInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import { GamePlayService } from '../../shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart } from '@angular/router';
import { Game } from '@/main/shared/game.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { GamesAuthService } from '../../shared/games-auth.service';
import { MentalImageryComponent } from './mental-imagery/mental-imagery.component';
import { Overlay } from '@angular/cdk/overlay';
import { EXECUTIVE_CONTROL_GAME,
  INTERPRETATION_BIAS_GAME,
  LEARNED_HELPLESSNESS_GAME,
  ATTRIBUTE_STYLE_GAME,
  MENTAL_IMAGERY_GAME,
  FRIENDLY_FACE_GAME } from '@/app.constants';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IbGameInstructionsComponent } from './interpretation-bias-game/ib-game-instructions/ib-game-instructions.component';
import { ExecControlInstructionsComponent } from './executive-control-game/exec-control-instructions/exec-control-instructions.component';
import { MIPlayService } from './mental-imagery/mi-play.service';

declare let $: any;

@Component({
  selector: 'app-common-game',
  templateUrl: './common-game.component.html',
  styleUrls: ['./common-game.component.scss'],
})
export class CommonGameComponent implements OnInit {

  game!: Game;
  gameName!: string;

  showSecondPlayBtn = true;
  isExecutiveControl = false;
  isInterpretationBias = false;
  isLearnedHelplessness = false;
  isMentalImagery = false;
  isFriendlyFace = false;
  showHintBtn = false;
  isSoundOn = true;
  showSideButtons = false;

  isAttributeGame = false;

  gameStarted = false;

  device_type = 'click';     // whether touch or click for using in friendly face game
  currLocation: any;

  subscriptionRouter!: Subscription;

  @ViewChild('firstpage_btns', {static: false}) firstPageElement!: ElementRef;
  @ViewChild('start_game_btns', {static: false}) startGameBtn!: ElementRef;
  @ViewChild('pause_common_div', {static: false}) pauseBtnElement!: ElementRef;
  @ViewChild('gameDiv', {static: false}) gameDivElement!: ElementRef;

  gameElement!: ElementRef;

  // for mental imagery game
  @ViewChild(MentalImageryComponent, {static: false}) miGameComponent!: MentalImageryComponent;

  constructor(private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialogBoxService: DialogBoxService,
    private miPlayService: MIPlayService,
  ) {   }

  ngOnInit() {
    this.subscriptionRouter = this.route.params
      .pipe(
        map(v => v.name),
        switchMap(name => this.gamePlayService.getGameInfo(name))
      )
      .subscribe(
        (game) =>  {
          this.game = <Game>game;
          this.gameName = this.game.name;
          if (this.gameName === EXECUTIVE_CONTROL_GAME) {
            this.isExecutiveControl = true;
          } else if (this.gameName === INTERPRETATION_BIAS_GAME) {
            this.isInterpretationBias = true;
            this.showHintBtn = true;
          } else if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
            this.isLearnedHelplessness = true;
          } else if (this.gameName === ATTRIBUTE_STYLE_GAME) {
            this.isAttributeGame = true;
            // console.log('Attribute Style Game');
          } else if (this.gameName === FRIENDLY_FACE_GAME) {
            this.isFriendlyFace = true;
          } else if (this.gameName === MENTAL_IMAGERY_GAME) {
            this.isMentalImagery = true;
          }
        },
        (error) => {
          this.router.navigate(['games']);
        }
      );
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    if (this.gameStarted === true) {
      this.onPauseClick();
    }
  }

  onPlayClick() {
    this.gameStarted = true;
    this.showSideButtons = false;
    this.firstPageElement.nativeElement.classList.add('d-none');
    this.startGameBtn.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');

    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.playIBGame(this.gameDivElement);
    } else if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.showSecondPlayBtn = false;
      this.gamePlayService.playExecControlGame(this.isSoundOn, false);
    } else if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.gamePlayService.playLearnedHelplessnessGame();
    } else if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.playAttributionStyleGame();
      // console.log('play button');
    } else if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.playFriendlyFaceGame(this.device_type);
    } else if (this.gameName === MENTAL_IMAGERY_GAME) {
      // this.miGameComponent.startPlayingMIGame();
      this.gamePlayService.playMentalImageryGame(this.gameDivElement);
    }
  }

  onHelpClick() {
    this.showSideButtons = false;

    this.firstPageElement.nativeElement.classList.add('d-none');
    this.startGameBtn.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');

    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.showSecondPlayBtn = false;
      this.dialogBoxService.setDialogChild(ExecControlInstructionsComponent);
      // this.gamePlayService.helpExecControlGame(this.isSoundOn, this.gameDivElement);
    }
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.helpIBGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.gamePlayService.helpMIGame();
    }
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.pauseBtnElement.nativeElement.dispatchEvent(domEvent);

  }
  onHomeClick() {
    this.showSideButtons = false;
    window.location.reload();
    // $( '#game_div' ).load(window.location.href + ' #game_div' );
  }

  onExitClick() {
    this.router.navigate(['/games']);
  }

  onPauseClick() {
    this.showSideButtons = true;
    this.pauseBtnElement.nativeElement.classList.add('d-none');
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.pauseIBGame();
    }
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.gamePlayService.pauseExecControlGame();
    }
    if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.pauseAttributionStyleGame();
    }
    if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.gamePlayService.pauseLHGame();
    }
    if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.pauseFaceGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.miGameComponent.pauseMIGame();
    }
  }

  onResumeClick() {
    this.showSideButtons = false;
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.gamePlayService.resumeExecControlGame();
    }
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.resumeIBGame();
    }
    if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.resumeAttributionStyleGame();
    }
    if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.gamePlayService.resumeLHGame();
    }
    if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.resumeFaceGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.miGameComponent.resumeMIGame();
    }
  }

  onRestartClick() {
    this.showSideButtons = false;
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.isSoundOn = true;
      this.gamePlayService.restartExecControlGame(this.isSoundOn);
    }
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.playIBGame(this.gameDivElement);                      // same function for start and restart the game
    }
    if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.restartAttributionStyleGame();
    }
    if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.restartFaceGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.miGameComponent.replayMIGame();
    }
  }

  onSoundClick() {
    this.isSoundOn = !this.isSoundOn;
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.gamePlayService.soundExecControlGame(this.isSoundOn);
    }
    // else if (this.gameName === FRIENDLY_FACE_GAME) {
    //   this.gamePlayService.pauseFaceGame();
    // }
  }

  @HostListener('touchstart')
  onTouchEvent() {
    this.device_type = 'touch';
  }

}
