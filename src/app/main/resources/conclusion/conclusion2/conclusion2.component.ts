import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import { LOCKED, COMPLETED } from '@/app.constants';
import { ConclusionService } from '../conclusion.service';
import { StepsDataService } from '../../shared/steps-data.service';
import { StepCompleteData } from '../../shared/completion-data.model';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';

@Component({
  selector: 'app-conclusion2',
  templateUrl: './conclusion2.component.html',
  styleUrls: ['./conclusion2.component.scss'],
})
export class Conclusion2Component implements OnInit {
  stepGroupSequence!: number;
  conclusionDataSubscription!: Subscription;
  // TODO: provide link for task form
  taskFormLink = '';
  dataLoaded: boolean = true;
  locked: boolean = false;
  stepCompleted: boolean = false;

  moduleName!: string;
  nextModuleName!: string;
  currentStepId!: number;
  nextStepId!: number;
  tasks!: string[];
  completionData: StepCompleteData = new StepCompleteData(0, 0);
  timeSpent!: number;
  showQuestionnaire!: boolean;

  constructor(
    private conclusionService: ConclusionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepDataService: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
      this.stepDataService
        .getBadgeInfo(this.stepGroupSequence)
        .subscribe((badge_data: any) => {
          console.log('badge_data', badge_data);
          this.commonDialogService.updateBadgeInfo(badge_data.results);
        });
    });

    this.conclusionDataSubscription = this.conclusionService
      .getConclusionData(this.stepGroupSequence)
      .subscribe(data => {
        console.log(data);
        if (data.user_step_status !== LOCKED) {
          this.moduleName = data.module_name;
          this.nextModuleName = data.next_module_name;
          this.currentStepId = data.current_step_id;
          this.nextStepId = data.next_step_id;
          this.tasks = data.data.tasks;
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
            if (step_data.data.next_questionnaire) {
              console.log('QUESTION:', step_data);
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
      this.nextStepId,
      true,
    );
  }

  onDashboard() {
    this.router.navigate(['/dashboard']);
  }
}
