import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild
} from '@angular/core';
import {Chat} from '@/main/chatbot/chat.model';
import {environment} from '../../../../environments/environment';
import {NEW_CHAT, REPLY_CURRENT, RESUME_CHAT, MAX_RETRIES} from '@/app.constants';
import {ChatbotService} from '@/main/chatbot/chatbot.service';
import {AuthService} from '@/shared/auth/auth.service';
import {animate, state, style, transition, trigger} from '@angular/animations';

declare var twemoji: any;


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        display: 'block',
      })),
      state('closed', style({
        display: 'none',
      })),
      transition('open => closed', [
        animate('0.1s cubic-bezier(0.0, 0.0, 0.2, 1)')
      ]),
      transition('closed => open', [
        animate('0.1s cubic-bezier(0.4, 0.0, 1, 1)')
      ]),
    ])
  ]
})
export class ChatWindowComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private changRef: ChangeDetectorRef,
  ) {}

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;
  totalDelay = 2700;
  halfwayDelay = 1000;
  delayPerWord = 100;
  chatClosed = false;
  retries = 0;


  @ViewChild('messagesDiv', {static: false}) messagesDiv!: ElementRef;
  @ViewChild('ti', {static: false}) ti!: ElementRef;
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
          data.data.messages.forEach((message: any) => {
            this.messages.push(new Chat(twemoji.parse(message.text), message.is_sender_user, [], message.mid, message.sid, message.datetime));
            this.scrollToBottom();
          });
        }
      );
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  onChatSubmit() {
    if (this.message.length > 0 && this.message.trim().length > 0) {
      this.message = this.message.replace(/[\n\t\r]/g, '');
      this.messages.push(new Chat(this.message, true, [], '', '', new Date()));
      this.scrollToBottom();
      const message = twemoji.parse(this.message);
      this.message = '';
      this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': message, 'buttons': [] } }));
      if (screen.availWidth > 576) {
        this.ti.nativeElement.disabled = true;
      }
    }
    setTimeout(() => {
      this.ti.nativeElement.focus();
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
    this.messages.push(new Chat(button['payload'], true, [], '', '', new Date()));
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
    this.webSocket = new WebSocket('ws://' + environment.HOST + '/ws/chat/?token=' + this.authService.getToken());
    this.webSocket.onopen =  (event) => {
      this.webSocket.send(JSON.stringify({ 'action': type, 'module_name': 'mood_tracker'}));
    };
    this.webSocket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      if (data.error === true) {
        const item = new Chat("Oops! I have some problem.<br /> Please hold on mate...", false, [], '', '', new Date());
        this.messages.push(item);
        this.webSocket.close();
      } else if (data.action === 'ws_close') {
          this.closeChat();
      } else {
        data.message.forEach((m: any, index: number) => {
          const delayPerMessage =  (this.totalDelay + this.getSentenceDelay(m.text || '')) * index + Math.floor((Math.random() * 1100) + 1);
          setTimeout(() => {
            if ((m.text && m.text.length > 0) || (m.buttons && m.buttons.length > 0)) {
              this.showWritingAndPushChat(m);
              setTimeout(() => {
                this.scrollToBottom();
              });
            }
          }, delayPerMessage);
        });
      }
    };

    this.webSocket.onclose = () => {
      if (!this.chatClosed && this.webSocket.readyState === 3 && this.retries < MAX_RETRIES) {
        this.retries++;
        this.startChatSession(NEW_CHAT);
      }
    };

    this.webSocket.onerror = () => {
      this.webSocket.close();
    };
    this.scrollToBottom();
  }

  pushChat(m: any) {
    const item = new Chat(twemoji.parse(m.text), false, m.buttons, m.mid, m.sid, m.datetime);
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

  showWritingAndPushChat(m: any) {
    const item = new Chat('.../.', false, [], '', '', new Date());
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
    return this.getWordCount(str) *  this.delayPerWord;
  }
}
