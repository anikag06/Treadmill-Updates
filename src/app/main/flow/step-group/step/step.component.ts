import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import {
  ACTIVE,
  COMPLETED,
  CONCLUSION_PAGE,
  CONTROL_PAGE,
  CONVERSATION_GROUP,
  FORM,
  GAME,
  INTRODUCTION_PAGE,
  INTRODUCTORY_ANIMATION,
  LOCKED,
  RESOURCES_PAGE,
  SLIDE,
  SUPPORT_GROUP,
  SURVEY,
  TESTIMONIALS_PAGE,
  VIDEO,
} from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Router } from '@angular/router';
import { FlowService } from '../../flow.service';
import { MatTooltip } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { type } from 'os';
import { AuthService } from '@/shared/auth/auth.service';
import { User } from '@/shared/user.model';
import {
  MINDFULNESS_VIDEOS,
  VIDEOS_ON_DEPRESSION,
} from '@/main/walk-through/intro.constant';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  providers: [DatePipe],
})
export class StepComponent implements OnInit, AfterViewInit {
  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;
  user!: User;
  prevModuleLastStep: any;
  tooltipData!: any;
  isConversationStep = false;
  conversationBarValue = 25; // default value is kept 5
  isShowConversationBar = false;

  constructor(
    private router: Router,
    private flowStepNavService: FlowStepNavigationService,
    private flowService: FlowService,
    private datePipe: DatePipe,
    private element: ElementRef,
    private navbarService: NavbarNotificationsService,
    private introService: IntroService,
    private introDialogService: IntroDialogService,
    private goToService: NavbarGoToService,
    private authService: AuthService,
  ) {
    this.user = <User>this.authService.isLoggedIn();
  }

  ngOnInit() {
    this.tooltipData = 'Complete the previous steps first';
    if (
      this.step.data_type === CONVERSATION_GROUP &&
      this.step.status !== LOCKED
    ) {
      if (this.step.step_data.data.conversation_completed_percentage > 0) {
        this.conversationBarValue = this.step.step_data.data.conversation_completed_percentage;
      }
      if (this.conversationBarValue !== 100) {
        this.isShowConversationBar = true;
      }
    }
  }

  ngAfterViewInit() {
    // this is done to change the properties of progress bar in conversation in flow
    const stepProgressBar = this.element.nativeElement.querySelectorAll(
      '.step-progress-bar .mat-progress-bar',
    );
    // tslint:disable-next-line: max-line-length
    const stepProgressBarBuffer = this.element.nativeElement.querySelectorAll(
      '.step-progress-bar .mat-progress-bar .mat-progress-bar-buffer',
    );
    const stepProgressBarFill = this.element.nativeElement.querySelectorAll(
      '.step-progress-bar .mat-progress-bar .mat-progress-bar-fill',
    );
    if (stepProgressBar.length > 0) {
      stepProgressBar[0].setAttribute(
        'style',
        'border-radius: 2px; !important',
      );
      stepProgressBarBuffer[0].setAttribute(
        'style',
        'background-color: #E4E8EB; !important',
      );

      const afterElement = document.createElement('style');
      afterElement.innerHTML +=
        ' .' +
        'mat-progress-bar-fill' +
        ':' +
        'after' +
        '{' +
        'background-color' +
        ':' +
        '#5E5E5E' +
        '}';
      stepProgressBarFill[0].appendChild(afterElement);
    }
  }

  nextLink() {
    return this.flowStepNavService.goToFlowNextStep(this.step);
  }

  previousStep(stepGroup: StepGroup, step: Step) {
    const allSteps = <Step[]>stepGroup.steps;
    const index = allSteps.indexOf(step, 1);
    return allSteps[index - 1];
  }

  nextStep(stepGroup: StepGroup, step: Step) {
    const allSteps = <Step[]>stepGroup.steps;
    const index = allSteps.indexOf(step, 1);
    return allSteps[index + 1];
  }

  markDone() {
    const prev = this.previousStep(this.stepGroup, this.step);
    if (prev && prev.status === COMPLETED) {
      this.flowStepNavService.virtualStepMarkDone(this.step, 1); // here 1 is the time spent
    }
  }

  navigate(event: Event) {
    this.goToService.nextControlContentLoad.emit();
    event.preventDefault();
    //
    this.showTooltipFun();

    if (this.step.data_type === GAME && this.step.status !== COMPLETED) {
      // add this.step.status === COMPLETED condition
      this.introService
        .showAnimation(this.step.action[0])
        .subscribe((data: any) => {
          if (data.show_animation) {
            setTimeout(() => {
              this.introDialogService.openGameIntroDialog(
                true,
                this.step.action[0],
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.introService.callNavBarGameIntro();
            }, 500);
          }
        });
    }

    if (this.step.data_type === FORM && this.step.status !== COMPLETED) {
      this.introService
        .showAnimation(this.step.action[0])
        .subscribe((data: any) => {
          if (data.show_animation) {
            setTimeout(() => {
              this.introDialogService.openFormIntroDialog(
                true,
                this.step.action[0],
              );
            }, 500);
          } else {
            setTimeout(() => {
              this.introService.callNavbarFormIntro();
            }, 500);
          }
        });
    }

    if (
      this.step.data_type === SUPPORT_GROUP &&
      this.step.status !== COMPLETED
    ) {
      this.introService.showAnimation(SUPPORT_GROUP).subscribe((data: any) => {
        // add this.step.status === COMPLETED condition
        if (data.show_animation) {
          setTimeout(() => {
            this.introDialogService.openSupportGroupIntroDialog(true);
          }, 1000);
        } else {
          setTimeout(() => {
            this.introService.startSupportGroupIntro();
          }, 500);
        }
      });
    }

    this.markDone();
    if (this.step.data_type === INTRODUCTORY_ANIMATION) {
      if (this.step.name === 'Navigating TreadWill') {
        this.flowService.setFirstStepID(this.step.id);
        if (this.step.status === COMPLETED) {
          this.introService.startDashBoardIntro();
        } else {
          this.introService.exitStartIntro();
        }
      } else if (this.step.name === 'Points, badges, and profile') {
        this.introService.setIntroduceFalse();
        setTimeout(() => {
          this.introService.startBadgesIntro(this.step.status);
        }, 500);
      } else if (this.step.name === 'Meet WillBot') {
        setTimeout(() => {
          this.introService.setChatbotIntro(true);
          this.introService.startChatbotIntro(this.step.status, this.step.id);
        }, 500);
      } else if (
        this.step.data_type === INTRODUCTORY_ANIMATION &&
        this.step.name === 'Self-care expert'
      ) {
        this.flowService.showSelfCareDialog();
      }
      // setTimeout(() => {
      //   this.step.status = COMPLETED;
      // }, 1200);

      // this.flowService.triggerLoad();
      // setTimeout(() => this.flowService.triggerLoad(), 1);
      // setTimeout(() => this.flowService.triggerLoad(), 10);
    } else {
      setTimeout(() => this.flowService.triggerLoad(), 2000);
    }

    if (
      this.step.name === 'Mindfulness videos' &&
      this.step.status !== COMPLETED
    ) {
      this.introDialogService.openResourceIntro(true, MINDFULNESS_VIDEOS);
    }
    if (
      this.step.name === 'Videos on depression' &&
      this.step.status !== COMPLETED
    ) {
      this.introDialogService.openResourceIntro(true, VIDEOS_ON_DEPRESSION);
    }
    if (this.step.status !== LOCKED) {
      this.closeNavFlow();
      return this.router.navigate([this.nextLink()]);
    }
  }
  locked() {
    return this.step.status === LOCKED && !this.step.virtual_step;
  }

  active() {
    return this.step.status === ACTIVE;
  }

  getStepIcon(step: Step) {
    if (step.data_type === SLIDE) {
      return 'assets/flow/icon-slide-wb.png';
    } else if (step.data_type === CONVERSATION_GROUP) {
      return 'assets/flow/icon-conversation-wb.png';
    } else if (step.data_type === GAME) {
      return 'assets/flow/icon-game-wb.png';
    } else if (step.data_type === FORM) {
      return 'assets/flow/icon-form-wb.png';
    } else if (step.data_type === SUPPORT_GROUP) {
      return 'assets/flow/icon-Support Group-wb.png';
    } else if (step.data_type === INTRODUCTION_PAGE) {
      return 'assets/flow/icon-htmlpage-wb.png';
    } else if (step.data_type === CONCLUSION_PAGE) {
      return 'assets/flow/icon-htmlpage-wb.png';
    } else if (step.data_type === RESOURCES_PAGE) {
      return 'assets/flow/Resource.png';
    } else if (step.data_type === TESTIMONIALS_PAGE) {
      return 'assets/flow/Resource.png';
    } else if (step.data_type === SURVEY) {
      return 'assets/flow/icon-survey-wb.png';
    } else if (step.data_type === VIDEO) {
      return 'assets/flow/icon-video-wb.png';
    } else if (step.data_type === INTRODUCTORY_ANIMATION) {
      return 'assets/flow/Animation-onboarding.png';
    } else if (step.data_type === CONTROL_PAGE) {
      return 'assets/flow/icon-htmlpage-wb.png';
    }
  }

  unlocked() {
    return this.step.status === ACTIVE;
  }

  showTooltipFun() {
    if (this.step.status === LOCKED && this.step.sequence === 0) {
      this.flowService.getModuleUnlockTime(this.stepGroup.id);
      this.flowService.unlockModuleTime.subscribe(data => {
        if (data === false) {
          this.tooltipShow();
        } else if (typeof data === 'string' && !Date.parse(data)) {
          this.tooltipData = data;
          this.tooltipShow();
        } else {
          const time = this.datePipe.transform(data, 'hh:mm a');
          const date = this.datePipe.transform(data, 'dd-MM-yyy');
          this.tooltipData = 'Unlocks at: ' + time + ' on ' + date;
          this.tooltipShow();
        }
      });
    } else if (this.step.status === LOCKED && !this.step.virtual_step) {
      this.tooltipShow();
    }
  }

  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    this.showToolTip.showDelay = 100;
    this.showToolTip.hideDelay = 100;
    this.showToolTip.toggle();
  }

  closeNavFlow() {
    this.navbarService.closeNavFlow.emit();
  }
}
