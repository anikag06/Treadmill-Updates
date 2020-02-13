import { Component, OnInit } from '@angular/core';
import { trigger, transition, state, useAnimation, style } from '@angular/animations';
import { decrementAnimation, incrementAnimation, enterAnimation, enterSubmitAnimation } from '@/shared/animations';

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
  submit = false;
  newQues = false;
  questionArray = [
    'Lorem ipsum dolor 1 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor 2 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor 3 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    'Lorem ipsum dolor 4 sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
  ];
  back = false;
  quesCount = 0;
  ques!: string;
  optionSelected!: number;

  constructor() { }

  ngOnInit() {
    this.pager.count = 14;
  }

  loadQuestions() {
    this.display_survey = true;
    this.newQues = false;
    this.ques = this.questionArray[this.quesCount];
  }

  onback() {
    this.quesCount -= 1;
    this.ques = this.questionArray[this.quesCount];
    this.pager.index -= 1;
    this.back = true;
    this.display_front();

  }
  onfront() {
    this.quesCount += 1;
    this.ques = this.questionArray[this.quesCount];
    this.pager.index += 1;
    this.back = false;
    this.display_front();
  }

  display_front() {
    // if (this.question_no < this.total_question) {
    //   return this.answered[this.question_no];
    // } else {
    return true;
    // }
  }

  onselect(event: any) {
    event.target.classList.add('toggleButton');
    console.log(event);
    this.quesCount += 1;
    this.newQues = false;
    this.ques = this.questionArray[this.quesCount];
    this.pager.index = this.quesCount + 1;
    // if (event.target.id === 'option1') {
    //   this.optionsArray.push('option1');
    // }
    // this.submit = false;
    this.back = true;
    // this.optionsArray.push()
  }

}
