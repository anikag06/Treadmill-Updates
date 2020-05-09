import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {
  LOCKED,
  COMPLETED,
  COMMITMENT_OPTIONS,
  ACTIVE,
  QUESTIONNAIRE,
  CONCLUSION_PAGE,
} from '@/app.constants';
import { ConclusionService } from '../conclusion.service';
import { StepsDataService } from '../../shared/steps-data.service';
import { StepCompleteData } from '../../shared/completion-data.model';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import { Step } from '@/main/flow/step-group/step/step.model';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import {FlowService} from "@/main/flow/flow.service";
import {NavbarNotificationsService} from "@/main/shared/navbar/navbar-notifications.service";

@Component({
  selector: 'app-conclusion1',
  templateUrl: './conclusion1.component.html',
  styleUrls: ['./conclusion1.component.scss'],
})
export class Conclusion1Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  options = COMMITMENT_OPTIONS;
  commitment!: string;
  conclusionDataSubscription!: Subscription;
  // TODO: provide link for thought record form
  thoughtRecordFormLink = '';
  dataLoaded: boolean = true;
  locked: boolean = false;
  stepCompleted: boolean = false;

  moduleName!: string;
  nextModuleName!: string;
  currentStepId!: number;
  nextStepId!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  timeSpent!: number;

  step!: Step;
  active = false;
  loading = true;
  stepID!: number;
  showQuestionnaire!: boolean;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;

  constructor(
    private conclusionService: ConclusionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepDataService: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private quizService: QuizService,
    private flowService: FlowService,
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
      this.stepDataService
        .getBadgeInfo(this.stepGroupSequence)
        .subscribe((badge_data: any) => {
          console.log(badge_data);
          this.commonDialogService.updateBadgeInfo(badge_data.results);
        });
    });

    this.conclusionDataSubscription = this.conclusionService
      .getConclusionData(this.stepGroupSequence)
      .subscribe(data => {
        if (data.user_step_status != LOCKED) {
          console.log('data', data);
          this.moduleName = data.module_name;
          this.nextModuleName = data.next_module_name;
          this.currentStepId = data.current_step_id;
          this.nextStepId = data.next_step_id;
          this.commitment = data.data.commitment;
          this.locked = false;
          if (data.user_step_status === COMPLETED) {
            this.stepCompleted = true;
          }
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
        this.stepDataService
          .getStepData(this.currentStepId)
          .subscribe((step_data: any) => {
            console.log('step data is:', step_data);
            // for navbar title
            this.stepGroupSequence = step_data.data.step_group_sequence + 1;
            this.stepSequence = step_data.data.sequence + 1;
            this.stepName = step_data.data.name;
            this.navbarTitle =
              this.stepGroupSequence.toString() +
              '.' +
              this.stepSequence.toString() +
              ' ' +
              this.stepName;
            console.log('STEP DETAIL:', this.navbarTitle );
            this.flowService.stepDetail.emit(this.navbarTitle);
            if (step_data.data.next_questionnaire) {
              this.quizService.questinnaire_name =
                step_data.data.next_questionnaire;
              this.conclusionService.moodEvaluate = true;
            } else {
              this.conclusionService.moodEvaluate = false;
            }
            this.conclusionService.evaluateMood.emit();
            this.showQuestionnaire = this.conclusionService.moodEvaluate;
          });
      });
  }

  saveData() {
    let data = {
      commitment: this.commitment,
    };
    this.conclusionService
      .storeConclusionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('data saved');
      });
  }

  ngOnDestroy() {
    this.saveData();
    this.conclusionDataSubscription.unsubscribe();
  }

  onCompleted() {
    this.saveData();
    this.stepCompleted = true;
    this.timeSpent = 200;
    this.completionData.time_spent = this.timeSpent;
    this.completionData.step_id = this.currentStepId;
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {
        console.log('data', data, this.currentStepId, this.nextStepId);
      });
    this.commonDialogService.openCongratsDialog(
      this.currentStepId,
      // this.nextStepId,
      true,
    );
  }

  onDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
