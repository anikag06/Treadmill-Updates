import { Injectable } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';

@Injectable()
export class PassDataService {
  private isreset!: boolean;
  private iscontinue!: boolean;
  private isspeedrun!: boolean;
  private conversation_id!: number;
  private array = [false, false, false];
  private id = [0, false, 0];
  private formname!: string;
  private current_id!: number;
  private islast!: boolean;
  private nextstep!: number;
  route = false;

  setid(current: number, islast: boolean, nextstep: number) {
    this.current_id = current;
    this.islast = islast;
    this.nextstep = nextstep;
  }

  setOption(
    value: number,
    reset: boolean,
    continu: boolean,
    speedrun: boolean,
  ) {
    this.conversation_id = value;
    console.log(this.conversation_id);
    this.iscontinue = continu;
    this.isreset = reset;
    this.isspeedrun = speedrun;
    this.array = [this.isreset, this.iscontinue, this.isspeedrun];
    console.log(this.conversation_id);
  }

  getid() {
    console.log(this.conversation_id);
    return this.conversation_id;
  }

  iswhat() {
    return this.array;
  }

  get_current_id() {
    this.current_id = 24;
    return this.current_id;
  }

  get_islast() {
    this.islast = false;
    return this.islast;
  }

  get_nextstep() {
    this.nextstep = 2;
    return this.nextstep;
  }

  setFormName(formname: string) {
    this.formname = formname;
  }

  getFormName() {
    return this.formname;
  }

  IsConversationOn(value: boolean) {
    this.route = value;
  }
}
