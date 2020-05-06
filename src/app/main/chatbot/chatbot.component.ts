import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  chatwindowClosed = true;
  removeChat = false;
  blacklisted = ['/games', '/resources'];
  currentDateTime!: any;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.removingChat();
    });
    this.removingChat();
  }

  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
    this.currentDateTime = Date.now();
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
  }

  removingChat() {
    let match = false;
    this.blacklisted.forEach((data) => {
      if (location.pathname.match(data)) {
        match = true;
      }

      if (match) {
        this.removeChat = true;
      } else {
        this.removeChat = false;
      }
    });
  }
}
