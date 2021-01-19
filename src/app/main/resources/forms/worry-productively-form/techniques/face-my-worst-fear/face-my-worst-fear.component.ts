import {
  Component,
  OnInit,
  Input,
  ViewChild,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { FormControl, FormBuilder, Validators } from '@angular/forms';
import { WorryProductivelyService } from '../../worry-productively.service';
import { Worry } from '../../worry.model';
import { FOLLOW_UP_FORM_COMPLETE_SCORE, WORRY_PROBLEM } from '@/app.constants';
import { UserTask } from '../../../shared/tasks/user-task.model';
import * as moment from 'moment';
import { CommonService } from '@/shared/common.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-face-my-worst-fear',
  templateUrl: './face-my-worst-fear.component.html',
  styleUrls: ['./face-my-worst-fear.component.scss'],
})
export class FaceMyWorstFearComponent implements OnInit {
  @Input() worry!: Worry;
  @ViewChild('panel2', { static: false }) panel2!: any;
  @Input() task!: UserTask;
  @Output() techniqueExpanded = new EventEmitter();
  @Output() techniqueCollapsed = new EventEmitter();
  @Input() summaryIndex!: number;
  worrySubmit = 0;
  user!: User;
  taskObject!: any;
  faceYourWorstFearForm = this.fb.group({
    faceYourWorstFear: new FormControl('', Validators.required),
    emergency_plan: new FormControl('', Validators.required),
  });
  continueButton = false;
  continueEmergency = false;
  taskEmitted = false;
  showTasks = false;
  doneShowSummary = false;
  emergencyPlan?: Boolean;
  faceYourFear: string[] = [];
  summaryText!: string;
  disableEmergency!: boolean;
  responseData = '';
  taskHeading = 'Decide a time when you will worry about it.';
  constructor(
    private fb: FormBuilder,
    private worryService: WorryProductivelyService,
    private commonService: CommonService,
    private authService: AuthService
  ) {}
  ngOnInit() {
    this.emergencyPlan = undefined;
    if (this.task) {
      this.getEndDate();
      this.onDisableEmergency();
      this.taskLoaded;
    }
    console.log(this.disableEmergency + 'log');
    this.user = <User>this.authService.isLoggedIn();
  }
  ngOnChanges(changes: SimpleChanges) {
    this.resetForm();
    if (this.worry && this.worry.taskorigin) {
      this.worryService
        .getTasks(this.worry.taskorigin.task_id)
        .subscribe((resp: any) => {
          this.task = resp.body.data;
          this.getEndDate();
          this.onDisableEmergency();
          this.taskEmitted = true;
        });
    }
    this.taskObject = {
      id: this.worry.id,
      origin_name: WORRY_PROBLEM,
      taskorigin: this.worry.taskorigin,
    };

    if (this.worry) {
      this.worryService.getWorstFear(this.worry.id).subscribe((resp: any) => {
        if (resp.body) {
          this.faceYourWorstFearForm.controls['faceYourWorstFear'].setValue(
            resp.body.worst_fear
          );
          console.log(
            this.faceYourWorstFearForm.controls['emergency_plan'].setValue(
              resp.body.emergency_plan
            )
          );
          this.faceYourWorstFearForm.controls['emergency_plan'].setValue(
            resp.body.emergency_plan
          );
          this.faceYourFear.push(resp.body.worst_fear);
          this.summaryText = resp.body.worst_fear;
          this.panelCollapse();
          this.continueButton = false;
          this.continueEmergency = false;
          if (resp.body.worst_fear !== '') {
            this.showTasks = true;
          }
          if (resp.body.emergency_plan !== '') {
            this.emergencyPlan = true;
          }
        }
      });
    }
    if (changes.task) {
      this.getEndDate();
      this.onDisableEmergency();
    }
  }
  onWorstFearClick() {
    this.worrySubmit += 1;
    this.continueButton = false;
    this.continueEmergency = false;
    this.showTasks = true;
    this.summaryText = this.faceYourWorstFearForm.controls[
      'faceYourWorstFear'
    ].value;
    if (this.responseData.length === 0 && this.faceYourFear.length === 0) {
      const object = {
        worry_id: this.worry.id,
        worst_fear: this.faceYourWorstFearForm.controls['faceYourWorstFear']
          .value,
        emergency_plan: this.faceYourWorstFearForm.controls['emergency_plan']
          .value,
      };
      this.worryService.postWorstFear(object).subscribe((resp: any) => {
        if (resp.body) {
          this.responseData = resp.body;
          if (this.worrySubmit === 2) {
            this.commonService.updateScore(FOLLOW_UP_FORM_COMPLETE_SCORE);
          }
        }
      });
    } else if (
      this.responseData.length !== 0 ||
      this.faceYourFear.length !== 0
    ) {
      const object = {
        worry_id: this.worry.id,
        worst_fear: this.faceYourWorstFearForm.controls['faceYourWorstFear']
          .value,
        emergency_plan: this.faceYourWorstFearForm.controls['emergency_plan']
          .value,
      };
      this.worryService
        .putWorstFear(object, this.worry.id)
        .subscribe((resp: any) => {
          if (resp.body) {
            console.log('The request has been submitted');
            this.responseData = resp.body;
            if (this.worrySubmit === 2) {
              this.commonService.updateScore(FOLLOW_UP_FORM_COMPLETE_SCORE);
              console.log('score 2');
            }
          }
        });
    }
  }
  getEndDate() {
    return moment(this.task.end_at).format('DD-MMM');
  }
  onDisableEmergency() {
    const date = this.task.end_at + ' ' + this.task.time;
    this.disableEmergency =
      moment().format('YYYY-MM-DD HH:mm') <
      moment.utc(date).local().format('YYYY-MM-DD HH:mm');
  }

  onEmergencyPlan() {
    this.doneShowSummary = true;
    this.onWorstFearClick();
  }
  onSummary() {
    this.summaryText = this.faceYourWorstFearForm.controls[
      'faceYourWorstFear'
    ].value;
    this.panel2.expanded = false;
  }
  taskSubmitted(data: any) {
    this.taskEmitted = data;
  }
  taskLoaded(task: UserTask) {
    this.task = task;
    if (task) {
      this.getEndDate();
      this.onDisableEmergency();
      this.emergencyPlan = !(
        this.faceYourWorstFearForm.controls['emergency_plan'].value === '' &&
        this.summaryText !== '' &&
        this.taskEmitted
      );
    }
  }
  resetForm() {
    this.faceYourWorstFearForm = this.fb.group({
      faceYourWorstFear: new FormControl('', Validators.required),
      emergency_plan: new FormControl('', Validators.required),
    });
    this.showTasks = false;
    this.doneShowSummary = false;
    this.taskEmitted = false;
    this.emergencyPlan = undefined;
    this.summaryText = '';
  }
  onFocusfear() {
    this.continueButton = true;
  }
  onFocusEmergency() {
    this.continueEmergency = true;
  }
  panelCollapse() {
    const object = {
      index: this.summaryIndex,
      summary: this.summaryText ? this.summaryText : '',
    };
    this.techniqueCollapsed.emit(object);
  }
}
