import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef, Output, EventEmitter } from '@angular/core';
import { NavbarNotificationsService } from '../navbar-notifications.service';

@Component({
  selector: 'app-navbar-notifications',
  templateUrl: './navbar-notifications.component.html',
  styleUrls: ['./navbar-notifications.component.scss']
})
export class NavbarNotificationsComponent implements OnInit {

  notifications: Notification[] = [];
  @ViewChild('notificationsDiv', { static: false }) notificationsDiv!: ElementRef;

  pageNumber = 0;
  scrollTop = 0;
  unreadCount = 0;
  noMoreItems = false;

  constructor(
    private notificationService: NavbarNotificationsService,
    private changeRef: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(scrollToBottom = false) {
    this.pageNumber += 1;
    const notificationPromise  = this.notificationService.getNotifications(this.pageNumber).toPromise();
    notificationPromise.then(
      (data: any) => {
        this.unreadCount = data.data.unread_count;
        const items = data.data.notifications as Notification[];
        this.notifications.push(...items);
        if (scrollToBottom) {
          this.scrollToBottom();
        }
        if (items.length < 10 ) {
          this.noMoreItems = true;
        }
      }
    ).catch(
      () => console.log('error')
    );
  }

  onMoreClick() {
    this.getNotifications(true);
  }

  scrollToBottom() {
    if (this.notificationsDiv) {
      const scrollHeight = this.notificationsDiv.nativeElement.scrollHeight * 0.80;
      this.scrollTop = scrollHeight;
      this.changeRef.detectChanges();
    }
  }

  markUnread() {
    this.unreadCount -= 1;
  }
}
