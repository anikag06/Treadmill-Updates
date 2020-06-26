import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ResetPasswordService} from '@/pre-login/reset-password/reset-password.service';
import {ActivatedRoute, Route, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '@/shared/auth/auth.service';
import {LOGGED_IN_PATH} from '@/app.constants';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordChangedPageShow = false;
  errorMessage = '';
  resetLinkIsValid!: boolean;
  showResetPasswordForm = false;
  errorPage = false;
  loading = false;
  submitPasswordStatus = true;
  linkExpiredMsg!: string;
  newPasswordTyped = false;
  confirmPasswordTyped = false;
  passwordMatch = false;
  passwordMatchErrorMsg!: string;
  passwordMatchErrorMsgShow = false;
  errorMsgShow = false;

  newPassword: any; // ngModel of new password
  new_password: any; // name attribute of new password
  confirmPassword: any; // ngModel
  confirm_password: any; // name
  uniqueLink!: string;


  @ViewChild('resetForm', {static: true}) resetForm!: NgForm;
 // @ViewChild('newpassword', {static: true}) newpassword!: ElementRef;

  constructor(
    private http: HttpClient,
    private resetPasswordService: ResetPasswordService,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
  ) { }

  ngOnInit() {
    const user = this.authService.isLoggedIn();
    if (user && user.is_active) {
      this.router.navigate([LOGGED_IN_PATH]);
    } else {
      this.errorPage = false;
      // this.showResetPasswordForm = true;
      this.resetPasswordService.linkValidityCheck(this.activatedRoute.snapshot.params['unique-code'])
        .subscribe(() => {
            // console.log('reset page');
            // this.uniqueLink = this.activatedRoute.snapshot.params['unique-code'];
            this.showResetPasswordForm = true;
          },
          error => {
            // console.log('validating error message', error.error.message);
            this.linkExpiredMsg = error.error.message;
            this.errorPage = true;
            this.showResetPasswordForm = true;
          });

    }


  }
  resetSubmitClicked() {
    this.uniqueLink = this.activatedRoute.snapshot.params['unique-code'];
    this.passwordMatchToFalse();
    this.matchPasswords();
    if (this.passwordMatch) {
      this.loading = true;
      this.resetPasswordService.resetPasswordSubmitted(this.newPassword, this.uniqueLink)
        .subscribe((data: any) => {
            this.passwordChangedPageShow = true;
            this.loading = false;
          },
          error => {
            // console.log('password submit error', error);
           // console.log('new password', this.newPassword);
            this.errorMessage = error.error.error.new_password;
            this.errorMsgShow = true;
            console.log(this.errorMessage);
            this.loading = false;
          });
    }

    // .subscribe(() => {
    //   if(data.status === true) {
    //     this.passwordChangedPageShow = true;
    //   } error => {
      //  this.errorMessage = error.errormessage;
    // })

  }


  newPasswordInput() {
    this.newPasswordTyped = true;
    this.passwordMatchErrorMsgShow = false;
    this.errorMsgShow = false;
  }

  confirmPasswordInput() {
    this.confirmPasswordTyped = true;
    this.passwordMatchErrorMsgShow = false;
    this.errorMsgShow = false;
  }

  matchPasswords() {
    if (
      this.newPassword &&
      this.confirmPassword &&
      this.newPassword === this.confirmPassword
    ) {
      this.passwordMatch = true;
    } else {
      this.passwordMatchErrorMsgShow = true;
      // this.passwordMatchErrorMsg = 'Enter same passwords';
    }
  }
  passwordMatchToFalse() {
    this.passwordMatch = false;
  }

}
