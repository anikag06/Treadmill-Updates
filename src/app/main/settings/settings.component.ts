import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { ThemePalette } from '@angular/material';
import { User } from '@/shared/user.model';
import { AuthService } from '@/shared/auth/auth.service';
import { SettingsService } from '@/main/settings/settings.service';
import { FcmService } from '@/shared/fcm.service';
import { NavbarGoToService } from '@/main/shared/navbar/navbar-go-to.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserProfileService } from '@/main/shared/user-profile/user-profile.service';
import { CommonService } from '@/shared/common.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
})
export class SettingsComponent implements OnInit {
  user!: User;
  // oldScore!: number;
  checked = true;
  newUsername!: string;
  realPassword!: string;
  currentPassword!: string;
  newPassword!: string;
  confirmPassword!: string;
  usernameTyped = false;
  realPasswordTyped = false;
  usernameHeadingClicked = false;
  passwordHeadingClicked = false;
  notificationHeadingIsClicked = false;

  showLoadingPasswordChange = false;
  showLoadingUsernameChange = false;
  LoadingUsernamePasswordChange = false;
  notificationMessage = '';
  notificationStatus!: boolean;
  usernameAvailableStatus!: boolean;
  usernameInput = true;
  usernameAvailable = false;
  usernameAvailableMessage = '';
  usernamePasswordCorrectMessage = '';
  usernamePasswordStatus!: boolean;
  currentPasswordTyped = false;
  newPasswordTyped = false;
  confirmPasswordTyped = false;
  currentPasswordMessage = '';
  oldPasswordMessage = '';
  newPasswordMessage = '';
  confirmPasswordMessage = '';
  newConfirmMatch!: boolean;
  savedNotificationMessage = '';
  passwordState!: boolean;
  passwordMsgShow!: boolean;
  toggleOnToShowSave = false;
  supportPushSave = false;
  passwordClick = true;

  savedUserIsLoaded = true;
  usernamePasswordSubmitShow = false;
  usernameMessage!: string;
  notificationError!: string;
  // toggle state that changes when clicking on toggle
  supportGroupEmailToggle!: boolean;
  supportGroupFcmToggle!: boolean;
  taskFormFcmToggle = true;
  taskFormEmailToggle!: boolean;
  formsFcmToggle!: boolean;
  formsEmailToggle!: boolean;
  weeklyEmailToggle!: boolean;

  @ViewChild('usernameForm', { static: true }) usernameForm!: NgForm;
  @ViewChild('passwordForm', { static: true }) passwordForm!: NgForm;

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private settingsService: SettingsService,
    private fcmService: FcmService,
    private goToService: NavbarGoToService,
    private router: Router,
    private route: ActivatedRoute, //  private commonService: CommonService, //  private userProfileService: UserProfileService,
  ) {}

  ngOnInit() {
    this.user = <User>this.authService.isLoggedIn();
    this.newUsername = this.user.username;
    console.log('initial weekly', this.weeklyEmailToggle);
    this.goToService.settingsPageShowEvent.subscribe(() => {
      console.log('username subscribe');
      this.usernameHeadingClicked = false;
      this.passwordHeadingClicked = false;
      this.notificationHeadingIsClicked = false;
      this.goToService.settingsPageTitle.emit('Settings');
    });

    this.settingsService.updatedNotificationsState().subscribe(
      (data: any) => {
        this.supportGroupEmailToggle = data.data.support_group_email;
        this.supportGroupFcmToggle = data.data.support_group_fcm;
        this.taskFormEmailToggle = data.data.task_form_email;
        this.taskFormFcmToggle = data.data.task_form_fcm;
        this.formsEmailToggle = data.data.forms_email;
        this.formsFcmToggle = data.data.forms_fcm;
        this.weeklyEmailToggle = data.data.weekly_email_update;
      },
      error => {
        console.log(error);
      },
    );
  }

  fadeOutSave() {
    setTimeout(() => {
      // this.toggleOnToShowSave = false;
      this.notificationStatus = false;
    }, 1000);
  }

  changeUsernameHeadingClicked() {
    this.router.navigate(['change-username'], { relativeTo: this.route });
    this.usernameHeadingClicked = !this.usernameHeadingClicked;
    this.goToService.settingsPageTitle.emit('Change Username');
  }

  changePasswordHeadingClicked() {
    this.router.navigate(['change-password'], { relativeTo: this.route });
    this.passwordHeadingClicked = !this.passwordHeadingClicked;
    this.goToService.settingsPageTitle.emit('Change Password');
  }

  notificationHeadingClicked() {
    this.router.navigate(['notification-settings'], { relativeTo: this.route });
    this.notificationHeadingIsClicked = !this.notificationHeadingIsClicked;
    this.goToService.settingsPageTitle.emit('Notification Settings');
  }

  usernameAvailability() {
    this.showLoadingUsernameChange = true;
    this.usernameTyped = true;

    this.settingsService
      .usernameAvailabilityCheck(this.newUsername)
      .subscribe((data: any) => {
        console.log('username availability', this.newUsername);
        console.log(data);
        console.log(data.message);
        this.usernameAvailableStatus = data.data;
        this.usernameAvailableMessage = data.message;
        setTimeout(() => {
          this.usernameAvailableMessage = '';
        }, 5000);

        this.showLoadingUsernameChange = false;
      });
    console.log('available');
    this.usernameAvailable = true;
    this.usernamePasswordCorrectMessage = '';
    this.usernamePasswordSubmitShow = false;
  }

  realPasswordInput() {
    this.realPasswordTyped = true;
  }

  continueClicked() {
    this.usernamePasswordSubmitShow = true;
    this.usernameInput = false;
    this.usernameAvailable = false;
  }

  submitClick() {
    this.usernamePasswordSubmitShow = false;
    this.LoadingUsernamePasswordChange = true;
    // this.username = " ";
    this.settingsService
      .sendingUsername(this.newUsername, this.realPassword)
      .subscribe(
        (data: any) => {
          console.log(data);
          this.LoadingUsernamePasswordChange = false;
          this.usernamePasswordStatus = data.status; // password correct or not
          this.usernamePasswordCorrectMessage = data.message; // message telling whether passowrd is correct or not
          setTimeout(() => {
            this.usernamePasswordCorrectMessage = '';
          }, 5000);
          if (this.usernamePasswordStatus === true) {
            this.user.username = this.newUsername;
            this.authService.setLoginData(data);

            // this.fcmService.updateToken(data.status.token);
          }
        },
        error => {
          this.LoadingUsernamePasswordChange = false;
          this.usernamePasswordCorrectMessage = error.error.message;
          setTimeout(() => {
            this.usernamePasswordCorrectMessage = '';
          }, 5000);
          // this.usernamePasswordCorrectMessage = error.error.message;
        },
      );
  }

  confirmNewMatch() {
    if (this.newPassword === this.confirmPassword) {
      this.newConfirmMatch = true;
    } else {
      this.newConfirmMatch = false;
    }
    this.confirmPasswordTyped = true;
  }

  savePasswordChange() {
    this.showLoadingPasswordChange = true;
    // if (this.new_password.nativeElement.value === this.confirm_password.nativeElement.value) {
    this.settingsService
      .sendingPasswordsForChange(this.currentPassword, this.newPassword)
      .subscribe(
        (error: any) => {
          // console.log('password data', data.message);
          this.passwordState = error.body.status;
          console.log('error', error);
          console.log(error.body.message);
          this.oldPasswordMessage = error.body.message; // successful
          setTimeout(() => {
            this.oldPasswordMessage = '';
          }, 5000);
          this.newPasswordMessage = '';
          this.showLoadingPasswordChange = false;
          this.passwordMsgShow = true;
          // this.currentPasswordMessage = '';
        },
        error => {
          this.showLoadingPasswordChange = false;
          this.passwordMsgShow = true;
          // console.log(error.error.message.new_password);
          console.log(error.error);
          this.passwordState = error.status;

          this.currentPasswordMessage = error.error.message; // wrong password
          setTimeout(() => {
            this.currentPasswordMessage = '';
          }, 5000);
          this.newPasswordMessage = error.error.message.new_password; // too short
          setTimeout(() => {
            this.newPasswordMessage = '';
          }, 5000);
          this.oldPasswordMessage = error.error.message.old_password; // too short
          setTimeout(() => {
            this.oldPasswordMessage = '';
          }, 5000);
        },
      );
    // } else {
    // this.confirmPasswordMessage = 'New and Confirm password does not match';
    // }

    console.log('changed');
    this.passwordClick = false;
    this.currentPassword = '';
    this.newPassword = '';
    this.confirmPassword = '';
  }

  passWordMessageRemove() {
    this.passwordMsgShow = false;
    this.currentPasswordTyped = true;
  }
  newPasswordTouch() {
    this.newConfirmMatch = false;
    this.newPasswordTyped = true;
  }

  saveNotificationChange(field: string, toggle_on: boolean) {
    console.log('field', field);
    console.log(toggle_on);

    this.toggleOnToShowSave = true;
    this.settingsService
      .updatingNotifications(field, toggle_on)
      .subscribe((data: any) => {
        this.savedNotificationMessage = data.message;
        this.notificationMessage = field;
        this.notificationStatus = data.status;
        console.log(data.status);
        console.log(data.message);
        console.log(data);
      });
    this.settingsService.updatedNotificationsState().subscribe(data => {
      console.log(data);
    });
  }
}
