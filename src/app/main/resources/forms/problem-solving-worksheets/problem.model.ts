import {TaskOrigin} from '@/main/resources/forms/shared/model/taskorigin.model';

export class Problem {
  constructor(
    public id: number,
    public problem: string,
    public bestsolution: any,
    public taskorigin: TaskOrigin,
  ) {}
}
