import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FLOW_STEP_MARK_DONE } from '@/app.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  introduceBehaviour = new BehaviorSubject(false);

  constructor(
    private http: HttpClient
  ) { }

  getFlow() {
    return this.http.get(environment.API_ENDPOINT + '/api/v1/flow/flow/');
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {step_id: stepId, time_spent: timeSpent});
  }

  triggerIntroduction() {
    this.introduceBehaviour.next(true);
  }
}
