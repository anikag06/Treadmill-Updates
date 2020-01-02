import { Injectable, Self } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GeneralErrorService } from '../main/shared/general-error.service';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  permit = false;

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
          console.log('Permission granted! Save to the server!', token);
          if (token) {
            this.updateToken(token).subscribe(data => {
              console.log('Token Updated');
            });
          }
        },
        error => {
          this.errorService.openErrorDialog(error);
        },
      );
  }

  updateToken(token: string) {
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
            this.participantUpdateToken(part_id, token).subscribe(data => {
              console.log('Token Updated');
              this.permit = true;
            });
          }
        },
        error => {
          this.errorService.openErrorDialog(error);
          this.permit = false;
        },
      );
  }
  participantUpdateToken(part_id: number, token: string) {
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/notifications/store-device-registration/',
      { participant_id: part_id, registration_id: token },
    );
  }
}
