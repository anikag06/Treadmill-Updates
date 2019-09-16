import { Injectable } from '@angular/core';
import { Step } from '../flow/step-group/step/step.model';
import { LOCKED, SLIDE, CONVERSATION_GROUP, GAME, FORM, SUPPORT_GROUP, FORM_TASK, FORM_PROBLEM_SOLVING_WORKSHEET, FLOW_STEP_MARK_DONE } from '@/app.constants';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FlowStepNavigationService {
  urlMap = new Map([
    [FORM_TASK, 'task'],
    [FORM_PROBLEM_SOLVING_WORKSHEET, 'problem-solving'],
  ]);

  constructor(
    private http: HttpClient,

  ) { }

  goToFlowNextStep(step: any) {
    if (step.status !== LOCKED) {
      if (step.data_type === SLIDE) {
        return `/resources/slides/${step.id}/`;
      } else if (step.data_type === CONVERSATION_GROUP) {
        return `/conversations-group/${step.id}/`;
      } else if (step.data_type === GAME) {
        const game_name = step.action[0];
        return `/games/${game_name}/`;
      } else if (step.data_type === FORM) {
        const form_name = this.urlMap.get(step.action[0]);
        return `/resources/forms/${form_name}/`;
      } else if (step.data_type === SUPPORT_GROUP) {
        return `/support-groups/`;
      }
    }
    return '/';
  }

  getNextStepData(stepId: number): Observable<any> {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/steps/' + stepId + '/');
  }

  virtualStepMarkDone(step: any, timeSpent: number) {
    console.log(step);
    if (step.virtual_step) {
      this.markDone(step.id, timeSpent)
        .subscribe(
          (data: any) => console.log('Done'),
        );
    }
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {step_id: stepId, time_spent: timeSpent});
  }
}
