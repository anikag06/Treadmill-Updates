import { Injectable } from '@angular/core';
import { withLatestFrom } from 'rxjs/operators';

@Injectable()

export class PassDataService {
  private isreset!: boolean;
  private iscontinue!: boolean;
  private isspeedrun!: boolean;
  private conversation_id!: number;
  private array = [false, false, false];


 setOption(value: number, reset: boolean, continu: boolean, speedrun: boolean)  {
     this.conversation_id = value;
     this.iscontinue = continu;
     this.isreset = reset;
     this.isspeedrun = speedrun;
     this.array = [this.isreset , this.iscontinue, this.isspeedrun];
     console.log(this.conversation_id);
  }
 getid() {
    console.log(this.conversation_id);
     return this.conversation_id;
 }

 iswhat() {
     return this.array;
 }
}
