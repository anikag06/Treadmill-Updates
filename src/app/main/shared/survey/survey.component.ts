import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, useAnimation, style } from '@angular/animations';
import { decrementAnimation, incrementAnimation, enterAnimation, enterSubmitAnimation } from '@/shared/animations';
import { SurveyQuestion } from './survey-questions.model';
import { SurveyOption } from './survey-options.model';
import { SurveyService } from '../survey.service';
import { TimerService } from '@/shared/timer.service';
import { SurveyResponse } from './survey-response.model';

@Component({
  animations: [
    trigger('in', [
      transition(
        ':decrement',
        // tslint:disable-next-line:max-line-length
        [
          useAnimation(decrementAnimation)
        ],
      ),
      transition(
        ':increment',
        // tslint:disable-next-line:max-line-length
        [
          useAnimation(incrementAnimation)
        ],
      ),
    ]),
    trigger('simpleFadeAnimation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ transform: 'translateX(0)' })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        useAnimation(enterAnimation)
      ]),
    ]),
    trigger('submit_animation', [
      // the "in" style determines the "resting" state of the element when it is visible.
      state('in', style({ opacity: 1 })),

      // fade in when created. this could also be written as transition('void => *')
      transition(':enter', [
        useAnimation(enterSubmitAnimation)
      ]),
    ]),
  ],

  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

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
  data = 'Please complete the survey before leaving the page.';

  constructor(private surveyService: SurveyService,
    private timerService: TimerService) { }

  ngOnInit() {
    this.surveyService.disableLinks.emit(this.data);
  }

  loadQuestions() {
    this.surveyService.getSurveyData().subscribe((data) => {
      this.quesArray = data.questions;
      this.options = data.options;
      this.pager.count = this.quesArray.length;
      this.display_survey = true;
      this.ques = this.quesArray[this.quesCount].ques;
      this.startTime = new Date();

    });
    this.surveyService.getSurveyTerm().subscribe((data) => {
      this.surveyId = data.id;
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
        this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
      }
    }
  }

  onselect(event: any, id: number, name: string) {
    this.updateTimeTaken();
    this.currQues = { index: this.quesArray[this.quesCount].index, ques: this.quesArray[this.quesCount].ques };
    this.currOption = { value: id, name: name };
    this.updateSurveyResponse();
    if (this.backCount === 0) {
      this.front = false;
    } else {
      this.backCount -= 1;
      this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
    }
    if (this.quesCount < 13) {
      setTimeout(() => {
        this.quesCount += 1;
        this.ques = this.quesArray[this.quesCount].ques;
        this.pager.index = this.quesCount + 1;
        this.back = true;
        if (this.backCount !== 0) {
          this.selectedOptionValue = this.userResponseArray[this.quesCount].option;
        } else {
          this.selectedOptionValue = null;
        }

      }, 1000);
    } else {
      this.submit = true;
      this.quesCount += 1;
      this.pager.index = this.quesCount + 1;
    }
    console.log('user response', this.userResponseArray, this.userResponse);
  }

  onSubmit() {
    this.back = false;
    this.front = false;
    this.surveyService.storeUserResponse({ survey_id: this.surveyId, survey_responses: this.userResponseArray })
      .subscribe((data) => {
        console.log(data);
      });
    this.surveyService.enableLinks.emit();
    // next step
  }

  updateSurveyResponse() {
    if (this.userResponseArray[this.quesCount]) {
      this.userResponseArray[this.quesCount].question = this.currQues.ques;
      this.userResponseArray[this.quesCount].option = this.currOption.value;
    } else {
      this.userResponse = { question: this.currQues.ques, option: this.currOption.value, time_taken_to_complete: this.timeTaken };
      this.userResponseArray.push(this.userResponse);
    }
  }
  updateTimeTaken() {
    if (this.userResponseArray[this.quesCount]) {
      // tslint:disable-next-line: max-line-length
      this.timeTaken = this.timerService.showTime(this.quesCount, this.startTime);
      this.userResponseArray[this.quesCount].time_taken_to_complete = this.userResponseArray[this.quesCount].time_taken_to_complete + this.timeTaken;
    } else {
      this.timeTaken = this.timerService.showTime(this.quesCount, this.startTime);
    }
  }
}
