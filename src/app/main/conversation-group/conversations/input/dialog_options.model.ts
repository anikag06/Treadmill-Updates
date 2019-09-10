export class DialogOptions {
    option!: {
        id: number;
        message: string;
        option_images: any;
    };
    upcoming_dialog!: number;
    wrong_option_message!: {
        message: string;
        wrong_option_message_images: any[];
    };
    loopback!: boolean;
    is_last!: boolean;

    constructor(data: any) {

        this.option.id = data.option.id;
        this.option.message = data.option.message;
        this.option.option_images = data.option.option_images;
        this.upcoming_dialog = data.upcoming_dialog;
        this.wrong_option_message = data.wrong_option_message;
        this.loopback = data.loopback;

    }

}

