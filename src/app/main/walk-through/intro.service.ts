import {
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Injectable,
  ViewContainerRef,
} from '@angular/core';
import { MOBILE_WIDTH, SHOW_TOAST_DURATION } from '@/app.constants';
// @ts-ignore
import * as introJs from 'intro.js/intro';
import { MatDrawer } from '@angular/material/sidenav';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PointsComponent } from '@/main/shared/points/points.component';
import { IntroDialogComponent } from '@/main/walk-through/intro-dialog/intro-dialog.component';
import { BehaviorSubject } from 'rxjs';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { FlowComponent } from '@/main/flow/flow.component';
import { FlowService } from '@/main/flow/flow.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { GameIntroComponent } from '@/main/walk-through/game-intro/game-intro.component';
import { FormIntroComponent } from '@/main/walk-through/form-intro/form-intro.component';
import { SupportGroupIntroComponent } from '@/main/walk-through/support-group-intro/support-group-intro.component';
import { IntroSelectTagsComponent } from '@/main/walk-through/intro-select-tags/intro-select-tags.component';

@Injectable({
  providedIn: 'root',
})
export class IntroService {
  private drawer!: MatDrawer;
  introduceBehaviour = new BehaviorSubject(true);
  overlayBehaviour = new BehaviorSubject(false);
  hideBehaviour = new BehaviorSubject(false);
  sideBarBehaviour = new BehaviorSubject(true);
  private card!: any;
  introJS = introJs();
  introJSMenu = introJs();
  introJSStart = introJs();
  component: any;
  constructor(
    private dialog: MatDialog,
    private componentFactoryResolver: ComponentFactoryResolver,
    private notificationService: NavbarNotificationsService,
    private flowService: FlowService,
    private stepsDataService: StepsDataService,
  ) {}
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
          intro: '<div class="intro-heading">Click here to start </div>',
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
      // exitOnEsc: false,
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
            '<div  class="intro-heading">Module Name</div>' +
            ' <div class="intro-text">Text about module name .</div>',
          position: 'bottom',
        },
        // {
        //   element: '#active_step',
        //   intro:
        //     '<div class="intro-heading">Current Step </div>' +
        //     '<div class="intro-text">Text about Step.</div>',
        //   // '<div> <button class="btn introjs-button" onClick="introJs().exit()" >Done</button></div>',
        //   position: 'bottom',
        // tooltipClass : 'hide-skip'
        // },
        // {
        //   element: '#active_gif',
        //   intro:
        //     '<div class="intro-heading">Current Step GIF </div> <div></div>' +
        //     '<div class="intro-text">Text about</div>',
        //   position: 'bottom',
        // tooltipClass : 'hide-skip'
        // },
      ],
      tooltipPosition: 'auto',
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      // exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
      doneLabel: 'Next',
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
            '<div class="intro-heading">Progress </div> <div></div>' +
            '<div class="intro-text">Text about</div>',
          position: 'top',
          tooltipClass: window.innerWidth < MOBILE_WIDTH ? 'intro-tooltip' : '',
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
      doneLabel: 'Next',
      exitOnEsc: false,
    });
    intro.start();
    intro.onexit((event: Event) => {
      this.setOverlayFalse();
      this.startGotoIntroInteractive();
    });
  }

  startGotoIntroInteractive() {
    this.introJS.setOptions({
      steps: [
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>',
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
      doneLabel: 'Next',
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
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>',
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
    });
   intro.start();
  }

  startSupportGroupIntro() {
    // this.openDrawer();
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#new_post_mobile' : '#new-post',
          intro:
            '<div class="intro-heading">New Post </div> ' +
            '<div class="intro-text">Text about New Post </div>',
          position: 'bottom',
          tooltipClass: 'hide-skip',
        },
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>',
          position: 'bottom',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel:  '<span style="font-size: 16px;vertical-align: sub">Next &#8594;</span>',
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

    intro.onexit(()=>{
      let text_support_group = '<div>Text about Support Group</div>'
      if(window.innerWidth  < MOBILE_WIDTH){
        this.drawer.toggle();
        setTimeout(()=>{
          this.startNavbarElementIntro('#support-group',text_support_group);
        },2000)
      }
      else{
        this.startNavbarElementIntro('#support-group',text_support_group);
      }
    })
  }


  startNavbarElementIntro(element : string,text_element: string) {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: element,
          intro:
            '<div class="intro-heading">Access from left navigation bar</div> ' +
            text_element,
          position : 'right',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel:  '<span style="font-size: 16px;vertical-align: sub">Next &#8594;</span>',
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
    intro.onexit(()=>{
      this.startGotoIntro();
      if(window.innerWidth < MOBILE_WIDTH){
        this.drawer.toggle();
      }
    })
  }

  // startGamesIntro() {
  //   let intro = introJs.introJs();
  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: '#games',
  //         intro:
  //           '<div class="intro-heading">Access from left navigation bar</div> ' +
  //           '<div>Text about Games</div>',
  //         position: 'right',
  //         tooltipClass: 'hide-skip',
  //       },
  //       {
  //         element:
  //           window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
  //         intro:
  //           '<div class="intro-heading">Goto </div> <div></div>' +
  //           '<div class="intro-text">Text about Goto</div>',
  //         position: 'bottom',
  //       },
  //     ],
  //     tooltipPosition: 'auto',
  //     showStepNumbers: false,
  //     showProgress: false,
  //     showBullets: false,
  //     exitOnOverlayClick: false,
  //     hidePrev: true,
  //     disableInteraction: true,
  //     hideNext: true,
  //     exitOnEsc: false,
  //   });
  //   intro.start();
  // }

  // startFormsIntro() {
  //   let intro = introJs.introJs();
  //   intro.setOptions({
  //     steps: [
  //       {
  //         element: '#forms',
  //         intro:
  //           '<div class="intro-heading">Access from left navigation bar</div> ' +
  //           '<div>Text about Forms</div>',
  //         position: 'right',
  //         tooltipClass: 'hide-skip',
  //       },
  //       {
  //         element:
  //           window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
  //         intro:
  //           '<div class="intro-heading">Goto </div> <div></div>' +
  //           '<div class="intro-text">Text about Goto</div>' +
  //           '<div> <button class="btn introjs-button float-right" onClick="introJs().exit()" >Done</button></div>',
  //         position: 'bottom',
  //       },
  //     ],
  //     tooltipPosition: 'auto',
  //     showStepNumbers: false,
  //     showProgress: false,
  //     showBullets: false,
  //     exitOnOverlayClick: false,
  //     hidePrev: true,
  //     disableInteraction: true,
  //     hideNext: true,
  //     exitOnEsc: false,
  //   });
  //   intro.start();
  // }

  startBadgesIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#profile',
          intro:
            '<div class="intro-heading"> Profile </div> ' +
            '<div class="intro-text">Text about Profile</div>',
          position: 'top',
          tooltipClass: 'hide-skip',
        },
        {
          element: '#points',
          intro:
            '<div class="intro-heading">Points & Badges </div>' +
            '<div class="intro-text">Text about Points & Badges</div>',
          position: 'bottom',
        },
      ],
      tooltipPosition: 'auto',
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
      this.showCongratsDialog();
      // this.stepsDataService
      //   .storeCompletionData(this.completionData)
      //   .subscribe(() => {
      //     this.showCongratsDialog();
      //   });
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

  openIntroDialog() {
    const dialogRef = this.dialog.open(IntroDialogComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.startIntro();
    });
  }

  openGameIntroDialog() {
      const dialogRef = this.dialog.open(GameIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      let text_games = '<div>Text about Games</div>'
      if(window.innerWidth  < MOBILE_WIDTH){
        this.drawer.toggle();
        setTimeout(()=>{
          this.startNavbarElementIntro('#games',text_games);
        },2000)
      }
      else{
        this.startNavbarElementIntro('#games',text_games);
      }
    });

  }

  openFormIntroDialog() {
    const dialogRef = this.dialog.open(FormIntroComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((result) => {
      let text_forms = '<div>Text about Forms</div>'
      if(window.innerWidth  < MOBILE_WIDTH){
        this.drawer.toggle();
        setTimeout(()=>{
          this.startNavbarElementIntro('#forms',text_forms);
        },1000)
      }
      else{
        this.startNavbarElementIntro('#forms',text_forms);
      }
    });
  }

  startFlowIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#flow',
          intro:
            '<div class="intro-heading">Flow </div>' +
            '<div class="intro-text">Text About Flow</div>',
          position: 'bottom',
          highlightClass: 'hide-background',
          tooltipClass: window.innerWidth < MOBILE_WIDTH ? 'intro-tooltip' : '',
        },
      ],
      tooltipPosition: 'auto',
      doneLabel: window.innerWidth < MOBILE_WIDTH ? 'Next' : 'Done',
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
            '<div class="intro-heading">Point </div>' +
            '<div class="intro-text">Text About Point</div>',
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
            '<div class="intro-heading">Menu </div>' +
            '<div class="intro-text">Text About Menu</div>',
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
      }, 2000);
    });
  }

  startNavigationIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#drawer',
          intro:
            '<div class="intro-heading">Navigation </div>' +
            '<div class="intro-text">Text About Text</div>',
          position: 'right',
          tooltipClass:
            window.innerWidth < MOBILE_WIDTH ? 'intro-tooltip-no-margin' : '',
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
        this.startPointsIntro();
      }, 1500);
    });
  }

  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  openDrawer(): void {
    this.drawer.open();
  }

  closeDrawer(): void {
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

  setHideTrue() {
    this.hideBehaviour.next(true);
  }

  setHideFalse() {
    this.hideBehaviour.next(false);
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
}
