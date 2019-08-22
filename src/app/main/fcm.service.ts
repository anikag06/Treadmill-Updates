import { Injectable, Self } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { mergeMapTo } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment.prod';
import { GeneralErrorService } from './shared/general-error.service';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(
    private afMessaging: AngularFireMessaging,
    private http: HttpClient,
    private errorService: GeneralErrorService
    ) { }

  requestPermission() {
    this.afMessaging.requestPermission
      .pipe(mergeMapTo(this.afMessaging.tokenChanges))
      .subscribe(
        (token) => {
          console.log('Permission granted! Save to the server!', token);
          if (token) {
            this.updateToken(token)
              .subscribe(
                data => console.log('Token Updated')
              )
          }
        },
        (error) => {
          this.errorService.openErrorDialog(error)
        },
      );
  }

  updateToken(token: string) {
    return this.http.post(
      environment.API_ENDPOINT + '/api/v1/notifications/device-registration/',
      { registration_id: token }
    );
  }
}
