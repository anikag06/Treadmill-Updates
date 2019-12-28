export class Outcome {
  constructor(
    public id: number,
    public belief_id: number,
    public outcome: string,
    public learning?: string,
    public beliefRating?: number,
  ) {}
}
