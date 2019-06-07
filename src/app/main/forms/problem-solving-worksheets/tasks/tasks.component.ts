import { Component, OnInit, EventEmitter, Output, Input, ChangeDetectorRef, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormArray } from '@angular/forms';
import { ProblemSolvingWorksheetsService } from '@/main/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { Problem } from '@/main/forms/problem-solving-worksheets/problem.model';
import { UserTask } from './user-task.model';
import { UserSubTask } from './user-sub-task.model';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WEEK } from '@/app.constants'

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit, OnChanges {

  @Output() nextStepEmitter = new EventEmitter<null>();
  @Output() taskLoaded = new EventEmitter<boolean>();
  @Input() problem!: Problem;

  date!: any;
  time!: any;
  hideNextStep = false;
  task!: UserTask;
  week = WEEK;
  days: String[] = [];
  repeat = false;

  tasksGroup = this.fb.group({
    task: [''],
    taskCompleted: [false],
    subTasks: this.fb.array([this.createItem(), this.createItem(), this.createItem()])
  });

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemSolvingWorksheetsService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadTask();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadTask();
  }


  createItem(id = 0, name = '', isCompleted = false, deleteMarked = false) {
    return this.fb.group({
      id: id,
      name: name,
      is_completed: isCompleted,
      delete: deleteMarked
    });
  }

  getSubTasksForm() {
    return (<FormArray>this.tasksGroup.get('subTasks')).controls;
  }

  addField() {
    const formArray = this.tasksGroup.get('subTasks') as FormArray;
    formArray.push(this.createItem());
    this.changeDetector.detectChanges();
  }

  saveData() {
    const object = {
      id: 0,
      problem_id: this.problem.id,
      name: this.tasksGroup.value['task'],
      date: new Date(this.date),
      time: new Date(this.time),
      is_completed: this.tasksGroup.value['taskCompleted'],
      subtasks: this.tasksGroup.controls.subTasks.value.filter((str: any) => str.name.trim().length > 0),
      task_days: this.days
    };
    if (this.task && this.task.id > 0) {
      object.id = this.task.id;
      this.taskHandler(
        this.problemService.putTask(
          object
        )
      );
    } else {
      this.taskHandler(
        this.problemService.postTask(
          object
        )
      );
    }
  }

  taskCompletedChange(event: Event) {
    if (this.task) {
      this.task.is_completed = !this.task.is_completed;
      this.updateTask();
    }
  }

  subTaskCompletedChange(event: Event, subtask_id: number) {
    if (this.task) {
      this.task.subtasks = this.task.subtasks.map((st: UserSubTask) => {
        if (st.id === subtask_id) {
          st.is_completed = !st.is_completed;
        }
        return st;
      });
      this.updateTask();
    }
  }

  updateTask() {
    if (this.task) {
      this.saveData();
    }
  }

  taskHandler(observable: Observable<Object>) {
    observable.subscribe((data: any) => {
      this.task = new UserTask(+data.data.id, data.data.name, data.data.is_completed, data.data.date_time, [], []);
      this.tasksGroup.controls.subTasks = this.fb.array([]);
      data.data.subtasks.forEach((subtask: UserSubTask) => {
        this.task.subtasks.push(new UserSubTask(subtask.id, subtask.name, subtask.is_completed));
        (this.tasksGroup.controls.subTasks as FormArray).push(this.createItem(subtask.id, subtask.name, subtask.is_completed));
      });
      this.nextStepEmitter.emit(null);
      this.hideNextStep = true;
    });
  }

  markForDeletion(subtask: any) {
    this.problemService.deleteSubTask(this.task.id, subtask.id)
      .subscribe(
        (data: any) => {
          this.tasksGroup.controls.subTasks = this.fb.array([]);
          this.task.subtasks = this.task.subtasks.filter((st: UserSubTask) => st.id !== subtask.id);
          this.task.subtasks.forEach((stask: UserSubTask) => {
            (this.tasksGroup.controls.subTasks as FormArray).push(this.createItem(stask.id, stask.name, stask.is_completed));
          });
        },
      );
  }

  onDayChange(event: any, day: string) {
    if (event.checked) {
      this.days.push(day);
      this.updateTask();
    } else {
      this.days = this.days.filter(d => day !== d );
      this.problemService.deleteTaskDay(this.task.id, day)
        .subscribe(
          () => {},
          (error) => console.log(error)
        );
    }
    this.changeDetector.detectChanges();
  }

  onRepeatChange(event: any) {
    if (event.checked === false) {
      this.repeat = false;
      this.days = [];
      this.updateTask();
    }
    this.changeDetector.detectChanges();
  }


  loadTask() {
    this.problemService.getTask(this.problem.id)
      .subscribe(
        (data: any) => {
          this.task = data.results[0];
          if (this.task) {
            this.taskLoaded.emit(true);
            this.date = new Date(this.task.date_time);
            this.time = new Date(this.task.date_time);
            this.tasksGroup.controls['task'].setValue(this.task.name);
            this.tasksGroup.controls['taskCompleted'].setValue(this.task.is_completed);
            this.tasksGroup.controls.subTasks = this.fb.array([]);
            this.days = this.task.task_days;
            this.repeat = this.days.length > 0;
            this.task.subtasks.forEach((subtask: UserSubTask) => {
              (this.tasksGroup.controls.subTasks as FormArray).push(this.createItem(subtask.id, subtask.name, subtask.is_completed));
            });
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error.error.message);
        }
      );
  }

  onAllCheck(event: any) {
    if (event.checked) {
      this.days = WEEK;
    } else {
      this.days = [];
    }
    this.updateTask();
  }

  allDaysChecked() {
    console.log(this.date.length)
    return this.date.length === 7;
  }
}
