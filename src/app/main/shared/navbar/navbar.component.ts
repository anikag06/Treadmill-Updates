import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
} from '@angular/core';
import { NavbarFlowDirective } from './navbar-flow.directive';
import { interval, Subscription } from 'rxjs';
import { NavbarFlowComponent } from './navbar-flow/navbar-flow.component';
import { NavbarNotificationDirective } from './navbar-notification.directive';
import { NavbarNotificationsComponent } from './navbar-notifications/navbar-notifications.component';
import { NavbarNotificationsService } from './navbar-notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  @ViewChild(NavbarFlowDirective, { static: false })
  flowHost!: NavbarFlowDirective;
  @ViewChild(NavbarNotificationDirective, { static: false })
  notificationHost!: NavbarNotificationDirective;

  intervalSubscription!: Subscription;
  showFlow = false;
  showNotifications = false;
  unreadCount = 0;

  userNotificationSubscription!: Subscription;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
  ) {}

  ngOnInit() {
    this.notificationService.closeSubject.subscribe(data => {
      if (data) {
        this.notificationClick();
      }
    });
    this.getNotificationsCount();
    this.intervalSubscription = interval(60000).subscribe(() => {
      this.getNotificationsCount();
    });
  }

  notificationClick() {
    this.showNotifications = !this.showNotifications;
    const viewContainerRef = this.notificationHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.showNotifications) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        NavbarNotificationsComponent,
      );
      viewContainerRef.createComponent(componentFactory);
    }
    this.unreadCount = 0;
    const notifications = this.notificationService
      .putUserNotifications()
      .toPromise();
    notifications.then(data => console.log(data));
  }

  flowClick(event: Event) {
    this.showFlow = !this.showFlow;
    const viewContainerRef = this.flowHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.showFlow) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        NavbarFlowComponent,
      );
      viewContainerRef.createComponent(componentFactory);
    }
  }

  ngOnDestroy(): void {
    if (this.userNotificationSubscription) {
      this.userNotificationSubscription.unsubscribe();
    }
  }

  getNotificationsCount() {
    const notificationCountPromise = this.notificationService
      .getUserNotifications()
      .toPromise();
    notificationCountPromise
      .then((data: any) => (this.unreadCount = data.data))
      .catch(error => console.log(error));
  }
}
