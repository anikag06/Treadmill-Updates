import { Option } from './option';

export class Question {

    id: number;
    name: string;
    options!: Option[];


    constructor(data: any) {
        data = data || {};

        this.id = data.id;
        this.name = data.question;

    }



}
