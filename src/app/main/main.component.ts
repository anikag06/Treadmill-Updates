import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  DoCheck,
  ElementRef,
} from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import { Router, NavigationStart } from '@angular/router';
import { DEFAULT_PATH } from '@/app.constants';
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
import { DisableClickDirective } from '@/shared/disable-click.directive';

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

  @ViewChild('drawer', { static: true }) drawer!: MatDrawer;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe([Breakpoints.Handset, Breakpoints.Small])
    .pipe(map(result => result.matches));
  isExpanded = true;

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
    private surveyService: SurveyService,
  ) {


  }

  ngOnChanges() { }

  ngOnInit() {
    console.log('status', this.isDisabled);
    this.tooltipData = 'Please complete the survey.';
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

  }
  ngAfterContentInit(): void {
    this.surveyService.disableLinks.subscribe(() => {
      setTimeout(() => {
        this.isDisabled = true;
        this.tooltipShow();
      }, 10);
    });
  }

  ngOnDestroy(): void {
    this.surveyService.disableLinks.unsubscribe();
  }

  ngDoCheck() {

    this.routing = this.dataService.getOption();
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
      if (this.routing === false) {
        this.goToQuestionnaire(this.router);
      }
    }
    if (this.routing === false) {

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
    // if (this.showToolTip.disabled) {
    this.showToolTip.disabled = false;
    // }

    this.showToolTip.toggle();
  }

}
