import { PSF_PROBLEM, RECOMMENDED, WEEK } from "@/app.constants";
import { ProblemSolvingWorksheetsService } from "@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service";
import { Problem } from "@/main/resources/forms/problem-solving-worksheets/problem.model";
import { TasksService } from "@/main/resources/forms/shared/tasks/tasks.service";
import { DialogBoxService } from '@/main/shared/custom-dialog/dialog-box.service';
import { HttpErrorResponse } from "@angular/common/http";
import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ElementRef, ViewChild } from "@angular/core";
import { FormArray, FormBuilder } from "@angular/forms";
import * as moment from "moment";
import { Observable } from "rxjs";
import { UserSubTask } from "./user-sub-task.model";
import { UserTask } from "./user-task.model";
import { DateTimePickerComponent } from '@/main/shared/date-time-picker/date-time-picker.component';

@Component({
  selector: "app-tasks",
  templateUrl: "./tasks.component.html",
  styleUrls: ["./tasks.component.scss"]
})
export class TasksComponent implements OnInit, OnChanges {
  @Output() nextStepEmitter = new EventEmitter<null>();
  @Output() taskLoaded = new EventEmitter<UserTask>();
  @Input() problem!: Problem;
  @Input() reset!: boolean;
  @Input() task!: UserTask;
  @Input() taskHeading!: string;

  start_date!: any;
  time!: any;
  end_date!: any;
  hideNextStep = false;
  week = WEEK;
  days: String[] = [];
  repeat = false;
  origin_object: number | null = null;
  origin_name = "";
  showDateTimePicker = false;
  dateTime!: string;
  

  tasksGroup = this.fb.group({
    task: [""],
    taskCompleted: [false],
    subTasks: this.fb.array([
    ])
  });

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemSolvingWorksheetsService,
    private taskService: TasksService,
    private changeDetector: ChangeDetectorRef,
    private dialogBoxService: DialogBoxService,
    private element: ElementRef,
  ) {}

  ngOnInit() {
    if (this.problem && this.problem.taskOrigin) {
      this.loadTasks();
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.task &&
      changes.task &&
      changes.task.previousValue !== changes.task.currentValue
    ) {
      this.initializeTask();
    } else if (
      this.problem &&
      this.problem.taskOrigin &&
      changes.problem.previousValue !== changes.problem.currentValue
    ) {
      this.loadTasks();
    } else if (this.problem && !this.problem.taskOrigin) {
      this.resetTask();
      this.taskLoaded.emit();
    }

    if (changes.reset) {
      this.resetTask();
    }
  }

  createItem(id = 0, name = "", isCompleted = false, deleteMarked = false) {
    return this.fb.group({
      id: id,
      name: name,
      is_completed: isCompleted,
      delete: deleteMarked
    });
  }

  getSubTasksForm() {
    return (<FormArray>this.tasksGroup.get("subTasks")).controls;
  }

 

  addField() {
    const formArray = this.tasksGroup.get("subTasks") as FormArray;
    formArray.push(this.createItem());
    this.changeDetector.detectChanges();
  }

  saveData() {
    const object = {
      id: 0,
      origin_id: this.getOriginId(),
      origin_name: this.getOriginName(),
      name: this.tasksGroup.value["task"],
      time: new Date(this.time),
      start_date: new Date(this.start_date),
      end_date: new Date(this.end_date),
      is_completed: this.tasksGroup.value["taskCompleted"],
      sub_tasks: this.tasksGroup.controls.subTasks.value.filter(
        (str: any) => str.name.trim().length > 0
      ),
      days: this.days
    };
    if (this.task && this.task.id > 0) {
      object.id = this.task.id;
      this.taskHandler(this.taskService.putTask(object), "update");
    } else {
      this.taskHandler(this.taskService.postTask(object), "create");
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
      this.task.sub_tasks = this.task.sub_tasks.map((st: UserSubTask) => {
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

  taskHandler(observable: Observable<Object>, action: string) {
    if (action === "create") {
      observable.subscribe((resp: any) => {
        this.task = new UserTask(
          +resp.data.id,
          resp.data.name,
          resp.data.is_completed,
          resp.data.start_at,
          resp.data.end_at,
          resp.data.sub_tasks,
          resp.data.task_days,
          resp.data.origin_name,
          resp.data.origin_object
        );
        this.taskService.addTask(this.task);
        this.tasksGroup.controls.subTasks = this.fb.array([]);
        resp.data.sub_tasks.forEach((subtask: UserSubTask) => {
          this.task.sub_tasks.push(
            new UserSubTask(subtask.id, subtask.name, subtask.is_completed)
          );
          (this.tasksGroup.controls.subTasks as FormArray).push(
            this.createItem(subtask.id, subtask.name, subtask.is_completed)
          );
        });
        this.nextStepEmitter.emit(null);
        this.hideNextStep = true;
      });
    } else {
      observable.subscribe((resp: any) => {
        const task = this.taskService.tasks.find(
          (t: UserTask) => t.id === +resp.data.id
        );
        if (task) {
          this.task = <UserTask>resp.data;
          this.taskService.updateTask(this.task);
        }
      });
    }
  }

  markForDeletion(subtask: any, index: number) {
    if (subtask.id) {
      this.taskService
        .deleteSubTask(this.task.id, subtask.id)
        .subscribe((data: any) => {
          this.tasksGroup.controls.subTasks = this.fb.array([]);
          this.task.sub_tasks = this.task.sub_tasks.filter(
            (st: UserSubTask) => st.id !== subtask.id
          );
          this.task.sub_tasks.forEach((stask: UserSubTask) => {
            (this.tasksGroup.controls.subTasks as FormArray).push(
              this.createItem(stask.id, stask.name, stask.is_completed)
            );
          });
        });
    }
    const formArray = this.tasksGroup.get("subTasks") as FormArray;
    formArray.removeAt(index);
    this.changeDetector.detectChanges();
  }

  onDayChange(event: any, day: string) {
    if (event.checked) {
      this.days.push(day);
      this.updateTask();
    } else {
      this.days = this.days.filter(d => day !== d);
      if (this.task) {
        this.taskService.deleteTaskDay(this.task.id, day).subscribe(() => {});
      }
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

  loadTasks() {
    this.taskService.getTasks();
    this.taskService.taskBehaviour.subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.task = data.find((t: UserTask) => {
            if (this.problem.taskOrigin === t.origin_object) {
              return t;
            }
          });
          if (this.task) {
            this.initializeTask();
            this.taskLoaded.emit(this.task);
          }
        }
      },
      (error: HttpErrorResponse) => {}
    );
  }

  initializeTask() {
    this.start_date = new Date(this.task.start_at);
    this.time = new Date(this.task.start_at);
    this.end_date = new Date(this.task.end_at);
    this.tasksGroup.controls["task"].setValue(this.task.name);
    this.tasksGroup.controls["taskCompleted"].setValue(this.task.is_completed);
    this.tasksGroup.controls.subTasks = this.fb.array([]);
    this.days = this.task.task_days;
    this.repeat = this.days.length > 0;
    this.origin_name = this.task.origin_name;
    this.origin_object = this.task.origin_object;
    this.task.sub_tasks.forEach((subtask: UserSubTask) => {
      (this.tasksGroup.controls.subTasks as FormArray).push(
        this.createItem(subtask.id, subtask.name, subtask.is_completed)
      );
    });
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
    return this.start_date.length === 7;
  }

  getOriginId() {
    if (this.problem) {
      return this.problem.id;
    } else {
      null;
    }
  }

  getOriginName() {
    if (this.problem) {
      return PSF_PROBLEM;
    } else {
      return RECOMMENDED;
    }
  }

  resetTask() {
    delete this.start_date;
    delete this.time;
    delete this.end_date;
    this.days = [];
    this.repeat = false;
    delete this.origin_name;
    delete this.origin_object;
    this.tasksGroup = this.fb.group({
      task: [""],
      taskCompleted: [false],
      subTasks: this.fb.array([
        
      ])
    });
  }

  dateTimeParser() {
    const time = new Date(this.time);
    let timeDateFormat: moment.Moment;
    timeDateFormat = moment(this.start_date);
    timeDateFormat.set({ hours: time.getHours(), minutes: time.getMinutes() });
    this.time = timeDateFormat.toDate();
    this.start_date = timeDateFormat.toDate();
    this.updateTask();
  }
  endDateParser() {
    let endDate: any;
    endDate = moment(this.end_date).format("YYYY-MM-DD");
    this.end_date = endDate;
    this.updateTask();
  }

  onShowDateTime() {
    this.showDateTimePicker = !this.showDateTimePicker;
  }

  getDateTimeMessage($event: string) {
    this.dateTime = $event;
  }



}
