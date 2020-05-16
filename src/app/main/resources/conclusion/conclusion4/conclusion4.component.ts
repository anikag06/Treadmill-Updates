import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {LOCKED, COMPLETED, COMMITMENT_OPTIONS, LOGGED_IN_PATH} from '@/app.constants';
import { ConclusionService } from '../conclusion.service';
import { StepsDataService } from '../../shared/steps-data.service';
import { StepCompleteData } from '../../shared/completion-data.model';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from '@/main/flow/flow.service';

@Component({
  selector: 'app-conclusion4',
  templateUrl: './conclusion4.component.html',
  styleUrls: ['./conclusion4.component.scss'],
})
export class Conclusion4Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  options = COMMITMENT_OPTIONS;
  commitment!: string;
  negativeBelief!: string;
  balancedBelief!: string;
  conclusionDataSubscription!: Subscription;
  // TODO: provide link for thought record form and problem solving form
  beliefChangeFormLink = '';
  experimentToTestBeliefFormLink = '';
  dataLoaded = true;
  locked = false;
  stepCompleted = false;

  moduleName!: string;
  nextModuleName!: string;
  currentStepId!: number;
  nextStepId!: number;
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  timeSpent!: number;
  showQuestionnaire!: boolean;
  navbarTitle!: string;
  stepSequence!: number;
  stepName!: string;
  moodEvaluated!: boolean;

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
        if (data.user_step_status !== LOCKED) {
          this.moduleName = data.module_name;
          this.nextModuleName = data.next_module_name;
          this.currentStepId = data.current_step_id;
          this.nextStepId = data.next_step_id;
          this.commitment = data.data.commitment;
          this.negativeBelief = data.data.negativeBelief;
          this.balancedBelief = data.data.balancedBelief;
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
            console.log('STEP DETAIL:', this.navbarTitle);
            this.flowService.stepDetail.emit(this.navbarTitle);
            this.flowService.navbarTitle = this.navbarTitle;
            if (step_data.data.next_questionnaire) {
              this.quizService.questionnaire_name =
                step_data.data.next_questionnaire;
              this.conclusionService.moodEvaluate = true;
            } else {
              this.conclusionService.moodEvaluate = false;
              this.moodEvaluated = true;
            }
            this.conclusionService.evaluateMood.emit();
            // this.showQuestionnaire = this.conclusionService.moodEvaluate;
          });
      });
    this.quizService.questionnaire_active.subscribe( (value: boolean) => {
      console.log('EVENT EMITTED', value);
      if (!value) {
        this.moodEvaluated = true;
        this.showQuestionnaire = false;
        this.navbarTitle = this.flowService.navbarTitle;
        this.flowService.stepDetail.emit(this.navbarTitle);
      } else {
        this.showQuestionnaire = true;
        this.navbarTitle = 'Mood test';
        this.flowService.stepDetail.emit(this.navbarTitle);
      }
    });
  }

  saveData() {
    const data = {
      commitment: this.commitment,
      negativeBelief: this.negativeBelief,
      balancedBelief: this.balancedBelief,
    };
    this.conclusionService
      .storeConclusionData(this.stepGroupSequence, data)
      .subscribe(_data => {
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
        console.log(data);
      });
    this.commonDialogService.openCongratsDialog(
      this.currentStepId,
      // this.nextStepId,
      true,
    );
  }

  onDashboard() {
    this.router.navigate([LOGGED_IN_PATH]);
  }
}
