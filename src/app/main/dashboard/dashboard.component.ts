import { Component, OnInit } from '@angular/core';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { MOBILEWIDTH } from '@/app.constants';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  mobileView = false;

  user: User = new User(0, 'tester', 'tester@iitk.ac.in', '', false, false);
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.mobileView = window.innerWidth < MOBILEWIDTH;
  }
}
