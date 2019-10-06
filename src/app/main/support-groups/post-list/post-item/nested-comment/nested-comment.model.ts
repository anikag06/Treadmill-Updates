export class UserNestedComment {
    constructor(
        public id: number,
        public body: string,
        public up_votes: number,
        public user: {
            username: string,
            avatar: string,
        },
        public is_voted: number,
        public created_at: string,
    ) {}
}
