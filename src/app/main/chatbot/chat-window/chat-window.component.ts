import {AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Chat} from '@/main/chatbot/chat.model';
import {environment} from '../../../../environments/environment';
import {NEW_CHAT, REPLY_CURRENT, RESUME_CHAT, TOKEN} from '@/app.constants';
import {ChatbotService} from '@/main/chatbot/chatbot.service';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit, OnDestroy, AfterViewInit {

  constructor(
    private chatbotService: ChatbotService
  ) {}

  messages: Chat[] = [];
  message = '';
  webSocket!: WebSocket;
  buttons: any = [];
  scrollTop = 0;
  scrollInterval!: any;


  @ViewChild('chatFrame', {static: false}) messagesDiv!: ElementRef;
  @Input() chatWindowClosed = false;

  ngOnInit() {
    this.webSocket = new WebSocket('ws://' + environment.HOST + '/ws/chat/?token=' + localStorage.getItem(TOKEN));
    console.log("websocket", this.webSocket);
    this.webSocket.onopen =  (event) => {
      this.webSocket.send(JSON.stringify({ 'action': NEW_CHAT, 'module_name': 'mood_tracker'}));
    };

    this.webSocket.onerror = (data: any) => {
      console.error(data);
    }

    this.chatbotService.postPreviousChat()
      .subscribe(
        (data: any) => {
          console.log(data)
          data.data.messages.forEach((message: any) => {
            this.messages.push(new Chat(message.text, message.is_sender_user, []))
          });
          this.scrollToBottom();
        }
      )
  }

  ngAfterViewInit(): void {
    this.webSocket.onmessage = (message: any) => {
      const data = JSON.parse(message.data);
      data.message.forEach((m: any) => {
        if (m.text && m.text.length > 0) {
          this.messages.push(new Chat(m.text, false, m.buttons))
          this.scrollToBottom();
        }
      })
    }

    this.scrollInterval = setInterval(this.scrollToBottom, 1000);
  }


  onChatSubmit() {
    if (this.message.length > 0 && this.message.trim().length > 0) {
      this.messages.push(new Chat(this.message, true, []));
      this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': this.message, 'buttons': [] } }));
      this.message = '';
      console.log(this.messagesDiv.nativeElement)
      this.scrollToBottom();
    }
  }

  close() {
    this.chatWindowClosed = true;
  }

  ngOnDestroy(): void {
    this.webSocket.close();
    clearInterval(this.scrollInterval);
  }


  chatButtonPressed(button: any, chat: Chat) {
    chat.buttons = []
    this.messages.push(new Chat(button['payload'], true, []));
    this.webSocket.send(JSON.stringify({ 'action': REPLY_CURRENT, 'message': { 'text': '', 'buttons': [button] } }));
  }

  scrollToBottom() {
    if (this.messagesDiv) {
      this.scrollTop = this.messagesDiv.nativeElement.scrollHeight + 10;
      console.log(this.scrollTop);
    }
  }
}
