import {Image} from './image.model';
export class OptionInHistory {
    id!: number;
    message!: string;
    option_images!: Image[];

    constructor(id: number, message: string, dialog_images: Image[]) {
        this.id = id;
        this.message = message;
        dialog_images.forEach((q: any) => {
            this.option_images.push(new Image(q.image, q.type));
        });
    }






}
