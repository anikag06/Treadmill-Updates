import { Component, OnInit } from '@angular/core';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import { SET_ACTIVITY } from '@/app.constants';

import { FormService } from '@/main/resources/forms/form.service';
import { TASK_QUOTES } from '@/main/resources/forms/task-forms/task-form-message';
import {map, switchMap} from "rxjs/operators";
import {FlowService} from "@/main/flow/flow.service";
import {ActivatedRoute} from "@angular/router";
import {StepsDataService} from "@/main/resources/shared/steps-data.service";
import {IntroService} from "@/main/walk-through/intro.service";

@Component({
  selector: 'app-task-forms',
  templateUrl: './task-forms.component.html',
  styleUrls: ['./task-forms.component.scss'],
})
export class TaskFormsComponent implements OnInit {
  task!: UserTask | undefined;
  reset = false;
  taskHeading = 'Task Description';
  type = SET_ACTIVITY;
  quote!: string;
  quotedBy!: string;
  showMessage = false;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  constructor(private formService: FormService,
              private flowService: FlowService,
              private activatedRoute: ActivatedRoute,
              private stepDataService: StepsDataService,
              private introService : IntroService) {}

  ngOnInit() {
    this.activatedRoute.params
      .pipe(
        map(v => v.id),
        switchMap(id =>  this.stepDataService
          .getStepData(id)),
      )
      .subscribe(
        (res: any) => {
          const step = res.data;
          console.log('RESPONSE', res.data, step.status);
          // for navbar title
          this.stepGroupSequence = step.step_group_sequence + 1;
          this.stepSequence = step.sequence + 1;
          this.stepName = step.name;
          this.navbarTitle =
            this.stepGroupSequence.toString() +
            '.' +
            this.stepSequence.toString() +
            ' ' +
            this.stepName;
          console.log('STEP DETAIL:', this.navbarTitle);
          this.flowService.stepDetail.emit(this.navbarTitle);
        } );
  }


  taskSelected(task: UserTask) {
    this.task = task;
  }

  onAddNewForm() {
    this.task = undefined;
    this.reset = !this.reset;
  }

  setShowMessage(value: boolean) {
    this.showMessage = value;
    const index = this.formService.getRandomInt(TASK_QUOTES.length);
    this.quote = TASK_QUOTES[index].quote;
    this.quotedBy = TASK_QUOTES[index].by;
  }
}
