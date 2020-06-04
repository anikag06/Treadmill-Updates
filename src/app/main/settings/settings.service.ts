import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {UPDATE_NOTIFICATIONS, UPDATE_PASSWORD, UPDATE_USERNAME, USERNAME_AVAILABLE} from '@/app.constants';
import {catchError} from 'rxjs/operators';
import {GeneralErrorService} from '@/main/shared/general-error.service';

@Injectable({
  providedIn: 'root',
})

export class SettingsService {
  notification_number = 0;
  constructor(
    private http: HttpClient,
    private errorService: GeneralErrorService,
  ) {
  }

  usernameAvailabilityCheck(username: string){
    return this.http.get( environment.API_ENDPOINT + USERNAME_AVAILABLE + username);
  }

  sendingUsername(username: string, password: string){
    return this.http.put(environment.API_ENDPOINT + UPDATE_USERNAME, {
      username: username,
      password: password
    } );
  }

  sendingPasswordsForChange(old_password: string, new_password: string) {
    return this.http.post(environment.API_ENDPOINT + UPDATE_PASSWORD, {
      old_password: old_password,
      new_password: new_password
    },
      { observe: 'response'})
      ;

  }

  updatingNotifications(field: string, notification: boolean){
    if (notification === true) {
      this.notification_number = 1;
    } else {
      this.notification_number = 0;

    }
    const data: any = {};
    data[field] = this.notification_number;
    console.log("field, ", field);
    console.log("notification number ", this.notification_number);
   // console.log(field,  notification);
    return this.http.patch(environment.API_ENDPOINT + '/api/v1/notifications/update-notification-settings/', {
      data,
    });


  }

  updatedNotificationsState(){
    return this.http.get (environment.API_ENDPOINT + '/api/v1/notifications/update-notification-settings/');
  }


  // usernameSaveClicked(){
  //   //return this.http.post(environment.API_ENDPOINT, this.username);
  //   //this.toggleon = !this.toggleon;
  //   //return this.toggleon;
  //   console.log('return this.http.post(url,body', 'check if this is true , if true return already taken, else saved');
  //
  // }
  //
  // supportPush(){
  //   this.toggleOn = true;
  //
  //   //this.supportPushSave = true;
  //   console.log('toggle');
  //   console.log('by default the state of the switch can be ' +
  //     'false, and as the swicth tiggles, that condition also toggles and that data is posted to the api');
  //   console.log('save of others push and email left');
  // }
}
