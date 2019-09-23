import { Component, OnInit, OnDestroy, ViewChild, DoCheck, ComponentFactoryResolver, ElementRef } from '@angular/core';
import {ConversationsService} from '../conversations.service';
import {Conversation} from './input/conversation.model';
import {Dialog} from './input/dialogs.model';
import {DialogOptions} from './input/dialog_options.model';
import {Texting} from './input/text.model';
import {DialogInHistory} from './history/dialog.model';
import {CurrentHistory} from './history/history.model';
import {Response} from './response/response.model';
import { TimerService } from '@/shared/timer.service';
import {PassDataService} from '../passdata.service';
import { FormDirective } from '../../slides/form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '@/main/resources/forms/task-forms/task-forms.component';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router} from '@angular/router';
import { trigger, transition, style, animate, state } from '@angular/animations';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import {ConversationFeedback, ConversationFeedbackText} from './response/conversation.feedback.model';



@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  providers: [ConversationsService, TimerService],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ display: 'none'})),
      state('show', style({ display: 'block'})),
      transition('hidden => show', [
        style({transform: 'translateX(-100%)'}),
        animate('200ms ease-out', style({transform: 'translateX(0%)'}))
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({transform: 'translateX(-100%)'}))
      ])
    ]),
    trigger('formInOut', [
      state('hidden', style({ display: 'none'})),
      state('show', style({ display: 'block'})),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({transform: 'translateX(0%)'}))
      ]),
      transition('show => hidden', [
        animate('200ms ease-in', style({transform: 'translateX(100%)'}))
      ])
    ]),
    trigger('sendMsg', [
      state('unsend', style({ maxWidth: '85%',
        borderRadius: '20px 20px 0px 20px' ,
        backgroundColor : '#FFEFD4',
        paddingTop: '15px',
        paddingLeft: '10px',
        paddingRight: '10px',
        position: 'relative',
        textAlign: 'center',
        fontSize: '18px'
      })),
      state('send', style({ maxWidth: '75%',
        borderRadius: '25px 25px 0px 25px' ,
        backgroundColor : '#FFEF12',
        paddingTop: '15px',
        paddingLeft: '10px',
        paddingRight: '10px',
        position: 'relative',
        textAlign: 'center',
        fontSize: '14px'
      })),
      transition('unsend => send', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-in', style({transform: 'translateX(0%)'}))
      ]),
    ])
  ]
})

// tslint:disable-next-line:component-class-suffix

export class ConversationsComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild(FormDirective, {static: false}) formHost!: FormDirective;
  invisible!: boolean;
  scrollTop = 0;
  isConversation = true;
  isvisible!: boolean;
  feedbackData: ConversationFeedback = new ConversationFeedback(0, 0, 1);
  feedbackText: ConversationFeedbackText = new ConversationFeedbackText('');

  constructor( private conversationsService: ConversationsService, private timerservice: TimerService,
    private passdata: PassDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private sanitizer: DomSanitizer,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private commonDialogService: CommonDialogsService,
    private flowStepService: FlowStepNavigationService,
    ) {
  }
  currenthistory!: CurrentHistory;
  dialog_history!: DialogInHistory;
  conversation_id!: number;
  conversation!: Conversation;
  dialog!: any;
  title!: string;
  gender!: string;
  final_conclusion_message!: string;
  i!: any;
  index!: number;
  current_message!: string;
  length_conversation!: number;
  show!: Texting[];
  text!: Texting;
  visible!: boolean;
  no_of_options!: any;
  options!: any [];
  loopback_id!: number;
  loopback!: boolean;
  progress!: number;
  id!: number;
  last_id!: number;
  wrong!: boolean;
  wrong_message!: string;
  finished!: boolean;
  response!: Response;
  history_id!: number;
  speedrun!: boolean;
  time!: any;
  unload!: any;
  onunload = false;


  sanitizedUrl!: SafeUrl;
  status!: string;
  notAvailable = false;

  isFormVisible = false;
  isSlidesVisible = true;

  showNextStepBtn = false;

  isDislikeBox = false;
  isLikeBox = false;
  slideLiked = false;
  slideDisliked = false;
  likeDislikeRemoved = false;

  initial_feedback!: number;
  final_feedback!: number;
  feedbackDataId!: number;
  unsend = true;


  time_spent: any;
  current_step_id!: number;
  isLastStep = false;
  next_step_id!: number;
  @ViewChild('form_div', {static: false}) formDiv!: ElementRef;
  @ViewChild('slideDiv', {static: false}) slideDiv!: ElementRef;
  @ViewChild('slidePage', {static: false}) slidePage!: ElementRef;



  b = new Map<number, Dialog>();

  ngOnInit() {
    this.conversation_id = this.passdata.getid();
    this.run();
    this.timerservice.visibility();
    this.timerservice.unload();
    this.timerservice.internet_check();
  }

  run() {
    const start = this.passdata.iswhat();
    if (start[0] === true) {
      this.reset();
    } else if (start[1] === true) {
      this.current_history();
    } else if (start[2] === true) {
      this.speed_run();
    }
  }


  ngDoCheck() {
    this.unload = this.timerservice.get_onunload();
    if (this.unload === 1 && this.onunload === false) {
      this.time = this.time + this.timerservice.removeVisibility();
      this.conversationsService.completed(this.time, this.history_id, false, false);
      this.onunload = true;
      }
  }

  ngOnDestroy() {
    this.time = this.time + this.timerservice.removeVisibility();
    this.conversationsService.completed(this.time, this.history_id, false, false);
  }

  loadConversation(current_id: boolean) {
    this.conversationsService.get('http://172.26.90.49:8000/api/v1/conversation/conversation/?conversation_id=' + this.conversation_id)
      .subscribe((res: any) => {
        this.conversation = new Conversation(res.title, res.final_conclusion_message, res.gender, res.dialog_options);
        this.title = this.conversation.title;
        this.gender = this.conversation.gender;
        this.final_conclusion_message = this.conversation.final_conclusion_message;
        this.length_conversation = this.conversation.dialogs.length;
        this.wrong = false;
        this.index = 1;
        this.speedrun = false;
        this.progress_bar();        // this.no_of_options = this.conversation.dialogs[this.index].dialog_has_options.length;
        this.text = new Texting;

        for (let j = 0; j < this.conversation.dialogs.length; j++) {
          this.b.set(this.conversation.dialogs[j].id, this.conversation.dialogs[j]);
        }
        if (current_id === true) {
          this.id = this.conversation.dialogs[0].id;
        } else {
          {
            // tslint:disable-next-line:no-shadowed-variable
            const _id = this.currenthistory.user_response.length - 1;
            let current = this.currenthistory.user_response[_id].option_in_history.id;
            let found = false;
            for (let j = 0; j < this.conversation.dialogs.length; j++) {
              const length_of_options = this.conversation.dialogs[j].dialog_has_options.length;
              for (let x = 0; x < length_of_options; x++) {
                if (current === this.conversation.dialogs[j].dialog_has_options[x].option.id) {
                  current = this.conversation.dialogs[j].dialog_has_options[x].upcoming_dialog;
                  found = true;
                  break;
                }
              }
              if (found === true) {
                break;
              }
            }
            this.id = current;
          }
        }
        this.dialog = this.b.get(this.id);
        this.text.message = this.dialog.message;
        this.current_message = this.dialog.message;
        if (!this.speedrun) {
          this.dialog_options();
        }
      });
  }

  current_history() {
    this.conversationsService.get('http://172.26.90.49:8000/api/v1/conversation/history/current/?conversation_id=' + this.conversation_id)
      .subscribe((res: any) => {
        this.conversationsService.getFeedBackInfo(this.conversation_id)
              .subscribe( (feedback_data: { exists: any; feedback: number; }) => {
                if (feedback_data.exists) {
                  this.initial_feedback = feedback_data.feedback;
                  if (this.initial_feedback === 1) {
                    this.slideLiked = true;
                  } else if (this.initial_feedback === -1) {
                    this.slideDisliked = true;
                  }
                } else {
                  this.slideDisliked = false;
                  this.slideLiked = false;
                  this.initial_feedback = 0;        // if it the first response
                }
              }
            );
            if (window.matchMedia('(max-width: 770px)').matches) {
              this.isvisible = true;
            } else {
              setTimeout(() => this.slideDiv.nativeElement.classList.add('col-5'), 1000);
            }
        // const formName = this.passdata.getFormName();
        const formName = 'task';
        console.log(this.passdata.getFormName());
        if (formName === 'task') {
          setTimeout(() => this.loadForm(TaskFormsComponent), 1000);
        } else if (formName === 'problem-solving') {
          setTimeout(() => this.loadForm(ProblemSolvingWorksheetsComponent), 1000);
        }
        // tslint:disable-next-line:max-line-length
        this.currenthistory = new CurrentHistory(res.data.id, res.data.conversation_id, res.data.is_completed, res.data.created_at, res.data.completion_datetime, res.data.time_taken_to_complete_in_seconds, res.data.user_response );
        this.history_id = this.currenthistory.id;
        this.show =  [] ;
        if (this.currenthistory.user_response.length === 0 && this.currenthistory.is_completed === false) {
          this.loadConversation(true);
        } else {
          if (this.currenthistory.time_taken_to_complete_in_seconds !== null) {
            this.time = this.currenthistory.time_taken_to_complete_in_seconds;
          console.log(this.time);
          }
          const length = this.currenthistory.user_response.length;
          for ( let y = 0; y < length; y++ ) {
            this.text = new Texting;
            this.text.message = this.currenthistory.user_response[y].dialog_in_history.message;
            this.text.dialog = this.currenthistory.user_response[y].option_in_history.message;
            this.show.push(this.text);
          }
          this.loadConversation(false);
        }
      });
  }

  reset() {
    this.time = 0;
    this.conversationsService.create_history(this.conversation_id);
    this.current_history();
  }


  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component);
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    viewContainerRef.createComponent(componentFactory);
    if (window.matchMedia('(max-width: 770px)').matches) {
      this.isFormVisible = false;
    } else {
      this.isFormVisible = true;
      this.formDiv.nativeElement.classList.add('col-4');
    }
  }


  dialog_options() {
    this.no_of_options = this.dialog.dialog_has_options.length;
    this.options = [];
    if (this.no_of_options > 0) {
      this.dialog.dialog_has_options.forEach((q: any) => {
        this.options.push(q.option.message);
    });
    }
  }

  on_click(i: number) {

    this.text.dialog = this.dialog.dialog_has_options[i].option.message;
    console.log(this.text);
    this.show.push(this.text);
    if (this.dialog.dialog_has_options[i].loopback) {
      this.loopback = true;
      this.wrong_message = this.dialog.dialog_has_options[i].wrong_option_message.message;
      this.wrong_option_selected();
    }
    this.post(i);
    this.last_id = this.id;
    this.id = this.dialog.dialog_has_options[i].upcoming_dialog;
    this.dialog = this.b.get(this.id);
    if (!this.loopback) {
      this.index = this.index + 1;
    }
    this.progress_bar();
    // tslint:disable-next-line:max-line-length
    if (this.loopback === true) {
      this.loopback = false;
      this.wrong = true;
    } else {
      this.wrong = false;
    }
    this.current_message = this.dialog.message;
    // console.log(this.loopback);
    // console.log(this.index);
    this.text = new Texting;
    this.text.message = this.dialog.message;
    this.dialog_options();
    if (this.dialog.is_last === true) {
      this.finished = true;
      this.time = this.timerservice.removeVisibility() + this.time;
      this.conversationsService.completed(this.time, this.history_id, false, this.finished);
    }
    this.scrollPageToBottom();
  }

  wrong_option_selected () {
    this.loopback_id = this.id;
  }

  progress_bar() {
    this.progress = (this.index / this.length_conversation) * 100;
  }

  let_me_try() {
    this.wrong = false;
  }

  post(i: number) {
    this.response = new Response;
    this.response.dialog_id = this.id;
    this.response.history_id = this.history_id;
    this.response.option_id = this.dialog.dialog_has_options[i].option.id;

    this.conversationsService.post_response(this.response);
  }

  speed_run() {
    this.speedrun = true;
    this.dialog = this.b.get(this.id);
    // console.log(this.dialog);
    this.text = new Texting;
    this.text.message = this.dialog.message;
    // console.log(this.dialog.dialog_has_options.length);
    for ( let y = 0; y < this.dialog.dialog_has_options.length; y++) {
      if (this.dialog.dialog_has_options[y].loopback === false) {
        this.text.dialog = this.dialog.dialog_has_options[y].option.message;
        break;
      }
    }
    this.show.push(this.text);

    while ( this.dialog.is_last === false ) {
      for ( let y = 0; y < this.dialog.dialog_has_options.length; y++) {
        if (this.dialog.dialog_has_options[y].loopback === false) {
          this.dialog = this.b.get(this.dialog.dialog_has_options[y].upcoming_dialog);
          break;
        }
      }
      this.text = new Texting;
      this.text.message = this.dialog.message;
      if (this.dialog.is_last === true) {
        this.current_message = this.dialog.message;
        break;
      }
      for ( let y = 0; y < this.dialog.dialog_has_options.length; y++) {
        if (this.dialog.dialog_has_options[y].loopback === false) {
          this.text.dialog = this.dialog.dialog_has_options[y].option.message;
          break;
        }
      }
      this.show.push(this.text);
    }
    if (this.dialog.is_last === true) {
      this.finished = true;
      this.time = this.timerservice.removeVisibility() + this.time;
      this.conversationsService.completed(this.time, this.history_id, true, this.finished);
    }
    console.log(this.show);
}


scrollPageToBottom() {
  this.scrollTop = this.slideDiv.nativeElement.scrollHeight;
}



onDislikeBtnClick() {
  if (this.slideDisliked === true) {
    this.final_feedback = 0;      // changing from dislike to no like/dislike state
    this.likeDislikeRemoved = true;
    this.isDislikeBox = false;
  } else if (this.slideLiked === true) {
    this.final_feedback = -1;         // changing from like to dislike state
    this.likeDislikeRemoved = true;
    this.isDislikeBox = false;
  } else {
    this.final_feedback = -1;      // changing from no like/dislike state to dislike
    this.likeDislikeRemoved = false;
    this.isDislikeBox = true;
  }
  this.slideDisliked = !this.slideDisliked;
  this.slideLiked = false;
  this.isLikeBox = false;
  this.storeFeedBackData();
}
onLikeBtnClick() {
  if (this.slideLiked === true) {
    this.final_feedback = 0;      // changing from like to no like/dislike state
    this.likeDislikeRemoved = true;
    this.isLikeBox = false;
  } else if (this.slideDisliked === true) {
    this.final_feedback = 1;      // changing from dislike to no like state
    this.likeDislikeRemoved = true;
    this.isLikeBox = false;
  } else {
    this.isLikeBox = true;
    this.final_feedback = 1;      // changing from no like/dislike state to like
    this.likeDislikeRemoved = false;
  }
  this.slideLiked = !this.slideLiked;
  this.slideDisliked = false;
  this.isDislikeBox = false;
  this.storeFeedBackData();
}

storeFeedBackData() {
  this.feedbackData.initial_feedback_state = this.initial_feedback;
  this.feedbackData.final_feedback_state = this.final_feedback;
  this.feedbackData.conversation_id = this.conversation_id;

  this.conversationsService.storeFeedBackInfo(this.feedbackData)
    .subscribe( (data) => {
      this.feedbackDataId = data.data.id;
      this.initial_feedback = this.final_feedback;
    } );
}




onNextStepClick() {
  this.commonDialogService.getNextStepData(this.next_step_id)
    .subscribe((next_step) => {
      console.log(next_step);
      const next_step_url = this.flowStepService.goToFlowNextStep(next_step.data);
      console.log(next_step_url);
      this.router.navigate([next_step_url]);
    });
}
onDashboard() {
  this.router.navigate(['/']);
}
onShowForm() {
  this.isvisible = !this.isvisible;
  this.isFormVisible = true;
  this.isConversation = false;
}

onShowSlides() {
  this.isvisible = !this.isvisible;
  this.isConversation = true;
  this.isFormVisible = false;
}
onSubmitComment(feedback_text: string) {
  this.feedbackText.feedback_text = feedback_text;
  this.conversationsService.updateFeedBackInfo(this.feedbackText, this.feedbackDataId)
    .subscribe((data) => {});
  this.isDislikeBox = false;
  this.isLikeBox = false;
  this.likeDislikeRemoved = false;
  this.scrollTop = 0;
}

onCompleted() {
  this.commonDialogService.openCongratsDialog(this.next_step_id, this.isLastStep);
}


}
