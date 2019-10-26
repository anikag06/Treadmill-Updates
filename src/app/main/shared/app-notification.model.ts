import { User } from '../../shared/user.model';

export class AppNotification {
    user: User;
    message: string;
    time: Date;

    constructor(user: User, message: string, time: Date) {
        this.user = user;
        this.message = message;
        this.time = time;
    }
}
