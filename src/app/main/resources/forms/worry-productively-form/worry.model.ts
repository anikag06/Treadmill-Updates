import { TaskOrigin } from '../shared/model/taskOrigin.model';

export class Worry {
  constructor(
    public id: number,
    public worry: string,
    public worry_rating_initial?: any,
    public taskorigin ?: TaskOrigin, // public useless_characteristics?: string,
  ) {}
}
