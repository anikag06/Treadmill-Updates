import { TaskOrigin } from '../../shared/model/taskOrigin.model';

export class Belief {
  // had to use snake case due to backend convention
  constructor(
    public id: number,
    public belief: string,
    public belief_rating_before?: any,
    public taskOrigin?: TaskOrigin,
  ) {}
}
