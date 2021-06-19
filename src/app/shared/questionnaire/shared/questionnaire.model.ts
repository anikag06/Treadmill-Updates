import {QuestionModel} from "@/shared/questionnaire/shared/question.model";

export class QuestionnaireItem {
  constructor(
    public title: string,
    public subtitle: string,
    public id: number,
    public instructions: string,
    public category: string,
    public order: number,
    public question: QuestionModel[],
  ) {}
}
