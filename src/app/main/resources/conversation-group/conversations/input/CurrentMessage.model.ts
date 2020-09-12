export class CurrentMessageModel {
  message!: string;
  ShowTyping!: boolean;
  dialog_images!: any;

  constructor() {
    this.ShowTyping = false;
  }
}
