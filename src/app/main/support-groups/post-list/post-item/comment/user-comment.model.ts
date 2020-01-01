export class UserComment {
    constructor(
        public id: number,
        public user: {
            username: string,
            avatar: string | null,
            score: number,
            no_of_gold_badges: number,
            no_of_bronze_badges: number,
            no_of_silver_badges: number
        },
        public body: string,
        public up_votes: number,
        public nested_comment_count: number,
        public created_at: string,
        public is_voted: number
    ) {}
}