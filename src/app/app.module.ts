import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from '@/material.module';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from '@/app-routing.module';
import { AppComponent } from '@/app.component';
import { LoginComponent } from '@/login/login.component';
import { MatLoginDialogComponent } from '@/login/mat-login-dialog/mat-login-dialog.component';
import { MatPreLoginToolbarComponent } from './shared/pre-login/mat-pre-login-toolbar/mat-pre-login-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatLoginDialogComponent,
    MatPreLoginToolbarComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [MatLoginDialogComponent]
})
export class AppModule { }
