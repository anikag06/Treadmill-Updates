export class User {
    public username: string;
    public user_id: number;
    public email: string;

    constructor(user_id: number, username: string, email: string) {
        this.username = username;
        this.user_id = user_id;
        this.email = email;
    }
}