import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesComponent } from '@/main/modules/modules.component';
import { DashboardComponent } from '@/main/dashboard/dashboard.component';
import { ModuleDetailComponent } from './modules/module-detail/module-detail.component';
import { ModuleItemComponent } from './modules/module-list/module-item/module-item.component';
import { ModuleOverviewComponent } from './modules/module-list/module-overview/module-overview.component';
import { ModuleListComponent } from './modules/module-list/module-list.component';
import { CategorySmallComponent } from './shared/category-small/category-small.component';
import { LocalStorageService } from '../shared/localstorage.service';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { CategoryBigComponent } from './modules/module-detail/category-big/category-big.component';
import { SectionCardComponent } from './modules/module-detail/section-card/section-card.component';
import { SideNavComponent } from './shared/side-nav/side-nav.component';
import { LogoutComponent } from '../shared/auth/logout/logout.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { CurrentModuleComponent } from './dashboard/current-module/current-module.component';
import { ThingsTodoComponent } from './dashboard/things-todo/things-todo.component';
import { NotificationsSideComponent } from './dashboard/notifications-side/notifications-side.component';
import { TimeAgoPipe } from '../shared/time-ago.pipe';
import { ChatbotAvatarComponent } from './dashboard/chatbot-avatar/chatbot-avatar.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GameItemComponent } from './games/games-list/game-item/game-item.component';
import { AppRoutingModule } from '@/app-routing.module';
import { MaterialModule } from '@/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material';

@NgModule({
  declarations: [
    ModulesComponent,
    DashboardComponent,
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
    GameItemComponent
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    LocalStorageService
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainModule { }
