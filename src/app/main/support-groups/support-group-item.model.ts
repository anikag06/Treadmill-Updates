import { Tag } from '../shared/tag.model';

export class SupportGroupItem {
    constructor(
        public id: number,
        public body: string,
        public title: string,
        public tags: Tag[],
        public user: {
            username: string,
            avatar: string,
        },
        public up_votes: number,
        public created_at: string,
        public comments_count: number,
    ){}
}
