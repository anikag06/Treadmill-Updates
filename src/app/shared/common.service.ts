import {
  ComponentFactoryResolver,
  EventEmitter,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { fromEvent, merge, Observable, Observer } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { MatSnackBar } from '@angular/material';
import { PointsComponent } from '@/main/shared/points/points.component';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  user!: User;
  oldScore!: number;
  newScore!: number;
  component: any;
  pointsNotificationRef!: ViewContainerRef;
  isIntroPoints = false;
  introScoreSend = new EventEmitter<any>();
  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    this.user = this.authService.isLoggedIn()!;
  }
  isOnline$() {
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
  updateScore(score: number) {
    this.postScore(score).subscribe(() => {});
    this.userProfileService.setScoreValue(score);
    this.showPointsNotification(score);
    if (!this.isIntroPoints) {
      setTimeout(() => {
        this.destroyComponent();
      }, 2000);
    }
  }

  showPointsNotification(points: number) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PointsComponent
    );
    const pointsComponent = this.pointsNotificationRef.createComponent(
      componentFactory
    );
    pointsComponent.instance.points = points;
    this.component = pointsComponent;
  }

  setPointsNotificationRef(pointsNotification: ViewContainerRef) {
    this.pointsNotificationRef = pointsNotification;
  }

  destroyComponent() {
    this.component.destroy();
  }

  setIsIntroPointsTrue() {
    this.isIntroPoints = true;
  }
  setIsIntroPointsFalse() {
    this.isIntroPoints = false;
  }
}
