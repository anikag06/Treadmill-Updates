export class Category {
    public name: string;
    public imageUrl: string;
    public status: string;
    
    constructor(
        name: string,
        imageUrl: string,
        status: string
    ) {
        this.name = name;
        this.imageUrl = imageUrl;
        this.status = status;
    }
}