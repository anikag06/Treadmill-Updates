import { Component, OnInit } from '@angular/core';
import { ConversationsService } from './conversations.service';
import { TimerService } from '@/shared/timer.service';
import { Step } from './conversation-group-input/step.model';
import { ConversationGroup } from './conversation-group-input/conversation-group.model';
import { PassDataService } from './passdata.service';
import { Router, ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { COMPLETED, ACTIVE, UNLOCKED } from '@/app.constants';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';

@Component({
  selector: 'app-conversation-group',
  templateUrl: './conversation-group.component.html',
  styleUrls: ['./conversation-group.component.scss'],
  providers: [ConversationsService, TimerService],
})
export class ConversationGroupComponent implements OnInit {
  step!: Step;
  group!: ConversationGroup[];
  conversation_id!: number;
  isreset!: boolean;
  iscontinue!: boolean;
  isspeedrun!: boolean;
  notallowed!: boolean;
  current_id!: number;
  islast!: boolean;
  nextstep!: number;

  // tslint:disable-next-line:max-line-length
  constructor(
    private conversationservice: ConversationsService,
    private timer: TimerService,
    private passdata: PassDataService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private notificationService: NavbarNotificationsService,
  ) {}

  ngOnInit() {
    this.loadConversationGroup();
  }

  loadConversationGroup() {
    this.activeroute.params
      .pipe(
        map(v => v.id),
        switchMap(id => this.conversationservice.getConversationGroup(id)),
      )
      .subscribe(
        (res: any) => {
          const step = res.data;
          console.log(step.status);
          if ([COMPLETED, ACTIVE, UNLOCKED].includes(step.status)) {
            this.step = step;
            this.current_id = res.data.id;
            this.islast = res.is_last_step;
            this.nextstep = res.next_step_id;
            this.passdata.setid(this.current_id, this.islast, this.nextstep);
            this.group = this.step.step_data.data.conversations;
            const formName = step.action[0];
            this.passdata.setFormName(formName);
          } else {
            this.notallowed = true;
          }
        },
        error => console.log(error),
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
    console.log('event emitted');
    this.notificationService.showFullConvIcon.emit();
    this.router.navigate(['/resources/conversations']);
  }

  speed_run(i: number) {
    this.conversation_id = this.group[i].id;
    this.passdata.setOption(this.conversation_id, false, false, true);
  }
}
