import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { MatSnackBar } from '@angular/material';
import { duration } from 'moment';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user!: User;
  oldScore!: number;
  newScore!: number;
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar
  ) {
    this.user = this.authService.isLoggedIn()!;
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      })
    );
  }

  postScore(score: number) {
    const body = {
      score: score,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    return this.http.patch(
      environment.API_ENDPOINT +
        '/api/v1/user/user-profile/' +
        this.user.username,
      body,
      httpOptions
    );
  }
  postScoreForOther(score: number, username: string) {
    const body = {
      score: score,
    };
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + this.authService.getToken(),
      }),
    };
    return this.http.patch(
      environment.API_ENDPOINT + '/api/v1/user/user-profile/' + username,
      body,
      httpOptions
    );
  }

  showSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  updateScore(score: number) {
    this.postScore(score).subscribe(() => {});
    this.oldScore = +this.userProfileService.getScoreValue();
    this.newScore = this.oldScore + score;
    this.userProfileService.setScoreValue(this.newScore);
    this.showSnackBar('+' + score.toString() + ' ' + 'Points', '');
  }
  updateIntroScore(score: number) {
    this.postScore(score).subscribe(() => {});
    this.oldScore = +this.userProfileService.getScoreValue();
    this.newScore = this.oldScore + score;
    this.userProfileService.setScoreValue(this.newScore);
  }
}
