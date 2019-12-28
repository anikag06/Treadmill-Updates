import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from '@/material.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
import { MatSignupDialogComponent } from './pre-login/signup/mat-signup-dialog/mat-signup-dialog.component';
import { SignupComponent } from '@/pre-login/signup/signup.component';
import { QuestionnaireModule } from './questionnaire.module';
import { ContactUsDataService } from './shared/mat-contact-us-dialog/contact-us-data.service';
import { FcmService } from './shared/fcm.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
declare let $: any;

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatLoginDialogComponent,
    MatSignupDialogComponent,
    PreLoginFooterComponent,
    PreLoginComponent,
    MatContactUsDialogComponent,
    LandingPageComponent,
    ErrorDialogComponent,
    NotFoundComponent,
    SignupComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    ServiceWorkerModule.register('sw-master.js', {
      enabled: environment.production,
    }),
    AppRoutingModule,
    QuestionnaireModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
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
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    MatLoginDialogComponent,
    MatContactUsDialogComponent,
    ErrorDialogComponent,
    MatSignupDialogComponent,
  ],
})
export class AppModule {}
