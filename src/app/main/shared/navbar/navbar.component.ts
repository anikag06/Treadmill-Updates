import { Component, OnInit, ViewChild, ComponentFactoryResolver } from '@angular/core';
import { NavbarFlowDirective } from './navbar-flow.directive';
import { FlowComponent } from '@/main/flow/flow.component';
import { NavbarFlowComponent } from './navbar-flow/navbar-flow.component';
import { NavbarNotificationDirective } from './navbar-notification.directive';
import { NavbarNotificationsComponent } from './navbar-notifications/navbar-notifications.component';
import { NavbarNotificationsService } from './navbar-notifications.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  @ViewChild(NavbarFlowDirective, {static: false}) flowHost!: NavbarFlowDirective;
  @ViewChild(NavbarNotificationDirective, {static: false}) notifactionHost!: NotificationDirection;

  showFlow = false;
  showNotifications = false;
  unreadCount = 10;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
  ) { }

  ngOnInit() {
    this.notificationService.closeSubject
      .subscribe(
        (data) => {
          console.log(data);
          if (data) {
            this.notificationClick();
          }
        }
      );
  }

  notificationClick() {
    this.showNotifications = !this.showNotifications;
    const viewContainerRef = this.flowHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.showNotifications) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarNotificationsComponent);
      viewContainerRef.createComponent(componentFactory);
    }
  }

  flowClick() {
    this.showFlow = !this.showFlow;
    const viewContainerRef = this.flowHost.viewContainerRef;
    viewContainerRef.clear();
    if (this.showFlow) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(NavbarFlowComponent);
      viewContainerRef.createComponent(componentFactory);
    }
  }
}
