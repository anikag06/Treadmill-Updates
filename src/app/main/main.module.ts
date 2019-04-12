import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
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
import { MainComponent } from './main.component';
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
import { SupportGroupsComponent } from './support-groups/support-groups.component';
import { PostListComponent } from './support-groups/post-list/post-list.component';
import { PostItemComponent } from './support-groups/post-list/post-item/post-item.component';
import { SupportGroupsService } from './support-groups/support-groups.service';
import { FormsModule } from '@angular/forms';
import { CommentComponent } from './support-groups/post-list/post-item/comment/comment.component';
import { CreatePostComponent } from './support-groups/create-post/create-post.component';
import { NestedCommentComponent } from './support-groups/post-list/post-item/nested-comment/nested-comment.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@xw19/angular-editor';
import { SanitizationService } from './support-groups/sanitization.service';
import { SafeHtmlPipe } from './support-groups/safe-html.pipe';
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
    MainComponent,
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
    SupportGroupsComponent,
    PostListComponent,
    PostItemComponent,
    CommentComponent,
    CreatePostComponent,
    NestedCommentComponent,
    SafeHtmlPipe,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AngularEditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [
    LocalStorageService,
    SupportGroupsService,
    SanitizationService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CreatePostComponent]
})
export class MainModule { }
