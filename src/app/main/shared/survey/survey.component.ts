import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
  trigger,
  transition,
  state,
  useAnimation,
  style,
} from '@angular/animations';
import {
  decrementAnimation,
  incrementAnimation,
  enterAnimation,
  enterSubmitAnimation,
} from '@/shared/animations';
import { SurveyQuestion } from './survey-questions.model';
import { SurveyOption } from './survey-options.model';
import { SurveyService } from '../survey.service';
import { TimerService } from '@/shared/timer.service';
import { SurveyResponse } from './survey-response.model';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { FlowService } from '@/main/flow/flow.service';
import { Router } from '@angular/router';
import { CommonService } from '@/shared/common.service';
import {SURVEY_COMPLETE_SCORE, TREADWILL} from '@/app.constants';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import {Title} from "@angular/platform-browser";

@Component({
  animations: [
    trigger('in', [
      transition(
        ':decrement',
        // tslint:disable-next-line:max-line-length
        [useAnimation(decrementAnimation)],
      ),
      transition(
        ':increment',
        // tslint:disable-next-line:max-line-length
        [useAnimation(incrementAnimation)],
      ),
    ]),
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ transform: 'translateX(0)' })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [useAnimation(enterAnimation)]),
    ]),
    trigger('submit_animation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [useAnimation(enterSubmitAnimation)]),
    ]),
  ],

  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss'],
})
export class SurveyComponent implements OnInit {
  user!: User;
  display_survey = false;
  pager = {
    count: 1,
    index: 1,
  };
  back = false;
  backCount = 0;
  front = false;
  selected = false;
  submit = false;
  submitting = false;
  quesCount = 0;
  ques!: string;
  quesArray!: SurveyQuestion[];
  currQues!: SurveyQuestion;
  options!: SurveyOption[];
  currOption!: SurveyOption;
  userResponse!: SurveyResponse;
  userResponseArray: any = [];
  selectedOptionValue!: any;
  surveyId!: number;
  timeTaken!: number;
  startTime!: Date;
  first_click!: boolean;
  data = 'Please complete the survey before leaving the page.';
  navbarTitle!: string;
  followUp = false;
  showLoading = false;
  @ViewChild('submitBtn', { static: false }) submitBtn!: ElementRef;
  @ViewChild('startBtn', { static: false }) startBtn!: ElementRef;

  constructor(
    private surveyService: SurveyService,
    private timerService: TimerService,
    private goToService: NavbarGoToService,
    private flowService: FlowService,
    private router: Router,
    private commonService: CommonService,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.surveyService.disableLinks.emit(this.data);
    this.navbarTitle = 'Help us improve';
    this.flowService.stepDetail.emit(this.navbarTitle);
  }

  loadQuestions(event: any) {
    this.first_click = true;
    this.showLoading = true;
    console.log('start btn', this.startBtn);
    // this.startBtn.nativeElement.childNodes[0].classList.remove(
    //   'disabled-button',
    // );
    // this.startBtn.nativeElement.childNodes[0].classList.add('active-button');

    this.surveyService.getSurveyData().subscribe(data => {
      this.quesArray = data.questions;
      this.options = data.options;
      this.pager.count = this.quesArray.length;
      this.display_survey = true;
      this.ques = this.quesArray[this.quesCount].ques;
      this.startTime = new Date();
      this.showLoading = false;
    });
  }

  onback() {
    this.updateTimeTaken();
    this.submit = false;
    this.backCount += 1;
    this.quesCount -= 1;
    this.ques = this.quesArray[this.quesCount].ques;
    this.pager.index -= 1;

    if (this.quesCount === 0) {
      this.back = false;
    } else {
      this.back = true;
    }

    this.front = true;
    this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
  }
  onfront() {
    if (this.quesCount >= 13) {
      this.submit = true;
      this.front = false;
    } else {
      this.updateTimeTaken();
      this.quesCount += 1;
      this.ques = this.quesArray[this.quesCount].ques;
      this.pager.index += 1;

      this.backCount -= 1;

      if (this.backCount === 0) {
        this.front = false;
        this.selectedOptionValue = null;
      } else {
        this.back = true;
        this.selectedOptionValue = this.userResponseArray[
          this.quesCount
        ].option;
      }
    }
  }

  onselect(event: any, id: number, name: string) {
    if (event.target.nodeName === 'BUTTON') {
      console.log('Button');
      event.target.classList.remove('disabled-button');
      event.target.classList.add('active-button');
    } else if (event.target.nodeName === 'SPAN') {
      console.log('Span');
      event.target.parentElement.parentElement.classList.remove(
        'disabled-button',
      );
      event.target.parentElement.parentElement.classList.add('active-button');
    }
    console.log('event', event);
    this.updateTimeTaken();
    this.first_click = false;
    this.currQues = {
      index: this.quesArray[this.quesCount].index,
      ques: this.quesArray[this.quesCount].ques,
    };
    this.currOption = { value: id, name: name };
    this.updateSurveyResponse();
    if (this.backCount === 0) {
      this.front = false;
    } else {
      this.backCount -= 1;
      this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
      this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
    }
    if (this.quesCount < 13) {
      setTimeout(() => {
        if (!this.backCount) {
          if (event.target.nodeName === 'BUTTON') {
            console.log('Button');
            event.target.classList.remove('active-button');
            event.target.classList.add('disabled-button');
          } else if (event.target.nodeName === 'SPAN') {
            console.log('Span');
            event.target.parentElement.parentElement.classList.remove(
              'active-button',
            );
            event.target.parentElement.parentElement.classList.add(
              'disabled-button',
            );
          }
        }
        this.quesCount += 1;
        this.ques = this.quesArray[this.quesCount].ques;
        this.pager.index = this.quesCount + 1;
        this.back = true;
        if (this.backCount !== 0) {
          this.selectedOptionValue = this.userResponseArray[
            this.quesCount
          ].option;
        } else {
          this.selectedOptionValue = null;
        }
      }, 10);
    } else {
      this.submit = true;
      this.quesCount += 1;
      this.pager.index = this.quesCount + 1;
    }
    console.log('user response', this.userResponseArray, this.userResponse);
  }

  onSubmit(event: any) {
    this.submitting = true;
    this.back = false;
    this.front = false;
    this.surveyService
      .storeUserResponse({
        survey_responses: this.userResponseArray,
      })
      .subscribe(data => {
        console.log('survey response', data);
        this.submitting = false;
        if (this.user.is_exp) {
          this.commonService.updateScore(SURVEY_COMPLETE_SCORE);
        }

        if (this.flowService.showFollowUpSurvey) {
          this.router.navigate(['/']);
        } else {
          this.goToService.clickFlow.emit();
        }
      });
    this.surveyService.enableLinks.emit();
  }

  updateSurveyResponse() {
    if (this.userResponseArray[this.quesCount]) {
      this.userResponseArray[this.quesCount].question = this.currQues.ques;
      this.userResponseArray[this.quesCount].option = this.currOption.value;
    } else {
      this.userResponse = {
        question: this.currQues.ques,
        option: this.currOption.value,
        time_taken_to_complete: this.timeTaken,
      };
      this.userResponseArray.push(this.userResponse);
    }
  }
  updateTimeTaken() {
    if (this.userResponseArray[this.quesCount]) {
      // tslint:disable-next-line: max-line-length
      this.timeTaken = this.timerService.showTime(
        this.quesCount,
        this.startTime,
        this.first_click,
      );
      this.userResponseArray[this.quesCount].time_taken_to_complete =
        this.userResponseArray[this.quesCount].time_taken_to_complete +
        this.timeTaken;
    } else {
      this.timeTaken = this.timerService.showTime(
        this.quesCount,
        this.startTime,
        this.first_click,
      );
    }
  }
}
