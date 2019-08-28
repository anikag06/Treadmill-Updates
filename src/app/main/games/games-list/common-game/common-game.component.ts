import { Component, OnInit, Input, HostListener, ViewChild, ElementRef } from '@angular/core';
import { GamePlayService } from '../../shared/game-play.service';
import { GamesService } from '@/main/shared/games.service';
import { Router, ActivatedRoute, RouterEvent, NavigationStart } from '@angular/router';
import { Game } from '@/main/shared/game.model';
import { map, switchMap, filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { Location } from '@angular/common';
import { GamesAuthService } from '../../shared/games-auth.service';

declare let $: any;

@Component({
  selector: 'app-common-game',
  templateUrl: './common-game.component.html',
  styleUrls: ['./common-game.component.scss'],
})
export class CommonGameComponent implements OnInit {

  game!: Game;
  gameName!: string;

  isFirstPageHelpBtn = true;
  showSecondPlayBtn = true;
  isExecutiveControl = false;
  isInterpretationBias = false;
  isLearnedHelplessness = false;
  isFriendlyFace = false;
  showHintBtn = false;
  isSoundOn = true;
  showSideButtons = false;

  device_type = 'click';     // whether touch or click for using in friendly face game
  currLocation: any;

  subscriptionRouter!: Subscription;

  @ViewChild('firstpage_btns', {static: false}) firstPageElement!: ElementRef;
  @ViewChild('pause_common_div', {static: false}) pauseBtnElement!: ElementRef;
  @ViewChild('gameDiv', {static: false}) gameDivElement!: ElementRef;

  constructor(private gamePlayService: GamePlayService,
    private gamesService: GamesService,
    private router: Router,
    private route: ActivatedRoute,
    private location: Location) {   }

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
          if (this.gameName === 'Executive Control Game') {
            this.isExecutiveControl = true;
          } else if (this.gameName === 'Interpretation Bias Game') {
            this.isInterpretationBias = true;
            this.showHintBtn = true;
          } else if (this.gameName === 'Learned Helplessness Game') {
            this.isLearnedHelplessness = true;
          } else if (this.gameName === 'Friendly Face Game') {
            this.isFriendlyFace = true;
          }
          // this.device_type = this.ffGameCheckDevice();
        },
        (error) => {
          this.router.navigate(['games']);
        }
      );
  }

  onPlayClick() {
    this.showSideButtons = false;
    this.firstPageElement.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.playIBGame();
    } else if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.playExecControlGame(this.isSoundOn);
    } else if (this.gameName === 'Learned Helplessness Game') {
      this.gamePlayService.playLearnedHelplessnessGame();
    } else if (this.gameName === 'Friendly Face Game') {
      this.gamePlayService.playFriendlyFaceGame(this.device_type);
    }
  }

  onHelpClick() {
    this.showSideButtons = false;
    if (this.firstPageElement.nativeElement.classList.contains('d-none')) {
      this.isFirstPageHelpBtn = false;
    } else {
      this.isFirstPageHelpBtn = true;
    }
    this.firstPageElement.nativeElement.classList.add('d-none');
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.showSecondPlayBtn = false;
      this.gamePlayService.helpExecControlGame(this.isSoundOn, this.isFirstPageHelpBtn);
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.helpIBGame();
    }
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
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.pauseIBGame();
    }
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.pauseExecControlGame();
    }
    if (this.gameName === 'Friendly Face Game') {
      this.gamePlayService.pauseFaceGame();
    }
  }

  onResumeClick() {
    this.showSideButtons = false;
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.resumeExecControlGame();
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.resumeIBGame();
    }
    if (this.gameName === 'Friendly Face Game') {
      this.gamePlayService.resumeFaceGame();
    }
  }

  onRestartClick() {
    this.showSideButtons = false;
    this.pauseBtnElement.nativeElement.classList.remove('d-none');
    if (this.gameName === 'Executive Control Game') {
      this.isSoundOn = true;
      this.gamePlayService.restartExecControlGame(this.isSoundOn);
    }
    if (this.gameName === 'Interpretation Bias Game') {
      this.gamePlayService.playIBGame();                      // same function for start and restart the game
    }
    if (this.gameName === 'Friendly Face Game') {
      this.gamePlayService.restartFaceGame();
    }
  }

  onSoundClick() {
    this.isSoundOn = !this.isSoundOn;
    if (this.gameName === 'Executive Control Game') {
      this.gamePlayService.soundExecControlGame(this.isSoundOn);
    }
    // else if (this.gameName === 'Friendly Face Game') {
    //   this.gamePlayService.pauseFaceGame();
    // }
  }

  onBlurDiv() {
    console.log('blur works');
  }
  // ffGameCheckDevice() {
  //   let device = 'touch';
  //   console.log(this.gameDivElement);
  //   this.gameDivElement.nativeElement.on('mousemove', () => {
  //     device = 'click';
  //     console.log('fsdfs');
  //   }, false);
  //   this.gameDivElement.nativeElement.addEventListener('touchstart touchend', () => {
  //     device = 'touch';
  //   }, false);
  //   console.log(device);
  //   return device;
  // }
  @HostListener('touchstart')
  onTouchEvent() {
    this.device_type = 'touch';
  }
}
