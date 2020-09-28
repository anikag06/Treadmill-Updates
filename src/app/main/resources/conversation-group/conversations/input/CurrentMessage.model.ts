export class CurrentMessageModel {
  message!: string;
  showTyping!: boolean;
  dialog_images!: any;

  constructor() {
    this.showTyping = false;
  }
}
