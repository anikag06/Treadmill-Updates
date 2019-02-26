import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
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
import { LandingPageComponent } from './pre-login/landing-page/landing-page.component';
import { ModulesComponent } from '@/main/modules/modules.component';
import { DashboardComponent } from '@/main/dashboard/dashboard.component';
import { PreLoginComponent } from '@/pre-login/pre-login.component';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { ModuleDetailComponent } from '@/main/modules/module-detail/module-detail.component';
import { ModuleItemComponent } from './main/modules/module-list/module-item/module-item.component';
import { ModuleOverviewComponent } from './main/modules/module-list/module-overview/module-overview.component';
import { ModuleListComponent } from './main/modules/module-list/module-list.component';
import { CategoryComponent } from './main/modules/module-list/module-overview/category/category.component';
import { LocalStorageService } from './shared/localstorage.service';
import { NotFoundComponent } from './shared/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MatLoginDialogComponent,
    PreLoginFooterComponent,
    MatContactUsDialogComponent,
    LandingPageComponent,
    ModulesComponent,
    DashboardComponent,
    PreLoginComponent,
    ModuleDetailComponent,
    ModuleItemComponent,
    ModuleOverviewComponent,
    ModuleListComponent,
    CategoryComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    LoginComponent,
    LoggerService,
    DialogSize,
    MatContactUsDialogService,
    LocalStorageService,
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatLoginDialogComponent, MatContactUsDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
