import {TaskOrigin} from '@/main/resources/forms/problem-solving-worksheets/taskOrigin.model';

export class Problem {
  constructor(
    public id: number,
    public problem: string,
    public bestsolution: any,
    public taskorigin: TaskOrigin,
  ) {}
}
