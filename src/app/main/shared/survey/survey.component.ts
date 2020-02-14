import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, useAnimation, style } from '@angular/animations';
import { decrementAnimation, incrementAnimation, enterAnimation, enterSubmitAnimation } from '@/shared/animations';
import { SurveyQuestion } from './survey-questions.model';
import { SurveyOption } from './survey-options.model';
import { SurveyOptionSelected } from './survey-option-selected.model';
import { SurveyService } from '../survey.service';

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
  quesCount = 0;
  ques!: string;
  quesArray!: SurveyQuestion[];
  currQues!: SurveyQuestion;
  options!: SurveyOption[];
  currOption!: SurveyOption;
  userResponse!: SurveyOptionSelected;
  userResponseArray: any = [];
  selectedOptionValue!: number;

  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.surveyService.getSurveyData().subscribe((data) => {
      console.log(data);
      this.quesArray = data.questions;
      this.options = data.options;
      this.pager.count = this.quesArray.length;
    });
  }

  loadQuestions() {
    console.log(this.quesArray[this.quesCount]);
    this.display_survey = true;
    this.ques = this.quesArray[this.quesCount].ques;
  }

  onback() {
    this.backCount += 1;
    this.quesCount -= 1;
    this.ques = this.quesArray[this.quesCount].ques;
    this.pager.index -= 1;
    this.back = true;
    this.front = true;
    console.log(this.userResponseArray[this.quesCount].optionSelected.value);
    this.selectedOptionValue = this.userResponseArray[this.quesCount].optionSelected.value;

  }
  onfront() {
    this.backCount -= 1;
    this.quesCount += 1;
    this.ques = this.quesArray[this.quesCount].ques;
    this.pager.index += 1;
    this.back = false;
    if (this.backCount === 0) {
      this.front = false;
      // check
      this.selectedOptionValue = 4;
    } else {
      this.selectedOptionValue = this.userResponseArray[this.quesCount].optionSelected.value;
    }
  }

  onselect(event: any, id: number, name: string) {
    event.target.classList.add('toggle-button');
    console.log('event', event, id);
    this.currQues = { index: this.quesArray[this.quesCount].index, ques: this.quesArray[this.quesCount].ques };
    this.currOption = { value: id, name: name };
    this.userResponse = { ques: this.currQues, optionSelected: this.currOption };
    this.userResponseArray.push(this.userResponse);
    if (this.backCount === 0) {
      this.front = false;
    } else {
      this.backCount -= 1;
      this.selectedOptionValue = 4;
    }

    setTimeout(() => {
      this.quesCount += 1;
      event.target.classList.remove('toggle-button');
      this.ques = this.quesArray[this.quesCount].ques;
      this.pager.index = this.quesCount + 1;
      this.back = true;
    }, 2000);
    console.log('user response', this.userResponseArray, this.userResponse);
  }

}
