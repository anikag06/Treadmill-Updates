import {
  Component,
  OnInit,
  ElementRef,
  Inject,
  ViewChild,
  ComponentFactoryResolver,
  Input,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DOCUMENT } from '@angular/common';
import { CustomOverlayComponent } from '@/main/shared/custom-overlay/custom-overlay.component';
import { NavbarFlowDirective } from '@/main/shared/navbar/navbar-flow.directive';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';

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
  @Input() flowOpen!: boolean;
  currentDateTime!: any;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private notificationService: NavbarNotificationsService,
    private overlayService: CustomOverlayService,
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
      this.overlayService.showFlow = false;
      console.log('show flow1', this.overlayService.showFlow);
      this.removingChat();
    });
  }

  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
    this.currentDateTime = Date.now();
    this.overlayOpen = true;
    this.overlayService.showFlow = false;
    this.overlayService.showChatbot = true;
    const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CustomOverlayComponent,
    );
    const hostViewContainerRef = this.flowHost.viewContainerRef;
    hostViewContainerRef.clear();
    hostViewContainerRef.createComponent(navbarFLowComponentFactory);
    this.overlayService.closeChatbotOverlay.subscribe(() => {
      hostViewContainerRef.clear();
      if (!this.flowOpen) {
        this.overlayService.overlayClose.emit();
      }
      this.overlayService.showChatbot = false;
      this.overlayOpen = false;
    });
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
  }

  removingChat() {
    console.log('show flow', this.overlayService.showFlow);
    let match = false;
    this.blacklisted.forEach(data => {
      if (location.pathname.match(data)) {
        match = true;
      }
      if (match && !this.overlayService.showFlow) {
        this.removeChat = true;
      } else {
        this.removeChat = false;
      }
    });
  }
}
