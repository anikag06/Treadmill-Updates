import { Component, OnInit, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  chatwindowClosed = true;
  removeChat = false;
  blacklisted = ['/games', '/resources'];

  constructor(private router: Router, private elementRef: ElementRef) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.removingChat();
    });
    this.removingChat();
  }

  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
    this.preventScrolling();
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
    this.preventScrolling();
  }

  //
  //   window.addEventListener('scroll', () => {
  //   document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  // });
  preventScrolling() {
    if (!this.chatwindowClosed) {
      const scrollY = document.documentElement.style.getPropertyValue(
        '--scroll-y',
      );
      const body = document.body;
      body.style.position = 'fixed';
      body.style.top = `-${scrollY}`;
    }
  }

  removingChat() {
    let match = false;
    this.blacklisted.forEach(data => {
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
