import { Component, OnInit, Input } from '@angular/core';
import { Game } from '@/main/shared/game.model';
import { Router, ActivatedRoute } from '@angular/router';
import {
  GAME_INTERPRETATION_BIAS,
  GAME_MENTAL_IMAGERY,
  GAME_FRIENDLY_FACE,
  GAME_ATTRIBUTION_STYLE,
  GAME_LEARNED_HELPLESSNESS,
  GAME_IDENTIFY_COGNITIVE_DISTORTION,
  GAME_EXECUTIVE_CONTROL,
} from '@/app.constants';

@Component({
  selector: 'app-game-item',
  templateUrl: './game-item.component.html',
  styleUrls: ['./game-item.component.scss'],
})
export class GameItemComponent implements OnInit {
  gameStarted = false;
  @Input() game!: Game;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {}

  onGameClick(game: Game) {
    this.gameStarted = true;
    this.router.navigate([game.slug], { relativeTo: this.route });
  }

  getBackgroundColor(game: string) {
    if (game === GAME_INTERPRETATION_BIAS) {
      return '#EEFAFF';
    } else if (game === GAME_EXECUTIVE_CONTROL) {
      return '#FFF9F3';
    } else if (game === GAME_LEARNED_HELPLESSNESS) {
      return '#E5FFF8';
    } else if (game === GAME_IDENTIFY_COGNITIVE_DISTORTION) {
      return '#F1FEFF';
    } else if (game === GAME_ATTRIBUTION_STYLE) {
      return '#F5F6FF';
    } else if (game === GAME_FRIENDLY_FACE) {
      return '#F2FFF8';
    } else if (game === GAME_MENTAL_IMAGERY) {
      return '#FFEEEE';
    }
  }

  getFooterColor(game: string) {
    if (game === GAME_INTERPRETATION_BIAS) {
      return '#1A77A1';
    } else if (game === GAME_EXECUTIVE_CONTROL) {
      return '#92481E';
    } else if (game === GAME_LEARNED_HELPLESSNESS) {
      return '#2AC79B';
    } else if (game === GAME_IDENTIFY_COGNITIVE_DISTORTION) {
      return '#0C8C95';
    } else if (game === GAME_ATTRIBUTION_STYLE) {
      return '#5A64DF';
    } else if (game === GAME_FRIENDLY_FACE) {
      return '#18BE6B';
    } else if (game === GAME_MENTAL_IMAGERY) {
      return '#F17878';
    }
  }
}
