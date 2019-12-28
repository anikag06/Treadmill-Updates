import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { Problem } from '@/main/resources/forms/problem-solving-worksheets/problem.model';
import { ProblemSolvingWorksheetsService } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { PSF_PROBLEM_SOLVING } from '@/app.constants';
import { TasksService } from '@/main/resources/forms/shared/tasks/tasks.service';
import {UserTask} from '@/main/resources/forms/shared/tasks/user-task.model';
import { ActivatedRoute } from '@angular/router';

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
  object_id = -1;
  page = 1;
  subscriptions: Subscription[] = [];
  selectedObject!: any;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    ) { }

  ngOnInit() {
    if ( this.type === PSF_PROBLEM_SOLVING) {
      this.getProblems();
    } else {
      this.getTasks();
    }

    this.route.queryParams
      .subscribe(
        params => this.object_id = parseInt(params.form_id, 10)
      );
  }

  problemClicked(object: Object) {
    this.objectEmitter.emit(object);
    this.selectedObject = object;
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
          this.selectObject();
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
         this.selectObject();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        }
      );
  }

  selectObject() {
    if (this.objects.length > 0 && this.object_id > 0) {
      const form = this.objects.find(object => object.id === this.object_id);
      if (form) {
        this.problemClicked(form);
      }
    }
  }

}
