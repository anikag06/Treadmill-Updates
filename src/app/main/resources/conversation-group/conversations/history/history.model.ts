import {UserResponse} from './user_response.model';
export class CurrentHistory {
    id!: number;
    conversation_id!: number;
    is_completed!: boolean;
    completion_datetime!: any;
    created_at!: any;
    time_taken_to_complete_in_seconds!: any;
    user_response!: UserResponse[];

    // tslint:disable-next-line:max-line-length
    constructor(id: number, conversation_id: number, is_completed: boolean, created_at: any, completion_datetime: any, time_taken_to_complete_in_seconds: any, user_response: UserResponse[] ) {
        this.id = id;
        this.conversation_id = conversation_id;
        this.is_completed = is_completed;
        this.time_taken_to_complete_in_seconds = time_taken_to_complete_in_seconds;
        this.completion_datetime = completion_datetime;
        this.created_at = created_at;
        this.user_response = [];
        user_response.forEach((q: any) => {
        this.user_response.push(new UserResponse(q.dialog, q.option, q.created_at));
        });
    }






}
