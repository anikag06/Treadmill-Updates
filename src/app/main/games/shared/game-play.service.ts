import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import {GamesService} from '@/main/shared/games.service';
declare var startExecControlGame: any;
@Injectable({
  providedIn: 'root'
})
export class GamePlayService {

  gameName !: string;
  constructor(  private gamesService: GamesService) { }

  setGameInfo(game_name: string) {
    this.gameName = game_name;
    console.log('After', this.gameName);

  }
  getGameInfo() {
    console.log('get', this.gameName);
    return this.gameName;
  }
  playExecControlGame(show_tutorial: boolean) {
    // console.log("reached here");
    startExecControlGame(show_tutorial);
  }


}
