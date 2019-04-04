export class UserComment {
    constructor(
        public id: number,
        public user: {
            username: string,
            avatar: string | null,
        },
        public body: string,
        public up_votes: number,
        public nested_comment_count: number,
        public created_at: string,
    ) {}
}