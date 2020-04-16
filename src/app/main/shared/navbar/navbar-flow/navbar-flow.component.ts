import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {animate, keyframes, state, style, transition, trigger} from '@angular/animations';
import {NavbarNotificationsService} from '@/main/shared/navbar/navbar-notifications.service';

@Component({
  selector: 'app-navbar-flow',
  templateUrl: './navbar-flow.component.html',
  styleUrls: ['./navbar-flow.component.scss'],
  animations: [
    trigger('flowIn', [
      state('show', style({transform: 'translateX(0%)', opacity: 1})),
      transition('void => *', [
        style({ transform: ' translateX(100%)', opacity: 0 }),
        animate(1000)
      ]),
    ])
    ]
})
export class NavbarFlowComponent implements OnInit {
  constructor(
    private notificationService: NavbarNotificationsService,
    ) {}
  navBar = true;

  ngOnInit() {

  }
  ngAfterViewInit() {
    console.log('navbar-flow');
  }

  onClose() {
    this.notificationService.closeNavFlow.emit();
  }
}
