import { Question } from './question';

export class Quiz {
  count!: number;
  questions!: Question[];

  constructor(data: any) {
    if (data) {
      this.count = data.count;
      this.questions = [];
      data.results.forEach((q: any) => {
        this.questions.push(new Question(q));
      });
    }
  }
}
