import { Tag } from './tag.model';

export class UserPost {
    constructor(
        public title: string,
        public body: string,
        public tags: Tag[]
    ) {}
}
