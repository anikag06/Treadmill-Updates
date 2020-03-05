import { TaskOrigin } from '../shared/models/taskorigin.model';

export class Worry {
  constructor(
    public id: number,
    public worry: string,
    public worry_rating_initial?: any,
    public taskorigin?: TaskOrigin, // public useless_characteristics?: string,
    public show_follow_up_dot?: boolean,
  ) {}
}
