import { Injectable, Self } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { GeneralErrorService } from '../main/shared/general-error.service';
import { TOKEN } from '@/app.constants';

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
    // having to add the header here because this is added in app.module and jwt authentication is added in main.module
    let jwt_token;
    try {
      jwt_token = window.localStorage.getItem(TOKEN);
    } catch (e) {
      jwt_token = window.sessionStorage.getItem(TOKEN);
    }
    console.log('jwt token: ', jwt_token);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + jwt_token,
      }),
    };
    console.log('http options: ', httpOptions);
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/notifications/device-registration/',
      { registration_id: token },
      httpOptions,
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
    console.log('participant id: ', part_id);
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/notifications/store-device-registration/',
      { participant_id: part_id, registration_id: token },
    );
  }
}
