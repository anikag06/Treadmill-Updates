import { Section } from './section.model';

export class Category {
    public name: string;
    public is_active: boolean;
    public is_content_locked: boolean;
    public sections: Section[];
    constructor(
        name: string,
        is_active: boolean,
        is_content_locked: boolean,
    ) {
        this.name = name;
        this.is_active = is_active;
        this.is_content_locked = is_content_locked;
        this.sections = [];
    }
}