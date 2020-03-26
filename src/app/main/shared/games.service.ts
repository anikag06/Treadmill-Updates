import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { of, Observable, Observer } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import {
  GAMES,
  GAME_INTERPRETATION_BIAS_CONSTANT,
  GAME_EXECUTIVE_CONTROL_CONSTANT,
  GAME_ATTRIBUTION_STYLE_CONSTANT,
  GAME_FRIENDLY_FACE_CONSTANT,
  GAME_MENTAL_IMAGERY_CONSTANT,
  GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
  GAME_LEARNED_HELPLESSNESS_CONSTANT,
  INTERPRETATION_BIAS_GAME,
  EXECUTIVE_CONTROL_GAME,
  FRIENDLY_FACE_GAME,
  LEARNED_HELPLESSNESS_GAME,
  ATTRIBUTE_STYLE_GAME,
  MENTAL_IMAGERY_GAME,
  IDENTIFY_COGNITIVE_DISTORTION_GAME,
} from '@/app.constants';

@Injectable({
  providedIn: 'root',
})
export class GamesService {
  games = [
    new Game(
      INTERPRETATION_BIAS_GAME,
      '../../../assets/games/games-list/Word Jumble.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_INTERPRETATION_BIAS_CONSTANT,
    ),
    new Game(
      EXECUTIVE_CONTROL_GAME,
      '../../../assets/games/games-list/Executive Control Game@2x.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_EXECUTIVE_CONTROL_CONSTANT,
    ),
    new Game(
      LEARNED_HELPLESSNESS_GAME,
      '../../../assets/games/games-list/Puzzle@2x.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_LEARNED_HELPLESSNESS_CONSTANT,
    ),
    new Game(
      IDENTIFY_COGNITIVE_DISTORTION_GAME,
      '../../../assets/games/games-list/.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_IDENTIFY_COGNITIVE_DISTORTION_CONSTANT,
    ),
    new Game(
      ATTRIBUTE_STYLE_GAME,
      '../../../assets/games/games-list/Shoot the balloon.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_ATTRIBUTION_STYLE_CONSTANT,
    ),
    new Game(
      FRIENDLY_FACE_GAME,
      '../../../assets/games/games-list/Find a smile.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_FRIENDLY_FACE_CONSTANT,
    ),
    new Game(
      MENTAL_IMAGERY_GAME,
      '../../../assets/games/games-list/.png',
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.',
      GAME_MENTAL_IMAGERY_CONSTANT,
    ),
  ];

  constructor(private localStorageService: LocalStorageService) {}

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
      }, 50);
    });
  }
}
