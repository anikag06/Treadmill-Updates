import {
  CHATBOT_RETRY_TIMEOUT,
  FORM_START_VIA_CHAT_BOT_SCORE,
  MAX_RETRIES,
  MOBILE_WIDTH,
  NEW_CHAT,
  REPLY_CURRENT,
  RESUME_CHAT,
} from '@/app.constants';
import { Chat } from '@/main/chatbot/chat.model';
import { ChatbotService } from '@/main/chatbot/chatbot.service';
import { AuthService } from '@/shared/auth/auth.service';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '../../../../environments/environment';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';
import { CommonService } from '@/shared/common.service';
import { IntroService } from '@/main/walk-through/intro.service';
import * as moment from 'moment';

declare var twemoji: any;

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  animations: [
    trigger('openClose', [
      state(
        'open',
        style({
          visibility: 'visible',
          transform: 'translateY(0%)',
        })
      ),
      state(
        'closed',
        style({
          visibility: 'hidden',
          transform: 'translateY(0%)',
        })
      ),
      state(
        'animateOpen',
        style({
          transform: 'translateY(0%)',
        })
      ),
      transition('open => closed', [animate('0.5s linear')]),
      transition('closed => open', [animate('0.5s linear')]),
      transition('void => animateOpen', [
        style({ transform: 'translateY(100%)' }),
        animate('500ms', style({ transform: 'translateY(0%)' })),
      ]),
      transition('animateOpen => *', [
        animate('500ms', style({ transform: 'translateY(100%)' })),
      ]),
    ]),
  ],
})
export class ChatWindowComponent implements OnInit, OnDestroy, OnChanges {
  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private changRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private overlayService: CustomOverlayService,
    private notificationService: NavbarNotificationsService,
    private elementRef: ElementRef,
    private commonService: CommonService,
    private renderer: Renderer2,
    private introService: IntroService
  ) {
    this.commonService.isOnline$().subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;
  totalDelay = 3000;
  delayPerWord = 50;
  chatClosed = false;
  retries = 0;
  showMoodTracker = false;
  showDateTime = false;
  moodWidget = 'mood_widget';
  dateTimeWidget = 'date_time_widget';
  ratingWidget = 'rating_widget';
  radio = 'radio';
  clickAble = 'clickable_image';
  buttonType = '';
  images: any[] = [];
  isOnline = true;
  @ViewChild('messagesDiv', { static: false }) messagesDiv!: ElementRef;
  @ViewChild('ti', { static: false }) ti!: ElementRef;
  @Input() overlayOpen!: boolean;
  @ViewChild('textArea', { static: false }) textArea!: ElementRef;
  @Input() chatWindowClosed = false;
  @Output() chatWindowClosedEmitter = new EventEmitter<Boolean>();
  counter = 4;
  showMore = false;
  chatButtons!: any;
  buttonsBuffer = [];
  widgetValues!: any;
  showMoodWidgetBtn = false;
  showDateTimeWidgetBtn = false;
  showMaintenance = false;
  showSpinner = false;
  isMultiLineInput = false;
  showTextInput!: boolean;
  timeout: any = null;
  page!: number;
  allMessagesLoaded = false;
  mobileView!: boolean;
  @Input() currentDateTime!: any;
  isLoading = false;
  multiLineChat: string[] = [];
  showSlider = false;
  widgetRating = 0;
  showScrollToBottom = false;
  @ViewChild('frameContainer', { static: false }) frameRef!: ElementRef;
  currentModule!: string;
  messageDateString!: string;
  showWillBotTyping = false;
  height = 0;
  MULTILINEINPUT_DELAY = 4000;
  MESSAGES_DELAY = 2500;
  PUSHCHAT_DELAY = 1500;
  INITIAL_DELAY = 1000;
  SCROLL_DELAY = 500;
  DElAY_PER_WORD_BUTTON = 250;
  FOCUS_DELAY = 200;

  ngOnChanges(): void {
    if (!this.chatWindowClosed) {
      if (
        !this.webSocket ||
        (this.webSocket && this.webSocket.readyState === 3)
      ) {
        this.chatbotService.postPreviousChat(this.currentDateTime).subscribe(
          (data: any) => {
            if (data.status) {
              data.data.messages.forEach((message: any) => {
                if (!this.isErrorMessage(message)) {
                  this.pushImages(message);
                  this.messages.push(
                    new Chat(
                      twemoji.parse(message.text),
                      message.is_sender_user,
                      [],
                      message.mid,
                      message.sid,
                      message.datetime,
                      false,
                      [],
                      this.images,
                      message.msg_time
                    )
                  );
                }
              });
              this.scrollToBottom();
              setTimeout(() => {
                this.startChatSession(RESUME_CHAT);
              }, 500);
            }
          },
          (error: HttpErrorResponse) => {
            this.showMaintenance = true;
          }
        );
      }
    } else {
      this.closeChat();
    }
  }

  ngOnInit() {
    this.mobileView = window.innerWidth < MOBILE_WIDTH;
    if (this.introService.getChatbotIntro()) {
      this.introService.startChatbotCloseIntro();
    }
  }

  openingStyle() {
    if (!this.overlayOpen) {
      return 'open';
    } else {
      return 'animateOpen';
    }
  }

  getRating(value: number) {
    if (value !== undefined) {
      this.widgetRating = value;
    }
  }

  onRatingSubmit() {
    this.message = 'I rate it ' + this.widgetRating + ' out of 10';
    this.widgetValues = this.widgetRating;
    this.onChatSubmit();
    this.showSlider = false;
    const height = this.frameRef.nativeElement.offsetHeight + 180;
    this.renderer.setStyle(
      this.frameRef.nativeElement,
      'height',
      `${height}px`
    );
  }

  ngAfterViewChecked() {
    this.changRef.detectChanges();
  }
  onChatSubmit() {
    if (this.message.length > 0 && this.message.trim().length > 0) {
      this.message = this.message.replace(/[\n\t\r]/g, '');
      this.messages.push(
        new Chat(
          twemoji.parse(this.message),
          true,
          [],
          '',
          '',
          new Date(),
          false,
          [],
          [],
          new Date()
        )
      );
      const message = this.message;
      const widgetValues = {
        payload: message,
        value: this.widgetValues,
      };
      this.message = '';
      if (this.widgetValues !== undefined) {
        this.webSocket.send(
          JSON.stringify({
            action: REPLY_CURRENT,
            message: {
              text: '',
              buttons: [],
              widgets: [widgetValues],
            },
          })
        );
      } else {
        this.webSocket.send(
          JSON.stringify({
            action: REPLY_CURRENT,
            message: {
              text: message,
              buttons: [],
              widgets: [],
            },
          })
        );
      }
      delete this.widgetValues;
      this.showTextInput = false;
      this.showWillBotTyping = true;
      setTimeout(() => {
        this.scrollToBottom();
      }, 100);
    }
  }

  close() {
    if (!this.overlayOpen) {
      this.closeChat();
    } else {
      setTimeout(() => {
        this.closeChat();
      }, this.SCROLL_DELAY);
      this.overlayService.closeChatbotOverlay.emit();
    }
    this.chatbotService.showOutsideModal = false;
  }

  ngOnDestroy(): void {
    this.closeChat();
  }

  chatButtonPressed(button: any) {
    // chat.buttons = [];
    this.messages.push(
      new Chat(
        button['emojified_payload'],
        true,
        [],
        '',
        '',
        new Date(),
        false,
        [],
        [],
        new Date()
      )
    );
    this.webSocket.send(
      JSON.stringify({
        action: REPLY_CURRENT,
        message: { text: '', buttons: [button] },
      })
    );
    this.chatButtons = [];
    this.showMore = false;
    this.showWillBotTyping = true;
  }

  scrollToBottom() {
    if (this.messagesDiv) {
      this.scrollTop = this.messagesDiv.nativeElement.scrollHeight + 100;
      this.changRef.detectChanges();
    }
  }

  onKey(event: KeyboardEvent) {
    // 576 comes from the bootstrap
    if (!event.shiftKey && screen.availWidth > 576) {
      this.onChatSubmit();
    }
  }

  startChatSession(type: string) {
    this.webSocket = new WebSocket(
      environment.CHAT_HOST + '/ws/chat/?token=' + this.authService.getToken()
    );
    this.webSocket.onopen = (event) => {
      this.webSocket.send(JSON.stringify({ action: type, module_name: '' }));
    };
    this.webSocket.onmessage = (message: any) => {
      this.showMaintenance = false;
      const data = JSON.parse(message.data);
      if (data.is_new_form) {
        this.commonService.updateScore(FORM_START_VIA_CHAT_BOT_SCORE);
      }
      this.currentModule = data.module_name;
      if (data.error === true) {
        const item = new Chat(
          data.text,
          false,
          [],
          '',
          '',
          new Date(),
          false,
          [],
          [],
          new Date()
        );
        this.messages.push(item);
        this.webSocket.close();
      } else if (data.action === 'ws_close') {
        this.close();
      } else {
        this.page = 1;
        this.start(data.message);
      }
    };

    this.webSocket.onclose = () => {
      if (
        !this.chatClosed &&
        this.webSocket.readyState === 3 &&
        this.retries < MAX_RETRIES
      ) {
        this.retries++;
        setTimeout(
          () => this.startChatSession(NEW_CHAT),
          CHATBOT_RETRY_TIMEOUT
        );
      }
    };

    this.webSocket.onerror = () => {
      if (this.isOnline) {
        this.showMaintenance = true;
        this.chatButtons = [];
        this.showDateTimeWidgetBtn = false;
        this.showMoodWidgetBtn = false;
      }
      this.webSocket.close();
    };
  }

  pushChat(m: any) {
    this.buttonsBuffer = [];
    this.pushImages(m);
    m.buttons.forEach((button: any) => {
      if (!button.hasOwnProperty('emojified_payload')) {
        button.emojified_payload = twemoji.parse(button.payload);
      }
    });

    if (m.buttons && m.buttons.length !== 0 && m.buttons.length < 5) {
      setTimeout(() => {
        this.chatButtons = [];
        this.chatButtons = m.buttons;
        for (let i = 0; i < this.chatButtons.length; i++) {
          this.chatButtons[i].loaded = false;
        }
      }, this.getSentenceDelayButton(m.text));
    } else if (m.buttons && m.buttons.length !== 0 && m.buttons.length >= 5) {
      this.buttonsBuffer = m.buttons;
      setTimeout(() => {
        this.chatButtons = m.buttons.slice(0, 4);
        this.counter = 3;
        this.showMore = true;
      }, this.getSentenceDelayButton(m.text));
    }
    if (Array.isArray(m.widgets) && m.widgets.length) {
      if (m.widgets[0] === this.ratingWidget) {
        setTimeout(() => {
          this.showSlider = true;
          const height = this.frameRef.nativeElement.offsetHeight - 180;
          this.renderer.setStyle(
            this.frameRef.nativeElement,
            'height',
            `${height}px`
          );
        }, this.getSentenceDelayButton(m.text));
      } else if (m.widgets[0] === this.moodWidget) {
        setTimeout(() => {
          this.showMoodWidgetBtn = true;
          const moodBtn = this.elementRef.nativeElement.querySelectorAll(
            '.mood-btn'
          );
          moodBtn.forEach((btn: any, index: number) => {
            if (index !== moodBtn.length - 1) {
              btn.remove();
            }
          });
        }, this.getSentenceDelayButton(m.text));
      } else {
        setTimeout(() => {
          this.showDateTimeWidgetBtn = true;
          const dateTimeBtn = this.elementRef.nativeElement.querySelectorAll(
            '.date-time-btn'
          );
          dateTimeBtn.forEach((btn: any, index: number) => {
            if (index !== dateTimeBtn.length - 1) {
              btn.remove();
            }
          });
        }, this.getSentenceDelayButton(m.text));
      }
    }

    // this.showMoodWidget = !!m.widgets;
    this.isLoading = false;
    const item = new Chat(
      twemoji.parse(m.text || ''),
      false,
      this.chatButtons,
      m.mid,
      m.sid,
      m.datetime,
      false,
      m.widgets,
      this.images,
      new Date()
    );
    if (m.buttons && m.buttons.length > 0) {
      this.buttonType = m.buttons[0].type;
    }
    this.messages.push(item);
    this.scrollToBottom();
    setTimeout(() => {
      this.scrollToBottom();
    }, this.getSentenceDelayButton(m.text) + 50);

    // this.showButtons = [];
  }

  showWritingAndPushChat(m: any) {
    setTimeout(() => {
      this.pushChat(m);
      this.scrollToBottom();
    }, this.PUSHCHAT_DELAY);
  }

  closeChat() {
    if (this.webSocket) {
      this.chatClosed = true;
      this.webSocket.close();
      this.page = 1;
    }
    this.retries = 0;
    this.chatWindowClosedEmitter.emit(true);
    this.chatWindowClosed = true;
  }

  getWordCount(str: string) {
    return str.split(' ').length;
  }

  getSentenceDelayButton(str: string) {
    return this.getWordCount(str) * this.DElAY_PER_WORD_BUTTON;
  }

  getSentenceDelay(str: string) {
    return this.getWordCount(str) * this.delayPerWord;
  }

  onMoodSelect() {
    this.showMoodTracker = !this.showMoodTracker;
  }

  getMoodMessage($event: any) {
    this.message = $event.moodMessage;
    this.widgetValues = $event.moodValues;
    this.showMoodWidgetBtn = false;
  }

  getDateTimeMessage($event: any) {
    this.message = $event.dateTimeMessage;
    this.widgetValues = $event.dateTimeValues;
    this.showDateTimeWidgetBtn = false;
  }

  start(messages: any) {
    this.isMultiLineInput = !!messages[0].multiline_input;
    this.loadEachMessage(messages);

    setTimeout(() => {
      if (
        (messages[messages.length - 1].buttons &&
          messages[messages.length - 1].buttons.length === 0 &&
          messages[messages.length - 1].widgets &&
          messages[messages.length - 1].widgets.length === 0) ||
        (messages[messages.length - 1].buttons &&
          messages[messages.length - 1].buttons.length === 0 &&
          messages[messages.length - 1].widgets === undefined) ||
        messages[messages.length - 1].widgets === null
      ) {
        this.showTextInput = true;
        setTimeout(() => {
          this.onScrollToBottomClick();
        }, this.SCROLL_DELAY);
      } else {
        this.showTextInput = false;
      }
    }, messages.length * this.MESSAGES_DELAY);
  }

  loadEachMessage(m: any) {
    for (let index = 0; index < m.length; index++) {
      const delayPerMessage =
        (this.totalDelay + this.getSentenceDelay(m.text || '')) * index;

      if (
        (m[index].text && m[index].text.length > 0) ||
        (m[index].buttons && m[index].buttons.length > 0) ||
        (m[index].widgets && m[index].widgets.length > 0)
      ) {
        setTimeout(() => {
          this.showWillBotTyping = false;
          this.isLoading = true;
          this.showWritingAndPushChat(m[index]);
          this.scrollToBottom();
        }, delayPerMessage);
      }
    }
  }

  onDateTimeSelect() {
    this.showDateTime = !this.showDateTime;
  }

  pushImages(m: any) {
    this.images = [];
    if (m.embed_links && m.embed_links.length > 0) {
      m.embed_links.forEach((image: any) => {
        if (image.type === 'unsplash_image') {
          this.pushUnsplashImage(image);
        } else if (image.type === 'giphy') {
          this.pushGIF(image);
        } else if (image.type === 'video') {
          this.pushVideo(image);
        } else {
          this.pushImage(image);
        }
      });
    }
  }

  pushUnsplashImage(image: any) {
    const unsplashObject = {
      type: 'image',
      url: image.static_url,
      link: image.creator_link,
      name: image.creator,
      credits: true,
    };
    this.images.push(unsplashObject);
  }

  pushImage(photo: any) {
    const image = {
      type: 'image',
      url: photo.url,
      credits: false,
    };
    this.images.push(image);
  }

  pushGIF(image: any) {
    const gifObject = {
      type: 'image',
      url: image.static_url,
      dynamic_url: image.dynamic_url,
      static_url: image.static_url,
      creditsGIF: true,
    };
    this.images.push(gifObject);
  }
  pushVideo(image: any) {
    const videoObject = {
      url: image.url,
      type: 'video',
    };
    this.images.push(videoObject);
  }

  scrollFrame(value: string) {
    if (value === 'up' && !this.allMessagesLoaded) {
      this.showSpinner = true;
      this.page += 1;
      this.chatbotService
        .loadPreviousChat(this.page, this.currentDateTime)
        .subscribe((data: any) => {
          this.showSpinner = true;
          if (data.status) {
            if (data.data.messages.length === 0) {
              this.allMessagesLoaded = true;
              this.showSpinner = false;
            }
            const firstMessageBox = this.messagesDiv.nativeElement.querySelectorAll(
              '.message-text'
            );
            data.data.messages.reverse().forEach((message: any) => {
              if (!this.isErrorMessage(message)) {
                this.pushImages(message);
                this.messages.unshift(
                  new Chat(
                    twemoji.parse(message.text),
                    message.is_sender_user,
                    [],
                    message.mid,
                    message.sid,
                    message.datetime,
                    false,
                    [],
                    this.images,
                    message.msg_time
                  )
                );

                this.showSpinner = false;
                firstMessageBox[0].scrollIntoView();
              }
            });
          }
        });
    }
  }

  getButtons() {
    this.chatButtons = this.buttonsBuffer;
    for (let i = 4; i < this.chatButtons.length; i++) {
      this.chatButtons[i].loaded = false;
    }
    this.showMore = false;
    setTimeout(() => {
      this.scrollToBottom();
    }, 100);
  }

  getTextAreaHeight() {
    if (this.textArea) {
      return this.textArea.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }
  getFrameHeight() {
    return window.innerHeight - 15;
  }
  //
  sendReply(event: any) {
    window.clearTimeout(this.timeout);
    if (event.key === 'Enter') {
      this.message = this.message.replace(/[\n\t\r]/g, '');

      this.messages.push(
        new Chat(
          twemoji.parse(this.message),
          true,
          [],
          '',
          '',
          new Date(),
          false,
          [],
          [],
          new Date()
        )
      );
      this.multiLineChat.push(this.message);
      this.message = '';
      setTimeout(() => {
        this.onScrollToBottomClick();
      }, this.SCROLL_DELAY);
      this.timeout = setTimeout(
        () => {
          this.submitMultiLineChat(this.multiLineChat);
          this.isMultiLineInput = false;
        },
        this.isMultiLineInput ? this.MULTILINEINPUT_DELAY : 0
      );
    }
  }

  submitMultiLineChat(multiLineChat: string[]) {
    this.webSocket.send(
      JSON.stringify({
        action: REPLY_CURRENT,
        message: {
          text: multiLineChat,
          buttons: [],
          widgets: [],
        },
      })
    );
    this.showTextInput = false;
    this.multiLineChat = [];
    this.onScrollToBottomClick();
  }

  onScrollToBottomClick() {
    if (this.messagesDiv) {
      this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
      this.changRef.detectChanges();
    }
  }

  atBottom(value: boolean) {
    this.showScrollToBottom = value;
  }

  isErrorMessage(message: any): boolean {
    const errorMessage = 'ERRORINTHEBACKEND.CHECKANDRELOAD';
    const stripMessageText = message.text.replace(/\s+/g, '');
    return errorMessage === stripMessageText;
  }
  onFocusEvent(event: any) {
    setTimeout(() => {
      this.scrollToBottom();
    }, this.FOCUS_DELAY);
  }

  isDifferentDay(messageIndex: number): boolean {
    if (messageIndex === 0) {
      return true;
    }

    const d1 = new Date(this.messages[messageIndex - 1].msg_time);
    const d2 = new Date(this.messages[messageIndex].msg_time);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(messageIndex: number): string {
    const dateToday = new Date();
    const longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    const today = moment(dateToday).format('ddd,DD MMM YYYY');
    const yesterday = moment(longDateYesterday).format('ddd,DD MMM YYYY');

    const wholeDate = new Date(
      this.messages[messageIndex].msg_time
    ).toDateString();

    this.messageDateString = moment(
      this.messages[messageIndex].msg_time
    ).format('ddd,DD MMM YYYY');

    if (this.messageDateString === today) {
      return 'Today';
    } else if (this.messageDateString === yesterday) {
      return 'Yesterday';
    } else {
      return this.messageDateString;
    }
  }

  imageLoaded(index: number) {
    this.chatButtons[index].loaded = true;
  }
}
