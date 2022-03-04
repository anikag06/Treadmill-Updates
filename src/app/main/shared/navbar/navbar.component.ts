import {
  Component,
  ComponentFactoryResolver,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Location } from '@angular/common';
import { NavbarFlowDirective } from './navbar-flow.directive';
import { interval, Subscription } from 'rxjs';
import { NavbarNotificationDirective } from './navbar-notification.directive';
import { NavbarNotificationsComponent } from './navbar-notifications/navbar-notifications.component';
import { NavbarNotificationsService } from './navbar-notifications.service';
import { User } from '@/shared/user.model';
import {
  ActivatedRoute,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AuthService } from '@/shared/auth/auth.service';
import { GamePlayService } from '@/main/games/shared/game-play.service';
import { FlowService } from '@/main/flow/flow.service';
import { ConversationsService } from '@/main/resources/conversation-group/conversations.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomOverlayComponent } from '@/main/shared/custom-overlay/custom-overlay.component';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';
import { FormService } from '@/main/resources/forms/form.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { LOGGED_IN_PATH, TREADWILL } from '@/app.constants';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';
import { Title } from '@angular/platform-browser';

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
  // @ViewChild('flowTrigger', { static: false }) flowTrigger!: MatMenuTrigger;

  intervalSubscription!: Subscription;
  showFlow = false;
  showNotifications = false;
  unreadCount = 0;
  navbarTitle!: any;
  userNotificationSubscription!: Subscription;
  can!: any;
  isDashboard = false;
  convMode = false;
  fromLeftNav!: boolean;
  backClicked = false;
  currentStepId!: number;
  stepSequence!: number;
  stepName!: string;
  stepGroupSequence!: number;
  @Input() user!: User;
  @Output() hamburgerClick = new EventEmitter<any>();
  @Input() isHandset$!: boolean;

  hideSubscription!: Subscription;
  hideCards = false;
  sideBarSubsciprtion!: Subscription;
  fromIntro = false;
  gotoSubscription!: Subscription;
  introExit = false;
  notificationIndicatorWeb = 'assets/shared/notification_indicator_web.svg';
  notificationIndicatorMobile =
    'assets/shared/notification_indicator_mobile.svg';

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService,
    private gamePlayService: GamePlayService,
    private formService: FormService,
    private flowService: FlowService,
    private conversationservice: ConversationsService,
    public dialog: MatDialog,
    private location: Location,
    private overlayService: CustomOverlayService,
    private stepDataService: StepsDataService,
    private goToService: NavbarGoToService,
    private introService: IntroService,
    private titleService: Title,
  ) {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        // Show loading indicator
      }

      if (event instanceof NavigationEnd) {
        this.isDashboard = false;
        this.notificationService.fromLeftNav.subscribe(() => {
          this.fromLeftNav = true;
        });
        if (event.url === LOGGED_IN_PATH) {
          this.isDashboard = true;
        }
        if (this.auth.navbarTitle) {
          this.navbarTitle = this.auth.navbarTitle;
        }
        this.gamePlayService.gameTitle.subscribe(() => {
          this.navbarTitle = this.gamePlayService.gameName;
          this.titleService.setTitle(this.navbarTitle + ' | ' + TREADWILL);
        });
        this.formService.formTitle.subscribe(() => {
          this.navbarTitle = this.formService.formName;
          this.titleService.setTitle(this.navbarTitle + ' | ' + TREADWILL);
        });
        this.flowService.stepDetail.subscribe((value: any) => {
          if (!this.auth.navbarTitle) {
            this.navbarTitle = value;
          } else {
            this.navbarTitle = this.auth.navbarTitle;
          }
          this.titleService.setTitle(this.navbarTitle + ' | ' + TREADWILL);
        });
        this.goToService.settingsPageTitle.subscribe((value: any) => {
          this.navbarTitle = value;
          setTimeout(() => {
            this.titleService.setTitle(value + ' | ' + TREADWILL);
          }, 100);
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
      }
    });
    this.hideSubscription = this.introService.hideBehaviour.subscribe(
      hideCards => {
        this.hideCards = hideCards;
      },
    );
    this.gotoSubscription = this.introService.gotoBehaviour.subscribe(
      (value: boolean) => {
        this.introExit = value;
      },
    );
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
      // this.flowTrigger.closeMenu();
    });
    this.goToService.clickFlow.subscribe(() => {
      this.flowClick();
    });
    this.sideBarSubsciprtion = this.introService.sideBarBehaviour.subscribe(
      fromIntro => {
        this.fromIntro = fromIntro;
      },
    );
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
    notifications.then(data => console.log('success'));
  }

  flowClick() {
    if (this.introExit) {
      this.introService.exitIntro();
      this.introService.setGotoFalse();
    }
    this.notificationService.openNavFlow.emit();
    this.overlayService.showFlow = true;
    const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CustomOverlayComponent,
    );
    const hostViewContainerRef = this.flowHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(navbarFLowComponentFactory);
    this.notificationService.closeNavFlow.subscribe(() => {
      setTimeout(() => {
        // if (!this.overlayService.showChatbot) {
          this.overlayService.overlayClose.emit();
          this.overlayService.showFlow = false;
          hostViewContainerRef.clear();
        // }
      }, 500);
    });
  }

  hamburgerClicked() {
    if (this.fromIntro) {
      this.introService.exitNavIntro();
    }
    this.hamburgerClick.emit();
  }

  homeClick() {
    this.router.navigate([LOGGED_IN_PATH]);
  }

  backClick() {
    this.backClicked = true;
    this.goToService.settingsPageShowEvent.emit();
    this.location.back();
  }

  ngOnDestroy(): void {
    if (this.userNotificationSubscription) {
      this.userNotificationSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.gotoSubscription)) {
      this.gotoSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.hideSubscription)) {
      this.hideSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.sideBarSubsciprtion)) {
      this.sideBarSubsciprtion.unsubscribe();
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
}
