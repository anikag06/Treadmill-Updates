import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';
import {CustomOverlayService} from "@/main/shared/custom-overlay/custom-overlay.service";

@Component({
  selector: 'app-navbar-flow',
  templateUrl: './navbar-flow.component.html',
  styleUrls: ['./navbar-flow.component.scss'],
  animations: [
    trigger('flowInOut', [
      state('hidden', style({ transform: 'translateX(100%)' })),
      state('show', style({ transform: 'translateX(0%)' })),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('500ms', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('500ms', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
    ]
})
export class NavbarFlowComponent implements OnInit {
  isFlowVisible!: boolean;
  constructor(
    private notificationService: NavbarNotificationsService,
    private overlayService: CustomOverlayService,
    ) {}
  navBar = true;

  ngOnInit() {
    this.notificationService.closeNavFlow.subscribe( () => {
      if (!this.overlayService.showChatbot) {
      this.isFlowVisible = false;
      this.overlayService.showFlow = false;
    }
    });

  }
  ngAfterViewInit() {
    this.notificationService.navFlowOpened.emit();
    this.isFlowVisible = true;
    console.log('navbar-flow');
  }

  onClose() {
    this.notificationService.closeNavFlow.emit();
  }
}
