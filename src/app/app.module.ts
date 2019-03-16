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
import { LandingPageComponent } from '@/pre-login/landing-page/landing-page.component';
import { ModulesComponent } from '@/main/modules/modules.component';
import { DashboardComponent } from '@/main/dashboard/dashboard.component';
import { PreLoginComponent } from '@/pre-login/pre-login.component';
import { MatContactUsDialogService } from '@/shared/mat-contact-us-dialog/mat-contact-us-dialog.service';
import { ModuleDetailComponent } from '@/main/modules/module-detail/module-detail.component';
import { ModuleItemComponent } from '@/main/modules/module-list/module-item/module-item.component';
import { ModuleOverviewComponent } from '@/main/modules/module-list/module-overview/module-overview.component';
import { ModuleListComponent } from '@/main/modules/module-list/module-list.component';
import { CategorySmallComponent } from '@/main/modules/module-list/module-overview/category-small/category-small.component';
import { LocalStorageService } from '@/shared/localstorage.service';
import { NotFoundComponent } from '@/shared/not-found/not-found.component';
import { CategoryBigComponent } from './main/modules/module-detail/category-big/category-big.component';
import { SectionCardComponent } from '@/main/modules/module-detail/section-card/section-card.component';
import { AuthService } from './shared/auth/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AuthModule } from './auth.module';
import { SideNavComponent } from '@/main/shared/side-nav/side-nav.component';
import { LogoutComponent } from './shared/auth/logout/logout.component';
import { ProgressComponent } from './main/dashboard/progress/progress.component';
import { CurrentModuleComponent } from './main/dashboard/current-module/current-module.component';
import { ThingsTodoComponent } from './main/dashboard/things-todo/things-todo.component';
import { NotificationsSideComponent } from './main/dashboard/notifications-side/notifications-side.component';
import { TimeAgoPipe } from './shared/time-ago.pipe';
import { ChatbotAvatarComponent } from './main/dashboard/chatbot-avatar/chatbot-avatar.component';
import { GamesComponent } from './main/games/games.component';
import { GamesListComponent } from './main/games/games-list/games-list.component';
import { GameItemComponent } from './main/games/games-list/game-item/game-item.component';

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
    CategorySmallComponent,
    NotFoundComponent,
    CategoryBigComponent,
    SectionCardComponent,
    SideNavComponent,
    LogoutComponent,
    ProgressComponent,
    CurrentModuleComponent,
    ThingsTodoComponent,
    NotificationsSideComponent,
    TimeAgoPipe,
    ChatbotAvatarComponent,
    GamesComponent,
    GamesListComponent,
    GameItemComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    AppRoutingModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    ServiceWorkerModule.register('sw-master.js', { enabled: environment.production })
  ],
  providers: [
    LoginComponent,
    LoggerService,
    DialogSize,
    MatContactUsDialogService,
    LocalStorageService,
    AuthService
  ],
  bootstrap: [AppComponent],
  entryComponents: [MatLoginDialogComponent, MatContactUsDialogComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
