import {Injectable} from '@angular/core';
import {MOBILE_WIDTH} from "@/app.constants";
// @ts-ignore
import * as introJs from 'intro.js/intro';
import {MatDrawer} from "@angular/material/sidenav";

@Injectable({
  providedIn: 'root'
})
export class IntroService {

  private drawer!: MatDrawer;
  constructor() { }
  introJS = introJs();

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

}
