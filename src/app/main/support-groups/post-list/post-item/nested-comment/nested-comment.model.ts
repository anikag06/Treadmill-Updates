export class UserNestedComment {
    constructor(
        public id: number,
        public body: string,
        public up_votes: number,
        public user: string, 
    ) {}
}