import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { COMPLETED, SLIDE, CONVERSATION_GROUP } from '@/app.constants';
import {  LOCKED, ACTIVE, INTRODUCTORY_ANIMATION } from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Router } from '@angular/router';
import { FlowService } from '../../flow.service';
import { MatTooltip } from '@angular/material';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss'],
  providers: [DatePipe]
})
export class StepComponent implements OnInit {

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;
  @ViewChild('tooltip', {static: false}) showToolTip!: MatTooltip;

  prevModuleLastStep: any;
  tooltipData!: any;
  isConversationStep = false;
  conversationBarValue = 0;

  constructor(
    private router: Router,
    private flowStepNavService: FlowStepNavigationService,
    private flowService: FlowService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.tooltipData = 'Complete the previous steps first';
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
    if (!prev || prev && prev.status === COMPLETED) {
      this.flowStepNavService.virtualStepMarkDone(this.step, 1);        // here 1 is the time spent
    }
   }

   navigate(event: Event) {
      this.showTooltipFun();
      event.preventDefault();
      this.markDone();
      if (this.step.data_type === INTRODUCTORY_ANIMATION) {
        this.flowService.triggerIntroduction();
        this.step.status = COMPLETED;
        this.flowService.triggerLoad();
        setTimeout(() => this.flowService.triggerLoad(), 1);
        setTimeout(() => this.flowService.triggerLoad(), 10);

      }
      return this.router.navigate([this.nextLink()]);
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
        this.flowService.unlockModuleTime
          .subscribe( (data) => {
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

}
