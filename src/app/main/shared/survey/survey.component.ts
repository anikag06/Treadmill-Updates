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
      state('in', style({ opacity: 1 })),

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

  constructor() { }

  ngOnInit() {
  }

}
