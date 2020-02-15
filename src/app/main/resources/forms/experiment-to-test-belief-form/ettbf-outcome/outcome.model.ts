export class Outcome {
  // had to use snake case due to backend convention
  constructor(
    public id: number,
    public belief_id: number,
    public outcome: string,
    public learning?: any,
    public belief_rating_after?: any,
    public realistic_belief?: any,
  ) {}
}
