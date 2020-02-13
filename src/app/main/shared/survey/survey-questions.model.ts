import { SurveyOption } from './survey-options.model';

export class SurveyQuestion {
    id: number;
    name: string;
    options!: SurveyOption[];

    constructor(data: any) {
        data = data || {};

        this.id = data.id;
        this.name = data.question;
    }
}
