export class User {
    public username: string;
    public avatarUrl: string;

    constructor(username: string, avatarUrl: string) {
        this.username = username;
        this.avatarUrl = avatarUrl;
    }
}