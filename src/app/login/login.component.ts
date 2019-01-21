import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { MatLoginDialogComponent } from '@/login/mat-login-dialog/mat-login-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  username!: string;
  password!: string;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const loginDialogRef = this.dialog.open(MatLoginDialogComponent, {
      // width: '400px',
      // height: '600px',
      minWidth: '250px',
      minHeight: '200px',
      disableClose: true,
      hasBackdrop: true,
      data: {username: this.username, password: this.password}
    });

    loginDialogRef.afterClosed().subscribe((result: string) => {
      console.log('Login data: '+result);
    });
  }

}
