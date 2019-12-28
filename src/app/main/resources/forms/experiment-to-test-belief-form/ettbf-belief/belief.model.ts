export class Belief {
  constructor(
    public id: number,
    public belief: string,
    public beliefRating?: number,
    public taskOrigin?: number,
  ) {}
}
