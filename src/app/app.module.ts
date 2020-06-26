import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { LoginComponent } from '@/pre-login/login/login.component';
import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
import { LoggerService } from '@/shared/logger.service';
import { PreLoginFooterComponent } from '@/pre-login/shared/pre-login-footer/pre-login-footer.component';
import { MatContactUsDialogComponent } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.component';
import { DialogSize } from '@/shared/dialog-size.service';
import { environment } from '../environments/environment';
import { LandingPageComponent } from '@/pre-login/landing-page/landing-page.component';
import { PreLoginComponent } from '@/pre-login/pre-login.component';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { AuthService } from './shared/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { LocalStorageService } from './shared/localstorage.service';
import { SignUpComponent } from '@/pre-login/signup/signup.component';
import { QuestionnaireModule } from './questionnaire.module';
import { ContactUsDataService } from './shared/mat-contact-us-dialog/contact-us-data.service';
import { FcmService } from './shared/fcm.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { TimerService } from './shared/timer.service';
import { SignUpService } from '@/pre-login/signup/sign-up.service';
import { CommonService } from '@/shared/common.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { TempLandingPageComponent } from '@/temp-landing-page/temp-landing-page.component';
import {ResetPasswordComponent} from '@/pre-login/reset-password/reset-password.component';
import {SignupResetCommonComponent} from '@/pre-login/shared/signup-reset-common/signup-reset-common.component';
import {MatLoginDialogService} from '@/pre-login/login/mat-login-dialog/mat-login-dialog.service';
import {ResetPasswordService} from '@/pre-login/reset-password/reset-password.service';

declare let $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatLoginDialogComponent,
    PreLoginFooterComponent,
    PreLoginComponent,
    MatContactUsDialogComponent,
    LandingPageComponent,
    ErrorDialogComponent,
    NotFoundComponent,
    SignUpComponent,
    TempLandingPageComponent,
    ResetPasswordComponent,
    SignupResetCommonComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('sw-master.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    QuestionnaireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    LoginComponent,
    LoggerService,
    DialogSize,
    MatContactUsDialogService,
    AuthService,
    LoggerService,
    LocalStorageService,
    ContactUsDataService,
    FcmService,
    TimerService,
    SignUpService,
    CommonService,
    QuizService,
    MatLoginDialogService,
    ResetPasswordService,
    //VideoItem
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MatLoginDialogComponent,
    MatContactUsDialogComponent,
    ErrorDialogComponent,
  ],
})
export class AppModule {}
