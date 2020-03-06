import { TASK, WEEK } from '@/app.constants';
import { ProblemSolvingWorksheetsService } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { TasksService } from '@/main/resources/forms/shared/tasks/tasks.service';
import { DateTimePickerComponent } from '@/main/shared/date-time-picker/date-time-picker.component';
import { DateTimePickerService } from '@/main/shared/date-time-picker/date-time-picker.service';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { UserSubTask } from './user-sub-task.model';
import { UserTask } from './user-task.model';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
})
export class TasksComponent implements OnInit, OnChanges {
  @Output() nextStepEmitter = new EventEmitter<null>();
  @Output() taskLoaded = new EventEmitter<UserTask>();
  @Input() object!: any;
  @Input() reset!: boolean;
  @Input() task!: UserTask;
  @Input() taskHeading!: string;
  @Output() showMessage = new EventEmitter();
  // @ViewChild('dateTimeBtn', { static: false }) dateTimeBtn!: ElementRef;

  taskValueChanged = false;
  showTrashIcon: boolean[] = [];
  submitted = false;
  start_date!: any;
  time!: any;
  end_date!: any;
  hideNextStep = false;
  week = WEEK;
  days: String[] = [];
  repeat = false;
  origin_object: number | null = null;
  origin_name = '';
  showDateTimePicker = false;
  dateTimeMessage = false;
  formDateTime: any[] = [];
  dateTime: any;
  dateRange!: string;
  endTime!: string;
  repeatedDays!: string;
  errorMessage = "Sorry, the Task couldn't be saved. We're on it already.";

  tasksGroup = this.fb.group({
    task: ['', Validators.required],
    taskCompleted: [false],
    subTasks: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    private problemService: ProblemSolvingWorksheetsService,
    private taskService: TasksService,
    private changeDetector: ChangeDetectorRef,
    private element: ElementRef,
    public dialog: MatDialog,
    private dateTimePickerService: DateTimePickerService,
  ) {}

  ngOnInit() {
    // if (this.object && this.object.taskorigin) {
    //   this.loadTasks();
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.task &&
      changes.task &&
      changes.task.previousValue !== changes.task.currentValue
    ) {
      this.initializeTask();
    } else if (
      this.object &&
      this.object.taskorigin &&
      changes.object.previousValue !== changes.object.currentValue
    ) {
      this.loadTasks();
    } else if (this.object && !this.object.taskorigin) {
      this.resetTask();
      this.taskLoaded.emit();
    }

    if (changes.reset) {
      this.resetTask();
    }
  }

  createItem(name = '', isCompleted = false) {
    return this.fb.group({
      name: name,
      is_completed: isCompleted,
      // delete: deleteMarked
    });
  }

  createEditItem(id = 0, name = '', isCompleted = false) {
    return this.fb.group({
      id: id,
      name: name,
      is_completed: isCompleted,
      // delete: deleteMarked
    });
  }

  getSubTasksForm() {
    return (<FormArray>this.tasksGroup.get('subTasks')).controls;
  }

  addField() {
    const formArray = this.tasksGroup.get('subTasks') as FormArray;
    formArray.push(this.createItem());
    this.showTrashIcon.push(false);
    this.changeDetector.detectChanges();
  }

  saveData() {
    let taskBody;
    let status: boolean;
    this.submitted = true;
    const object = {
      name: this.tasksGroup.value['task'],
      is_completed: this.tasksGroup.value['taskCompleted'],
      start_date: this.start_date,
      time: this.time,
      end_date: this.end_date,
      sub_tasks: this.tasksGroup.controls.subTasks.value.filter(
        (str: any) => str.name.trim().length > 0,
      ),
      days: this.days,
      origin_id: this.getOriginId(),
      origin_name: this.getOriginName(),
    };
    if (this.task && this.task.id > 0) {
      this.taskService.putTask(object, this.task.id).subscribe(
        (resp: any) => {
          taskBody = resp.body.data;
          this.taskService.openSnackBar('Task Updated Successfully', 'OK');
          this.taskValueChanged = false;
          this.taskHandler(taskBody, 'update');
          this.taskLoaded.emit(taskBody);
        },
        error => {
          console.log(error);
          // this.taskService.openSnackBar('Error Occured', 'Retry');
          this.taskService.openSnackBar(
            error.error.non_field_errors || this.errorMessage,
            'Retry',
          );
        },
      );
    } else if (object.start_date === undefined || object.time === undefined) {
      this.taskService.openSnackBar('Date & Time cannot be empty. ', 'Error');
    } else {
      this.taskService.postTask(object).subscribe(
        (resp: any) => {
          this.taskService.openSnackBar('Task Created Successfully', 'OK');
          this.taskValueChanged = false;
          taskBody = resp.body.data;
          this.taskHandler(taskBody, 'create');
          this.taskLoaded.emit(this.task);
          this.showMessage.emit(true);
        },
        error => {
          // console.log(error);
          this.taskService.openSnackBar(
            error.error.non_field_errors || this.errorMessage,
            'Retry',
          );
        },
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

  taskHandler(data: UserTask, action: string) {
    if (action === 'create') {
      // this.tasksGroup.controls.subTasks = this.fb.array([]);
      // data.sub_tasks.forEach((subtask: UserSubTask) => {
      //   this.task.sub_tasks.push(
      //     new UserSubTask(subtask.id, subtask.name, subtask.is_completed)
      //   );
      //   (this.tasksGroup.controls.subTasks as FormArray).push(
      //     this.createEditItem(subtask.id, subtask.name, subtask.is_completed)
      //   );
      // });

      this.task = new UserTask(
        data.id,
        data.name,
        data.is_completed,
        data.start_at,
        data.time,
        data.end_at,
        data.sub_tasks,
        data.task_days,
        data.origin_name,
        data.origin_object,
      );
      this.taskService.addTask(this.task);

      this.nextStepEmitter.emit(null);
      this.hideNextStep = true;
    } else {
      const task = this.taskService.tasks.find(
        (t: UserTask) => t.id === +data.id,
      );
      if (task) {
        this.task = <UserTask>data;
        this.taskService.updateTask(this.task);
      }
    }
  }

  markForDeletion(subtask: any, index: number) {
    if (subtask.id) {
      let status;
      this.taskService
        .deleteSubTask(this.task.id, subtask.id)
        .subscribe((resp: any) => {
          this.tasksGroup.controls.subTasks = this.fb.array([]);
          this.task.sub_tasks = this.task.sub_tasks.filter(
            (st: UserSubTask) => st.id !== subtask.id,
          );
          this.task.sub_tasks.forEach((stask: UserSubTask) => {
            (this.tasksGroup.controls.subTasks as FormArray).push(
              this.createEditItem(stask.id, stask.name, stask.is_completed),
            );
          });
          status = resp.body.status;
          if (status) {
            this.taskService.openSnackBar('Subtask deleted Successfully', 'OK');
          } else {
            this.taskService.openSnackBar('Error Occured', 'Retry');
          }
        });
    }
    const formArray = this.tasksGroup.get('subTasks') as FormArray;
    formArray.removeAt(index);
    this.showTrashIcon.splice(index);
    this.changeDetector.detectChanges();
  }

  // onDayChange(event: any, day: string) {
  //   if (event.checked) {
  //     this.days.push(day);
  //     this.updateTask();
  //   } else {
  //     this.days = this.days.filter(d => day !== d);
  //     if (this.task) {
  //       this.taskService.deleteTaskDay(this.task.id, day).subscribe(() => {});
  //     }
  //   }
  //   this.changeDetector.detectChanges();
  // }

  // onRepeatChange(event: any) {
  //   if (event.checked === false) {
  //     this.repeat = false;
  //     this.days = [];
  //     this.updateTask();
  //   }
  //   this.changeDetector.detectChanges();
  // }

  loadTasks() {
    this.taskService.getTasks();
    this.taskService.taskBehaviour.subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.task = data.find((t: UserTask) => {
            if (this.object.taskorigin.id === t.origin_object) {
              return t;
            }
          });
          if (this.task) {
            this.initializeTask();
            // this.taskLoaded.emit(this.task);
          }
        }
      },
      (error: HttpErrorResponse) => {},
    );
  }

  initializeTask() {
    this.start_date = this.task.start_at;
    this.time = this.task.time;
    this.end_date = this.task.end_at;
    this.tasksGroup.controls['task'].setValue(this.task.name);
    this.tasksGroup.controls['taskCompleted'].setValue(this.task.is_completed);
    this.tasksGroup.controls.subTasks = this.fb.array([]);
    this.days = this.task.task_days;
    this.repeat = this.days.length > 0;
    this.origin_name = this.task.origin_name;
    this.origin_object = this.task.origin_object;
    this.showTrashIcon = [];
    this.dateTimeMessage = true;
    this.task.sub_tasks.forEach((subtask: UserSubTask) => {
      (this.tasksGroup.controls.subTasks as FormArray).push(
        this.createEditItem(subtask.id, subtask.name, subtask.is_completed),
      );
      this.showTrashIcon.push(false);
    });

    this.dateRange = this.dateTimePickerService.getTaskDateRange(
      this.task.start_at,
      this.task.end_at,
    );
    this.repeatedDays = this.getRepeatedDays(this.days);

    this.endTime = this.dateTimePickerService.getUTCTimeInAmPm(
      this.end_date,
      this.time,
    );
    this.showMessage.emit(true);
  }

  // onAllCheck(event: any) {
  //   if (event.checked) {
  //     this.days = WEEK;
  //   } else {
  //     this.days = [];
  //   }
  //   this.updateTask();
  // }
  //
  // allDaysChecked() {
  //   return this.start_date.length === 7;
  // }

  getOriginId() {
    if (this.object) {
      return this.object.id;
    } else {
      return null;
    }
  }

  getOriginName() {
    if (this.object) {
      return this.object.origin_name;
    } else {
      return TASK;
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
    delete this.taskValueChanged;
    this.tasksGroup = this.fb.group({
      task: [''],
      taskCompleted: [false],
      subTasks: this.fb.array([]),
    });
    this.showTrashIcon = [];
    delete this.dateTimeMessage;
    delete this.task;
    this.showMessage.emit(false);
  }

  // dateTimeParser() {
  //   const time = new Date(this.time);
  //   let timeDateFormat: moment.Moment;
  //   timeDateFormat = moment(this.start_date);
  //   timeDateFormat.set({ hours: time.getHours(), minutes: time.getMinutes() });
  //   this.time = timeDateFormat.toDate();
  //   this.start_date = timeDateFormat.toDate();
  //   this.updateTask();
  // }
  // endDateParser() {
  //   let endDate: any;
  //   endDate = moment(this.end_date).format("YYYY-MM-DD");
  //   this.end_date = endDate;
  //   this.updateTask();
  // }

  onShowDateTime() {
    this.showDateTimePicker = !this.showDateTimePicker;

    const dialogRef = this.dialog.open(DateTimePickerComponent, {
      panelClass: 'dateTime-dialog-container',
      maxWidth: '100vw',
      autoFocus: false,
    });
    this.onDialogRefClosed(dialogRef);
  }

  onChangeDateTime() {
    this.showDateTimePicker = !this.showDateTimePicker;
    const dialogRef = this.dialog.open(DateTimePickerComponent, {
      panelClass: 'dateTime-dialog-container',
      maxWidth: '100vw',
      autoFocus: false,
      data: {
        startDate: this.start_date,
        endDate: this.end_date,
        days: this.days,
        time: this.time,
      },
    });
    this.onDialogRefClosed(dialogRef);
  }

  onDialogRefClosed(dialogRef: any) {
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result && result.data) {
        this.taskValueChanged = true;
        this.dateTime = result.data.dateTime;
        this.showDateTimePicker = result.data.showDateTimePicker;
        this.dateTimeMessage = true;
        this.start_date = new Date(this.dateTime[0]).toISOString().slice(0, 10);
        this.end_date = new Date(this.dateTime[1]).toISOString().slice(0, 10);
        this.time = this.dateTime[2];
        this.days = this.dateTime[3];
        this.dateRange = this.dateTimePickerService.getTaskDateRange(
          this.start_date,
          this.end_date,
        );

        this.endTime = this.dateTimePickerService.getUTCTimeInAmPm(
          this.end_date,
          this.time,
        );

        this.repeatedDays = this.getRepeatedDays(this.dateTime[3]);
      }
    });
  }

  onClickOutside(event: Object, index: number) {
    if (event && (<any>event)['value'] === true) {
      this.showTrashIcon[index] = false;
    }
  }
  onShowTrashIcon(index: number) {
    this.showTrashIcon[index] = !this.showTrashIcon[index];
    this.taskValueChanged = true;
  }

  getRepeatedDays(days: String[]): string {
    const repeatedDays: string[] = [];
    for (let i = 0; i < days.length; i++) {
      this.days[i].toUpperCase();
      repeatedDays.push(
        days[i].charAt(0) + this.days[i].substr(1, 2).toLowerCase(),
      );
    }
    const repeat = repeatedDays.join(',');
    return repeat;
  }

  showSaveBtn() {
    this.taskValueChanged = true;
  }
}
