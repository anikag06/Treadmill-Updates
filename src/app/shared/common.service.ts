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
import { MatDialog, MatSnackBar } from '@angular/material';
import { PointsComponent } from '@/main/shared/points/points.component';
import { ChangeBrowserDialogComponent } from '@/shared/change-browser-dialog/change-browser-dialog.component';

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
  userTimeUp = false;

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private userProfileService: UserProfileService,
    private snackBar: MatSnackBar,
    private componentFactoryResolver: ComponentFactoryResolver,
    private dialog: MatDialog,
  ) {}
  isOnline$() {
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
    this.user = this.authService.isLoggedIn()!;
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
      httpOptions,
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
      httpOptions,
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
      PointsComponent,
    );
    const pointsComponent = this.pointsNotificationRef.createComponent(
      componentFactory,
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

  isChromeBrowser(): boolean {
    const uaString = navigator.userAgent.toLowerCase();

    let isChrome = /chrome/.test(uaString);
    const isExplorer = /msie/.test(uaString);
    const isExplorer_11 = /rv:11/.test(uaString);
    const isFirefox = /firefox/.test(uaString);
    let isSafari = /safari/.test(uaString);
    const isOpera = /opr/.test(uaString);
    const isEdgeDesktop = /edg/.test(uaString);
    const isEdgeiOS = /edgios/.test(uaString);
    const isEdgeAndroid = /edga/.test(uaString);
    const isIpad = /crios/.test(uaString);

    if (isChrome && isSafari) {
      isSafari = false;
    }
    if (isChrome && (isEdgeDesktop || isEdgeiOS || isEdgeAndroid)) {
      isChrome = false;
    }
    if (isSafari && (isEdgeDesktop || isEdgeiOS || isEdgeAndroid)) {
      isSafari = false;
    }
    if (isChrome && isOpera) {
      isChrome = false;
    }
    if (isSafari && isIpad) {
      isChrome = true;
      isSafari = false;
    }
    return isChrome;
  }

  showBrowserChangeDialog() {
    const dialogRef = this.dialog.open(ChangeBrowserDialogComponent, {
      autoFocus: false,
      panelClass: 'change-browser-dialog-container',
      disableClose: true,
      maxWidth: '91vw',
    });
  }
}
