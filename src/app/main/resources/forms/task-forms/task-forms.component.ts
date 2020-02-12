import {Component, OnInit} from '@angular/core';
import {UserTask} from '@/main/resources/forms/shared/tasks/user-task.model';
import {SET_ACTIVITY} from '@/app.constants';

import {FormService} from '@/main/resources/forms/shared/form.service';
import {TASK_QUOTES} from '@/main/resources/forms/task-forms/task-form-message';

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
  constructor(private formService: FormService) {}

  ngOnInit() {}

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
