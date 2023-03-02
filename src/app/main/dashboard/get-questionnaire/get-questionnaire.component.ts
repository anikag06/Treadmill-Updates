import { Component, OnInit } from '@angular/core';
import { FlowService } from '@/main/flow/flow.service';
import { StepGroup } from '@/main/flow/step-group/step-group.model';
import { ACTIVE, QUESTIONNAIRE } from '@/app.constants';
import { Step } from '@/main/flow/step-group/step/step.model';
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';

@Component({
  selector: 'app-get-questionnaire',
  templateUrl: './get-questionnaire.component.html',
  styleUrls: ['./get-questionnaire.component.scss'],
})
export class GetQuestionnaireComponent implements OnInit {
  step!: Step;
  active = false;
  loading = true;
  stepID!: number;
  navbarTitle!: string;

  constructor(
    private quizService: QuizService,
    private flowService: FlowService,
    private stepsService: StepsDataService,
  ) {}

  ngOnInit() {
    this.quizService.questionnaireActive = true;
    this.active = true;
    this.navbarTitle = 'Mood test';
    this.flowService.stepDetail.emit(this.navbarTitle);
  }
}
