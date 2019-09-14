import slugify from 'slugify';

export class Game {
    public name: string;
    public thumbnail: string;
    public description: string;
    public slug: string;

    constructor(name: string, thumbnail: string, description: string, slug?: string) {
        this.name = name;
        this.thumbnail = thumbnail;
        this.description = description;
        this.slug = slug || slugify(name, {lower: true});
    }
}
