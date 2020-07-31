import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  COMPLETED,
  FLOW_STEP_MARK_DONE,
  FLOW_STEPS_DATA,
} from '@/app.constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { FlowStepNavigationService } from '../shared/flow-step-navigation.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  introduceBehaviour = new BehaviorSubject(false);
  loadBehaviour = new BehaviorSubject(false);
  unlockModuleTime = new Subject();
  stepDetail = new EventEmitter<any>();
  stepSequence = 0;
  stepGroupSequence = 0;
  stepName = '';
  navbarTitle = '';
  stepCompleted = false;
  showFollowUp = new EventEmitter<any>();
  showFollowUpSurvey = new EventEmitter<any>();
  firstStepID!: number;

  constructor(
    private http: HttpClient,
    private flowNavService: FlowStepNavigationService,
  ) {}

  // Http Options
  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Cache-Control':
  //       'no-cache, no-store, must-revalidate, post-check=0, pre-check=0',
  //   }),
  // };
  getFlow() {
    return this.http.get(
      environment.API_ENDPOINT + FLOW_STEPS_DATA,
      // this.httpOptions,
    );
  }

  markDone(stepId: number, timeSpent: number) {
    return this.http.post(environment.API_ENDPOINT + FLOW_STEP_MARK_DONE, {
      step_id: stepId,
      time_spent: timeSpent,
    });
  }

  triggerIntroduction() {
    this.introduceBehaviour.next(true);
  }

  triggerLoad() {
    this.loadBehaviour.next(true);
  }

  getModuleUnlockTime(stepGroupId: number) {
    this.getFlow().subscribe((data: any) => {
      const allStepGroups = data.step_groups;
      const initStepGroup = allStepGroups.find(
        (stepGroup: any) => stepGroup.id === stepGroupId,
      );
      const index = allStepGroups.indexOf(initStepGroup, 1);
      const prevStepGroup = allStepGroups[index - 1];
      if (prevStepGroup.status === COMPLETED) {
        this.flowNavService
          .isNextModuleLocked(
            prevStepGroup.steps[prevStepGroup.steps.length - 1].id,
          )
          .subscribe(unlockTimeData => {
            this.unlockModuleTime.next(
              unlockTimeData.data.next_step_group_unlock_time,
            );
          });
      } else {
        this.unlockModuleTime.next(false);
      }
    });
  }

  setFirstStepCompleted(status: string): boolean {
    this.stepCompleted = status === COMPLETED;
    return this.stepCompleted;
  }

  getFirstStepCompleted() {
    return this.stepCompleted;
  }

  setFirstStepID(step_id: number) {
    this.firstStepID = step_id;
  }

  getFirstStepID(): number {
    return this.firstStepID;
  }
}
