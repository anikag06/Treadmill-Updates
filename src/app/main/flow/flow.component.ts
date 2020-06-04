import {Component, Input, OnDestroy, OnInit,} from '@angular/core';
import {FlowService} from './flow.service';
import {StepGroup} from './step-group/step-group.model';
import {Subscription} from 'rxjs';
import {MOBILE_WIDTH} from '@/app.constants';
import {MatDialog} from '@angular/material/dialog';
// @ts-ignore
import * as introJs from 'intro.js/intro';
import {IntroDialogComponent} from '@/main/walk-through /intro-dialog/intro-dialog.component';

@Component({
  selector: 'app-flow',
  templateUrl: './flow.component.html',
  styleUrls: ['./flow.component.scss'],
})
export class FlowComponent implements OnInit, OnDestroy {
  @Input() navBar!: any;
  stepGroups: StepGroup[] = [];
  flowSubscription!: Subscription;
  dataloaded = false;
  introJS = introJs();

  constructor(private flowService: FlowService, private dialog: MatDialog) {}

  ngOnInit() {
    console.log(this.navBar);
    this.dataloaded = false;
    this.flowService.loadBehaviour.subscribe((data) => this.loadData());
  }

  ngAfterViewInit() {
    this.introJS.setOptions({
      steps: [
        //     {
        //       element:
        //         window.innerWidth < MOBILE_WIDTH ? '#goto_mobile' : '#goto_desktop',
        //       intro:
        //         '<div style="text-align: center;font-weight: bold">Goto Button</div> <div>Text about  goto button.</div>',
        //       position: 'bottom',
        //     },
        //     {
        //       element: window.innerWidth < MOBILE_WIDTH ? '#hamburger' : '#drawer',
        //       intro:
        //         '<div style="text-align: center;font-weight: bold">Navigation Bar</div> <div>Text about  navigation bar.</div>' +
        //         '<div> <button class="btn introjs-button" onClick="introJs().exit()" >Done</button></div>',
        //       position: 'right',
        //     },
        // {
        //         element: '#profile',
        //         intro:
        //           '<div style="text-align: center;font-weight: bold">Module Name</div> <div>Text about module name .</div>',
        //         position: 'bottom',
        //       },
        {
          element: '#active_step',
          intro: '<div class="intro-heading">Click here to start </div>',
          position: 'bottom',
        },
        {
          element: '#step0',
          intro:
            '<div  class="intro-heading">Module Name</div>' +
            ' <div class="intro-text">Text about module name .</div>',
          position: 'bottom',
        },
        {
          element: '#active_step',
          intro:
            '<div class="intro-heading">Current Step </div>' +
            '<div class="intro-text">Text about Step.</div>',
          // '<div> <button class="btn introjs-button" onClick="introJs().exit()" >Done</button></div>',
          position: 'bottom',
        },
        {
          element: '#active_gif',
          intro:
            '<div class="intro-heading">Current Step GIF </div> <div></div>' +
            '<div class="intro-text">Text about</div>',
          position: 'bottom',
        },
        {
          element: '#dashboard',
          intro:
            '<div class="intro-heading">Progress </div> <div></div>' +
            '<div class="intro-text">Text about</div>' ,
          position: 'right',
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
      showStepNumbers: false,
      showProgress: false,
      showBullets: false,
      // exitOnOverlayClick: false,
      hidePrev: true,
      disableInteraction: true,
      hideNext: true,
    });
  }

  ngOnDestroy(): void {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
  }

  loadData() {
    if (this.flowSubscription) {
      this.flowSubscription.unsubscribe();
    }
    this.flowSubscription = this.flowService
      .getFlow()
      .subscribe((data: any) => {
        console.log('response', data);
        this.stepGroups = data.step_groups;
        this.dataloaded = true;
        //this.introJS.start();
        // this.openIntroDialog();
      });
  }

  openIntroDialog() {
    const dialogRef = this.dialog.open(IntroDialogComponent, {
      panelClass: 'intro-dialog',
      autoFocus: false,
      maxWidth: '340px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
        // this.introJS.start();
    });
  }
}
