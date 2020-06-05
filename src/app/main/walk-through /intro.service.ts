import {ComponentFactoryResolver, Injectable, ViewContainerRef} from '@angular/core';
import {MOBILE_WIDTH, SHOW_TOAST_DURATION} from "@/app.constants";
// @ts-ignore
import * as introJs from 'intro.js/intro';
import {MatDrawer} from "@angular/material/sidenav";
import {CongratsDialogComponent} from "@/main/resources/shared/congrats-dialog/congrats-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastNotificationComponent} from "@/shared/toast-notification/toast-notification.component";
import {PointsComponent} from "@/main/shared/points/points.component";

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private drawer!: MatDrawer
  constructor(private dialog : MatDialog,private componentFactoryResolver: ComponentFactoryResolver,) { }
  introJS = introJs();
  badgeData = {
    name : 'Brave Beginner',
    description : 'Introduction to TreadWill',
    image : 'https://www.api2.treadwill.org/media/badges/worry_free_warrior_m.png'
  }
  startSupportGroupIntro() {
    this.openDrawer();
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
      this.introJS.start();

  }


  setDrawer(drawer: MatDrawer) {
    this.drawer = drawer;
  }

  openDrawer(): void {
    this.drawer.open();
  }

  closeDrawer(): void {
    this.drawer.close();
  }

  startGamesIntro(){
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

  startFormsIntro(){
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

  startBadgesIntro(pointsNotification:ViewContainerRef){
    this.introJS.setOptions({
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
    // this.introJS.start();
   // this.showPointsNotification(pointsNotification);

  }

  showCongratsDialog(){
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

  showPointsNotification(pointsNotification:ViewContainerRef){
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

}
