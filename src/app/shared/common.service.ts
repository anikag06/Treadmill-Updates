import { Injectable } from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user!: User;
  constructor(private authService: AuthService, private http: HttpClient) {
    this.user = this.authService.isLoggedIn()!;
  }
  createOnline$() {
    return merge<boolean>(
      fromEvent(window, 'offline').pipe(map(() => false)),
      fromEvent(window, 'online').pipe(map(() => true)),
      new Observable((sub: Observer<boolean>) => {
        sub.next(navigator.onLine);
        sub.complete();
      }),
    );
  }

  postScore(score: number) {
    const body = {
      score: score,
    };
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/user/user-profile/' +
        this.user.username,
      body,
    );
  }
}
