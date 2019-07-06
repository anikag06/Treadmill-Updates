import {
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit, Output, SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chat} from '@/main/chatbot/chat.model';
import {environment} from '../../../../environments/environment';
import {NEW_CHAT, REPLY_CURRENT, RESUME_CHAT, TOKEN} from '@/app.constants';
import {ChatbotService} from '@/main/chatbot/chatbot.service';
import {AuthService} from '@/shared/auth/auth.service';
import set = Reflect.set;


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges, AfterViewChecked {

  constructor(
    private chatbotService: ChatbotService,
    private authService: AuthService,
    private changeRef: ChangeDetectorRef,
  ) {}

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;


  @ViewChild('messagesDiv', {static: false}) messagesDiv!: ElementRef;
  @ViewChild('ti', {static: false}) ti!: ElementRef;
  @Input() chatWindowClosed = false;
  @Output() chatWindowClosedEmitter = new EventEmitter<Boolean>();

  ngOnChanges(changes: SimpleChanges): void {
    // Start chat when chatwindow open
    if (this.chatWindowClosed === false && !this.webSocket) {
      this.startChatSession(NEW_CHAT);
    }
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.chatbotService.postPreviousChat()
      .subscribe(
        (data: any) => {
          data.data.messages.forEach((message: any) => {
            this.messages.push(new Chat(message.text, message.is_sender_user, [], message.mid, message.sid, message.datetime));
            this.scrollToBottom();
          });
        }
      );
  }

  ngAfterViewChecked(): void {
    this,this.scrollToBottom();
  }

  onChatSubmit() {
    if (this.message.length > 0 && this.message.trim().length > 0) {
      this.message = this.message.replace(/[\n\t\r]/g, "");
      this.messages.push(new Chat(this.message, true, [], '', '', new Date()));
      this.scrollToBottom();
      this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': this.message, 'buttons': [] } }));
      this.ti.nativeElement.focus();
      this.message = '';
    }
    setTimeout(() => {
      this.ti.nativeElement.focus();
      this.scrollToBottom()
    })
  }

  close() {
    this.chatWindowClosed = true;
    this.chatWindowClosedEmitter.emit(true);
  }

  ngOnDestroy(): void {
    this.webSocket.close();
  }


  chatButtonPressed(button: any, chat: Chat) {
    chat.buttons = [];
    this.messages.push(new Chat(button['payload'], true, [], '', '', new Date()));
    this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': '', 'buttons': [button] } }));
  }

  scrollToBottom() {
    if (this.messagesDiv) {
      this.scrollTop = this.messagesDiv.nativeElement.scrollHeight;
    }
  }

  onKey(event: KeyboardEvent) {
    // TODO 576 comes from the bootstrap
    if (!event.shiftKey && screen.availWidth > 576) {
     this.onChatSubmit()
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
        this.webSocket.close();
        this.startChatSession(NEW_CHAT);
      }
      data.message.forEach((m: any, index: number) => {
        setTimeout(() => {
          if ((m.text && m.text.length > 0) || (m.buttons && m.buttons.length > 0)) {
            this.showWritingAndPushChat(m);
            setTimeout(() => {
              this.scrollToBottom();
            })
          }
        }, 2400 * index)
      });
    }

    this.webSocket.onerror = () => {
      this.webSocket.close();
      this.startChatSession(NEW_CHAT);
    }
    this.scrollToBottom();
  }

  pushChat(m: any) {
    const item = new Chat(m.text, false, m.buttons, m.mid, m.sid, m.datetime);
    this.messages.push(item);
    this.scrollToBottom();
    if (this.ti) {
      if (m.buttons.length > 1) {
        this.ti.nativeElement.disabled = true;
      } else {
        this.ti.nativeElement.disabled = false;
        this.ti.nativeElement.focus();
      }
    }
  }

  showWritingAndPushChat(m: any) {
    let item = new Chat('.../.', false, [], '', '', new Date());
    this.messages.push(item);
    setTimeout(this.scrollToBottom);
    setTimeout(() => {
      this.messages.pop();
      this.pushChat(m);
      setTimeout(this.scrollToBottom);
    }, 1100)
  }
}
