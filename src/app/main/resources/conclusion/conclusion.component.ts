import { Component, OnInit } from '@angular/core';
import { StepGroup } from '@/main/flow/step-group/step-group.model';
import { ACTIVE, CONCLUSION_PAGE } from '@/app.constants';
import { Step } from '@/main/flow/step-group/step/step.model';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { StepsDataService } from '@/main/resources/shared/steps-data.service';
import { FlowService } from '@/main/flow/flow.service';
import { ConclusionService } from '@/main/resources/conclusion/conclusion.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss'],
})
export class ConclusionComponent implements OnInit {
  quiz_active!: boolean;
  constructor(
    private quizService: QuizService,
  ) {}

  ngOnInit() {
    this.quizService.questionnaire_active.subscribe( (value: boolean) => {
      console.log('EVENT EMITTED', value);
      if (!value) {
        this.quiz_active = false;
      } else {
        this.quiz_active = true;
      }
    });
  }
}
