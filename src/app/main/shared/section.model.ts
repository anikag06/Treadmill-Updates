export class Section {
    public name: string;
    public description: string;
    public status: string;

    constructor(name: string, description: string, status: string) {
        this.name = name;
        this.description = description;
        this.status = status;
    }
}