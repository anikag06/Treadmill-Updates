import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { NavbarNotificationsService } from '../navbar-notifications.service';
import { Notification } from './notification-item/notification.model';

@Component({
  selector: 'app-navbar-notifications',
  templateUrl: './navbar-notifications.component.html',
  styleUrls: ['./navbar-notifications.component.scss'],
})
export class NavbarNotificationsComponent implements OnInit {
  notifications: Notification[] = [];
  @ViewChild('notificationsDiv', { static: false })
  notificationsDiv!: ElementRef;

  pageNumber = 0;
  scrollTop = 0;
  unreadCount = 0;
  noMoreItems = false;
  dataloaded = false;

  constructor(
    private notificationService: NavbarNotificationsService,
    private changeRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(scrollToBottom = false) {
    this.pageNumber += 1;
    const notificationPromise = this.notificationService
      .getNotifications(this.pageNumber)
      .toPromise();
    notificationPromise
      .then((data: any) => {
        this.unreadCount = data.data.unread_count;
        const items = data.data.notifications as Notification[];
        console.log('in noti...', items);
        this.notifications.push(...items);
        this.dataloaded = true;
        if (scrollToBottom) {
          this.scrollToBottom();
        }
        if (items.length < 10) {
          this.noMoreItems = true;
        }
      })
      .catch(() => console.log('error'));
  }

  onMoreClick() {
    this.getNotifications(true);
  }

  scrollToBottom() {
    if (this.notificationsDiv) {
      const scrollHeight =
        this.notificationsDiv.nativeElement.scrollHeight * 0.8;
      this.scrollTop = scrollHeight;
      this.changeRef.detectChanges();
    }
  }

  markUnread() {
    this.unreadCount -= 1;
  }

  onMarkAllAsRead() {
    this.notifications = this.notifications.map((item: Notification) => {
      item.user_read = true;
      return item;
    });
    this.unreadCount = 0;
    this.notificationService
      .putMarkAllRead()
      .subscribe(data => console.log(data));
  }
}
