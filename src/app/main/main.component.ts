import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  DoCheck,
  OnChanges,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { NavigationStart, Router } from '@angular/router';
import { DEFAULT_PATH, SHOW_TOAST_DURATION } from '@/app.constants';
import { MatDrawer, MatTooltip } from '@angular/material';
import { DataService } from '@/shared/questionnaire/data.service';
import { FcmService } from '@/shared/fcm.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from './flow/flow.service';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { IntroduceComponent } from './shared/introduce/introduce.component';
import { IntroduceService } from './shared/introduce/introduce.service';
import { SurveyService } from './shared/survey.service';
import { ToastNotificationDirective } from '@/shared/toast-notification/toast-notification.directive';
import { ToastNotificationComponent } from '@/shared/toast-notification/toast-notification.component';

// tslint:disable-next-line:max-line-length

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit, OnChanges, DoCheck {
  user!: User;
  routing!: boolean;
  overlayRef!: OverlayRef;
  tooltipData!: any;
  isDisabled = false;
  showChatbot = true;

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(map(result => result.matches));
  isExpanded = true;
  @ViewChild(ToastNotificationDirective, { static: true })
  toastNotification!: ToastNotificationDirective;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router,
    private dataService: DataService,
    private fcmService: FcmService,
    private quizService: QuizService,
    private flowService: FlowService,
    private overlay: Overlay,
    private introduceService: IntroduceService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private surveyService: SurveyService,
  ) { }

  ngOnChanges() { }

  ngOnInit() {

    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }

    this.fcmService.requestPermission();

    this.flowService.introduceBehaviour.subscribe((data: any) => {
      if (data) {
        this.startIntroduction();
      }
    });

    this.introduceService.closeBehaviour.subscribe((data: any) => {
      if (data) {
        this.overlayRef.detach();
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
  }

  ngAfterContentInit(): void {
    this.surveyService.disableLinks.subscribe((data: string) => {
      this.disableLinks(data);
    });
    this.surveyService.enableLinks.subscribe(() => {
      this.enableLinks();
    });
    this.quizService.disableLinks.subscribe((data: string) => {
      this.disableLinks(data);

    });
    this.quizService.enableLinks.subscribe(() => {
      this.enableLinks();
    });
  }

  ngOnDestroy(): void {
  }

  ngDoCheck() {

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

  startIntroduction() {
    this.overlayRef = this.overlay.create({
      height: '100vh',
      width: '100vw',
    });
    const portal = new ComponentPortal(IntroduceComponent);
    this.overlayRef.attach(portal);
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

}
