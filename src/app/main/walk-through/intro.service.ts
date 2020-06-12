import {ComponentFactoryResolver, HostListener, Injectable, ViewContainerRef} from '@angular/core';
import {MOBILE_WIDTH, SHOW_TOAST_DURATION} from "@/app.constants";
// @ts-ignore
import * as introJs from 'intro.js/intro';
import {MatDrawer} from "@angular/material/sidenav";
import {CongratsDialogComponent} from "@/main/resources/shared/congrats-dialog/congrats-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {PointsComponent} from "@/main/shared/points/points.component";
import {IntroDialogComponent} from "@/main/walk-through/intro-dialog/intro-dialog.component";
import {BehaviorSubject} from "rxjs";
import {NavbarNotificationsService} from "@/main/shared/navbar/navbar-notifications.service";
import {FlowComponent} from "@/main/flow/flow.component";
import {FlowService} from "@/main/flow/flow.service";

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private drawer!: MatDrawer
  introduceBehaviour = new BehaviorSubject(false);

  constructor(private dialog: MatDialog, private componentFactoryResolver: ComponentFactoryResolver,
              private notificationService: NavbarNotificationsService,
              private flowService : FlowService,

  ) {
  }

  introJS = introJs();
  badgeData = {
    name: 'Brave Beginner',
    description: 'Introduction to TreadWill',
    image: 'https://www.api2.treadwill.org/media/badges/worry_free_warrior_m.png'
  }

  startDashBoardIntro() {
    this.introJS.setOptions({
      steps: [
        // {
        //   element: '#active_step',
        //   intro: '<div class="intro-heading">Click here to start </div>',
        //   position: 'bottom',
        // },
        // {
        //   element: '#step0',
        //   intro:
        //     '<div  class="intro-heading">Module Name</div>' +
        //     ' <div class="intro-text">Text about module name .</div>',
        //   position: 'bottom',
        // },
        // {
        //   element: '#active_step',
        //   intro:
        //     '<div class="intro-heading">Current Step </div>' +
        //     '<div class="intro-text">Text about Step.</div>',
        //   // '<div> <button class="btn introjs-button" onClick="introJs().exit()" >Done</button></div>',
        //   position: 'bottom',
        // },
        // {
        //   element: '#active_gif',
        //   intro:
        //     '<div class="intro-heading">Current Step GIF </div> <div></div>' +
        //     '<div class="intro-text">Text about</div>',
        //   position: 'bottom',
        // },
        {
          element: '#dashboard',
          intro:
            '<div class="intro-heading">Progress </div> <div></div>' +
            '<div class="intro-text">Text about</div>',
          position: 'bottom',
        },
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
      // exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: false,
      hideNext: true,
    });
    this.introJS.start();
  }

  startSupportGroupIntro() {
    // this.openDrawer();
    this.introJS.setOptions({
      steps: [
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#new_post_mobile' : '#new-post',
          intro:
            '<div class="intro-heading">New Post </div> ' +
            '<div class="intro-text">Text about New Post </div>',
          // '<button onClick="toggle()">Next</button>',
          position: 'bottom',
        },
        {
          element: '#support-group',
          intro:
            '<div class="intro-heading">Access from left navigation bar</div> ' +
            '<div>Text about Support Group</div>',
          position: 'right',
        },
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>' +
            '<div> <button class="btn introjs-button float-right" onClick="introJs().exit()" >Done</button></div>',
          position: 'bottom',
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
    // this.introJS.start();
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

  startGamesIntro() {
    this.introJS.setOptions({
      steps: [
        {
          element: '#games',
          intro:
            '<div class="intro-heading">Access from left navigation bar</div> ' +
            '<div>Text about Games</div>',
          position: 'right',
        },
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>' +
            '<div> <button class="btn introjs-button float-right" onClick="introJs().exit()" >Done</button></div>',
          position: 'bottom',
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
    this.introJS.start();
  }

  startFormsIntro() {
    this.introJS.setOptions({
      steps: [
        {
          element: '#forms',
          intro:
            '<div class="intro-heading">Access from left navigation bar</div> ' +
            '<div>Text about Forms</div>',
          position: 'right',
        },
        {
          element:
            window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
          intro:
            '<div class="intro-heading">Goto </div> <div></div>' +
            '<div class="intro-text">Text about Goto</div>' +
            '<div> <button class="btn introjs-button float-right" onClick="introJs().exit()" >Done</button></div>',
          position: 'bottom',
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
    this.introJS.start();
  }

  startBadgesIntro() {
    let intro = introJs.introJs();
    intro.setOptions({
      steps: [
        {
          element: '#profile',
          intro:
            '<div class="intro-heading"> Profile </div> ' +
            '<div class="intro-text">Text about Profile</div>',
          position: 'bottom',
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
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
    });
    intro.start();
    intro.onexit(()=> {
      console.log("inside exit");
      this.showCongratsDialog();
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

    setTimeout(() => {
      pointsComponent.destroy();
    }, SHOW_TOAST_DURATION);
  }

  openIntroDialog() {
    const dialogRef = this.dialog.open(IntroDialogComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      this.startBadgesIntro();
    });
  }

  stopIntro() {
    this.introJS.exit();
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
    setTimeout(()=>{
      intro.start();
    },1000)


    intro.onexit(()=> {
      this.notificationService.closeNavFlow.emit();
      this.flowService.introduceBehaviour.next(true);
    });


  }

}
