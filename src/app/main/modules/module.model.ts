import slugify from 'slugify';


export class Module {
    public name: string;
    public status: string;
    public imageUrl: string;
    public slug: string;

    constructor(name: string, status: string, imageUrl: string) {
        this.name = name;
        this.status = status;
        this.imageUrl = imageUrl
        this.slug = slugify(name, {lower: true});
    }
}