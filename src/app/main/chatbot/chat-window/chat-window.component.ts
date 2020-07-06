import {CHATBOT_RETRY_TIMEOUT, MAX_RETRIES, MOBILE_WIDTH, NEW_CHAT, REPLY_CURRENT, RESUME_CHAT,} from '@/app.constants';
import {Chat} from '@/main/chatbot/chat.model';
import {ChatbotService} from '@/main/chatbot/chatbot.service';
import {AuthService} from '@/shared/auth/auth.service';
import {animate, state, style, transition, trigger,} from '@angular/animations';
import {HttpErrorResponse} from '@angular/common/http';
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
  ViewChild,
} from '@angular/core';
import {MatDialog} from '@angular/material';
import {environment} from '../../../../environments/environment';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';
import {CustomOverlayService} from '@/main/shared/custom-overlay/custom-overlay.service';
import {CommonService} from '@/shared/common.service';

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
        }),
      ),
      state(
        'closed',
        style({
          visibility: 'hidden',
          transform: 'translateY(0%)',
        }),
      ),
      state(
        'animateOpen',
        style({
          transform: 'translateY(0%)',
        }),
      ),
      // state(
      //   'animateClosed',
      //   style({
      //     transform: 'translateY(100%)',
      //   }),
      // ),
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
  ) {
    this.commonService.createOnline$().subscribe((isOnline) => {
      this.isOnline = isOnline;
    });
  }

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;
  totalDelay = 3000;
  halfwayDelay = 0;
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
  showButtons = [];
  buttonsBuffer = [];
  widgetValues!: any;
  showMoodWidgetBtn = true;
  showDateTimeWidgetBtn = true;
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
  showSlider = true;
  widgetRating!: number;
  ngOnChanges(): void {
    if (this.chatWindowClosed === false) {
      if (
        !this.webSocket ||
        (this.webSocket && this.webSocket.readyState === 3)
      ) {
        this.startChatSession(RESUME_CHAT);
      }
    } else {
      this.closeChat();
    }
  }

  ngOnInit() {
    this.mobileView = window.innerWidth < MOBILE_WIDTH;
    this.chatbotService.postPreviousChat(this.currentDateTime).subscribe(
      (data: any) => {
        if (data.status) {
          // console.log(data);
          //console.log(data.data.messages);
          setTimeout(() => {
            data.data.messages.forEach((message: any) => {
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
                ),
              );

              this.scrollToBottom();
              // console.log(message);
            });
          });
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
    );
  }

  openingStyle() {
    if (!this.overlayOpen) {
      return 'open';
    } else {
      return 'animateOpen';
    }
  }

  //  pushPreviousChat(message: any) {
  //   console.log(message);
  //   this.pushImage(message);
  //    this.messages.push(
  //     new Chat(
  //       twemoji.parse(message.text),
  //       message.is_sender_user,
  //       [],
  //       message.mid,
  //       message.sid,
  //       message.datetime,
  //       false,
  //       [],
  //       this.images,
  //     ),
  //   );
  // }

  getRating(value: number) {
    this.widgetRating = value;
  }

  onRatingSubmit() {
    this.message = 'You rated it ' + this.widgetRating + ' out of 10';
    this.widgetValues = this.widgetRating;
    this.onChatSubmit();
    this.showSlider = false;
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
        ),
      );
      this.scrollToBottom();
      const message = this.message;
      const widgetValues = {
        payload: message,
        value: this.widgetValues,
      };
      this.message = '';
      this.widgetValues = [];
      // setTimeout(() => {}, 4000);
      //   widgets": [{"widget_value":[],"widget_payload":"",}]
      if (widgetValues.value) {
        this.webSocket.send(
          JSON.stringify({
            action: REPLY_CURRENT,
            message: {
              text: '',
              buttons: [],
              widgets: [widgetValues],
            },
          }),
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
          }),
        );
      }

      this.showTextInput = false;
    }
  }

  close() {
    if (!this.overlayOpen) {
      this.closeChat();
    } else {
      setTimeout(() => {
        this.closeChat();
      }, 500);
      this.overlayService.closeChatbotOverlay.emit();
    }
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
      ),
    );
    this.webSocket.send(
      JSON.stringify({
        action: REPLY_CURRENT,
        message: { text: '', buttons: [button] },
      }),
    );
    this.showButtons = [];
    this.showMore = false;
  }

  scrollToBottom() {
    if (this.messagesDiv) {
      // console.log(this.scrollTop, this.messagesDiv.nativeElement.scrollHeight);
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
      environment.CHAT_HOST + '/ws/chat/?token=' + this.authService.getToken(),
    );
    this.webSocket.onopen = (event) => {
      this.webSocket.send(JSON.stringify({ action: type, module_name: '' }));
    };
    this.webSocket.onmessage = (message: any) => {
      this.showMaintenance = false;
      const data = JSON.parse(message.data);
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
        );
        this.messages.push(item);
        this.webSocket.close();
      } else if (data.action === 'ws_close') {
        this.closeChat();
      } else {
        this.page = 2;
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
          CHATBOT_RETRY_TIMEOUT,
        );
      }
    };

    this.webSocket.onerror = () => {
      if (this.isOnline) {
        this.showMaintenance = true;
      }
      this.webSocket.close();
    };
  }

  pushChat(m: any) {
    this.buttonsBuffer = [];
    console.log(m);
    this.pushImages(m);
    m.buttons.forEach((button: any) => {
      if (!button.hasOwnProperty('emojified_payload')) {
        button.emojified_payload = twemoji.parse(button.payload);
      }
    });

    if (m.buttons && m.buttons.length < 5) {
      this.showButtons = m.buttons;
    } else {
      this.buttonsBuffer = m.buttons;
      this.showButtons = m.buttons.slice(0, 4);
      this.counter = 4;
      this.showMore = true;
    }

    // this.showMoodWidget = !!m.widgets;
    this.isLoading = false;
    const item = new Chat(
      twemoji.parse(m.text || ''),
      false,
      this.showButtons,
      m.mid,
      m.sid,
      m.datetime,
      false,
      m.widgets,
      this.images,
    );
    // console.log();
    if (m.buttons && m.buttons.length > 0) {
      this.buttonType = m.buttons[0].type;
    }
    this.messages.push(item);
    this.scrollToBottom();
    // this.showButtons = [];
  }

  showWritingAndPushChat(m: any) {
    this.isLoading = true;
    setTimeout(() => {
      this.pushChat(m);
      this.scrollToBottom();
    }, 1500);
  }

  closeChat() {
    if (this.webSocket) {
      this.chatClosed = true;
      this.webSocket.close();
      this.page = 2;
    }
    this.retries = 0;
    this.chatWindowClosedEmitter.emit(true);
    this.chatWindowClosed = true;
  }

  getWordCount(str: string) {
    return str.split(' ').length;
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
        this.scrollToBottom();
      } else {
        this.showTextInput = false;
      }
    }, messages.length * 2500);
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
              '.message-text',
            );
            data.data.messages.reverse().forEach((message: any) => {
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
                ),
              );

              this.showSpinner = false;
              firstMessageBox[0].scrollIntoView();
            });
          }
        });
    }
    // if (value === 'down') {
    //   console.log('Moving down');
    // }
  }

  getButtons() {
    for (let i = 0; i < 4; i++) {
      this.showButtons.push(this.buttonsBuffer[this.counter]);
      if (this.counter === this.buttonsBuffer.length - 1) {
        this.showMore = false;
        break;
      }
      this.counter += 1;
    }
    this.scrollToBottom();
  }

  offsetHeight() {
    if (this.textArea) {
      return this.textArea.nativeElement.offsetHeight;
    } else {
      return 0;
    }
  }
  //
  sendReply(event: any) {
    window.clearTimeout(this.timeout);
    if (event.keyCode === 13) {
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
        ),
      );
      this.multiLineChat.push(this.message);
      this.message = '';
      setTimeout(() => {
        this.scrollToBottom();
      }, 300);
      this.timeout = setTimeout(
        () => {
          // $this.onChatSubmit();
          this.submitMultiLineChat(this.multiLineChat);
          this.isMultiLineInput = false;
        },
        this.isMultiLineInput ? 4000 : 0,
      );
    }
  }

  submitMultiLineChat(multiLineChat: string[]) {
    // console.log(multiLineChat);
    this.webSocket.send(
      JSON.stringify({
        action: REPLY_CURRENT,
        message: {
          text: multiLineChat,
          buttons: [],
          widgets: [],
        },
      }),
    );
    this.showTextInput = false;
    this.multiLineChat = [];
    this.scrollToBottom();
  }

  onScrollToBottom(){
    if (this.messagesDiv) {
      // console.log(this.scrollTop, this.messagesDiv.nativeElement.scrollHeight);
      this.messagesDiv.nativeElement.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
      this.changRef.detectChanges();
    }
  }
  showScrollToBottom  = false;

  atBottom(value:boolean){
      this.showScrollToBottom = value
  }
}
