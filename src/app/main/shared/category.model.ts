import { Section } from './section.model';

export class Category {
    public name: string;
    public imageUrl: string;
    public status: string;
    public sections: Section[];
    
    constructor(
        name: string,
        imageUrl: string,
        status: string,
        sections: Section[],
    ) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.status = status;
        this.sections = sections;
    }
}