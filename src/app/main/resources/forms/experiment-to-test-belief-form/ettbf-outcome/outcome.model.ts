export class Outcome {
  // had to use snake case due to backend convention
  constructor(
    public id: number,
    public belief_id: number,
    public outcome: string,
    public learning?: string,
    public belief_rating_after?: number,
    public realistic_belief?: string,
  ) {}
}
