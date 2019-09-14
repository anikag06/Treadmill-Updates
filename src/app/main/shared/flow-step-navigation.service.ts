import { Injectable } from '@angular/core';
import { Step } from '../flow/step-group/step/step.model';
import { LOCKED, SLIDE, CONVERSATION_GROUP, GAME, FORM, SUPPORT_GROUP } from '@/app.constants';

@Injectable({
  providedIn: 'root'
})
export class FlowStepNavigationService {

  constructor() { }

  goToFlowNextStep(step: any) {
    console.log(step.data_type, step.id);
    if (step.status !== LOCKED) {
      if (step.data_type === SLIDE) {
        return `/resources/slides/${step.id}/`;
      } else if (step.data_type === CONVERSATION_GROUP) {
        return `/conversations-group/${step.id}/`;
      } else if (step.data_type === GAME) {
        const game_name = step.action[0];
        return `/games/${game_name}/`;
      } else if (step.data_type === FORM) {
        const form_name = step.action[0];
        return `/resources/forms/${form_name}/`;
      } else if (step.data_type === SUPPORT_GROUP) {
        return `/support-groups/`;
      }
    }
    return '/';
  }
}
