import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Problem } from '@/main/custom-forms/forms/problem-solving-worksheets/problem.model';
import { ProblemSolvingWorksheetsService } from '@/main/custom-forms/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { PROBLEM_SOLVING } from '@/app.constants';
import { TasksService } from '@/main/custom-forms/forms/shared/tasks/tasks.service';
import { Task } from 'protractor/built/taskScheduler';
import {UserTask} from '@/main/custom-forms/forms/shared/tasks/user-task.model';

@Component({
  selector: 'app-forms-sidebar',
  templateUrl: './forms-sidebar.component.html',
  styleUrls: ['./forms-sidebar.component.scss']
})
export class FormsSidebarComponent implements OnInit {

  @Output() objectEmitter = new EventEmitter<Object>();
  @Output() newForm = new EventEmitter<void>();
  @Input() type!: String;
  objects: any[] = [];
  page = 1;
  subscriptions: Subscription[] = [];

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private tasksService: TasksService
  ) { }

  ngOnInit() {
    if ( this.type === PROBLEM_SOLVING) {
      this.getProblems();
    } else {
      this.getTasks();
    }
  }

  problemClicked(problem: Problem) {
    this.objectEmitter.emit(problem);
  }

  onAddNewForm() {
    this.newForm.emit();
  }

  getProblems() {
    this.subscriptions[this.subscriptions.length] = this.problemService.getProblems();
    this.subscriptions[this.subscriptions.length] = this.problemService.problemsBehaviour
      .subscribe(
        (problems: Problem[]) => {
          this.objects = problems;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  getTasks() {
    this.tasksService.getTasks();
    this.subscriptions[this.subscriptions.length] = this.tasksService.taskBehaviour
      .subscribe(
        (tasks: UserTask[]) => {
         this.objects = tasks;
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

}
