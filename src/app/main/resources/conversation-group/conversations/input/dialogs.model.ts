import { DialogOptions } from './dialog_options.model';
export class Dialog {
  id!: number;
  message!: string;
  dialog_images!: any[];
  dialog_has_options!: DialogOptions[];
  is_last!: boolean;

  constructor(data: any) {
    this.id = data.id;
    this.message = data.message;
    this.dialog_images = data.dialog_images;
    this.is_last = data.is_last;
    this.dialog_has_options = [];
    data.dialog_has_options.forEach((q: any) => {
      this.dialog_has_options.push(new DialogOptions(q));
    });
  }
}
