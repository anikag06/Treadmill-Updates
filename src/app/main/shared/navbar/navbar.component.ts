import {
  Component,
  OnInit,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  Input, ElementRef,
} from '@angular/core';
import { Location } from '@angular/common';
import { NavbarFlowDirective } from './navbar-flow.directive';
import { interval, Subscription } from 'rxjs';
import { NavbarFlowComponent } from './navbar-flow/navbar-flow.component';
import { NavbarNotificationDirective } from './navbar-notification.directive';
import { NavbarNotificationsComponent } from './navbar-notifications/navbar-notifications.component';
import { NavbarNotificationsService } from './navbar-notifications.service';
import { User } from '@/shared/user.model';
import {
  ActivatedRoute,
  Router,
  Event,
  NavigationStart,
  NavigationEnd,
  NavigationError,
} from '@angular/router';
import { AuthService } from '@/shared/auth/auth.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { FlowService } from '@/main/flow/flow.service';
import { ConversationsService } from '@/main/resources/conversation-group/conversations.service';
import { MatMenuTrigger } from '@angular/material';
import {FlowComponent} from '@/main/flow/flow.component';
import {DialogBoxService} from '@/main/shared/custom-dialog/dialog-box.service';
import {SlidesVideoComponent} from '@/main/resources/slides/slides-video/slides-video.component';
import {DialogPosition, MatDialog} from '@angular/material/dialog';
import {CustomOverlayComponent} from '@/main/shared/custom-overlay/custom-overlay.component';

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
  @ViewChild('flowTrigger', { static: false }) flowTrigger!: MatMenuTrigger;

  intervalSubscription!: Subscription;
  showFlow = false;
  showNotifications = false;
  unreadCount = 0;
  navbarTitle!: string;
  userNotificationSubscription!: Subscription;
  can!: any;
  isDashboard = false;
  isConversation = false;
  convMode = false;
  @Input() user!: User;

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private gamePlayService: GamePlayService,
    private flowService: FlowService,
    private conversationservice: ConversationsService,
    public dialog: MatDialog,
    private location: Location,
    ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.isDashboard = false;
        this.isConversation = false;

        if (this.auth.navbarTitle) {
          this.navbarTitle = this.auth.navbarTitle;
          console.log(event);
          if (event.url === '/dashboard') {
            this.isDashboard = true;
          }
        }
        this.gamePlayService.gameTitle.subscribe(() => {
          console.log('FROM NAVBAR', this.gamePlayService.gameName);
          this.navbarTitle = this.gamePlayService.gameName;
        });
        this.flowService.stepDetail.subscribe(() => {
          this.navbarTitle =
            this.flowService.stepGroupSequence.toString() +
            '.' +
            this.flowService.stepSequence.toString() +
            ' ' +
            this.flowService.stepName;
        });
        this.notificationService.showFullConvIcon.subscribe(() => {
          this.convMode = true;
        });
        this.notificationService.removeFullConvIcon.subscribe(() => {
          this.convMode = false;
        });
        this.notificationService.isDashboard = this.isDashboard;
      }

      if (event instanceof NavigationError) {
        // Hide loading indicator

        // Present error to user
        console.log(event.error);
      }
    });
  }

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
    this.notificationService.closeNavFlow.subscribe(() => {
      console.log('close menu');
      this.flowTrigger.closeMenu();
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

  flowClick(event: any) {
    this.notificationService.openNavFlow.emit();
    this.notificationService.showFlow = true;
    console.log('flow host', this.flowHost);
    const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomOverlayComponent);
    const hostViewContainerRef = this.flowHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(navbarFLowComponentFactory);
    this.notificationService.closeNavFlow.subscribe( () => {
      hostViewContainerRef.clear();
    });
  }

  homeClick() {
    this.router.navigate(['/dashboard']);
  }
  backClick() {
    this.location.back();
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

  onshowFullConversation() {
    this.notificationService.showFullConv.emit();
  }
  // getRouteInfo(data: string) {
  //   console.log(data);
  //   this.navbarTitle = this.navbarTitleInfo[data];
  // }
}
