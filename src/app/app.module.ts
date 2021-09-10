import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { MatLoginDialogComponent } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.component';
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
import { QuestionnaireDeprecatedModule } from './questionnaire-deprecated.module'
import {QuestionnaireModule} from '@/questionnaire.module';
import {QuestionnaireContainerModule} from '@/questionnaire-container.module';
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
import { QuizService } from '@/shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { QuestionnaireService } from '@/shared/questionnaire/questionnaire.service';
import {QuestionnaireContainerService} from '@/shared/questionnaire-container/questionnaire-container.service';
import { TempLandingPageComponent } from '@/temp-landing-page/temp-landing-page.component';
import { ResetPasswordComponent } from '@/pre-login/reset-password/reset-password.component';
import { SignupResetCommonComponent } from '@/pre-login/shared/signup-reset-common/signup-reset-common.component';
import { MatLoginDialogService } from '@/pre-login/login/mat-login-dialog/mat-login-dialog.service';
import { ResetPasswordService } from '@/pre-login/reset-password/reset-password.service';
import { MatRadioModule } from '@angular/material/radio';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonDialogComponent } from './shared/common-dialog/common-dialog.component';
import { PointsComponent } from '@/main/shared/points/points.component';
import { GlobalErrorHandler } from '@/shared/global-error-handler';
import {MatCardModule, MatTableModule} from '@angular/material';
// import {QuestionnaireContainerComponent} from '@/shared/questionnaire-container/questionnaire-container.component';

declare let $: any;

@NgModule({
  declarations: [
    AppComponent,
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
    CommonDialogComponent,
    PointsComponent,
    // QuestionnaireContainerComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerImmediately',
    }),
    AppRoutingModule,
    QuestionnaireDeprecatedModule,
    QuestionnaireModule,
    QuestionnaireContainerModule,
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
    MatRadioModule,
    MatTableModule,
    MatTooltipModule,
    MatCardModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'en-US' },
    DialogSize,
    MatContactUsDialogService,
    AuthService,
    LocalStorageService,
    ContactUsDataService,
    TimerService,
    SignUpService,
    CommonService,
    QuizService,
    QuestionnaireService,
    QuestionnaireContainerService,
    MatLoginDialogService,
    ResetPasswordService,
    // {provide: ErrorHandler, useClass: GlobalErrorHandler},
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MatLoginDialogComponent,
    MatContactUsDialogComponent,
    ErrorDialogComponent,
    CommonDialogComponent,
    PointsComponent,
  ],
  exports: [],
})
export class AppModule {}
