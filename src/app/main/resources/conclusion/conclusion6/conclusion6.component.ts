import { Component, OnDestroy, OnInit } from '@angular/core';
import { COMMITMENT_OPTIONS, COMPLETED, LOCKED } from '@/app.constants';
import { Subscription } from 'rxjs';
import { StepCompleteData } from '@/main/resources/shared/completion-data.model';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { CommonDialogsService } from '@/main/resources/shared/common-dialogs.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from '@/main/flow/flow.service';

@Component({
  selector: 'app-conclusion6',
  templateUrl: './conclusion6.component.html',
  styleUrls: ['./conclusion6.component.scss'],
})
export class Conclusion6Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  dataLoaded = true;
  locked = false;
  stepCompleted = false;
  conclusionDataSubscription!: Subscription;

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
            if (step_data.data.next_questionnaire) {
              this.quizService.questionnaire_name =
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

  ngOnDestroy() {
    this.conclusionDataSubscription.unsubscribe();
  }

  onCompleted() {
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
    this.router.navigate(['/dashboard']);
  }
}
