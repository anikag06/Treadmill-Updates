import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  chatwindowClosed = true;

  constructor() { }

  ngOnInit() {
  }


  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
  }
}
