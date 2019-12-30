import { CHATBOT_RETRY_TIMEOUT, MAX_RETRIES, NEW_CHAT, REPLY_CURRENT, RESUME_CHAT } from '@/app.constants';
import { Chat } from '@/main/chatbot/chat.model';
import { ChatbotService } from '@/main/chatbot/chatbot.service';
import { AuthService } from '@/shared/auth/auth.service';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpErrorResponse } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { environment } from '../../../../environments/environment';



declare var twemoji: any;


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        visibility: 'visible',
        transform: 'translateY(0%)'
      })),
      state('closed', style({
        visibility: 'hidden',
        transform: 'translateY(0%)'

      })),
      transition('open => closed', [
        animate('0.5s linear')
      ]),
      transition('closed => open', [
        animate('0.5s linear')
      ]),
    ])
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy, OnChanges {

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private changRef: ChangeDetectorRef,
    public dialog: MatDialog,
    private elementRef: ElementRef,
  ) { }

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
  moodWidget: string = "mood_widget";
  dateTimeWidget = "date_time_widget";
  buttonsModule: string[] = ['', '', '', '', '', '', '', '', '', ''];
  radio = "radio";
  clickAble = "clickable_image";
  buttonType: string = 'radio';


  @ViewChild('messagesDiv', { static: false }) messagesDiv!: ElementRef;
  @ViewChild('ti', { static: false }) ti!: ElementRef;
  @Input() chatWindowClosed = false;
  @Output() chatWindowClosedEmitter = new EventEmitter<Boolean>();

  ngOnChanges(): void {
    if (this.chatWindowClosed === false) {
      if (!this.webSocket || (this.webSocket && this.webSocket.readyState === 3)) {
        this.startChatSession(RESUME_CHAT);
      }
    } else {
      this.closeChat();
    }
  }

  ngOnInit() {
    this.chatbotService.postPreviousChat()
      .subscribe(
        (data: any) => {
          if (data.status) {
            data.data.messages.forEach(
              (message: any) => {
                this.messages.push(
                  new Chat(twemoji.parse(message.text), message.is_sender_user, [], message.mid, message.sid, message.datetime, false, message.widgets));
                this.scrollToBottom();
                console.log(message);
              });
          }
         
        },
        (error: HttpErrorResponse) => {
          console.log(error);
        }
      );
  }

  onChatSubmit() {
    if (this.message.length > 0 && this.message.trim().length > 0) {
      this.message = this.message.replace(/[\n\t\r]/g, '');
      this.messages.push(new Chat(twemoji.parse(this.message), true, [], '', '', new Date(), false, []));
      this.scrollToBottom();
      const message = this.message;
      this.message = '';

      this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': message, 'buttons': [] } }));
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
  }

  ngOnDestroy(): void {
    this.closeChat();
  }


  chatButtonPressed(button: any, chat: Chat) {
    chat.buttons = [];
    this.messages.push(new Chat(button['payload'], true, [], '', '', new Date(), false, []));
    this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': '', 'buttons': [button] } }));
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
    this.webSocket = new WebSocket(environment.CHAT_HOST + '/ws/chat/?token=' + this.authService.getToken());
    this.webSocket.onopen = (event) => {
      this.webSocket.send(JSON.stringify({ 'action': type, 'module_name': 'mood_tracker_follow_up' }));
    };
    this.webSocket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      if (data.error === true) {
        const item = new Chat(JSON.stringify(data), false, [], '', '', new Date(), false, []);
        this.messages.push(item);
        this.webSocket.close();
      } else if (data.action === 'ws_close') {
        this.closeChat();
      } else {
        // data.message.forEach((m: any, index: number) => {
        //   console.log(m.text);
        //   const delayPerMessage = (this.totalDelay + this.getSentenceDelay(m.text || '')) * index;
        //   console.log(delayPerMessage);
        //   setTimeout(() => {
        //     if ((m.text && m.text.length > 0) || (m.buttons && m.buttons.length > 0)) {
        //       this.showWritingAndPushChat(m);
        //       setTimeout(() => {
        //         this.scrollToBottom();
        //       });
        //     }
        //   });
        // });
        console.log(data);
        this.start(data.message);

      }
    };

    this.webSocket.onclose = () => {
      if (!this.chatClosed && this.webSocket.readyState === 3 && this.retries < MAX_RETRIES) {
        this.retries++;
        setTimeout(() => this.startChatSession(NEW_CHAT), CHATBOT_RETRY_TIMEOUT);
      }
    };

    this.webSocket.onerror = () => {
      this.webSocket.close();
    };
    this.scrollToBottom();
  }

  pushChat(m: any) {
    const item = new Chat(twemoji.parse(m.text || ''), false, m.buttons, m.mid, m.sid, m.datetime, false, m.widgets);
    if (m.buttons && m.buttons.length > 0) {
      this.buttonType = m.buttons[0].type;
    }
    this.messages.push(item);
    this.scrollToBottom();
    if (this.ti) {
      if (m.buttons && m.buttons.length > 1) {
        this.ti.nativeElement.disabled = true;
      } else {
        this.ti.nativeElement.disabled = false;
        this.ti.nativeElement.focus();
      }
    }
  }

  // showWritingAndPushChat(m: any) {
  //   const item = new Chat('', false, [], '', '', new Date(), true);

  //   this.messages.push(item);
  //   setTimeout(()=>{
  //   },this.totalDelay + this.totalDelay)
  //   setTimeout(this.scrollToBottom);
  //   this.messages.pop();
  //   this.pushChat(m);
  //   setTimeout(this.scrollToBottom);
  //   // setTimeout(() => {
  //   //   this.messages.pop();
  //   //   this.pushChat(m);
  //   //   setTimeout(this.scrollToBottom);
  //   // }, this.halfwayDelay + Math.floor((Math.random() * 800) + 1));
  // }

  showWritingAndPushChat(m: any) {
    const item = new Chat('', false, [], '', '', new Date(), true, []);
    this.ti.nativeElement.disabled = true;
    this.messages.push(item);
    setTimeout(this.scrollToBottom);
    setTimeout(() => {
      this.messages.pop();
      this.pushChat(m);
      setTimeout(this.scrollToBottom);
    }, this.halfwayDelay + Math.floor((Math.random() * 800) + 1));

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

  getMoodMessage($event: string) {
    this.message = $event;
  }

  getDateTimeMessage($event: string) {
    this.message = $event;
  }

  async start(messages: any) {

    await this.loadEachMessage(messages);


  }

  async loadEachMessage(m: any) {

    for (let index = 0; index < m.length; index++) {
      let delayPerMessage = (this.totalDelay + this.getSentenceDelay(m.text || '')) * index;

      if ((m[index].text && m[index].text.length > 0) || (m[index].buttons && m[index].buttons.length > 0)) {
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

}
