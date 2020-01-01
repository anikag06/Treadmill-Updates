import { Component, OnInit } from '@angular/core';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import { TASK } from '@/app.constants';
@Component({
  selector: 'app-task-forms',
  templateUrl: './task-forms.component.html',
  styleUrls: ['./task-forms.component.scss'],
})
export class TaskFormsComponent implements OnInit {
  task!: UserTask | undefined;
  reset = false;
  taskHeading: string = "Set Task";
  constructor() {}

  ngOnInit() {}

  taskSelected(task: UserTask) {
    this.task = task;
  }

  onAddNewForm() {
    this.task = undefined;
    this.reset = !this.reset;
  }
}
