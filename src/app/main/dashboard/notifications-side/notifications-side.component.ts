import { Component, OnInit } from '@angular/core';
import { User } from '@/shared/user.model';
import { AppNotification } from '@/main/shared/app-notification.model';

@Component({
  selector: 'app-notifications-side',
  templateUrl: './notifications-side.component.html',
  styleUrls: ['./notifications-side.component.scss']
})
export class NotificationsSideComponent implements OnInit {

  notifications = [
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Nanzu moved up from 80% to top 90%! Congrats!', new Date(Date.now() + (6.04e+8 * 1))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something bad happened', new Date(Date.now() + (6.04e+8 * 2))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something good happened', new Date(Date.now() + (6.04e+8 * 3))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something bad happened', new Date(Date.now() + (6.04e+8 * 4))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something good happened', new Date(Date.now() + (6.04e+8 * 5))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something very good happened', new Date(Date.now() + (6.04e+8 * 6))),
    new AppNotification(new User(1, 'nanzu', 'nanzu@email.com'), 'Something bad happened', new Date(Date.now() + (6.04e+8 * 7)))
  ];

  constructor() { }

  ngOnInit() {
  }

}
