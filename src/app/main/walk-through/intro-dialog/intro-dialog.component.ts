import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IntroService } from '@/main/walk-through/intro.service';
import { User } from '@/shared/user.model';
import { DEFAULT_PATH } from '@/app.constants';
import { BreakpointObserver } from '@angular/cdk/layout';
import { AuthService } from '@/shared/auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '@/shared/questionnaire/data.service';
import { FcmService } from '@/shared/fcm.service';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowService } from '@/main/flow/flow.service';
import { Overlay } from '@angular/cdk/overlay';
import { SurveyService } from '@/main/shared/survey.service';
import { NavbarNotificationsService } from '@/main/shared/navbar/navbar-notifications.service';
import { CustomOverlayService } from '@/main/shared/custom-overlay/custom-overlay.service';
import { CommonService } from '@/shared/common.service';
import { IntroDialogService } from '@/main/walk-through/intro-dialog.service';

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
    private router: Router,
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
