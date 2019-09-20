import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { COMPLETED } from '@/app.constants';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import { FlowService } from '../../flow.service';
import { Router } from '@angular/router';

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
    private flowStepNavService: FlowStepNavigationService
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

   markDone() {
    const prev = this.previousStep(this.stepGroup, this.step);
    if (prev) {
      if (prev.status === COMPLETED) {
        this.flowStepNavService.virtualStepMarkDone(this.step, 1);        // here 1 is the time spent
      }
    }
   }

   navigate(event: Event) {
      event.preventDefault();
      this.markDone();
      console.log(this.nextLink());
      this.router.navigate([this.nextLink()]);
   }

}
