import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '@/shared/user.model';
import { DEFAULT_PATH } from '@/app.constants';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@/shared/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro-dialog',
  templateUrl: './intro-dialog.component.html',
  styleUrls: ['./intro-dialog.component.scss'],
})
export class IntroDialogComponent implements OnInit {
  user!: User;

  constructor(
    private dialogRef: MatDialogRef<IntroDialogComponent>,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.user = <User>user;
    } else {
      this.router.navigate([DEFAULT_PATH]);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
