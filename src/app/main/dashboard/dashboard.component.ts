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

  user!: User;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedIn()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });
    this.mobileView = window.innerWidth < MOBILEWIDTH;
  }

  onChatbotClick() {
    alert('Chatbot clicked');
  }

}
