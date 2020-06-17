import {
  Component,
  OnInit,
  HostListener,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { GamePlayService } from '../../shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import {
  Router,
  ActivatedRoute,
  RouterEvent,
  NavigationStart,
} from '@angular/router';
import { Game } from '@/main/shared/game.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription, Observable } from 'rxjs';
import { Location } from '@angular/common';
import { GamesAuthService } from '../../shared/games-auth.service';
import { MentalImageryComponent } from './mental-imagery/mental-imagery.component';
import { Overlay } from '@angular/cdk/overlay';
import {
  EXECUTIVE_CONTROL_GAME,
  INTERPRETATION_BIAS_GAME,
  LEARNED_HELPLESSNESS_GAME,
  ATTRIBUTE_STYLE_GAME,
  MENTAL_IMAGERY_GAME,
  FRIENDLY_FACE_GAME,
  IDENTIFY_COGNITIVE_DISTORTION_GAME,
} from '@/app.constants';
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { IbGameInstructionsComponent } from './interpretation-bias-game/ib-game-instructions/ib-game-instructions.component';
import { ExecControlInstructionsComponent } from './executive-control-game/exec-control-instructions/exec-control-instructions.component';
import { MIPlayService } from './mental-imagery/mi-play.service';
import { EcgScienceComponent } from './executive-control-game/ecg-science/ecg-science.component';
import { IbgScienceComponent } from './interpretation-bias-game/ibg-science/ibg-science.component';
import { AsgScienceComponent } from './attribute-style-game/asg-science/asg-science.component';
import { MigScienceComponent } from './mental-imagery/mig-science/mig-science.component';
import { FfgScienceComponent } from './friendly-face-game/ffg-science/ffg-science.component';
import { LhgScienceComponent } from './learned-helplessness-game/lhg-science/lhg-science.component';
import { IdentifyCognitiveDistortionComponent } from './identify-cognitive-distortion/identify-cognitive-distortion.component';
import { LhgHowtoplayComponent } from './learned-helplessness-game/lhg-howtoplay/lhg-howtoplay.component';
import { IdcGameService } from './identify-cognitive-distortion/idc-game.service';
import {IntroService} from "@/main/walk-through/intro.service";

declare let $: any;

@Component({
  selector: 'app-common-game',
  templateUrl: './common-game.component.html',
  styleUrls: ['./common-game.component.scss'],
})
export class CommonGameComponent implements OnInit {
  game!: Game;
  gameName!: string;

  isExecutiveControl = false;
  isInterpretationBias = false;
  isLearnedHelplessness = false;
  isMentalImagery = false;
  isFriendlyFace = false;
  isIdentifyCognitiveDistortion = false;
  showHintBtn = false;
  isSoundOn = true;
  showSideButtons = false;

  isAttributeGame = false;

  gameStarted = false;
  gamePaused = false;
  portraitGame = false;

  device_type = 'click'; // whether touch or click for using in friendly face game
  currLocation: any;

  subscriptionRouter!: Subscription;

  @ViewChild('firstpage_btns', { static: false }) firstPageElement!: ElementRef;
  @ViewChild('start_game_btns', { static: false }) startGameBtn!: ElementRef;
  @ViewChild('pause_common_div', { static: false })
  pauseBtnElement!: ElementRef;
  @ViewChild('gameDiv', { static: false }) gameDivElement!: ElementRef;

  gameElement!: ElementRef;
  showComponent = true;

  // for mental imagery game
  @ViewChild(MentalImageryComponent, { static: false })
  miGameComponent!: MentalImageryComponent;
  @ViewChild(IdentifyCognitiveDistortionComponent, { static: false })
  idcComponent!: IdentifyCognitiveDistortionComponent;

  constructor(
    private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private dialogBoxService: DialogBoxService,
    private miPlayService: MIPlayService,
    private ref: ChangeDetectorRef,
    private idcGameService: IdcGameService,
    private introService : IntroService,
  ) {}

  ngOnInit() {
    this.subscriptionRouter = this.route.params
      .pipe(
        map(v => v.name),
        switchMap(name => this.gamePlayService.getGameInfo(name)),
      )
      .subscribe(
        game => {
          this.game = <Game>game;
          this.gameName = this.game.name;
          console.log(this.gameName);
          this.gamePlayService.gameName = this.gameName;
          this.gamePlayService.gameSlug = this.game.slug;
          console.log(this.gamePlayService.gameName);
          this.gamePlayService.gameTitle.emit();

          if (this.gameName === EXECUTIVE_CONTROL_GAME) {
            this.isExecutiveControl = true;
            this.portraitGame = false;
          } else if (this.gameName === INTERPRETATION_BIAS_GAME) {
            this.isInterpretationBias = true;
            this.showHintBtn = true;
            this.portraitGame = true;
          } else if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
            this.isLearnedHelplessness = true;
            this.portraitGame = true;
          } else if (this.gameName === ATTRIBUTE_STYLE_GAME) {
            this.isAttributeGame = true;
            this.portraitGame = false;
            // console.log('Attribute Style Game');
          } else if (this.gameName === FRIENDLY_FACE_GAME) {
            this.isFriendlyFace = true;
            this.portraitGame = true;
          } else if (this.gameName === MENTAL_IMAGERY_GAME) {
            this.isMentalImagery = true;
            this.portraitGame = true;
          } else if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
            console.log('cognitive distortion');
            this.isIdentifyCognitiveDistortion = true;
            this.portraitGame = true;
          }
        },
        error => {
          this.router.navigate(['games']);
        },
      );
    this.idcGameService.resumeGame.subscribe(() => {
      this.onResumeClick();
    });
  }

  @HostListener('window:blur', ['$event'])
  onBlur(event: any): void {
    if (this.dialogBoxService.getIsDialogBoxRemoved()) {
      this.gamePaused = false;
    }
    if (this.gameStarted === true && this.gamePaused === false) {
      this.onPauseClick();
    }
  }

  onGameScreenClick() {
    // if clicked on screen when the game is paused
    if (
      this.gameStarted &&
      this.pauseBtnElement.nativeElement.classList.contains('d-none')
    ) {
      console.log('resume game');
      this.onResumeClick();
    }
  }

  onPlayClick() {
    this.gameStarted = true;
    this.gamePaused = false;
    this.showSideButtons = false;
    this.firstPageElement.nativeElement.classList.add('d-none');
    this.startGameBtn.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');

    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.playIBGame(this.gameDivElement);
    } else if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.dialogBoxService.setDialogChild(ExecControlInstructionsComponent);
      this.gamePlayService.playExecControlGame(
        this.isSoundOn,
        this.pauseBtnElement,
        false,
      );
    } else if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.dialogBoxService.setDialogChild(LhgHowtoplayComponent);
      const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
      this.pauseBtnElement.nativeElement.dispatchEvent(domEvent);
      this.gamePlayService.playLearnedHelplessnessGame();
    } else if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.playAttributionStyleGame();
    } else if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.playFriendlyFaceGame(
        this.device_type,
        this.gameDivElement,
      );
    } else if (this.gameName === MENTAL_IMAGERY_GAME) {
      // this.miGameComponent.startPlayingMIGame();
      this.gamePlayService.playMentalImageryGame(this.gameDivElement);
    } else if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
      // this.idcComponent.startPlaying();
      this.gamePlayService.playIdentifyCognitiveDistortionGame(
        this.gameDivElement,
      );
    }
  }

  onHelpClick() {
    this.showSideButtons = false;
    this.gamePaused = true;
    this.firstPageElement.nativeElement.classList.add('d-none');
    this.startGameBtn.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');

    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.gamePlayService.helpExecControlGame(
        this.isSoundOn,
        this.pauseBtnElement,
      );
      this.dialogBoxService.setDialogChild(ExecControlInstructionsComponent);
    }
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.helpIBGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.gamePlayService.helpMIGame();
    }
    if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
      this.gamePlayService.helpIDCGame();
    }
    if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.dialogBoxService.setDialogChild(LhgHowtoplayComponent);
    }
    if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.helpFFGGame();
    }
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.pauseBtnElement.nativeElement.dispatchEvent(domEvent);
  }
  onHomeClick() {
    this.showSideButtons = false;
    this.showComponent = false;
    this.gameStarted = false;
    setTimeout((x: any) => {
      this.showComponent = true;
    }, 10);
  }

  onExitClick() {
    this.router.navigate(['/games']);
  }

  onPauseClick() {
    this.showSideButtons = true;
    this.gamePaused = true;
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
    if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
      this.idcComponent.pauseIDCGame();
    }
  }

  onResumeClick() {
    this.showSideButtons = false;
    this.gamePaused = false;
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
    if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
      this.idcComponent.resumeIDCGame();
    }
  }

  onRestartClick() {
    this.showSideButtons = false;
    this.gamePaused = false;
    this.pauseBtnElement.nativeElement.classList.remove('d-none');

    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.gamePlayService.restartExecControlGame(
        this.isSoundOn,
        this.pauseBtnElement,
      );
    }
    if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.gamePlayService.playIBGame(this.gameDivElement); // same function for start and restart the game
    }
    if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.restartAttributionStyleGame();
    }
    if (this.gameName === FRIENDLY_FACE_GAME) {
      this.gamePlayService.restartFaceGame();
    }
    if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.gamePlayService.playLearnedHelplessnessGame();
    }
    if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.miGameComponent.replayMIGame();
    }
    if (this.gameName === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
      this.idcComponent.replayIDCGame();
    }
  }

  onSoundClick() {
    this.isSoundOn = !this.isSoundOn;
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      console.log('sound', this.isSoundOn);
      this.gamePlayService.soundExecControlGame(this.isSoundOn);
    }
    if(this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.gamePlayService.soundASGGame(this.isSoundOn);
    }
    // else if (this.gameName === FRIENDLY_FACE_GAME) {
    //   this.gamePlayService.pauseFaceGame();
    // }
  }

  onScienceBehind() {
    if (this.gameName === EXECUTIVE_CONTROL_GAME) {
      this.dialogBoxService.setDialogChild(EcgScienceComponent);
    } else if (this.gameName === INTERPRETATION_BIAS_GAME) {
      this.dialogBoxService.setDialogChild(IbgScienceComponent);
    } else if (this.gameName === ATTRIBUTE_STYLE_GAME) {
      this.dialogBoxService.setDialogChild(AsgScienceComponent);
    } else if (this.gameName === LEARNED_HELPLESSNESS_GAME) {
      this.dialogBoxService.setDialogChild(LhgScienceComponent);
    } else if (this.gameName === FRIENDLY_FACE_GAME) {
      this.dialogBoxService.setDialogChild(FfgScienceComponent);
    } else if (this.gameName === MENTAL_IMAGERY_GAME) {
      this.dialogBoxService.setDialogChild(MigScienceComponent);
    }
    const domEvent = new CustomEvent('overlayCalledEvent', { bubbles: true });
    this.pauseBtnElement.nativeElement.dispatchEvent(domEvent);
  }

  @HostListener('touchstart')
  onTouchEvent() {
    this.device_type = 'touch';
  }

}
