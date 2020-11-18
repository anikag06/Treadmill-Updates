import { SCORE, USER_PROFILE } from '@/app.constants';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { UserProfile } from './UserProfile.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileService {
  constructor(private http: HttpClient) {}

  getUserProfile(userName: string): Observable<UserProfile> {
    return this.http.get<UserProfile>(
      environment.API_ENDPOINT + USER_PROFILE + userName,
    );
  }
  setScoreFromProfile(username: string) {
    this.getUserProfile(username).subscribe(profile => {
      this.setScoreValue(profile.score);
    });
  }

  setScoreValue(score: number) {
    try {
      const final_score =
        // tslint:disable-next-line:radix
        parseInt(<string>window.localStorage.getItem(SCORE)) + score;
      window.localStorage.setItem(SCORE, final_score.toString());
    } catch (e) {
      window.sessionStorage.setItem(SCORE, score.toString());
    }
  }

  getScoreValue() {
    let score!: any;
    try {
      score = window.localStorage.getItem(SCORE);
    } catch (e) {
      score = window.sessionStorage.getItem(SCORE);
    }
    return score;
  }
}
