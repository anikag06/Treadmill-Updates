import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GamesProgressBarService {
  constructor(private http: HttpClient) {}

  getGamesProgressInfo() {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/games/common/game-bar-data/',
    );
  }
}
