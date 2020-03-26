import { Injectable } from '@angular/core';
import {
  LOCKED,
  SLIDE,
  CONVERSATION_GROUP,
  GAME,
  FORM,
  SUPPORT_GROUP,
  FLOW_STEP_MARK_DONE,
  QUESTIONNAIRE,
  INTRODUCTION_PAGE,
  CONCLUSION_PAGE,
  INTRODUCTORY_ANIMATION,
  CONTROL_PAGE,
  SURVEY,
  FORM_URL_MAP,
  RESOURCES_PAGE,
  TESTIMONIALS_PAGE,
} from '@/app.constants';
import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class FlowStepNavigationService {
  constructor(private http: HttpClient) {}

  goToFlowNextStep(step: any): string {
    // console.log('step outside: ', step);
    if (step.status !== LOCKED) {
      // console.log('step inside: ', step);
      if (step.data_type === SLIDE) {
        return `/resources/slides/${step.id}/`;
      } else if (step.data_type === CONVERSATION_GROUP) {
        return `/resources/conversations-group/${step.id}/`;
      } else if (step.data_type === GAME) {
        const game_name = step.action[0];
        return `/games/${game_name}/`;
      } else if (step.data_type === FORM) {
        const form_name = FORM_URL_MAP.get(step.action[0]);
        return `/resources/forms/${form_name}/`;
      } else if (step.data_type === SUPPORT_GROUP) {
        return `/support-groups/`;
      } else if (step.data_type === QUESTIONNAIRE) {
        return `/questionnaire/`;
      } else if (step.data_type === INTRODUCTION_PAGE) {
        return `/resources/introduction/${step.step_group_sequence}/`;
      } else if (step.data_type === CONCLUSION_PAGE) {
        return `/resources/conclusion/${step.step_group_sequence}/`;
      } else if (step.data_type === INTRODUCTORY_ANIMATION) {
        return `/dashboard`;
      } else if (step.data_type === CONTROL_PAGE) {
        return `resources/control-content/${step.id}/`;
      } else if (step.data_type === SURVEY) {
        return `/survey/`;
      } else if (step.data_type === RESOURCES_PAGE) {
        return `/extra-resources/`;
      } else if (step.data_type === TESTIMONIALS_PAGE) {
        return `/extra-resources/`;
      }
    }
    return '/';
  }

  getNextStepData(stepId: number): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT + '/api/v1/flow/steps/' + stepId + '/',
    );
  }

  isNextModuleLocked(stepId: number): Observable<any> {
    return this.http.get(
      environment.API_ENDPOINT +
        '/api/v1/flow/next-step-group-status/' +
        stepId +
        '/',
    );
  }
  virtualStepMarkDone(step: any, timeSpent: number) {
    if (step.virtual_step) {
      this.markDone(step.id, timeSpent).subscribe((data: any) =>
        console.log('Done'),
      );
    }
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {
      step_id: stepId,
      time_spent: timeSpent,
    });
  }
}
