import { Component, OnInit } from '@angular/core';
import {StepGroup} from '@/main/flow/step-group/step-group.model';
import {ACTIVE, CONCLUSION_PAGE} from '@/app.constants';
import {Step} from '@/main/flow/step-group/step/step.model';
import {QuizService} from '@/shared/questionnaire/questionnaire.service';
import {StepsDataService} from '@/main/resources/shared/steps-data.service';
import {FlowService} from '@/main/flow/flow.service';
import {ConclusionService} from '@/main/resources/conclusion/conclusion.service';

@Component({
  selector: 'app-conclusion',
  templateUrl: './conclusion.component.html',
  styleUrls: ['./conclusion.component.scss'],
})
export class ConclusionComponent implements OnInit {
  step!: Step;
  active = false;
  loading = true;
  stepID!: number;
  constructor(
    private conclusionService: ConclusionService,
    private quizService: QuizService,
    private stepsService: StepsDataService,
    private flowService: FlowService,
  ) {}

  ngOnInit() {
      this.flowService.getFlow().subscribe((data: any) => {
        this.loading = false;
        const step_group = data.step_groups.find(
          (sg: StepGroup) => sg.status === ACTIVE,
        );
        if (step_group) {
          this.step = step_group.steps.find((step: Step) => {
            return (
              step.virtual_step === false &&
              step.status === ACTIVE &&
              step.data_type === CONCLUSION_PAGE
            );
          });
          if (this.step && this.step.status === ACTIVE) {
            this.conclusionService.moodEvaluate = true;
            this.stepID = this.step.id;
            console.log('current step id', this.stepID);
            console.log('get step data');
            this.stepsService
              .getStepData(this.stepID)
              .subscribe((step_data: any) => {
                console.log('step data is:', step_data);
                if (step_data.data.next_questionnaire) {
                  this.quizService.questinnaire_name =
                    step_data.data.next_questionnaire;
                } else {
                  this.conclusionService.moodEvaluate = false;
                }
              });
          }
        }
      });
  }
}
