import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';

@Component({
  selector: 'app-navbar-flow',
  templateUrl: './navbar-flow.component.html',
  styleUrls: ['./navbar-flow.component.scss'],
  animations: [
    trigger('flowInOut', [
      state('hidden', style({ display: 'none' })),
      state('show', style({ display: 'block' })),
      transition('hidden => show', [
        style({ transform: 'translateX(100%)' }),
        animate('200ms ease-out', style({ transform: 'translateX(0%)' })),
      ]),
      transition('show => hidden', [
        animate('2000ms ease-in', style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class NavbarFlowComponent implements OnInit {
  constructor(
    private notificationService: NavbarNotificationsService,
    ) {}
  showFlow = false;
  navBar = true;
  @Output() close = new EventEmitter<any>();

  ngOnInit() {

  }
  ngAfterViewInit() {
    console.log('navbar-flow');
    this.showFlow = true;
  }

  onClose() {
    this.notificationService.closeNavFlow.emit();
  }
}
