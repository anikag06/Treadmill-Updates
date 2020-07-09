import { Component, OnInit, Input } from '@angular/core';
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
  FORM_TASK,
} from '@/app.constants';
import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  gameStarted = false;
  @Input() game!: Game;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
  ) {}

  ngOnInit() {}

  onGameClick(game: Game) {
    this.gameStarted = true;
    this.introService.showAnimation(game.slug).subscribe((data: any) => {
      if (data.show_animation) {
        setTimeout(() => {
          this.introDialogService.openGameIntroDialog(false,game.slug);
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
}
