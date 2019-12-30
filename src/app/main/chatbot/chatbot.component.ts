import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss']
})
export class ChatbotComponent implements OnInit {

  chatwindowClosed = true;
  removeChat = false;
  blacklisted = ['/games', '/resources'];

  constructor(
    private router: Router,
   private elementRef: ElementRef,
  ) { }

  ngOnInit() {
    this.router.events
      .subscribe(
        () => {
          this.removingChat();
        }
      );
    this.removingChat();
  }


  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
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
