import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NavbarNotificationsService } from '../../navbar-notifications.service';
import { Notification } from './notification.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notification-item',
  templateUrl: './notification-item.component.html',
  styleUrls: ['./notification-item.component.scss'],
})
export class NotificationItemComponent implements OnInit {
  @Input() item!: Notification;
  @Output() decrementUnread: EventEmitter<any> = new EventEmitter();
  navigate = false;
  constructor(
    private notificationService: NavbarNotificationsService,
    private router: Router,
  ) {}

  ngOnInit() {}

  onClick() {
    this.notificationService
      .markNotificationDone(this.item.id)
      .subscribe((data: any) => {
        if (!this.item.user_read) {
          this.decrementUnread.emit(true);
        }
        this.item.user_read = true;
        if (this.item.url.match('/support-groups/')) {
          this.notificationService.closeNotification();
          this.router.navigate(['support-groups']);
        }
        if (this.item.url !== '/#') {
          document.location.href = this.item.url;
        }
      });
  }
}
