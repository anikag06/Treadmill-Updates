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
    private errorService: GeneralErrorService
  ) {}

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          if (token) {
            this.updateToken(token).subscribe((data) => {
              this.listenForNewMessage();
            });
          }
        },
        error => {},
      );
  }

  updateToken(token: string) {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/notifications/device-registration/',
      { registration_id: token }
    );
  }

  participantRequestPermission(part_id: number) {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          if (token) {
            this.participantUpdateToken(part_id, token).subscribe((data) => {
              this.permit.next(true);
            });
          }
        },
        (error) => {
          if (error.code === 'messaging/token-unsubscribe-failed') {
            this.participantRequestPermission(part_id);
          } else {
            this.permit.next(false);
          }
        }
      );
  }
  participantUpdateToken(part_id: number, token: string) {
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/notifications/store-device-registration/',
      { participant_id: part_id, registration_id: token }
    );
  }

  listenForNewMessage() {
    this.afMessaging.messages.subscribe((message) => {
      // emit signal for notification message
      this.newNotification.next(message);
    });
  }
}
