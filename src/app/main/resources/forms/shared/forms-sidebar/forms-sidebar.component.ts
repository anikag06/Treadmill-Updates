import {AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output,} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

import {Problem} from '@/main/resources/forms/problem-solving-worksheets/problem.model';
import {ProblemSolvingWorksheetsService} from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import {BELIEF_CHANGE, PSF_PROBLEM_SOLVING, SET_ACTIVITY, THOUGHT_RECORD,} from '@/app.constants';
import {TasksService} from '@/main/resources/forms/shared/tasks/tasks.service';
import {UserTask} from '@/main/resources/forms/shared/tasks/user-task.model';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {BeliefChangeService} from '@/main/resources/forms/belief-change/belief-change.service';
import {Belief} from '@/main/resources/forms/belief-change/belief.model';

@Component({
  selector: 'app-forms-sidebar',
  templateUrl: './forms-sidebar.component.html',
  styleUrls: ['./forms-sidebar.component.scss'],
})
export class FormsSidebarComponent implements OnInit, AfterViewInit {
  @Output() objectEmitter = new EventEmitter<Object>();
  @Output() newForm = new EventEmitter<void>();
  @Input() type!: String;
  @Input() task!: any;
  objects: any[] = [];
  object_id = -1;
  page = 1;
  subscriptions: Subscription[] = [];
  selectedObject!: any;
  @Input() object!: any;

  constructor(
      private problemService: ProblemSolvingWorksheetsService,
      private tasksService: TasksService,
      private thoughtRecordService: ThoughtRecordService,
      private beliefChangeService: BeliefChangeService,
      private route: ActivatedRoute,
      private element: ElementRef,
  ) {}

  ngOnInit() {
    if (this.type === PSF_PROBLEM_SOLVING) {
      this.getProblems();
    } else if (this.type === SET_ACTIVITY) {
      this.getTasks();
    } else if (this.type === THOUGHT_RECORD) {
      this.getThoughts();
    } else if (this.type === BELIEF_CHANGE) {
      this.getBeliefs();
    }

    this.route.queryParams.subscribe(
      params => (this.object_id = parseInt(params.form_id, 10)),
    );
  }
  ngAfterViewInit() {
    const panel_body = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    panel_body[0].setAttribute('style', 'padding:0px;padding-left:16px;');
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

  getThoughts() {
    this.thoughtRecordService.getThoughts();
    this.subscriptions[
        this.subscriptions.length
        ] = this.thoughtRecordService.thoughtsBehaviour.subscribe(
        (thoughts: Thought[]) => {
          this.objects = thoughts;
          this.selectObject();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        },
    );
  }

  getBeliefs() {
    this.beliefChangeService.getBeliefs();
    this.subscriptions[
        this.subscriptions.length
        ] = this.beliefChangeService.beliefsBehaviour.subscribe(
        (beliefs: Belief[]) => {
          this.objects = beliefs;
          this.selectObject();
        },
        (error: HttpErrorResponse) => {
          console.error(error);
        },
    );
  }

  onDeleteForm(object: any) {
    if (this.type === THOUGHT_RECORD) {
      this.thoughtRecordService.deleteSituation(object.id).subscribe(resp => {
        const status = resp.ok;
        if (status) {
          this.onAddNewForm();
          this.thoughtRecordService.removeSituation(object);
        }
      });
    }
  }

  selectObject() {
    if (this.objects.length > 0 && this.object_id > 0) {
      const form = this.objects.find(object => object.id === this.object_id);
      if (form) {
        this.problemClicked(form);
      }
    }
  }

  onDeleteTaskForm(task: any) {
    this.tasksService.deleteTask(task.id).subscribe(resp => {
      const status = resp.body.status;
      if (status) {
        this.tasksService.openSnackBar('Task Deleted Successfully', 'OK');
        this.onAddNewForm();
        this.tasksService.removeTask(task);
        console.log(this.objects);
      } else {
        this.tasksService.openSnackBar('Error Occured', 'Retry');
      }
    });
  }
}
