import { Component, OnInit } from '@angular/core';
import { User } from '@/shared/user.module';
import { AuthService } from '@/shared/auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  user!: User;
  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.authService.isLoggedInAsync()
      .then((data) => {
        if (data) {
          this.user = <User>data;
        }
      });
  }

  onChatbotClick() {
    alert("Chatbot clicked");
  }

}
