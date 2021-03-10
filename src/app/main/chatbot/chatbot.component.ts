import {
  Component,
  ComponentFactoryResolver,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Router } from '@angular/router';
import { CustomOverlayComponent } from '@/main/shared/custom-overlay/custom-overlay.component';
import { NavbarFlowDirective } from '@/main/shared/navbar/navbar-flow.directive';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';
import { IntroService } from '@/main/walk-through/intro.service';
import { ChatbotClickOutsideComponent } from '@/main/chatbot/chatbot-click-outside/chatbot-click-outside.component';
import { ChatbotService } from '@/main/chatbot/chatbot.service';
import { MOBILE_WIDTH } from '@/app.constants';

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
  @ViewChild('clickOutsideNotification', {
    static: true,
    read: ViewContainerRef,
  })
  clickOutsideRef!: ViewContainerRef;
  CLICK_OUTSIDE_DURATION = 5000;
  mobileView!: boolean;
  popupXPosition!: number;
  popupYPosition!: number;
  clickOutsideComponent!: any;
  timer!: any;

  constructor(
    private router: Router,
    private elementRef: ElementRef,
    private notificationService: NavbarNotificationsService,
    private overlayService: CustomOverlayService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private introService: IntroService,
    private chatbotService: ChatbotService
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
      this.removingChat();
    });
    this.mobileView = window.innerWidth < MOBILE_WIDTH;
  }

  toggleChat() {
    this.chatwindowClosed = !this.chatwindowClosed;
    this.overlayService.overlayOpen.emit();

    this.currentDateTime = Date.now();
    this.overlayOpen = true;
    this.overlayService.showFlow = false;
    this.overlayService.showChatbot = true;
    const navbarFLowComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      CustomOverlayComponent
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
    if (this.introService.getChatbotIntro()) {
      this.introService.exitChatbotIntro();
    }

    setTimeout(() => {
      this.chatbotService.showOutsideModal = true;
    }, 500);
  }

  updateChatWindow(event: boolean) {
    this.chatwindowClosed = event;
    this.clickOutsideComponent.destroy();
    this.chatbotService.modalExist = false;
    clearTimeout(this.timer);
  }

  removingChat() {
    let match = false;
    this.blacklisted.forEach((data) => {
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

  onClickOutside(event: any) {
    if (
      event &&
      (<any>event)['value'] === true &&
      !this.chatbotService.chatBotModalClicked &&
      !this.chatbotService.modalExist &&
      !this.chatwindowClosed &&
      this.chatbotService.showOutsideModal &&
      !this.mobileView
    ) {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
        ChatbotClickOutsideComponent
      );
      this.clickOutsideComponent = this.clickOutsideRef.createComponent(
        componentFactory
      );
      this.clickOutsideComponent.instance.xPosition = this.popupXPosition;
      this.clickOutsideComponent.instance.yPosition = this.popupYPosition;

      this.chatbotService.modalExist = true;
      this.timer = setTimeout(() => {
        this.clickOutsideComponent.destroy();
        this.chatbotService.chatBotModalClicked = false;
        this.chatbotService.modalExist = false;
        // this.chatbotService.showOutsideModal = false;
      }, this.CLICK_OUTSIDE_DURATION);
    }
  }
  @HostListener('document:click', ['$event'])
  clickout(event: MouseEvent) {
    const popupHeight = 80, // hardcode these values
      popupWidth = 320;

    if (event.clientX + popupWidth > window.innerWidth) {
      this.popupXPosition = event.pageX - popupWidth;
    } else {
      this.popupXPosition = event.pageX;
    }

    if (event.clientY + popupHeight > window.innerHeight) {
      this.popupYPosition = event.pageY - popupHeight;
    } else {
      this.popupYPosition = event.pageY;
    }
    const rect2 = this.elementRef.nativeElement
      .querySelector('.chat-window')
      .getBoundingClientRect();

    const isColliding = !(
      this.popupYPosition > rect2.bottom ||
      this.popupXPosition + 320 < rect2.left ||
      this.popupYPosition + 80 < rect2.top ||
      this.popupXPosition > rect2.right
    );
    if (isColliding) {
      this.popupXPosition =
        window.innerWidth <= 1366
          ? window.innerWidth / 2 - 100
          : window.innerWidth / 2 + 100;
    }
    // console.log(isColliding, this.popupXPosition, this.popupYPosition, rect2);
  }
}
