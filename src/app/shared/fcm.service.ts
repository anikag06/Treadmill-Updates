import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GeneralErrorService } from '@/main/shared/general-error.service';
import { TOKEN } from '@/app.constants';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  permit = new Subject<boolean>();
  newNotification = new Subject<any>();

  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {}

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        token => {
          if (token) {
            this.updateToken(token).subscribe(data => {
              this.listenForNewMessage();
            });
          }
        },
        error => {
          this.errorService.openErrorDialog(error);
        },
      );
  }

  updateToken(token: string) {
    // having to add the header here because this is added in app.module and jwt authentication is added in main.module
    // let jwt_token;
    // try {
    //   jwt_token = window.localStorage.getItem(TOKEN);
    // } catch (e) {
    //   jwt_token = window.sessionStorage.getItem(TOKEN);
    // }
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-Type': 'application/json',
    //     Authorization: 'Bearer ' + jwt_token,
    //   }),
    // };
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/notifications/device-registration/',
      { registration_id: token },
    );
  }

  participantRequestPermission(part_id: number) {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        token => {
          if (token) {
            console.log('Permission granted! Save to the server!', token);
            console.log('participant id: ', part_id);
            this.participantUpdateToken(part_id, token).subscribe(data => {
              console.log('Token Updated');
              this.permit.next(true);
            });
          }
        },
        error => {
          this.errorService.openErrorDialog(error);
          this.permit.next(false);
        },
      );
  }
  participantUpdateToken(part_id: number, token: string) {
    console.log('participant id: ', part_id);
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/notifications/store-device-registration/',
      { participant_id: part_id, registration_id: token },
    );
  }

  listenForNewMessage() {
    this.afMessaging.messages.subscribe(message => {
      // emit signal for notification message
      this.newNotification.next(message);
    });
  }
}
