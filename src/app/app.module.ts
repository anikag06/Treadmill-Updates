import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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

import { AuthModule } from './auth.module';
import { MainModule } from '@/main/main.module';
import { ErrorDialogComponent } from './shared/error-dialog/error-dialog.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatLoginDialogComponent,
    PreLoginFooterComponent,
    MatContactUsDialogComponent,
    LandingPageComponent,
    PreLoginComponent,
    ErrorDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    MainModule,
    ServiceWorkerModule.register('sw-master.js', { enabled: environment.production })
  ],
  providers: [
    LoginComponent,
    LoggerService,
    DialogSize,
    MatContactUsDialogService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatLoginDialogComponent, MatContactUsDialogComponent, ErrorDialogComponent],
})
export class AppModule { }
