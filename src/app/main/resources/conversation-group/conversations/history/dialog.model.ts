import {Image} from './image.model';
export class DialogInHistory {
    id!: number;
    message!: string;
    dialog_images!: Image[];
    is_last!: boolean;

    constructor(id: number, message: string, dialog_images: Image[], is_last: boolean) {
        this.id = id;
        this.message = message;
        dialog_images.forEach((q: any) => {
            this.dialog_images.push(new Image(q.image, q.type));
        });
        this.is_last = is_last;
    }






}
