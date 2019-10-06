import slugify from 'slugify';
import { Category } from '../shared/category.model';


export class Module {
    public name: string;
    public imageUrl: string;
    public slug: string;
    public id: number;
    public image: string;
    public is_active: boolean;
    public is_completed: boolean;
    public categories: Category[];

    constructor(
            name: string,
            is_active: boolean,
            is_completed: boolean,
            image: string,
            id: number,
            categories: Category[],
        ) {
        this.id = id,
        this.name = name;
        this.slug = slugify(name, {lower: true});
        this.categories = categories;
        this.is_active = is_active;
        this.is_completed = is_completed;
        this.image = image;
        this.imageUrl = 'https://via.placeholder.com/978x350?text=' + this.name;
        if (image) {
            this.imageUrl = image;
        }
    }
}