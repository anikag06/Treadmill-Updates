export class Module {
    public name: string;
    public status: string;
    public imageUrl: string;

    constructor(name: string, status: string, imageUrl: string) {
        this.name = name;
        this.status = status;
        this.imageUrl = imageUrl
    }
}