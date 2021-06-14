export class QuestionnaireItem {
  constructor(
    public title: string,
    public introText: string,
    public id: number,
    public order: number,
    public count: number,
    public quesNo: number,
    public question: string,
  ) {}
}
