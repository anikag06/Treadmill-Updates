import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { ProblemSolvingWorksheetsService } from '../problem-solving-worksheets.service';
import { Result } from './result.model';
import { HttpErrorResponse } from '@angular/common/http';
import { UserTask } from '@/main/resources/forms/shared/tasks/user-task.model';
import * as moment from 'moment';
import { PROBLEM_SOLVING_QUOTES } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-message';
import { FormService } from '@/main/resources/forms/form.service';
import { CommonService } from '@/shared/common.service';
import { FOLLOW_UP_FORM_COMPLETE_SCORE } from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss'],
})
export class ResultComponent implements OnInit, OnChanges {
  constructor(
    private problemService: ProblemSolvingWorksheetsService,
    private formService: FormService,
    private commonService: CommonService,
    private authService: AuthService,
  ) {}
  @Input() solution_id!: number;
  @Input() task!: UserTask;
  user!: User;
  result!: Result;
  resultBody = '';
  disableResult!: boolean;
  didWork!: boolean;
  quote!: string;
  quotedBy!: string;
  showMessage!: boolean;
  showSpinner = false;
  ngOnInit() {
    if (this.task) {
      this.getEndDate();
      this.onDisableResult();
    }
    this.user = <User>this.authService.isLoggedIn();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.task) {
      this.getEndDate();
      this.onDisableResult();
    }
    if (changes.solution_id && this.solution_id) {
      console.log(this.solution_id);
      this.problemService.getResult(this.solution_id).subscribe(
        (data: any) => {
          if (data) {
            this.result = new Result(+data.id, data.result, data.did_it_work);
            this.resultBody = data.result;
            this.didWork = data.did_it_work;
            this.onShowMessage();
          } else {
            delete this.result;
            this.resultBody = '';
          }
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        },
      );
    }
  }

  onResultSubmit() {
    const object = {
      solution_id: this.solution_id,
      result: this.resultBody,
      did_it_work: this.didWork,
    };
    if (this.result) {
      this.problemService.putResult(this.solution_id, object).subscribe(
        (data: any) => {
          this.result = new Result(+data.id, this.resultBody, this.didWork);
          this.commonService.updateScore(FOLLOW_UP_FORM_COMPLETE_SCORE);
        },
        error => console.log(error),
      );
    } else {
      this.showSpinner = true;
      this.problemService.postResult(this.solution_id, object).subscribe(
        (data: any) => {
          this.result = new Result(data.id, this.resultBody, this.didWork);
          this.onShowMessage();
          this.commonService.updateScore(FOLLOW_UP_FORM_COMPLETE_SCORE);
        },
        error => console.log(error),
      );
    }
  }
  getEndDate() {
    return moment(this.task.end_at).format('DD-MMM');
  }
  onDisableResult() {
    const date = this.task.end_at + ' ' + this.task.time;
    this.disableResult =
      moment().format('YYYY-MM-DD HH:mm') <
      moment
        .utc(date)
        .local()
        .format('YYYY-MM-DD HH:mm');
  }

  onShowMessage() {
    const index = this.formService.getRandomInt(PROBLEM_SOLVING_QUOTES.length);
    this.quote = PROBLEM_SOLVING_QUOTES[index].quote;
    this.quotedBy = PROBLEM_SOLVING_QUOTES[index].by;
    this.showSpinner = false;
    this.showMessage = true;
  }

  showContinue() {
    return this.result
      ? this.result.result !== this.resultBody ||
          this.result.did_it_work !== this.didWork
      : !this.disableResult;
  }
}
