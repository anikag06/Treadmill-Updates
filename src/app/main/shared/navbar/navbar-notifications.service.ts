import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarNotificationsService {

  constructor(private http: HttpClient) { }

  closeSubject = new BehaviorSubject(false);


  getNotifications(page = 1) {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/notifications/ui-notification/?page=' + page);
  }

  markNotificationDone(notificationId: number) {
    return this.http.patch(environment.API_ENDPOINT + `/api/v1/notifications/ui-notification/${notificationId}/`, {user_read: true})
  }

  closeNotification() {
    this.closeSubject.next(true);
  }
}
