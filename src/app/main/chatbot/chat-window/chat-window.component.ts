import {
  CHATBOT_RETRY_TIMEOUT,
  MAX_RETRIES,
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
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '../../../../environments/environment';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';

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
      transition('open => closed', [animate('0.5s linear')]),
      transition('closed => open', [animate('0.5s linear')]),
      transition('void => animateOpen', [
        style({ transform: ' translateY(100%)' }),
        animate('1.0s ease-in')
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
    private notificationService: NavbarNotificationsService,
    private elementRef: ElementRef,
  ) {
    this.chatbotService.createOnline$().subscribe(isOnline => {
      this.isOnline = isOnline;
    });
  }

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;
  totalDelay = 3000;
  halfwayDelay = 1500;
  delayPerWord = 50;
  chatClosed = false;
  retries = 0;
  showMoodTracker = false;
  showDateTime = false;
  moodWidget = 'mood_widget';
  dateTimeWidget = 'date_time_widget';
  // buttonsModule: string[] = ['', '', '', '', '', '', '', '', '', ''];
  radio = 'radio';
  clickAble = 'clickable_image';
  buttonType = 'radio';
  images: any[] = [];
  isOnline = true;
  @ViewChild('messagesDiv', { static: false }) messagesDiv!: ElementRef;
  @ViewChild('ti', { static: false }) ti!: ElementRef;
  @Input()  openStyle!: boolean;
  @Input() chatWindowClosed = false;
  @Output() chatWindowClosedEmitter = new EventEmitter<Boolean>();
  counter = 4;
  showMore = false;
  showButtons = [];
  buttonsBuffer = [];
  widgetValues: any[] = [];
  showMoodWidget = true;
  showDateTimeWidget = true;
  showSpinner = true;

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
    this.chatbotService.postPreviousChat().subscribe(
      (data: any) => {
        if (data.status) {
          // console.log(data);
          data.data.messages.forEach((message: any) => {
            // this.pushPreviousChat(message);
            this.pushImage(message);
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
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      },
    );
  }

  openingStyle() {
    if (this.openStyle) {
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
      const widgetValues = this.widgetValues;
      console.log(message);
      this.message = '';
      this.widgetValues = [];
      console.log(
        JSON.stringify({
          message: {
            text: message,
            buttons: [],
            values: widgetValues.length > 0 ? widgetValues : [],
          },
        }),
      );
      this.webSocket.send(
        JSON.stringify({
          action: REPLY_CURRENT,
          message: {
            text: message,
            buttons: [],
            values: widgetValues.length > 0 ? widgetValues : [],
          },
        }),
      );
      if (screen.availWidth > 576) {
        this.ti.nativeElement.disabled = true;
      }
    }
    setTimeout(() => {
      // this.ti.nativeElement.focus();
      this.scrollToBottom();
    });
  }

  close() {
    this.closeChat();
    this.notificationService.closeChatbotOverlay.emit();
  }

  ngOnDestroy(): void {
    this.closeChat();
  }

  chatButtonPressed(button: any) {
    // chat.buttons = [];
    this.messages.push(
      new Chat(button['payload'], true, [], '', '', new Date(), false, [], []),
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
      this.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
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
    this.webSocket.onopen = event => {
      this.webSocket.send(JSON.stringify({ action: type, module_name: '' }));
    };
    this.webSocket.onmessage = (message: any) => {
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
      this.webSocket.close();
    };
    this.scrollToBottom();
  }

  pushChat(m: any) {
    this.buttonsBuffer = [];
    console.log(m);
    this.pushImage(m);
    m.buttons.forEach((button: any) => {
      button.payload = twemoji.parse(button.payload);
    });

    console.log(m.buttons);
    if (m.buttons && m.buttons.length < 4) {
      this.showButtons = m.buttons;
    } else {
      this.buttonsBuffer = m.buttons;
      this.showButtons = m.buttons.slice(0, 4);
      this.showMore = m.buttons.length > 4;
    }

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
    // this.showButtons = [];
    this.scrollToBottom();
    if (this.ti) {
      if (m.buttons && m.buttons.length > 1) {
        this.ti.nativeElement.disabled = true;
        // this.scrollToBottom();
      } else {
        this.ti.nativeElement.disabled = false;
        this.ti.nativeElement.focus();
      }
    }
  }

  showWritingAndPushChat(m: any) {
    const item = new Chat('', false, [], '', '', new Date(), true, [], []);
    this.ti.nativeElement.disabled = true;
    this.messages.push(item);
    setTimeout(this.scrollToBottom);
    setTimeout(() => {
      this.messages.pop();
      this.pushChat(m);
      // this.showButtons = [];
      setTimeout(this.scrollToBottom);
    }, this.halfwayDelay + Math.floor(Math.random() * 800 + 1));
  }

  closeChat() {
    if (this.webSocket) {
      this.chatClosed = true;
      this.webSocket.close();
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
    this.showMoodWidget = false;
  }

  getDateTimeMessage($event: string) {
    this.message = $event;
  }

  async start(messages: any) {
    await this.loadEachMessage(messages);
  }

  loadEachMessage(m: any) {
    for (let index = 0; index < m.length; index++) {
      const delayPerMessage =
        (this.totalDelay + this.getSentenceDelay(m.text || '')) * index;

      if (
        (m[index].text && m[index].text.length > 0) ||
        (m[index].buttons && m[index].buttons.length > 0)
      ) {
        setTimeout(() => {
          this.showWritingAndPushChat(m[index]);
        }, delayPerMessage);

        //  setTimeout(() => {
        //     this.scrollToBottom();
        //   });
      }
    }
  }

  onDateTimeSelect() {
    this.showDateTime = !this.showDateTime;
  }

  pushImage(m: any) {
    this.images = [];
    if (m.images && m.images.length > 0) {
      m.images.forEach((image: any) => {
        if (image.type === 'unsplash_collection') {
          this.getImageFromCollection(image.cid);
        } else if (image.type === 'unsplash_photo') {
          this.getImageByID(image.pid);
        } else if (image.type === 'giphy') {
          this.getGIFByID(image.gid);
        } else {
          this.getImage(image);
        }
      });
    }
  }

  getImageFromCollection(cid: string) {
    this.chatbotService.getRandomPhoto(cid).subscribe((resp: any) => {
      // console.log(resp);
      // url = resp.body.urls.small;
      const image = {
        url: resp.body.urls.raw,
        link: resp.body.links.html,
        color: resp.body.color,
        name: resp.body.user.name,
        credits: true,
      };

      this.images.push(image);
    });
  }

  getImageByID(pid: string) {
    this.chatbotService.getPhoto(pid).subscribe((resp: any) => {
      const image = {
        url: resp.body.urls.raw,
        link: resp.body.links.html,
        color: resp.body.color,
        name: resp.body.user.name,
        credits: true,
      };

      this.images.push(image);
    });
  }

  getImage(photo: any) {
    const image = {
      url: photo.url,
      credits: false,
    };
    this.images.push(image);
  }

  getGIFByID(gid: string) {
    this.chatbotService.getGIF(gid).subscribe((resp: any) => {
      // console.log(resp);
      const image = {
        url: resp.body.data.images.original_still.url,
        dynamic_url: resp.body.data.images.original.url,
        static_url: resp.body.data.images.original_still.url,
        showSpinner: true,
        creditsGIF: true,
      };

      this.images.push(image);
    });
  }

  scrollFrame(value: string) {
    if (value === 'up') {
      console.log('Moving up');
    }
    if (value === 'down') {
      console.log('Moving down');
    }
  }
  getButtons(m: any) {
    for (let i = 0; i < 4; i++) {
      if (this.counter === this.buttonsBuffer.length) {
        this.showMore = false;
        this.scrollToBottom();
        break;
      } else {
        // console.log(this.counter)
        // @ts-ignore
        this.showButtons.push(this.buttonsBuffer[this.counter]);
        this.counter += 1;
        if (this.counter === this.buttonsBuffer.length) {
          this.showMore = false;
          this.buttonsBuffer = [];
          this.showButtons = [];
        }
      }
    }
    this.scrollToBottom();
  }

  changeUrl(image: any, index: number) {
    if (this.images[index] && this.images[index].dynamic_url) {
      this.images[index].showSpinner = true;
      this.images[index].url =
        this.images[index].url === this.images[index].static_url
          ? this.images[index].dynamic_url
          : this.images[index].static_url;
    }
    // console.log(image.dynamic_url === image.url);
  }

  hideSpinner(index: number) {
    if (this.images[index].showSpinner) {
      this.images[index].showSpinner = false;
      setTimeout(() => {
        if (this.images[index].url === this.images[index].dynamic_url) {
          this.images[index].url = this.images[index].static_url;
        }
      }, 10000);
      console.log('hide spinner');
    }
  }
}
