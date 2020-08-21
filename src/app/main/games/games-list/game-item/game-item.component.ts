import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Game } from '@/main/shared/game.model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GAME_INTERPRETATION_BIAS_CONSTANT,
  GAME_MENTAL_IMAGERY_CONSTANT,
  GAME_FRIENDLY_FACE_CONSTANT,
  GAME_ATTRIBUTION_STYLE_CONSTANT,
  GAME_LEARNED_HELPLESSNESS_CONSTANT,
  GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
  GAME_EXECUTIVE_CONTROL_CONSTANT,
  INTERPRETATION_BIAS_GAME,
  EXECUTIVE_CONTROL_GAME,
  FRIENDLY_FACE_GAME,
  LEARNED_HELPLESSNESS_GAME,
  ATTRIBUTE_STYLE_GAME,
  MENTAL_IMAGERY_GAME,
  IDENTIFY_COGNITIVE_DISTORTION_GAME,
} from '@/app.constants';
import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';
import { GamesProgressBarService } from '@/main/games/shared/games-progress-bar.service';
import { GamesBar } from '@/main/shared/games-bar.model';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  started = false;
  gameStarted = false;
  coinColor!: any;
  goldCoinShow = true;
  silverCoinShow = true;
  bronzeCoinShow = true;
  progressInGame = 0;
  goldRatio!: number;
  silverRatio!: number;
  bronzeRatio!: number;
  showPb!: boolean;
  solveItStatus!: boolean;
  balloonBurstStatus!: boolean;
  week!: string;
  gameNotStartedMsg = 'Start playing this game today!';
  completedMsg = 'Congrats! You have completed this game!';
  incompleteMsg = 'Start playing this game today!';
  @Input() game!: Game;
  @Input() gameBar!: GamesBar;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
    private gamesProgressBarService: GamesProgressBarService,
  ) {}

  ngOnInit() {
    this.gamesProgressBarService
      .getGamesProgressInfo()
      .subscribe((object: any) => {
        console.log('progress bar data', object);
        if (this.game.name === FRIENDLY_FACE_GAME) {
          this.allCalculations(object.ff_game);
          this.coinColor = '#E8C70F';
        }

        if (this.game.name === INTERPRETATION_BIAS_GAME) {
          this.allCalculations(object.ib_game);
          this.coinColor = '#1977A1';
        }
        if (this.game.name === EXECUTIVE_CONTROL_GAME) {
          this.allCalculations(object.ec_game);
          this.coinColor = '#853102';
        }
        if (this.game.name === IDENTIFY_COGNITIVE_DISTORTION_GAME) {
          this.allCalculations(object.icd_game);
          this.coinColor = '#0C8C95';
        }
        if (this.game.name === MENTAL_IMAGERY_GAME) {
          this.allCalculations(object.mi_game);
          this.coinColor = '#CE7F7F';
        }
        // lh
        if (this.game.name === LEARNED_HELPLESSNESS_GAME) {
          this.started = true;
          this.showPb = false;
          this.solveItStatus = object.lh_game.completed;
        }
        // asg
        if (this.game.name === ATTRIBUTE_STYLE_GAME) {
          this.started = true;
          this.showPb = false;
          this.balloonBurstStatus = object.as_game.completed;
        }
      });
  }

  onGameClick(game: Game) {
    this.gameStarted = true;
    this.introService.showAnimation(game.slug).subscribe((data: any) => {
      if (data.show_animation) {
        setTimeout(() => {
          this.introDialogService.openGameIntroDialog(false, game.slug);
        }, 500);
      }
    });
    this.router.navigate([game.slug], { relativeTo: this.route });
  }

  getBackgroundColor(game: string) {
    if (game === GAME_INTERPRETATION_BIAS_CONSTANT) {
      return '#EEFAFF';
    } else if (game === GAME_EXECUTIVE_CONTROL_CONSTANT) {
      return '#FFF9F3';
    } else if (game === GAME_LEARNED_HELPLESSNESS_CONSTANT) {
      return '#E5FFF8';
    } else if (game === GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT) {
      return '#F1FEFF';
    } else if (game === GAME_ATTRIBUTION_STYLE_CONSTANT) {
      return '#F5F6FF';
    } else if (game === GAME_FRIENDLY_FACE_CONSTANT) {
      return '#F2FFF8';
    } else if (game === GAME_MENTAL_IMAGERY_CONSTANT) {
      return '#FFEEEE';
    }
  }

  getFooterColor(game: string) {
    if (game === GAME_INTERPRETATION_BIAS_CONSTANT) {
      return '#1A77A1';
    } else if (game === GAME_EXECUTIVE_CONTROL_CONSTANT) {
      return '#92481E';
    } else if (game === GAME_LEARNED_HELPLESSNESS_CONSTANT) {
      return '#2AC79B';
    } else if (game === GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT) {
      return '#0C8C95';
    } else if (game === GAME_ATTRIBUTION_STYLE_CONSTANT) {
      return '#5A64DF';
    } else if (game === GAME_FRIENDLY_FACE_CONSTANT) {
      return '#18BE6B';
    } else if (game === GAME_MENTAL_IMAGERY_CONSTANT) {
      return '#F17878';
    }
  }

  calculateCoinValues(GOLD: number, SILVER: number, BRONZE: number) {
    this.calculateGold(GOLD);
    this.calculateSilver(SILVER, GOLD);
    this.calculateBronze(BRONZE, GOLD);
  }
  calculateGold(GOLD: number) {
    this.goldRatio = 89;
    if (this.progressInGame === 100) {
      this.goldCoinShow = false;
    } else {
      this.goldCoinShow = true;
    }
    return this.goldRatio;
  }

  calculateSilver(SILVER: number, GOLD: number) {
    this.silverRatio = (SILVER / GOLD) * 90;
    if (this.progressInGame > this.silverRatio) {
      this.silverCoinShow = false;
    } else {
      this.silverCoinShow = true;
    }
    return this.silverRatio;
  }

  calculateBronze(BRONZE: number, GOLD: number) {
    this.bronzeRatio = (BRONZE / GOLD) * 90;
    if (this.progressInGame > this.bronzeRatio) {
      this.bronzeCoinShow = false;
    } else {
      this.bronzeCoinShow = true;
    }
    return this.bronzeRatio;
  }

  calculateProgress(correctAnswers: number, GOLD: number) {
    this.progressInGame = (correctAnswers / GOLD) * 90;
    return this.progressInGame;
  }

  allCalculations(objectData: GamesBar) {
    this.started = false;
    this.showPb = true;
    this.gameBar = objectData;
    this.calculateProgress(
      this.gameBar.no_of_correct_answers,
      this.gameBar.GOLD_CONSTANT,
    );
    this.calculateCoinValues(
      this.gameBar.GOLD_CONSTANT,
      this.gameBar.SILVER_CONSTANT,
      this.gameBar.BRONZE_CONSTANT,
    );
    this.started = objectData.started;
  }

  isLHGame() {
    return this.game.name === LEARNED_HELPLESSNESS_GAME;
  }

  isASGame() {
    return this.game.name === ATTRIBUTE_STYLE_GAME;
  }
}
