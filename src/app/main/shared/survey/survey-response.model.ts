export class SurveyResponse {
  question: string;
  option: number;
  time_taken_to_complete: number;

  constructor(question: string, option: number, time: number) {
    this.question = question;
    this.option = option;
    this.time_taken_to_complete = time;
  }
}
