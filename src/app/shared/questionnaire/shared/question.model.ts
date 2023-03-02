import {Options} from "@/shared/questionnaire/shared/options.model";

export class QuestionModel{
  constructor(
    public id: number,
    public order: number,
    public question: string,
    public level: number,
    public options: Options[],
  ) {}
}
