import { Component, OnInit } from '@angular/core';
import { ConversationsService } from './conversations.service';
import { TimerService } from '@/shared/timer.service';
import { Step } from './conversation-group-input/step.model';
import { ConversationGroup } from './conversation-group-input/conversation-group.model';
import { PassDataService } from './passdata.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';


@Component({
  selector: 'app-conversation-group',
  templateUrl: './conversation-group.component.html',
  styleUrls: ['./conversation-group.component.scss'],
  providers: [ConversationsService, TimerService]
})
export class ConversationGroupComponent implements OnInit {

  step!: Step;
  group!: ConversationGroup[];
  conversation_id!: number;
  isreset!: boolean;
  iscontinue!: boolean;
  isspeedrun!: boolean;
  notallowed!: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(private conversationservice: ConversationsService,
     private timer: TimerService,
     private passdata: PassDataService,
     private router: Router,
     private activeroute: ActivatedRoute) { }




  ngOnInit() {
    this.loadConversationGroup();
  }

  loadConversationGroup() {
    this.activeroute.params
    .pipe(
      map( v => v.id),
      switchMap( id => this.conversationservice.getConversationGroup(id))
    )
    .subscribe(
      (res: any) => {
        const step = res.data;
        console.log(step.status);
        if (['COMPLETED', 'WORKING', 'UNLOCKED'].includes(step.status) ) {
        this.step = step;
        this.group = this.step.step_data.data.conversations;
        const formName = step.action[0];
        this.passdata.setFormName(formName);
        } else {
          this.notallowed = true;
        }
      },
      (error) => console.log(error)
    );
  }

  reset(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, true, false, false);
    this.router.navigate(['/resources/conversations']);

  }

  current_history(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, false, true, false);
  }

  speed_run(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, false, false, true);
  }


}
