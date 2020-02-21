import { SurveyOption } from './survey-options.model';

export class SurveyQuestion {
  index: number;
  ques: string;
  // options!: SurveyOption[];

  constructor(index: number, ques: string) {
    this.index = index;
    this.ques = ques;
  }
}
