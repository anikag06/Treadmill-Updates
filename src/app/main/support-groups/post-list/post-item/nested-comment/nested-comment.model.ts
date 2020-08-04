export class UserNestedComment {
  constructor(
    public id: number,
    public body: string,
    public up_votes: number,
    public user: {
      username: string;
      avatar?: string;
      score?: number;
      no_of_gold_badges?: number;
      no_of_bronze_badges?: number;
      no_of_silver_badges?: number;
    },
    public is_voted: number,
    public created_at: string,
    public is_thanked?: number
  ) {}
}
