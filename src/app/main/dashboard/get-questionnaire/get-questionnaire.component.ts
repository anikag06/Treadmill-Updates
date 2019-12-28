import { Component, OnInit } from '@angular/core';
import { FlowService } from '@/main/flow/flow.service';
import { StepGroup } from '@/main/flow/step-group/step-group.model';
import { ACTIVE, QUESTIONNAIRE } from '@/app.constants';
import { Step } from '@/main/flow/step-group/step/step.model';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
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

  constructor(
    private quizService: QuizService,
    private flowService: FlowService,
    private stepsService: StepsDataService,
  ) {}

  ngOnInit() {
    console.log('questionnaire');
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
            step.data_type === QUESTIONNAIRE
          );
        });
        if (this.step && this.step.status === ACTIVE) {
          console.log(this.step);
          this.stepID = this.step.id;
          console.log('current step id', this.stepID);
          console.log('get step data');
          this.stepsService
            .getStepData(this.stepID)
            .subscribe((step_data: any) => {
              console.log('step data is:', step_data);
              this.quizService.questinnaire_name =
                step_data.data.next_questionnaire;
              this.quizService.questionnaireActive = true;
              this.active = true;
            });
        }
      }
    });
  }
}
