import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FLOW_STEP_MARK_DONE, FLOW_STEPS_DATA } from '@/app.constants';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlowService {

  introduceBehaviour = new BehaviorSubject(false);
  loadBehaviour = new BehaviorSubject(true);

  constructor(
    private http: HttpClient
  ) { }

  getFlow() {
    return this.http.get(environment.API_ENDPOINT + FLOW_STEPS_DATA);
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {step_id: stepId, time_spent: timeSpent});
  }

  triggerIntroduction() {
    this.introduceBehaviour.next(true);
  }

  triggerLoad() {
    this.loadBehaviour.next(true);
  }
}
