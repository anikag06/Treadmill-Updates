import {
  ComponentFactoryResolver,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { COMPLETED, MOBILE_WIDTH, TABLET_WIDTH } from '@/app.constants';
// @ts-ignore
import * as introJs from 'intro.js/intro';
import { MatDrawer } from '@angular/material/sidenav';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PointsComponent } from '@/main/shared/points/points.component';
import { BehaviorSubject } from 'rxjs';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { FlowService } from '@/main/flow/flow.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatExpansionPanel } from '@angular/material/expansion';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';

@Injectable({
  providedIn: 'root',
})
export class IntroService {
  private drawer!: MatDrawer;
  private expansionPanel!: MatExpansionPanel;
  introduceBehaviour = new BehaviorSubject(true);
  overlayBehaviour = new BehaviorSubject(false);
  hideBehaviour = new BehaviorSubject(false);
  sideBarBehaviour = new BehaviorSubject(true);
  loadingBehaviour = new BehaviorSubject(false);
  gotoBehaviour = new BehaviorSubject(false);
  fixParentBehaviour = new BehaviorSubject(false);
  private card!: any;
  introJS = introJs();
  introJSMenu = introJs();
  introJSStart = introJs();
  component: any;
  user!: User;
  showActiveStepIntro = false;
  constructor(
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
    private flowService: FlowService,
    private stepsDataService: StepsDataService,
    private http: HttpClient,
    private authService: AuthService,
  ) {
    this.user = this.authService.isLoggedIn()!;
  }
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  badgeData = {
    name: 'Brave Beginner',
    description: 'Introduction to TreadWill',
    image:
      'https://www.api2.treadwill.org/media/badges/worry_free_warrior_m.png',
  };

  startIntro() {
    this.introJSStart.setOptions({
      steps: [
        {
          element: '#active_step',
          intro:
            '<div class="intro-heading">Click on the yellow card to get started.</div>',
          position: 'bottom',
          tooltipClass: 'hide-skip-next',
        },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
    });
    this.introJSStart.start();
    this.introJSStart.onexit((event: Event) => {
      this.startDashBoardIntro();
    });
  }

  startDashBoardIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#step0',
          intro:
            '<div  class="intro-heading">This is the Module name</div>' +
            ' <div class="intro-text">In each module, you will learn a different skill to improve your mental health.</div>',
          position: 'bottom',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel: '<span style="font-size: 16px;">Next &#8594;</span>',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit((event: Event) => {
      if (this.showActiveStepIntro) {
        this.togglePanel();
        setTimeout(() => {
          this.startActiveStepIntro();
        }, 500);
      } else {
        this.setOverlayTrue();
        this.startProgressIntro();
      }
    });
  }

  startActiveStepIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#active_step',
          intro:
            '<div class="intro-heading">Current Step</div>' +
            '<div class="intro-text">This is a Step card. Each module has multiple steps. The current step will be highlighted in yellow.</div>',
          position: 'bottom',
          tooltipClass: 'hide-skip',
        },
        {
          element: '#active_gif',
          intro:
            '<div class="intro-heading">Current Step GIF</div> <div></div>' +
            '<div class="intro-text">This icon shows the current step and the current module. Use this icon to find your current step if you are lost.</div>',
          position: 'bottom',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel: '<span style="font-size: 16px">Next &#8594;</span>',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit((event: Event) => {
      this.setOverlayTrue();
      this.startProgressIntro();
    });
  }

  startProgressIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#dashboard',
          intro:
            '<div class="intro-heading">Progress card</div>' +
            '<div class="intro-text">You can find all the modules and steps in this card. This will help you keep track of how much is completed.</div>',
          position: 'right',
        },
      ],
      doneLabel: '<span style="font-size: 16px">Next &#8594;</span>',
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      disableInteraction: false,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit((event: Event) => {
      this.setOverlayFalse();
      this.setGotoTrue();
      this.startGotoIntroInteractive();
    });
  }

  startGotoIntroInteractive() {
    this.introJS.setOptions({
      steps: [
        {
          element:
            window.innerWidth < TABLET_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Go To</div> <div></div>' +
            '<div class="intro-text">Click on "Go To" to access the Progress card from anywhere in TreadWill.</div>',
          position: 'auto',
          tooltipClass: 'hide-skip-next',
        },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
    });
    this.introJS.start();
    this.introJS.onexit((event: Event) => {
      setTimeout(() => {
        this.startFlowIntro();
      }, 1000);
    });
  }

  startGotoIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element:
            window.innerWidth < TABLET_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Go To</div> <div></div>' +
            '<div class="intro-text">Once you are done here, click on "Go To" to access the Progress card and go to the next step.</div>',
          position: 'auto',
        },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
      disableInteraction: true,
    });
    intro.start();
  }

  startSupportGroupIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: window.innerWidth <= 990 ? '#new_post_mobile' : '#new-post',
          intro:
            '<div class="intro-heading">Create post </div> ' +
            '<div class="intro-text">Click on this button to write a post in the SupportGroup. We would love to hear from you.</div>',
          position: 'bottom',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel: '<span style="font-size: 16px">Next &#8594;</span>',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
      exitOnEsc: false,
    });

    intro.start();

    intro.onexit(() => {
      let text_support_group =
        '<div>You can quickly access the SupportGroup from the Navigation menu.</div>';
      if (window.innerWidth < TABLET_WIDTH) {
        this.drawer.toggle();
        this.setParentTrue();
        setTimeout(() => {
          this.startNavbarElementIntro('#support-group', text_support_group);
        }, 500);
      } else {
        this.startNavbarElementIntro('#support-group', text_support_group);
      }
    });
  }

  startNavbarElementIntro(element: string, text_element: string) {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: element,
          intro:
            '<div class="intro-heading">Access from the Navigation menu</div> ' +
            text_element,
          position: 'right',
          tooltipPosition: 'bottom',
        },
      ],

      doneLabel: '<span style="font-size: 16px;">Next &#8594;</span>',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit(() => {
      this.startGotoIntro();
      if (window.innerWidth < TABLET_WIDTH) {
        this.drawer.toggle();
        this.setParentFalse();
      }
    });
  }

  startBadgesIntro(status: string) {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#profile',
          intro:
            '<div class="intro-heading"> Your Profile </div> ' +
            '<div class="intro-text">You can see all the badges and your total score here. The badges you have earned will be highlighted.</div>',
          position: 'top',
          tooltipClass:
            window.innerWidth <= 360 ? 'bottom-centre' : 'hide-skip',
        },
        {
          element: '#points',
          intro:
            '<div class="intro-heading">Points & Badges </div>' +
            '<div class="intro-text"><div class="box-blue-intro"></div>Total points.<br/><div class="circle-intro gold"></div>No. of gold badges.<br/><div class="circle-intro silver"></div>No. of silver badges.<br/><div class="circle-intro bronze"></div>No. of bronze badges.</div>',
          position: 'bottom',
        },
      ],

      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      scrollToElement: true,
      hidePrev: true,
      hideNext: true,
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit((event: Event) => {
      this.completionData.step_id = 75;
      this.completionData.time_spent = 100;
      this.setIntroduceTrue();
      if (status !== COMPLETED) {
        this.stepsDataService
          .storeCompletionData(this.completionData)
          .subscribe(() => {
            this.showCongratsDialog();
          });
      }
    });
  }

  showCongratsDialog() {
    const dialogRef = this.dialog.open(CongratsDialogComponent, {
      maxWidth: '90vw',
      // width: '44%',
      height: '48%',
      panelClass: 'slide-video',
      data: {
        isLocked: false,
        isLastStep: true,
        badgeData: this.badgeData,
      },
      autoFocus: false,
    });
  }

  showPointsNotification(pointsNotification: ViewContainerRef) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      PointsComponent,
    );
    const pointsComponent = pointsNotification.createComponent(
      componentFactory,
    );
    pointsComponent.instance.points = 20;
    this.component = pointsComponent;
  }

  startFlowIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#flow',
          intro:
            '<div class="intro-heading">Progress card</div>' +
            '<div class="intro-text">This is the same Progress card that you saw earlier. A shortcut via "Go To" so that you can access the next step quickly.</div>',
          position: 'bottom',
          highlightClass: 'hide-background',
          tooltipClass: window.innerWidth < MOBILE_WIDTH ? 'intro-tooltip' : '',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel:
        window.innerWidth <= TABLET_WIDTH
          ? '<span style="font-size: 16px;">Next &#8594;</span>'
          : 'Done',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
      exitOnEsc: false,
    });
    if (window.innerWidth < MOBILE_WIDTH) {
      this.setOverlayTrue();
    }
    this.setHideTrue();
    intro.start();
    intro.onexit(() => {
      this.setHideFalse();
      this.setOverlayFalse();
      this.notificationService.closeNavFlow.emit();
      if (window.innerWidth > MOBILE_WIDTH) {
        if (!this.flowService.stepCompleted) {
          this.postScore(20);
        }
        setTimeout(() => {
          this.flowService.introduceBehaviour.next(true);
        }, 1000);
        setTimeout(() => {
          this.startPointsIntro();
        }, 1500);
      } else {
        setTimeout(() => {
          this.startMenuIntro();
        }, 1000);
      }
    });
  }

  startPointsIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#point',
          intro:
            '<div class="intro-heading">Points </div>' +
            '<div class="intro-text">You can earn points by completing steps and for other activities in TreadWill.</div>',
          position: 'bottom',
          // highlightClass: 'hide-background',
          // tooltipClass: window.innerWidth < MOBILE_WIDTH ? 'intro-tooltip' : '',
        },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
    });
    intro.start();
    intro.onexit(() => {
      this.completionData.step_id = 77;
      this.completionData.time_spent = 100;
      this.stepsDataService
        .storeCompletionData(this.completionData)
        .subscribe(() => {
          this.destroyComponent();
        });
    });
  }

  startMenuIntro() {
    this.introJSMenu.setOptions({
      steps: [
        {
          element: '#hamburger',
          intro:
            '<div class="intro-heading">Hamburger icon </div>' +
            '<div class="intro-text">Click on the hamburger icon to access the Navigation menu.</div>',
          position: 'bottom',
          tooltipClass: 'hide-skip-next',
        },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
      exitOnEsc: false,
    });
    this.setSideBarTrue();
    this.introJSMenu.start();
    this.introJSMenu.onexit(() => {
      setTimeout(() => {
        this.setOverlayTrue();
        this.startNavigationIntro();
      }, 500);
    });
  }

  startNavigationIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#drawer',
          intro:
            '<div class="intro-heading">Navigation menu</div>' +
            '<div class="intro-text"> This menu gives you a shortcut to the features of TreadWill.</div>',
          position: 'right',
          tooltipClass:
            window.innerWidth < MOBILE_WIDTH
              ? 'intro-tooltip-custom-margin'
              : '',
        },
      ],
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
      exitOnEsc: false,
    });

    intro.start();
    intro.onexit(() => {
      this.setOverlayFalse();
      this.drawer.toggle();
      setTimeout(() => {
        this.flowService.introduceBehaviour.next(true);
      }, 1000);
      setTimeout(() => {
        this.setSideBarFalse();
        if (!this.flowService.stepCompleted) {
          this.postScore(20);
        }
        this.startPointsIntro();
      }, 1500);
    });
  }

  callNavbarFormIntro() {
    let text_forms =
      '<div class="intro-text">You can quickly access this form from the Navigation menu.</div>';
    if (window.innerWidth < TABLET_WIDTH) {
      this.toggleDrawer();
      this.setParentTrue();
      setTimeout(() => {
        this.startNavbarElementIntro('#forms', text_forms);
      }, 500);
    } else {
      this.startNavbarElementIntro('#forms', text_forms);
    }
  }

  callNavBarGameIntro() {
    let text_games =
      '<div class="intro-text">You can quickly access this game from the Navigation menu.</div>';
    if (window.innerWidth < TABLET_WIDTH) {
      this.toggleDrawer();
      this.setParentTrue();
      setTimeout(() => {
        this.startNavbarElementIntro('#games', text_games);
      }, 500);
    } else {
      this.startNavbarElementIntro('#games', text_games);
    }
  }

  showAnimation(element: string) {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/flow/show-introductory-animation/' +
        element,
    );
  }

  postScore(score: number) {
    const body = {
      score: score,
    };
    return this.http.post(
      environment.API_ENDPOINT +
        '/api/v1/user/user-profile/' +
        this.user.username,
      body,
    );
  }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  setPanel(panel: MatExpansionPanel) {
    this.expansionPanel = panel;
  }

  togglePanel() {
    this.expansionPanel.open();
  }

  toggleDrawer(): void {
    this.drawer.toggle();
  }

  setIntroduceFalse() {
    this.introduceBehaviour.next(false);
  }

  setIntroduceTrue() {
    this.introduceBehaviour.next(true);
  }

  setSideBarFalse() {
    this.sideBarBehaviour.next(false);
  }

  setSideBarTrue() {
    this.sideBarBehaviour.next(true);
  }

  setOverlayFalse() {
    this.overlayBehaviour.next(false);
  }

  setOverlayTrue() {
    this.overlayBehaviour.next(true);
  }

  setLoadingFalse() {
    this.loadingBehaviour.next(false);
  }

  setLoadingTrue() {
    this.loadingBehaviour.next(true);
  }

  setHideTrue() {
    this.hideBehaviour.next(true);
  }

  setHideFalse() {
    this.hideBehaviour.next(false);
  }

  setGotoTrue() {
    this.gotoBehaviour.next(true);
  }

  setGotoFalse() {
    this.gotoBehaviour.next(false);
  }

  setParentTrue() {
    this.fixParentBehaviour.next(true);
  }

  setParentFalse() {
    this.fixParentBehaviour.next(false);
  }

  exitIntro() {
    this.introJS.exit();
  }

  exitNavIntro() {
    this.introJSMenu.exit();
  }

  exitStartIntro() {
    this.introJSStart.exit();
  }

  destroyComponent() {
    this.component.destroy();
  }

  setActiveStepIntro(value: boolean) {
    this.showActiveStepIntro = true;
  }
}
