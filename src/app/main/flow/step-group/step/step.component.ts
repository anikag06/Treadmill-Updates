import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { COMPLETED, LOCKED, ACTIVE, INTRODUCTORY_ANIMATION } from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { Router } from '@angular/router';
import { FlowService } from '../../flow.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;

  constructor(
    private router: Router,
    private flowStepNavService: FlowStepNavigationService,
    private flowService: FlowService,
  ) { }

  ngOnInit() {
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
      event.preventDefault();
      this.markDone();
      if (this.step.data_type === INTRODUCTORY_ANIMATION) {
        this.flowService.triggerIntroduction();
        this.step.status = COMPLETED;
        this.flowService.triggerLoad();
        setTimeout(() => this.flowService.triggerLoad(), 100);

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

}
