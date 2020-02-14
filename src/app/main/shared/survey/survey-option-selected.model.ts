import { SurveyQuestion } from './survey-questions.model';
import { SurveyOption } from './survey-options.model';

export class SurveyOptionSelected {
    ques: SurveyQuestion;
    optionSelected: SurveyOption;

    constructor(ques: SurveyQuestion, optionSelected: SurveyOption) {
        this.ques = ques;
        this.optionSelected = optionSelected;
    }

}
