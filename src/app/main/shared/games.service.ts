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
    new Game('Mario',
             'https://via.placeholder.com/400x300?text=Mario',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
    new Game('Contra',
             'https://via.placeholder.com/400x300?text=Contra',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
    new Game('Need For Speed',
             'https://via.placeholder.com/400x300?text=NFS',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
    new Game('Age of Empires',
             'https://via.placeholder.com/400x300?text=Age of Empires',
             'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit sed mauris rutrum laoreet quis non velit.'),
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
      }, 5000);
    });
  }
}
