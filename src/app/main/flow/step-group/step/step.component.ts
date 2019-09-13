import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { SLIDE, CONVERSATION_GROUP, GAME, FORM, LOCKED, SUPPORT_GROUP, QUESTIONNAIRE, COMPLETED } from '@/app.constants';
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
    private flowService: FlowService
  ) { }

  ngOnInit() {
  }

  nextLink() {
    if (this.step.status !== LOCKED) {
      if (this.step.data_type === SLIDE) {
        return `/resources/slides/${this.step.id}/`;
      } else if (this.step.data_type === CONVERSATION_GROUP) {
        return `/conversations-group/${this.step.id}/`;
      } else if (this.step.data_type === GAME) {
        const game_name = this.step.action[0];
        return `/games/${game_name}/`;
      } else if (this.step.data_type === FORM) {
        const form_name = this.step.action[0];
        return `/resources/forms/${form_name}/`;
      } else if (this.step.data_type === SUPPORT_GROUP) {
        return `/support-groups/`;
      } else if (this.step.data_type === QUESTIONNAIRE) {
        return `/questionnaire/`;
      }
    }
    return '/';
   }

   previousStep(stepGroup: StepGroup, step: Step) {
      const allSteps = <Step[]>stepGroup.steps;
      const index = allSteps.indexOf(step, 1);
      return allSteps[index - 1];
   }

   markDone() {
    console.log(this.step)
    if (this.step.virtual_step) {
      const prev = this.previousStep(this.stepGroup, this.step);
      if (prev.status === COMPLETED) {
        this.flowService.markDone(this.step.id, 1)
          .subscribe(
            (data: any) => console.log('Done'),
          );
      }
    }
   }

}
