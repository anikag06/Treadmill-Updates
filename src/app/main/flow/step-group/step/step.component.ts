import { Component, OnInit, Input } from '@angular/core';
import { Step } from './step.model';
import { StepGroup } from '../step-group.model';
import { SLIDE, CONVERSATION_GROUP, GAME, FORM, LOCKED, SUPPORT_GROUP, QUESTIONNAIRE, COMPLETED } from '@/app.constants';
import { GeneralErrorService } from '@/main/shared/general-error.service';

@Component({
  selector: 'app-step',
  templateUrl: './step.component.html',
  styleUrls: ['./step.component.scss']
})
export class StepComponent implements OnInit {

  @Input() step!: Step;
  @Input() stepGroup!: StepGroup;

  constructor(
    private generalErrorService: GeneralErrorService
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

}
