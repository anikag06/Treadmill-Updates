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
import { FlowService } from '@/main/flow/flow.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-conversation-group',
  templateUrl: './conversation-group.component.html',
  styleUrls: ['./conversation-group.component.scss'],
  providers: [ConversationsService, TimerService],
})
export class ConversationGroupComponent implements OnInit {
  step!: Step;
  conversationGroups!: ConversationGroup[];
  conversation_id!: number;
  isreset!: boolean;
  iscontinue!: boolean;
  isspeedrun!: boolean;
  notallowed!: boolean;
  current_id!: number;
  islast!: boolean;
  nextstep!: number;
  navbarTitle!: string;
  stepGroupSequence!: number;
  stepSequence!: number;
  stepName!: string;
  description_model!: {
    message: string[];
    image: string[];
  };

  // tslint:disable-next-line:max-line-length
  constructor(
    private conversationservice: ConversationsService,
    private timer: TimerService,
    private passdata: PassDataService,
    private router: Router,
    private activeroute: ActivatedRoute,
    private notificationService: NavbarNotificationsService,
    private flowService: FlowService,
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
          console.log('RESPONSE', res.data, step.status);
          // for navbar title
          this.stepGroupSequence = step.step_group_sequence + 1;
          this.stepSequence = step.sequence + 1;
          this.stepName = step.name;
          this.navbarTitle =
            this.stepGroupSequence.toString() +
            '.' +
            this.stepSequence.toString() +
            ' ' +
            this.stepName;
          console.log('STEP DETAIL:', this.navbarTitle);
          this.flowService.stepDetail.emit(this.navbarTitle);
          if ([COMPLETED, ACTIVE, UNLOCKED].includes(step.status)) {
            this.step = step;
            this.current_id = res.data.id;
            console.log('CONV GROUP ID', this.current_id);
            this.islast = res.is_last_step;
            this.nextstep = res.next_step_id;
            this.passdata.setid(this.current_id, this.islast, this.nextstep);
            this.conversationGroups = this.step.step_data.data.conversations;
            // this.description_model.message = [];
            // this.description_model.image = [];
            // for(let o = 0; o < this.group.length; o++){
            //   this.conversationservice.get(environment.API_ENDPOINT +
            //     '/api/v1/conversation/conversation/?conversation_id='+ this.group[o].id)
            //     .subscribe((res: any) => {
            //       this.description_model.message.push(this.group[o].description);
            //       this.description_model.image.push('https://www.api2.treadwill.org/media/conversations/avataaars.png');
            //     })
            // }
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
    this.conversation_id = this.conversationGroups[i].id;
    this.passdata.setOption(this.conversation_id, true, false, false);
    this.notificationService.showFullConvIcon.emit();
    this.router.navigate([
      '/main/resources/conversations/' + this.conversation_id,
    ]);
  }

  current_history(i: number) {
    //currentId = this.current_id;
    this.conversation_id = this.conversationGroups[i].id;
    this.passdata.setOption(this.conversation_id, false, true, false);
    console.log('event emitted');
    this.notificationService.showFullConvIcon.emit();
    this.router.navigate([
      'main/resources/conversations/' + this.conversation_id,
    ]);
    // this.router.navigate([this.nextLink()]);
  }
  // TO DO : for adding step id in url
  // nextLink() {
  //   return `resources/conversations/${this.current_id}/`;
  // }
  speed_run(i: number) {
    this.conversation_id = this.conversationGroups[i].id;
    this.passdata.setOption(this.conversation_id, false, false, true);
  }
}
