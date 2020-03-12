import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { of, Observable, Observer } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import {
  GAMES,
  GAME_INTERPRETATION_BIAS,
  GAME_EXECUTIVE_CONTROL,
  GAME_ATTRIBUTION_STYLE,
  GAME_FRIENDLY_FACE,
  GAME_MENTAL_IMAGERY,
  GAME_IDENTIFY_COGNITIVE_DISTORTION,
  GAME_LEARNED_HELPLESSNESS,
} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games = [
    new Game(
      'Interpretation Bias Game',
      '../../../assets/games/games-list/Word Jumble.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_INTERPRETATION_BIAS,
    ),
    new Game(
      'Executive Control Game',
      '../../../assets/games/games-list/Executive control game.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_EXECUTIVE_CONTROL,
    ),
    new Game(
      'Learned Helplessness Game',
      '../../../assets/games/games-list/Puzzle.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_LEARNED_HELPLESSNESS,
    ),
    new Game(
      'Identify Cognitive Distortion',
      '../../../assets/games/games-list/.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_IDENTIFY_COGNITIVE_DISTORTION,
    ),
    new Game(
      'Attribute Style Game',
      '../../../assets/games/games-list/Shoot the balloon.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_ATTRIBUTION_STYLE,
    ),
    new Game(
      'Friendly Face Game',
      '../../../assets/games/games-list/Find a smile.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_FRIENDLY_FACE,
    ),
    new Game(
      'Mental Imagery Game',
      '../../../assets/games/games-list/.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_MENTAL_IMAGERY,
    ),
  ];

  constructor(private localStorageService: LocalStorageService) { }

  getGames() {
    let games = <Game[]>this.localStorageService.getItemWithDate(GAMES);
    if (games == null || games.length < 1) {
      this.localStorageService.setItemWithDate(GAMES, this.games);
      games = this.games;
    }
    return new Observable((observer: Observer<Game[]>) => {
      setTimeout(() => {
        observer.next(games);
        observer.complete();
        // }, 5000);
      }, 50);
    });
  }
}
