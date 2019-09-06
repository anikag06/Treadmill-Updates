import { ConversationSelection } from './conversation-selection.model';
import { Data } from './data.model';

export class ConversationGroup {
    id!: number;
    name!: string;
    sequence!: number;
    step_data!: {
        data: Data,
        type: string
    };
    action!: any[];
    hook!: any[];
    status!: string;
    virtual_step!: boolean;

    constructor(data: any) {
        this.id = data.data.id;
        this.name = data.data.name;
        this.sequence = data.data.sequence;
        this.step_data = data.data.step_data;
        // this.step_data.data.id = data.data.step_data.data.id;
        // this.step_data.data.name = data.data.step_data.data.name;
        // data.data.step_data.data.conversations.forEach((q: any) => {
        //     // tslint:disable-next-line:max-line-length
        // tslint:disable-next-line:max-line-length
        //     this.step_data.data.conversations.push(new ConversationSelection(q.id, q.title, q.discription, q.gender, q.expected_time, q.avatar_name, q.occupation));
        // });
    }
}
