import { Dialog } from './dialogs.model';
export class Conversation {
  title: string;
  final_conclusion_message: string;
  gender: string;
  dialogs!: Dialog[];
  length!: number;

  constructor(
    title: string,
    final_conclusion_message: string,
    gender: string,
    dialogs: Dialog[],
  ) {
    this.title = title;
    this.final_conclusion_message = final_conclusion_message;
    this.gender = gender;
    this.dialogs = [];
    this.dialogs = dialogs;
  }
}
