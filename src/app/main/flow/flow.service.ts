import { Injectable, EventEmitter, HostListener } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import {
  COMPLETED,
  FLOW_STEP_MARK_DONE,
  FLOW_STEPS_DATA,
} from '@/app.constants';
import { BehaviorSubject, Subject } from 'rxjs';
import { FlowStepNavigationService } from '../shared/flow-step-navigation.service';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { SelfCareComponent } from '@/main/shared/self-care/self-care.component';

@Injectable({
  providedIn: 'root',
})
export class FlowService {
  introduceBehaviour = new BehaviorSubject(false);
  loadBehaviour = new BehaviorSubject(false);
  introDialogBehaviour = new BehaviorSubject(false);
  unlockModuleTime = new Subject();
  stepDetail = new EventEmitter<any>();
  stepSequence = 0;
  stepGroupSequence = 0;
  stepName = '';
  navbarTitle = '';
  stepCompleted!: boolean;
  firstStepID!: number;
  showDashboardButton = new EventEmitter<any>();
  showFollowUpSurvey = false;
  srcWidth!: number;

  constructor(
    private http: HttpClient,
    private flowNavService: FlowStepNavigationService,
    private dialog: MatDialog,
  ) {
    this.getScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?: any) {
    this.srcWidth = window.innerWidth;
  }

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

  triggerIntroDialog() {
    this.introDialogBehaviour.next(true);
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

  setFirstStepCompleted(status: string) {
    this.stepCompleted = status === COMPLETED;
  }

  getFirstStepCompleted(): boolean {
    return this.stepCompleted;
  }

  setFirstStepID(step_id: number) {
    this.firstStepID = step_id;
  }

  getFirstStepID(): number {
    return this.firstStepID;
  }
  showSelfCareDialog() {
    if (this.srcWidth <= 767) {
      console.log('SHOW DIALOG', this.srcWidth);
      const dialogRef = this.dialog.open(SelfCareComponent, {
        maxWidth: '328px',
        width: '328px',
        height: '460px',
        panelClass: 'slide-video',
        autoFocus: false,
      });
    } else {
      const dialogRef = this.dialog.open(SelfCareComponent, {
        maxWidth: '700px',
        width: '700px',
        height: '540px',
        panelClass: 'slide-video',
        autoFocus: false,
      });
    }
  }
}
