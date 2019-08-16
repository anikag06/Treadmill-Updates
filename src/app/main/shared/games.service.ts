import { Injectable } from '@angular/core';
import { Game } from './game.model';
import { of, Observable, Observer } from 'rxjs';
import { LocalStorageService } from '@/shared/localstorage.service';
import { GAMES } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  games = [
    new Game('Interpretation Bias Game',
              'https://via.placeholder.com/360x200?text=Mario',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),

    new Game('Executive Control Game',
             'https://via.placeholder.com/360x200?text=Mario',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
    new Game('Learned Helplessness Game',
             'https://via.placeholder.com/360x200?text=Mario',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
    new Game('Sample Game',
            'https://via.placeholder.com/360x200?text=Mario',
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.')
    ];

  constructor(
    private localStorageService: LocalStorageService
  ) { }


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
