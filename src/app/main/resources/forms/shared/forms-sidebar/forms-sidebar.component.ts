import { Component, OnInit, EventEmitter, Output, Input, AfterViewInit, ElementRef, OnChanges } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { Problem } from '@/main/resources/forms/problem-solving-worksheets/problem.model';
import { ProblemSolvingWorksheetsService } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { PSF_PROBLEM_SOLVING } from '@/app.constants';
import { TasksService } from '@/main/resources/forms/shared/tasks/tasks.service';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import { MatSnackBar } from '@angular/material';
import {Router} from "@angular/router"

@Component({
  selector: 'app-forms-sidebar',
  templateUrl: './forms-sidebar.component.html',
  styleUrls: ['./forms-sidebar.component.scss'],
})
export class FormsSidebarComponent implements OnInit,AfterViewInit {
  @Output() objectEmitter = new EventEmitter<Object>();
  @Output() newForm = new EventEmitter<void>();
  @Input() type!: String;
  @Input() task!: any;
  objects: any[] = [];
  object_id = -1;
  page = 1;
  subscriptions: Subscription[] = [];
  selectedObject!: any;

  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private tasksService: TasksService,
    private route: ActivatedRoute,
    private element: ElementRef,
  ) {}

  ngOnInit() {
    if (this.type === PSF_PROBLEM_SOLVING) {
      this.getProblems();
    } else {
      this.getTasks();
    }

    this.route.queryParams.subscribe(
      params => (this.object_id = parseInt(params.form_id, 10)),
    );
  }
  ngAfterViewInit(){
    const panel_body  = this.element.nativeElement.querySelectorAll('.mat-expansion-panel-body');
    panel_body[0].setAttribute('style','padding:0px;padding-left:16px;')
  }

  problemClicked(object: any) {
    this.objectEmitter.emit(object);
    this.selectedObject = object;
  }

  onAddNewForm() {
    this.newForm.emit();
  }

  getProblems() {
    this.subscriptions[
      this.subscriptions.length
    ] = this.problemService.getProblems();
    this.subscriptions[
      this.subscriptions.length
    ] = this.problemService.problemsBehaviour.subscribe(
      (problems: Problem[]) => {
        this.objects = problems;
        this.selectObject();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
    );
  }

  getTasks() {
    this.tasksService.getTasks();
    this.subscriptions[
      this.subscriptions.length
    ] = this.tasksService.taskBehaviour.subscribe(
      (tasks: UserTask[]) => {
        this.objects = tasks;
        this.selectObject();
      },
      (error: HttpErrorResponse) => {
        console.error(error);
      },
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
  onDeleteForm(task : any){
    this.tasksService.deleteTask(task.id).subscribe(resp=>{
      let status = resp.body.status;
      if (status) {
        this.tasksService.openSnackBar("Task Deleted Successfully", "OK");
       this.onAddNewForm();
      this.tasksService.removeTask(task);
       console.log(this.objects);
      } else {
        this.tasksService.openSnackBar("Error Occured", "Retry");
      }
    })
  }
}
