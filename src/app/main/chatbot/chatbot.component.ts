import {Component, OnInit, ElementRef, Inject, ViewChild, ComponentFactoryResolver} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import {CustomOverlayComponent} from '@/main/shared/custom-overlay/custom-overlay.component';
import {NavbarFlowDirective} from '@/main/shared/navbar/navbar-flow.directive';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.scss'],
})
export class ChatbotComponent implements OnInit {
  chatwindowClosed = true;
  removeChat = false;
  blacklisted = ['/games', '/resources'];
  @ViewChild(NavbarFlowDirective, { static: false })
  flowHost!: NavbarFlowDirective;
  overlayOpen = false;

  constructor(private router: Router, private elementRef: ElementRef,
              private notificationService: NavbarNotificationsService,
              private componentFactoryResolver: ComponentFactoryResolver,
  ) {}

  ngOnInit() {
    this.router.events.subscribe(() => {
      this.removingChat();
    });
    this.removingChat();
    this.notificationService.navFlowOpened.subscribe(() => {
      this.removingChat();
    });
    this.notificationService.closeNavFlow.subscribe(() => {
      this.removingChat();
    });
  }

  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
    if (this.notificationService.showFlow) {
      this.overlayOpen = true;
      this.notificationService.showFlow = false;
      const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(CustomOverlayComponent);
      const hostViewContainerRef = this.flowHost.viewContainerRef;
      hostViewContainerRef.clear();
      hostViewContainerRef.createComponent(navbarFLowComponentFactory);
      this.notificationService.closeChatbotOverlay.subscribe(() => {
        hostViewContainerRef.clear();
        this.overlayOpen = false;
      });
    }
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
  }

  removingChat() {
    let match = false;
    this.blacklisted.forEach(data => {
      if (location.pathname.match(data)) {
        match = true;
      }
      if (match && !this.notificationService.showFlow) {
          this.removeChat = true;
      } else {
          this.removeChat = false;
        }
  });
  }
}
