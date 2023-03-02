import { Component, OnInit } from '@angular/core';
import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import { ShowLoginSignupDialogService } from '@/pre-login/shared/show-login-signup-dialog.service';

@Component({
  selector: 'app-custom-nav',
  templateUrl: './custom-nav.component.html',
  styleUrls: ['./custom-nav.component.scss'],
})
export class CustomNavComponent implements OnInit {
  constructor(
    private showLoginSignupDialogService: ShowLoginSignupDialogService
  ) {}

  ngOnInit() {}

  onLoginClicked() {
    this.showLoginSignupDialogService.broadcastLoginClicked(
      MatLoginDialogComponent
    );
  }
}
