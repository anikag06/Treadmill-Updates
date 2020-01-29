import { Tag } from './tag.model';

export class TagGroup {
    constructor(
        public group_name: string,
        public tags_list: Tag[]
    ) { }
}