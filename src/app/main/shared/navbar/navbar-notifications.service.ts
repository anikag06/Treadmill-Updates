import { ElementRef, Injectable, ViewChild, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarNotificationsService {
  constructor(private http: HttpClient) { }

  closeSubject = new BehaviorSubject(false);
  showFullConv = new EventEmitter<any>();
  showFullConvIcon = new EventEmitter<any>();

  getNotifications(page = 1) {
    return this.http.get(
      environment.API_ENDPOINT +
      '/api/v1/notifications/ui-notification/?page=' +
      page,
    );
  }

  markNotificationDone(notificationId: number) {
    return this.http.patch(
      environment.API_ENDPOINT +
      `/api/v1/notifications/ui-notification/${notificationId}/`,
      { user_read: true },
    );
  }

  getUserNotifications() {
    return this.http.get(
      environment.API_ENDPOINT + `/api/v1/notifications/user-ui-notification/`,
    );
  }

  putUserNotifications() {
    return this.http.put(
      environment.API_ENDPOINT + `/api/v1/notifications/user-ui-notification/`,
      {},
    );
  }

  putMarkAllRead() {
    return this.http.put(
      environment.API_ENDPOINT + `/api/v1/notifications/mark-all-read/`,
      {},
    );
  }

  closeNotification() {
    this.closeSubject.next(true);
  }
}
