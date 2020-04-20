import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';

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
    ) {}
  navBar = true;

  ngOnInit() {
    // this.isFlowVisible = true;

  }
  ngAfterViewInit() {
    this.notificationService.navFlowOpened.emit();
    this.isFlowVisible = true;
    console.log('navbar-flow');
  }

  onClose() {
    this.isFlowVisible = false;
    this.notificationService.showFlow = false;
    this.notificationService.closeNavFlow.emit();
  }
}
