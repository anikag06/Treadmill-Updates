import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  DoCheck,
  ComponentFactoryResolver,
  ElementRef,
  ChangeDetectorRef,
} from '@angular/core';
import { ConversationsService } from '../conversations.service';
import { Conversation } from './input/conversation.model';
import { Dialog } from './input/dialogs.model';
import { OptionsModel } from './input/options.model';
import { Texting } from './input/text.model';
import { CurrentMessageModel } from './input/CurrentMessage.model';
import { DialogInHistory } from './history/dialog.model';
import { CurrentHistory } from './history/history.model';
import { Response } from './response/response.model';
import { TimerService } from '@/shared/timer.service';
import { PassDataService } from '../passdata.service';
import { FormDirective } from '../../slides/form.directive';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { TaskFormsComponent } from '@/main/resources/forms/task-forms/task-forms.component';
import { ThoughtRecordFormComponent } from '@/main/resources/forms/thought-record-form/thought-record-form.component';
import { ChatImageComponent } from '@/main/chatbot/chat-window/chat-image/chat-image.component';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, NavigationStart } from '@angular/router';
import {
  trigger,
  transition,
  style,
  animate,
  state,
} from '@angular/animations';
import { CommonDialogsService } from '../../shared/common-dialogs.service';
import { FlowStepNavigationService } from '@/main/shared/flow-step-navigation.service';
import {
  ConversationFeedback,
  ConversationFeedbackText,
} from './response/conversation.feedback.model';
import { StepCompleteData } from '../../shared/completion-data.model';
import { StepsDataService } from '../../shared/steps-data.service';
import { environment } from 'environments/environment';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import {
  CONVERSATION_COMPLETE_SCORE,
  PROBLEM_SOLVING,
  SLIDE_COMPLETE_SCORE,
  TASK,
  THOUGHT_RECORD,
} from '@/app.constants';
import { Subscription } from 'rxjs';
import { UserFeedbackComponent } from '@/main/resources/shared/user-feedback/user-feedback.component';
import { map, switchMap } from 'rxjs/operators';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { FlowService } from '@/main/flow/flow.service';
import { CommonService } from '@/shared/common.service';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-conversations',
  templateUrl: './conversations.component.html',
  styleUrls: ['./conversations.component.scss'],
  providers: [ConversationsService, TimerService],
  animations: [
    trigger('slideInOut', [
      state('hidden', style({ display: 'none' })),
      state('completedConversation', style({ display: 'block' })),
      transition('hidden => completedConversation', [
        style({ transform: 'translateX(-100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('completedConversation => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(-100%)' })),
      ]),
    ]),
    trigger('formInOut', [
      state('hidden', style({ display: 'none' })),
      state('completedConversation', style({ display: 'block' })),
      transition('hidden => completedConversation', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('completedConversation => hidden', [
        animate('200ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    trigger('sendMsg', [
      state(
        'unsend',
        style({
          // maxWidth: '85%',
          // borderRadius: '20px 20px 0px 20px',
          backgroundColor: '#FFEFD4',
          // paddingTop: '15px',
          // paddingLeft: '10px',
          // paddingRight: '10px',
          position: 'relative',
          textAlign: 'center',
          fontSize: '18px',
        }),
      ),
      state(
        'send',
        style({
          // maxWidth: '75%',
          // borderRadius: '25px 25px 0px 25px',
          backgroundColor: '#FFEF12',
          // paddingTop: '15px',
          // paddingLeft: '10px',
          // paddingRight: '10px',
          position: 'relative',
          textAlign: 'center',
          fontSize: '14px',
        }),
      ),
      transition('unsend => send', [
        style({ transform: 'translateX(50%)' }),
        animate('200ms ease-in', style({ transform: 'translateX(0%)' })),
      ]),
    ]),
    trigger('fadeInOut', [
      state(
        'void',
        style({
          opacity: 0,
        }),
      ),
      transition('void <=> *', animate(1000)),
    ]),
  ],
})

// tslint:disable-next-line:component-class-suffix
export class ConversationsComponent implements OnInit, OnDestroy, DoCheck {
  @ViewChild(FormDirective, { static: false }) formHost!: FormDirective;
  @ViewChild(UserFeedbackComponent, { static: false })
  user!: User;
  userFeedback!: UserFeedbackComponent;
  invisible!: boolean;
  scrollTop = 0;
  isConversation = true;
  isvisible!: boolean;
  feedbackData: ConversationFeedback = new ConversationFeedback(0, 0, 1);
  feedbackText: ConversationFeedbackText = new ConversationFeedbackText('');
  completionData: StepCompleteData = new StepCompleteData(0, 0);

  next_step_id!: number;
  private browserRefresh = false;
  private subscription!: Subscription;

  constructor(
    private conversationsService: ConversationsService,
    private timerservice: TimerService,
    private passdata: PassDataService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private router: Router,
    private commonDialogService: CommonDialogsService,
    private flowStepService: FlowStepNavigationService,
    private stepDataService: StepsDataService,
    private notificationService: NavbarNotificationsService,
    private activeroute: ActivatedRoute,
    private goToService: NavbarGoToService,
    private flowService: FlowService,
    private elementRef: ElementRef,
    private changRef: ChangeDetectorRef,
    private commonService: CommonService,
    private authService: AuthService,
  ) {
    this.activeroute.params.pipe(map(v => v.id)).subscribe(params => {
      this.conversation_id = params;
      this.passdata.IsConversationOn(true);
      this.run();
    });
  }

  // avatar_image!: any[];
  send_image!: any;
  show_avatar_image =
    'https://www.api2.treadwill.org/media/conversations/avataaars.png';
  newLine_message!: any;
  newLine_dialog!: any;
  mupltiple_line!: any;
  show_multiple!: any;
  count_multiple!: any;
  newOptions_model!: OptionsModel;
  item_message!: any;
  item_dialog!: any;
  message_show!: any;
  Image!: any;
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
  current_dialog!: CurrentMessageModel[];
  length_conversation!: number;
  completedConversation!: Texting[];
  text!: Texting;
  visible!: boolean;
  no_of_options!: any;
  options!: any[];
  loopback_id!: number;
  loopback!: boolean;
  progress!: number;
  id!: number;
  last_id!: number;
  wrong!: boolean;
  wrongImageObject!: any;
  wrong_message!: string;
  finished!: boolean;
  response!: Response;
  history_id!: number;
  speedrun!: boolean;
  time!: any;
  unload!: any;
  onunload = false;
  ShowTyping!: boolean;
  showTypingTime!: any;

  sanitizedUrl!: SafeUrl;
  status!: string;
  notAvailable = false;

  isFormVisible = false;
  isSlidesVisible = true;

  showNextStepBtn = false;
  showloading = false;

  isDislikeBox = false;
  isLikeBox = false;
  convLiked = false;
  convDisliked = false;
  likeDislikeRemoved = false;

  initial_feedback!: number;
  final_feedback!: number;
  feedbackDataId!: number;
  nsend = true;
  current_id!: number;
  mupltiple_line_images = [];
  therapist_img = '/assets/flow/therapist.svg';
  show_full_conversation = false;
  img_separator = '<image>';
  dialog_images = [];
  progressBar = 0;
  last_option_id!: number;

  @ViewChild('form_div', { static: false }) formDiv!: ElementRef;
  @ViewChild('convDiv', { static: false }) convDiv!: ElementRef;

  dialogMap = new Map<number, Dialog>();
  type = 'image';

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    // this.conversation_id = this.passdata.getid();
    //
    // console.log('CONV ID', this.current_id, this.conversation_id);
    // this.passdata.IsConversationOn(true);
    // this.run();
    this.send_image = '../../../../assets/conversations/Send.png';
    this.timerservice.visibility();
    this.timerservice.unload();
    this.timerservice.internet_check();
    this.notificationService.showFullConvIcon.emit();
    this.notificationService.showFullConv.subscribe(() => {
      this.speed_run();
    });
  }

  run() {
    const start = this.passdata.iswhat();
    if (start[0]) {
      this.finished = false;
      this.reset();
    } else if (start[1]) {
      this.current_history();
    } else if (start[2]) {
      this.speed_run();
    }
  }

  ngDoCheck() {
    this.unload = this.timerservice.get_onunload();
    if (this.unload === 1 && !this.onunload) {
      this.time = this.time + this.timerservice.removeVisibility();
      this.conversationsService.completed(
        this.time,
        this.history_id,
        this.conversation_id,
        false,
        false,
      );
      this.onunload = true;
    }
  }

  ngOnDestroy() {
    this.time = this.time + this.timerservice.removeVisibility();
    this.conversationsService.completed(
      this.time,
      this.history_id,
      this.conversation_id,
      false,
      false,
    );
    this.passdata.IsConversationOn(false);
    this.notificationService.removeFullConvIcon.emit();
  }

  loadConversation(current_id: boolean) {
    this.conversationsService
      .get(
        environment.API_ENDPOINT +
          '/api/v1/conversation/conversation/?conversation_id=' +
          this.conversation_id,
      )
      .subscribe((res: any) => {
        this.conversation = new Conversation(
          res.title,
          res.final_conclusion_message,
          res.gender,
          res.dialog_options,
        );
        this.title = this.conversation.title;
        this.flowService.stepDetail.emit(this.title);
        this.gender = this.conversation.gender;
        this.final_conclusion_message = this.conversation.final_conclusion_message;
        this.length_conversation = this.conversation.dialogs.length;
        this.wrong = false;
        this.index = 1;
        this.speedrun = false;
        this.progress_bar(); // this.no_of_options = this.conversation.dialogs[this.index].dialog_has_options.length;
        this.text = new Texting([], [], '', false);

        for (let j = 0; j < this.conversation.dialogs.length; j++) {
          this.dialogMap.set(
            this.conversation.dialogs[j].id,
            this.conversation.dialogs[j],
          );
        }
        if (current_id) {
          this.id = this.conversation.dialogs[0].id;
        } else {
          // For finding the id of current option if continuing the conversation
          // tslint:disable-next-line:no-shadowed-variable
          const _id = this.currenthistory.user_response.length - 1;
          let current = this.currenthistory.user_response[_id].option_in_history
            .id;
          let found = false;
          for (let j = 0; j < this.conversation.dialogs.length; j++) {
            const length_of_options = this.conversation.dialogs[j]
              .dialog_has_options.length;
            for (let x = 0; x < length_of_options; x++) {
              if (
                current ===
                this.conversation.dialogs[j].dialog_has_options[x].option.id
              ) {
                current = this.conversation.dialogs[j].dialog_has_options[x]
                  .upcoming_dialog;
                found = true;
                break;
              }
            }
            if (found) {
              break;
            }
          }
          this.id = current;
        }
        this.dialog = this.dialogMap.get(this.id);
        if (this.dialog.is_last) {
          this.finished = true;
          this.progress = 100;
        }
        this.newLine_message = this.dialog.message.split('<new_line>');
        const dialog_images = this.dialog.dialog_images;
        this.current_dialog = [];
        if (this.newLine_message.length !== 1) {
          this.newLine_message.forEach((q: any) => {
            if (q !== this.img_separator) {
              this.text.dialog.push({
                message: q,
                dialog_images: [],
              });
              this.current_dialog.push({
                message: q,
                showTyping: false,
                dialog_images: [],
              });
            } else {
              this.text.dialog.push({
                message: '',
                dialog_images: dialog_images,
              });
              this.current_dialog.push({
                message: '',
                showTyping: false,
                dialog_images: dialog_images,
              });
            }
          });
        } else {
          if (this.dialog.message !== this.img_separator) {
            this.text.dialog.push({
              message: this.dialog.message,
              dialog_images: [],
            });
            this.current_dialog.push({
              message: this.dialog.message,
              showTyping: false,
              dialog_images: [],
            });
          } else {
            this.text.dialog.push({
              message: '',
              dialog_images: this.dialog.dialog_images,
            });
            this.current_dialog.push({
              message: '',
              showTyping: false,
              dialog_images: this.dialog.dialog_images,
            });
          }
        }
        for (let t = 0; t < this.dialog.dialog_images.length; t++) {
          if (
            this.dialog.dialog_images[t].type === 'AVATAR' &&
            this.dialog.dialog_images.length !== 0
          ) {
            this.text.show_avatar_image = this.dialog.dialog_images[t].image;
            break;
          } else {
            this.text.show_avatar_image = this.show_avatar_image;
          }
        }
        if (this.dialog.dialog_images.length === 0) {
          this.text.show_avatar_image = this.show_avatar_image;
        }

        if (!this.speedrun) {
          this.dialog_options();
        }
        const formName = THOUGHT_RECORD;
        if (this.passdata.getFormName() === TASK) {
          setTimeout(() => this.loadForm(TaskFormsComponent), 1000);
        } else if (this.passdata.getFormName() === PROBLEM_SOLVING) {
          setTimeout(
            () => this.loadForm(ProblemSolvingWorksheetsComponent),
            1000,
          );
        } else if (formName === THOUGHT_RECORD) {
          // TODO: Always true no need to add the condition
          setTimeout(() => this.loadForm(ThoughtRecordFormComponent), 1000);
        }
      });
  }

  current_history() {
    this.conversationsService
      .get(
        environment.API_ENDPOINT +
          '/api/v1/conversation/history/?conversation_id=' +
          this.conversation_id,
      )
      .subscribe((res: any) => {
        this.conversationsService
          .getFeedBackInfo(this.conversation_id)
          .subscribe(feedback_data => {
            if (feedback_data.exists) {
              this.initial_feedback = feedback_data.feedback;
              if (this.initial_feedback === 1) {
                this.convLiked = true;
              } else if (this.initial_feedback === -1) {
                this.convDisliked = true;
              }
            } else {
              this.convDisliked = false;
              this.convLiked = false;
              this.initial_feedback = 0; // if it the first response
            }
          });
        if (window.matchMedia('(max-width: 767px)').matches) {
          this.isvisible = true;
        }
        // tslint:disable-next-line:max-line-length
        this.currenthistory = new CurrentHistory(
          res.results[0].id,
          res.results[0].conversation_id,
          res.results[0].is_completed,
          res.results[0].created_at,
          res.results[0].completion_datetime,
          res.results[0].time_taken_to_complete_in_seconds,
          res.results[0].user_response,
        );
        this.history_id = this.currenthistory.id;
        this.completedConversation = [];
        if (this.currenthistory.is_completed) {
          this.loadConversation(true);
        } else if (
          this.currenthistory.user_response.length === 0 &&
          !this.currenthistory.is_completed
        ) {
          this.finished = false;
          this.loadConversation(true);
        } else {
          if (this.currenthistory.time_taken_to_complete_in_seconds !== null) {
            this.time = this.currenthistory.time_taken_to_complete_in_seconds;
          }
          const length = this.currenthistory.user_response.length;
          for (let y = 0; y < length; y++) {
            this.text = new Texting([], [], '', false);
            for (
              let t = 0;
              t <
              this.currenthistory.user_response[y].dialog_in_history
                .dialog_images.length;
              t++
            ) {
              if (
                this.currenthistory.user_response[y].dialog_in_history
                  .dialog_images[t].type === 'AVATAR' &&
                this.currenthistory.user_response[y].dialog_in_history
                  .dialog_images.length !== 0
              ) {
                this.text.show_avatar_image = this.currenthistory.user_response[
                  y
                ].dialog_in_history.dialog_images[t].image;
                break;
              } else {
                this.text.show_avatar_image = this.show_avatar_image;
              }
            }
            if (
              this.currenthistory.user_response[y].dialog_in_history
                .dialog_images.length === 0
            ) {
              this.text.show_avatar_image = this.show_avatar_image;
            }

            this.newLine_message = this.currenthistory.user_response[
              y
            ].dialog_in_history.message.split('<new_line>');
            // @ts-ignore
            this.dialog_images = this.currenthistory.user_response[
              y
            ].dialog_in_history.dialog_images;

            if (this.newLine_message.length > 1) {
              this.newLine_message.forEach((q: any, index: number) => {
                // if (q !== '') {
                if (q !== this.img_separator) {
                  this.text.dialog.push({
                    message: q,
                    dialog_images: [],
                  });
                } else {
                  this.text.dialog.push({
                    message: '',
                    dialog_images: this.dialog_images,
                  });
                }
              });
            } else {
              if (
                this.currenthistory.user_response[y].dialog_in_history
                  .message !== this.img_separator
              ) {
                this.text.dialog.push({
                  message: this.currenthistory.user_response[y]
                    .dialog_in_history.message,
                  dialog_images: [],
                });
              } else {
                this.text.dialog.push({
                  message: '',
                  dialog_images: this.currenthistory.user_response[y]
                    .dialog_in_history.dialog_images,
                });
              }
            }

            this.newLine_dialog = this.currenthistory.user_response[
              y
            ].option_in_history.message.split('<new_line>');

            if (this.newLine_dialog.length > 1) {
              this.newLine_dialog.forEach((q: any, index: number) => {
                // @ts-ignore
                if (q !== this.img_separator) {
                  this.text.option.push({
                    message: q,
                    option_images: [],
                  });
                } else {
                  this.text.option.push({
                    message: '',
                    option_images: this.currenthistory.user_response[y]
                      .option_in_history.option_images,
                  });
                }
              });
            } else {
              if (
                this.currenthistory.user_response[y].option_in_history
                  .message !== this.img_separator
              ) {
                this.text.option.push({
                  message: this.currenthistory.user_response[y]
                    .option_in_history.message,
                  option_images: [],
                });
              } else {
                this.text.option.push({
                  message: '',
                  option_images: this.currenthistory.user_response[y]
                    .option_in_history.option_images,
                });
              }
            }

            this.completedConversation.push(this.text);
            this.item_message = this.completedConversation;
          }
          this.loadConversation(false);
          this.progressBar = this.completedConversation.length;
        }
      });
  }

  reset() {
    this.time = 0;
    this.conversationsService.create_history(this.conversation_id);
    setTimeout(() => {
      this.current_history();
    }, 2000);
  }

  loadForm(component: any) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
      component,
    );
    const viewContainerRef = this.formHost.viewContainerRef;
    viewContainerRef.clear();
    const componentRef = viewContainerRef.createComponent(componentFactory);
    // @ts-ignore
    componentRef.instance.fromConv = true;
    if (window.matchMedia('(max-width: 767px)').matches) {
      this.isFormVisible = false;
    } else {
      this.isFormVisible = true;
      this.formDiv.nativeElement.classList.add('col-4');
    }
  }

  dialog_options() {
    this.no_of_options = this.dialog.dialog_has_options.length;
    this.options = [];
    if (this.no_of_options > 1) {
      this.dialog.dialog_has_options.forEach((q: any) => {
        const option = {
          message: q.option.message,
          option_images: q.option.option_images,
        };
        this.options.push(option);
      });
    } else {
      this.mupltiple_line = this.dialog.dialog_has_options[0].option.message.split(
        '<new_line>',
      );
      this.mupltiple_line_images = this.dialog.dialog_has_options[0].option.option_images;
      this.show_multiple = this.mupltiple_line.length;
      this.count_multiple = 0;
      if (this.show_multiple > 1) {
        let option!: any;
        if (this.mupltiple_line[this.count_multiple] !== this.img_separator) {
          option = {
            message: this.mupltiple_line[this.count_multiple],
            option_images: [],
          };
        } else {
          option = {
            message: '',
            option_images: this.mupltiple_line_images,
          };
        }
        this.options.push(option);
      } else {
        let option!: any;
        if (this.mupltiple_line[0] !== this.img_separator) {
          option = {
            message: this.mupltiple_line[0],
            option_images: [],
          };
        } else {
          option = {
            message: '',
            option_images: this.dialog.dialog_has_options[0].option
              .option_images,
          };
        }
        this.options.push(option);
      }
    }
    this.scrollPageToBottom();
  }

  on_multiple_options(index: number) {
    this.options = [];
    this.nsend = false;
    let option!: any;
    if (this.mupltiple_line[this.count_multiple] !== this.img_separator) {
      this.text.option.push({
        message: this.mupltiple_line[this.count_multiple],
        option_images: [],
      });
    } else {
      this.text.option.push({
        message: '',
        option_images: this.mupltiple_line_images,
      });
    }
    this.completedConversation.push(this.text);
    this.text = new Texting([], [], '', false);
    this.count_multiple++;

    if (this.mupltiple_line[this.count_multiple] !== this.img_separator) {
      option = {
        message: this.mupltiple_line[this.count_multiple],
        option_images: [],
      };
    } else {
      option = {
        message: '',
        option_images: this.mupltiple_line_images,
      };
    }
    setTimeout(() => {
      this.options.push(option);
    }, option.message.length * 25);
    // }
    this.current_dialog = [];
    this.nsend = true;
  }

  onOptionClick(i: number) {
    this.nsend = false;
    // this.text = new Texting([], [], '', false);
    if (
      this.count_multiple === this.show_multiple - 1 &&
      this.show_multiple > 1
    ) {
      this.text.dialog = [];
      // @ts-ignore
      if (this.mupltiple_line[this.count_multiple] !== this.img_separator) {
        this.text.option.push({
          message: this.mupltiple_line[this.count_multiple],
          option_images: [],
        });
      } else {
        this.text.option.push({
          message: '',
          option_images: this.mupltiple_line_images,
        });
      }
      this.show_multiple = 1;
      this.count_multiple = 0;
      ++this.progressBar;
      this.progress_bar();
    } else {
      // @ts-ignore
      if (
        this.dialog.dialog_has_options[i].option.message !== this.img_separator
      ) {
        this.text.option.push({
          message: this.dialog.dialog_has_options[i].option.message,
          option_images: [],
        });
      } else {
        this.text.option.push({
          option_images: this.dialog.dialog_has_options[i].option.option_images,
        });
      }
      ++this.progressBar;
      this.progress_bar();
    }

    if (this.dialog.dialog_has_options[i].loopback) {
      this.loopback = true;
      this.wrong_message = this.dialog.dialog_has_options[
        i
      ].wrong_option_message.message;
      this.wrongImageObject = {
        url: this.dialog.dialog_has_options[i].wrong_option_message
          .wrong_option_message_images[0],
        creditsGIF: false,
      };
      this.wrongImageObject = {};
      // this.wrong_option_selected();
      this.loopback_id = this.id;
      this.text.wrong = true;
    }
    // console.log(this.text);
    this.completedConversation.push(this.text);
    this.post(i);
    this.last_id = this.id;
    this.id = this.dialog.dialog_has_options[i].upcoming_dialog;
    this.dialog = this.dialogMap.get(this.id);
    if (!this.loopback) {
      this.index = this.index + 1;
    }
    // tslint:disable-next-line:max-line-length
    if (this.loopback) {
      this.loopback = false;
      setTimeout(() => {
        this.wrong = true;
      }, 4000);
    } else {
      this.wrong = false;
      // this.progress_bar();
    }

    for (let t = 0; t < this.dialog.dialog_images.length; t++) {
      if (
        this.dialog.dialog_images[t].type === 'AVATAR' &&
        this.dialog.dialog_images.length !== 0
      ) {
        this.text.show_avatar_image = this.dialog.dialog_images[t].image;
        break;
      } else {
        this.text.show_avatar_image = this.show_avatar_image;
      }
    }
    if (this.dialog.dialog_images.length === 0) {
      this.text.show_avatar_image = this.show_avatar_image;
    }
    this.newLine_dialog = this.dialog.message.split('<new_line>');
    this.dialog_images = this.dialog.dialog_images;
    this.text = new Texting([], [], '', false);
    this.options = [];
    this.current_dialog = [];

    setTimeout(() => {
      if (this.newLine_dialog.length > 1) {
        this.current_dialog.push({
          message: this.newLine_dialog[0],
          showTyping: false,
          dialog_images: [],
        });
        this.text.dialog.push({
          message: this.newLine_dialog[0],
          dialog_images: [],
        });

        this.showTypingTime = this.newLine_dialog[0].split(' ');
        this.current_dialog[0].showTyping = true;
        this.scrollPageToBottom();
        let timeout;
        if (this.showTypingTime.length / 35 < 1) {
          timeout = 1000;
        } else {
          timeout = (this.showTypingTime.length / 35) * 1000;
        }
        setTimeout(() => {
          this.current_dialog[0].showTyping = false;
          for (let l = 1; l < this.newLine_dialog.length; l++) {
            if (this.newLine_dialog[l] !== this.img_separator) {
              this.text.dialog.push({
                message: this.newLine_dialog[l],
                dialog_images: [],
              });
              setTimeout(() => {
                this.current_dialog.push({
                  message: this.newLine_dialog[l],
                  showTyping: true,
                  dialog_images: [],
                });
                setTimeout(() => {
                  this.current_dialog[l].showTyping = false;
                  this.scrollPageToBottom();
                }, 10 * 20 * l);
              }, 100 * 20 * l);
            } else {
              this.text.dialog.push({
                message: '',
                dialog_images: this.dialog_images,
              });
              setTimeout(() => {
                this.current_dialog.push({
                  message: '',
                  showTyping: true,
                  dialog_images: this.dialog_images,
                });
                setTimeout(() => {
                  this.current_dialog[l].showTyping = false;
                  this.scrollPageToBottom();
                }, 10 * 20 * l);
              }, 100 * 20 * l);
            }
          }
        }, 1000);
      } else {
        if (this.dialog.message !== this.img_separator) {
          this.current_dialog.push({
            message: this.dialog.message,
            showTyping: false,
            dialog_images: [],
          });
          this.text.dialog.push({
            message: this.dialog.message,
            dialog_images: [],
          });
        } else {
          this.current_dialog.push({
            message: '',
            showTyping: false,
            dialog_images: this.dialog.dialog_images,
          });
          this.text.dialog.push({
            message: '',
            dialog_images: this.dialog.dialog_images,
          });
        }

        this.showTypingTime = this.dialog.message.split(' ');
        let t;
        if (this.showTypingTime.length / 35 < 1) {
          t = 1000;
        } else {
          t = 2000;
        }
        this.current_dialog[0].showTyping = true;
        setTimeout(() => {
          this.current_dialog[0].showTyping = false;
        }, t);
      }
      this.nsend = true;
    }, 1000);

    if (this.dialog.is_last === true) {
      this.progress = 100;
      setTimeout(() => {
        this.finished = true;
        this.time = this.timerservice.removeVisibility() + this.time;
        this.conversationsService.completed(
          this.time,
          this.history_id,
          this.conversation_id,
          false,
          this.finished,
        );
      }, 4000);
    } else {
      setTimeout(() => {
        this.dialog_options();
      }, 20 * 10 * 70 + 1100);
    }
    this.scrollPageToBottom();
  }

  // wrong_option_selected() {
  //   this.loopback_id = this.id;
  // }

  progress_bar() {
    this.progress = (this.progressBar / (this.length_conversation - 1)) * 100;
  }

  post(i: number) {
    this.response = new Response();
    this.response.dialog_id = this.id;
    this.response.history_id = this.history_id;
    this.response.option_id = this.dialog.dialog_has_options[i].option.id;

    this.conversationsService.post_response(this.response);
  }

  // postCompletedChat() {
  //   this.response = new Response();
  //   this.response.dialog_id = this.id;
  //   this.response.history_id = this.history_id;
  //   this.response.option_id = this.last_option_id;
  //
  //   this.conversationsService.post_response(this.response);
  // }

  speed_run() {
    if (!this.show_full_conversation) {
      this.speedrun = true;
      this.finished = false;
      this.dialog = this.dialogMap.get(this.id);
      this.progress = 100;
      //  this.text = new Texting();
      this.newLine_dialog = this.dialog.message.split('<new_line>');
      let dialog_images = this.dialog.dialog_images;
      this.text = new Texting([], [], this.show_avatar_image, false);
      // this.current_message = [];
      if (this.newLine_dialog.length > 1) {
        this.newLine_dialog.forEach((q: any) => {
          if (q !== this.img_separator) {
            this.text.dialog.push({
              message: q,
              dialog_images: [],
            });
          } else {
            this.text.dialog.push({
              message: '',
              dialog_images: dialog_images,
            });
          }
        });
      } else {
        if (this.newLine_dialog[0] !== this.img_separator) {
          this.text.dialog.push({
            message: this.dialog.message,
            dialog_images: [],
          });
        } else {
          this.text.dialog.push({
            message: '',
            dialog_images: this.dialog.dialog_images,
          });
        }
      }

      for (let y = 0; y < this.dialog.dialog_has_options.length; y++) {
        if (!this.dialog.dialog_has_options[y].loopback) {
          // @ts-ignore
          const option = this.dialog.dialog_has_options[y].option.message.split(
            '<new_line>',
          );
          option.forEach((q: any) => {
            if (q !== this.img_separator) {
              this.text.option.push({
                message: q,
                option_images: [],
              });
            } else {
              this.text.option.push({
                message: '',
                option_images: this.dialog.dialog_has_options[y].option
                  .option_images,
              });
            }
          });
          break;
        }
      }
      this.completedConversation.push(this.text);
      while (this.dialog.is_last === false) {
        for (let y = 0; y < this.dialog.dialog_has_options.length; y++) {
          if (!this.dialog.dialog_has_options[y].loopback) {
            this.dialog = this.dialogMap.get(
              this.dialog.dialog_has_options[y].upcoming_dialog,
            );
            break;
          }
        }

        this.newLine_dialog = this.dialog.message.split('<new_line>');
        dialog_images = this.dialog.dialog_images;
        this.text = new Texting([], [], this.show_avatar_image, false);
        // this.current_message = [];
        if (this.newLine_dialog.length > 1) {
          this.newLine_dialog.forEach((q: any) => {
            if (q !== this.img_separator) {
              this.text.dialog.push({
                message: q,
                dialog_images: [],
              });
            } else {
              this.text.dialog.push({
                message: '',
                dialog_images: dialog_images,
              });
            }
          });
        } else {
          if (this.newLine_dialog[0] !== this.img_separator) {
            this.text.dialog.push({
              message: this.dialog.message,
              dialog_images: [],
            });
          } else {
            this.text.dialog.push({
              message: '',
              dialog_images: this.dialog.dialog_images,
            });
          }
        }
        if (this.dialog.is_last === true) {
          this.current_dialog = [];
          this.newLine_dialog = this.dialog.message.split('<new_line>');
          if (this.newLine_dialog.length > 1) {
            this.newLine_dialog.forEach((q: any) => {
              this.current_dialog.push({
                message: q,
                showTyping: false,
                dialog_images: [],
              });
            });
          } else {
            this.current_dialog.push({
              message: this.dialog.message,
              showTyping: false,
              dialog_images: [],
            });
          }
          break;
        }
        for (let y = 0; y < this.dialog.dialog_has_options.length; y++) {
          if (!this.dialog.dialog_has_options[y].loopback) {
            // @ts-ignore
            const options = this.dialog.dialog_has_options[
              y
            ].option.message.split('<new_line>');
            this.last_option_id = this.dialog.dialog_has_options[y].option.id;
            options.forEach((option: any) => {
              if (option === this.img_separator) {
                this.text.option.push({
                  message: '',
                  option_images: this.dialog.dialog_has_options[y].option
                    .option_images,
                });
              } else {
                this.text.option.push({
                  message: option,
                  option_images: [],
                });
              }
            });
            break;
          }
        }
        for (let t = 0; t < this.dialog.dialog_images.length; t++) {
          if (
            this.dialog.dialog_images[t].type === 'AVATAR' &&
            this.dialog.dialog_images.length !== 0
          ) {
            this.text.show_avatar_image = this.dialog.dialog_images[t].image;
            break;
          } else {
            this.text.show_avatar_image = this.show_avatar_image;
          }
        }
        if (this.dialog.dialog_images.length === 0) {
          this.text.show_avatar_image = this.show_avatar_image;
        }
        this.completedConversation.push(this.text);
      }
      if (this.dialog.is_last === true) {
        this.finished = true;
        // this.id = this.dialog.id;
        // this.postCompletedChat();
        this.time = this.timerservice.removeVisibility() + this.time;
        this.conversationsService.completed(
          this.time,
          this.history_id,
          this.conversation_id,
          true,
          this.finished,
        );
      }
      this.show_full_conversation = true;
    }
  }

  scrollPageToBottom() {
    setTimeout(() => {
      const options = this.convDiv.nativeElement.querySelectorAll(
        '.msg_container_send1',
      );
      const dialogs = this.convDiv.nativeElement.querySelectorAll(
        '.msg_container1',
      );
      options[options.length - 1].scrollIntoView({
        behavior: 'smooth',
      });
      dialogs[dialogs.length - 1].scrollIntoView({
        behavior: 'smooth',
      });
    }, 1000);
  }

  getOrWidth(): any {
    const options = this.elementRef.nativeElement.querySelectorAll(
      '.msg_container_send1',
    );
    if (options) {
      return options[0].offsetWidth + 'px';
    }
    return null;
  }

  onDislikeBtnClick() {
    if (this.convDisliked) {
      this.final_feedback = 0; // changing from dislike to no like/dislike state
      this.likeDislikeRemoved = true;
      this.isDislikeBox = false;
    } else if (this.convLiked) {
      this.final_feedback = -1; // changing from like to dislike state
      this.likeDislikeRemoved = true;
      this.isDislikeBox = false;
    } else {
      this.final_feedback = -1; // changing from no like/dislike state to dislike
      this.likeDislikeRemoved = false;
      this.isDislikeBox = true;
    }
    this.convDisliked = !this.convDisliked;
    this.convLiked = false;
    this.isLikeBox = false;
    this.storeFeedBackData();
  }

  onLikeBtnClick() {
    if (this.convLiked) {
      this.final_feedback = 0; // changing from like to no like/dislike state
      this.likeDislikeRemoved = true;
      this.isLikeBox = false;
    } else if (this.convDisliked) {
      this.final_feedback = 1; // changing from dislike to no like state
      this.likeDislikeRemoved = true;
      this.isLikeBox = false;
    } else {
      this.isLikeBox = true;
      this.final_feedback = 1; // changing from no like/dislike state to like
      this.likeDislikeRemoved = false;
    }
    this.convLiked = !this.convLiked;
    this.convDisliked = false;
    this.isDislikeBox = false;
    this.storeFeedBackData();
  }

  storeFeedBackData() {
    this.feedbackData.initial_feedback_state = this.initial_feedback;
    this.feedbackData.final_feedback_state = this.userFeedback.final_feedback;
    this.feedbackData.conversation_id = this.conversation_id;

    this.conversationsService
      .storeFeedBackInfo(this.feedbackData)
      .subscribe(data => {
        this.feedbackDataId = data.data.id;
        this.initial_feedback = this.userFeedback.final_feedback;
      });
  }
  onNextStepClick() {
    this.goToService.clickFlow.emit();
  }

  onDashboard() {
    this.router.navigate(['/']);
  }

  onShowForm() {
    this.isvisible = !this.isvisible;
    this.isFormVisible = true;
    this.isConversation = false;
  }

  onShowConv() {
    this.isvisible = !this.isvisible;
    this.isConversation = true;
    this.isFormVisible = false;
  }

  onSubmitComment(feedback_text: string) {
    this.feedbackText.feedback_text = feedback_text;
    this.conversationsService
      .updateFeedBackInfo(this.feedbackText, this.feedbackDataId)
      .subscribe(data => {});
    this.isDislikeBox = false;
    this.isLikeBox = false;
    this.likeDislikeRemoved = false;
    this.scrollTop = 0;
  }

  onCompleted() {
    this.showloading = true;
    const current_step_id = this.passdata.get_current_id();
    const next_step_id = this.passdata.get_nextstep();
    const isLastStep = this.passdata.get_islast();
    // this.showNextStepBtn = true;
    this.time = 100;
    this.completionData.time_spent = this.time;
    this.completionData.step_id = current_step_id;

    // REQUEST FAILED
    this.stepDataService
      .storeCompletionData(this.completionData)
      .subscribe(data => {
        this.showloading = false;
        this.showNextStepBtn = true;
        this.commonService.updateScore(CONVERSATION_COMPLETE_SCORE);
      });
  }
}
