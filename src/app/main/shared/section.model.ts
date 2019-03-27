export class Section {
    public name: string;
    public module: number;
    public category: string;
    public is_content_locked: boolean;
    public is_active: boolean;

    constructor(name: string, module: number, category: string, is_content_locked: boolean, is_active: boolean) {
        this.name = name;
        this.module = module;
        this.category = category;
        this.is_content_locked = is_content_locked;
        this.is_active = is_active;
    }
}