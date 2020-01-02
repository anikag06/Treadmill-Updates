import { Tag } from '../shared/tag.model';

export class SupportGroupItem {
  constructor(
    public id: number,
    public body: string,
    public title: string,
    public tags: Tag[],
    public user: {
      username: string;
      avatar?: string;
      score?: number;
      no_of_gold_badges?: number;
      no_of_bronze_badges?: number;
      no_of_silver_badges?: number;
    },
    public up_votes: number,
    public created_at: string,
    public comments_count: number,
    public is_voted: number,
  ) {}
}
