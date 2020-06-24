import {
  AfterContentInit,
  Component,
  ComponentFactoryResolver,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { NavigationStart, Router } from '@angular/router';
import {
  DEFAULT_PATH,
  MOBILE_WIDTH,
  SHOW_TOAST_DURATION,
  SUPPORT_GROUP,
} from '@/app.constants';
import { MatDrawer, MatTooltip } from '@angular/material';
import { DataService } from '@/shared/questionnaire/data.service';
import { FcmService } from '@/shared/fcm.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from './flow/flow.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { SurveyService } from './shared/survey.service';
import { ToastNotificationDirective } from '@/shared/toast-notification/toast-notification.directive';
import { ToastNotificationComponent } from '@/shared/toast-notification/toast-notification.component';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';
import { CommonService } from '@/shared/common.service';
import { InternetConnectionComponent } from '@/shared/internet-connection/internet-connection.component';

import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';
import { isNotNullOrUndefined } from 'codelyzer/util/isNotNullOrUndefined';

declare var twemoji: any;

// tslint:disable-next-line:max-line-length

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  providers: [DataService, QuizService],
  styleUrls: ['./main.component.scss'],
})
export class MainComponent
  implements OnInit, OnChanges, DoCheck, OnDestroy, AfterContentInit {
  user!: User;
  routing!: boolean;
  overlayRef!: OverlayRef;
  tooltipData!: any;
  isDisabled = false;
  showChatbot = true;
  isDashboard!: boolean;
  flowLoaded = true;
  flowOpen = false;
  overlayOpen = false;
  firstLoad = true;
  showOverlay = false;

  onlineStatusMessages = [
    "You're online. Life's good again.",
    "Internet's back. Phew...",
    "You're online. Apocalypse averted.",
    "Internet's back. Woohoo ...",
  ];

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(map(result => result.matches));
  isExpanded = true;

  @ViewChild(ToastNotificationDirective, { static: true })
  toastNotification!: ToastNotificationDirective;

  @ViewChild('connection', { static: true, read: ViewContainerRef })
  connectionNotification!: ViewContainerRef;

  @ViewChild('pointsNotification', { static: true, read: ViewContainerRef })
  pointsNotification!: ViewContainerRef;

  introSubscription!: Subscription;
  loadSubscription!: Subscription;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private fcmService: FcmService,
    private quizService: QuizService,
    private flowService: FlowService,
    private overlay: Overlay,
    private componentFactoryResolver: ComponentFactoryResolver,
    private surveyService: SurveyService,
    private notificationService: NavbarNotificationsService,
    private overlayService: CustomOverlayService,
    private commonService: CommonService,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
  ) {}

  ngOnChanges() {}

  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }

    this.introService.setDrawer(this.drawer);

    this.fcmService.requestPermission();

    this.flowService.introduceBehaviour.subscribe((data: any) => {
      if (data) {
        this.introService.showPointsNotification(this.pointsNotification);
      }
    });

    this.fcmService.newNotification.subscribe(message => {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ToastNotificationComponent,
      );

      const toastComponentRef = this.toastNotification.viewContainerRef.createComponent(
        componentFactory,
      );

      toastComponentRef.instance.title = message.notification.title;
      toastComponentRef.instance.body = message.notification.body;
      setTimeout(() => {
        toastComponentRef.destroy();
      }, SHOW_TOAST_DURATION);
    });

    this.notificationService.openNavFlow.subscribe(() => {
      this.flowLoaded = false;
      this.flowOpen = true;
    });
    this.notificationService.navFlowOpened.subscribe(() => {
      setTimeout(() => {
        this.flowLoaded = true;
      }, 500);
    });
    this.notificationService.closeNavFlow.subscribe(() => {
      this.flowLoaded = false;
      setTimeout(() => {
        this.flowOpen = false;
        this.flowLoaded = true;
      }, 500);
    });
    this.overlayService.overlayOpen.subscribe(() => {
      //   this.flowLoaded = false;
      this.overlayOpen = true;
    });
    this.overlayService.overlayClose.subscribe(() => {
      //   this.flowLoaded = false;
      this.overlayOpen = false;
      console.log('OVERLAY OPEN', this.overlayService.overlayOpen);
    });

    this.commonService.createOnline$().subscribe(isOnline => {
      this.connectionNotification.clear();
      const statusMessage = isOnline
        ? this.onlineStatusMessages[
            Math.floor(
              Math.random() * Math.floor(this.onlineStatusMessages.length),
            )
          ]
        : "You're offline. Changes won't be saved &#128577;";
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        InternetConnectionComponent,
      );
      const connectionComponentRef = this.connectionNotification.createComponent(
        componentFactory,
      );
      connectionComponentRef.instance.onlineStatus = isOnline;
      connectionComponentRef.instance.statusMessage = statusMessage;

      if (isOnline) {
        setTimeout(
          () => {
            connectionComponentRef.destroy();
            this.firstLoad = false;
          },
          this.firstLoad ? 0 : 3000,
        );
      }
    });

    if (window.innerWidth < MOBILE_WIDTH) {
      this.introSubscription = this.introService.overlayBehaviour.subscribe(
        showOverlay => {
          this.showOverlay = showOverlay;
        },
      );
    }

    this.loadSubscription = this.flowService.loadBehaviour.subscribe(
      (data: boolean) => {
        if (data && !this.flowService.getFirstStepCompleted()) {
          this.introDialogService.openIntroDialog();
        }
      },
    );
  }

  ngAfterContentInit(): void {
    this.surveyService.disableLinks.subscribe((data: string) => {
      this.disableLinks(data);
    });
    this.surveyService.enableLinks.subscribe(() => {
      this.enableLinks();
    });
    this.quizService.disableLinks.subscribe((data: string) => {
      console.log('LINKS DISABLED');
      this.disableLinks(data);
    });
    this.quizService.enableLinks.subscribe(() => {
      this.enableLinks();
    });
  }

  ngDoCheck() {
    this.isDashboard = this.notificationService.isDashboard;

    this.routing = this.dataService.getOption();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
      if (!this.routing) {
        this.goToQuestionnaire(this.router);
      }
    }
    if (!this.routing) {
      this.router.events
        .pipe(filter(e => e instanceof NavigationStart))
        .subscribe((e: any) => {
          this.goToQuestionnaire(e);
        });
    }
  }

  onLinkClick(event: Event) {
    this.notificationService.fromLeftNav.emit();
    if (window.innerWidth < 960) {
      this.drawer.toggle();
    }
  }

  goToQuestionnaire(e: any) {
    if (
      e.url !== '/questionnaire' &&
      this.user &&
      this.quizService.questionnaireActive
    ) {
      this.router.navigate(['/questionnaire']);
    }
  }

  tooltipShow() {
    console.log('tooltip');
    this.showToolTip.toggle();
  }

  disableLinks(data: string) {
    setTimeout(() => {
      this.isDisabled = true;
      this.showToolTip.disabled = false;
      this.showChatbot = false;
      this.tooltipData = data;
    }, 10);
  }

  enableLinks() {
    setTimeout(() => {
      this.isDisabled = false;
      this.showToolTip.disabled = true;
      this.showChatbot = true;
    }, 10);
  }

  ngOnDestroy() {
    if (isNotNullOrUndefined(this.introSubscription)) {
      this.introSubscription.unsubscribe();
    }
    if (isNotNullOrUndefined(this.loadSubscription)) {
      this.loadSubscription.unsubscribe();
    }
  }

  showSupportGroupIntro() {
    this.introService.showAnimation(SUPPORT_GROUP).subscribe((data: any) => {
      if (data.show_animation) {
        setTimeout(() => {
          this.introDialogService.openSupportGroupIntroDialog(false);
        }, 1000);
      }
    });
  }
}
