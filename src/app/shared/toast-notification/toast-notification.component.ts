import { Component, OnInit, Input } from '@angular/core';
import { SHOW_TOAST_DURATION } from '@/app.constants';
import { FcmService } from '@/shared/fcm.service';

@Component({
  selector: 'app-toast-notification',
  templateUrl: './toast-notification.component.html',
  styleUrls: ['./toast-notification.component.scss'],
})
export class ToastNotificationComponent implements OnInit {
  showToast = false;
  title!: string;
  body!: string;
  constructor(private fcmService: FcmService) {}

  ngOnInit() {
    this.fcmService.newNotification.subscribe(message => {
      this.showToast = true;
      this.title = message.notification.title;
      this.body = message.notification.body;
      setTimeout(() => {
        this.showToast = false;
      }, SHOW_TOAST_DURATION);
    });
  }

  closeToast() {
    this.showToast = false;
  }
}
