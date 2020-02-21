import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environments/environment';
import { FLOW_STEP_MARK_DONE, FLOW_STEPS_DATA } from '@/app.constants';
import { BehaviorSubject } from 'rxjs';
import { StepGroup } from './step-group/step-group.model';
import { Step } from './step-group/step/step.model';
import { FlowStepNavigationService } from '../shared/flow-step-navigation.service';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  introduceBehaviour = new BehaviorSubject(false);
  loadBehaviour = new BehaviorSubject(true);
  unlockModuleTime = new BehaviorSubject(0);

  constructor(
    private http: HttpClient,
    private flowNavService: FlowStepNavigationService,
  ) {}

  getFlow() {
    return this.http.get(environment.API_ENDPOINT + FLOW_STEPS_DATA);
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

  getModuleUnlockTime(currStepGroup: StepGroup) {
    this.getFlow().subscribe((data: any) => {
      const prevLastStepId = this.previousStepGroupLastStep(
        data.step_groups,
        currStepGroup.id,
      );
      this.flowNavService
        .isNextModuleLocked(prevLastStepId)
        .subscribe(unlockTimeData => {
          if (unlockTimeData.data.next_step_group_unlocked === false) {
            this.unlockModuleTime.next(
              unlockTimeData.data.next_step_group_unlock_time,
            );
            console.log(this.unlockModuleTime);
            return this.unlockModuleTime;
          }
        });
    });
  }
  // this function returns last step id of previous step
  previousStepGroupLastStep(allStepGroups: any, stepGroupId: any) {
    const initStepGroup = allStepGroups.find(
      (stepGroup: any) => stepGroup.id === stepGroupId,
    );
    const index = allStepGroups.indexOf(initStepGroup, 1);
    const prevStepGroup = allStepGroups[index - 1];
    return prevStepGroup.steps[prevStepGroup.steps.length - 1].id;
  }
}
