import { Component, OnInit } from '@angular/core';
import { ConversationsService } from './conversations.service';
import { TimerService } from '@/shared/timer.service';
import { ConversationGroup } from './conversation-group-input/conversation-group.model';
import { ConversationSelection } from './conversation-group-input/conversation-selection.model';
import { PassDataService } from './passdata.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-conversation-group',
  templateUrl: './conversation-group.component.html',
  styleUrls: ['./conversation-group.component.scss'],
  providers: [ConversationsService, TimerService]
})
export class ConversationGroupComponent implements OnInit {

  conversationgroup!: ConversationGroup;
  group!: ConversationSelection[];
  conversation_id!: number;
  isreset!: boolean;
  iscontinue!: boolean;
  isspeedrun!: boolean;


  // tslint:disable-next-line:max-line-length
  constructor(private conversationservice: ConversationsService, private timer: TimerService, private passdata: PassDataService, private router: Router) { }



  ngOnInit() {
    this.loadConversationGroup();
  }

  loadConversationGroup() {
    this.conversationservice.getConversationGroup().subscribe(
      (res: any) => {
        this.conversationgroup = new ConversationGroup(res);
        this.group = this.conversationgroup.step_data.data.conversations;
      }
    );
  }

  reset(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, true, false, false);
    console.log(this.passdata.getid());
    this.router.navigate(['/conversations']);

  }

  current_history(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, false, true, false);
  }

  speed_run(i: number) {
    this.passdata.setOption(this.conversation_id, false, false, true);
  }

}
