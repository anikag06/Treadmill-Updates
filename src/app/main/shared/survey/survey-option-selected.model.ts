import { SurveyQuestion } from './survey-questions.model';
import { SurveyOption } from './survey-options.model';

export class SurveyOptionSelected {
    ques: SurveyQuestion;
    optionSelected: SurveyOption;
    time_taken_to_complete: number;

    constructor(ques: SurveyQuestion, optionSelected: SurveyOption, timeTaken: number) {
        this.ques = ques;
        this.optionSelected = optionSelected;
        this.time_taken_to_complete = timeTaken;
    }

}
