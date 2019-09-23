import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FLOW_STEP_MARK_DONE, WORKING, UNLOCKED } from '@/app.constants';
import { StepGroup } from './step-group/step-group.model';
import { Step } from './step-group/step/step.model';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  constructor(
    private http: HttpClient
  ) { }

  getFlow() {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/flow/');
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {step_id: stepId, time_spent: timeSpent});
  }
}
