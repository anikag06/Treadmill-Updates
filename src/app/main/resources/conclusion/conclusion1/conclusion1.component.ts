import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

import {LOCKED, COMPLETED, COMMITMENT_OPTIONS, ACTIVE, QUESTIONNAIRE, CONCLUSION_PAGE} from '@/app.constants';
import { ConclusionService } from '../conclusion.service';
import { StepsDataService } from '../../shared/steps-data.service';
import { StepCompleteData } from '../../shared/completion-data.model';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import {Step} from "@/main/flow/step-group/step/step.model";
import {QuizService} from "@/shared/questionnaire/questionnaire.service";
import {StepGroup} from "@/main/flow/step-group/step-group.model";
import {FlowService} from "@/main/flow/flow.service";

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

  constructor(
    private conclusionService: ConclusionService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private stepDataService: StepsDataService,
    private commonDialogService: CommonDialogsService,
    private quizService: QuizService,
    private stepsService: StepsDataService,
    private flowService: FlowService,
  ) {}

  ngOnInit() {
    this.conclusionService.moodEvaluate = true;
    this.showQuestionnaire =  this.conclusionService.moodEvaluate;
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
