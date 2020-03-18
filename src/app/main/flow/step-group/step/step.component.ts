import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { COMPLETED, SLIDE, CONVERSATION_GROUP } from '@/app.constants';
import { LOCKED, ACTIVE, INTRODUCTORY_ANIMATION } from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Router } from '@angular/router';
import { FlowService } from '../../flow.service';
import { MatTooltip } from '@angular/material';
import { DatePipe } from '@angular/common';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  providers: [DatePipe],
})
export class StepComponent implements OnInit {
  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;
  @ViewChild('tooltip', { static: false }) showToolTip!: MatTooltip;

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
  ) { }

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
    // console.log('step', this.step, this.stepGroup);
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

  nextLink(): string {
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
    if (!prev || (prev && prev.status === COMPLETED)) {
      this.flowStepNavService.virtualStepMarkDone(this.step, 1); // here 1 is the time spent
    }
  }

  navigate(event: Event) {
    event.preventDefault();

    this.showTooltipFun();

    this.markDone();
    if (this.step.data_type === INTRODUCTORY_ANIMATION) {
      this.flowService.triggerIntroduction();
      this.step.status = COMPLETED;
      this.flowService.triggerLoad();
      setTimeout(() => this.flowService.triggerLoad(), 1);
      setTimeout(() => this.flowService.triggerLoad(), 10);
    }
    // console.log(
    //   'navigate',
    //   this.stepGroup.sequence + 1,
    //   this.stepGroup.name,
    //   this.step.sequence + 1,
    //   this.step.name,
    // );

    if (this.step.status !== LOCKED && !this.step.virtual_step) {
    this.flowService.stepGroupSequence = this.stepGroup.sequence + 1;
    this.flowService.stepSequence = this.step.sequence + 1;
    this.flowService.stepName = this.step.name;
    this.flowService.stepDetail.emit();
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

  unlocked() {
    return this.step.status === ACTIVE;
  }

  showTooltipFun() {
    if (this.step.status === LOCKED && !this.step.virtual_step) {
      const prev = this.previousStep(this.stepGroup, this.step);
      if (!prev) {
        this.flowService.getModuleUnlockTime(this.stepGroup);
        this.flowService.unlockModuleTime.subscribe(data => {
          const time = this.datePipe.transform(data, 'hh:mm a');
          const date = this.datePipe.transform(data, 'dd-MM-yyy');
          this.tooltipData = 'unlocks at: ' + time + ' on ' + date;
        });
      } else {
        this.tooltipData = 'Complete the previous steps first';
      }
      this.tooltipShow();
    }
  }
  tooltipShow() {
    if (this.showToolTip.disabled) {
      this.showToolTip.disabled = false;
    }
    this.showToolTip.showDelay = 300;
    this.showToolTip.hideDelay = 100;
    this.showToolTip.toggle();
  }

  closeNavFlow() {
    console.log('close navflow');
    this.navbarService.closeNavFlow.emit();
  }

}
