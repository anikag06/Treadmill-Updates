import { NgModule, CUSTOM_ELEMENTS_SCHEMA, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

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
import { TimeAgoPipe } from '../shared/time-ago.pipe';
import { ChatbotAvatarComponent } from './dashboard/chatbot-avatar/chatbot-avatar.component';
import { GamesComponent } from './games/games.component';
import { GamesListComponent } from './games/games-list/games-list.component';
import { GameItemComponent } from './games/games-list/game-item/game-item.component';
import { MaterialModule } from '@/material.module';
import { SupportGroupsComponent } from './support-groups/support-groups.component';
import { PostListComponent } from './support-groups/post-list/post-list.component';
import { PostItemComponent } from './support-groups/post-list/post-item/post-item.component';
import { SupportGroupsService } from './support-groups/support-groups.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from './support-groups/post-list/post-item/comment/comment.component';
import { CreatePostComponent } from './support-groups/create-post/create-post.component';
import { NestedCommentComponent } from './support-groups/post-list/post-item/nested-comment/nested-comment.component';
import { HttpClientModule} from '@angular/common/http';
import { AngularEditorModule } from '@xw19/angular-editor';
import { SanitizationService } from './support-groups/sanitization.service';
import { SafeHtmlPipe } from './support-groups/safe-html.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { ScrollingDirective } from './shared/scrolling.directive';
import { ScrollingService } from './shared/scrolling.service';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { GeneralErrorService } from './shared/general-error.service';
import { MainRoutingModule } from './main-routing.module';
import { AuthModule } from '@/auth.module';
import { CommentService } from './support-groups/post-list/post-item/comment/comment.service';
import { NetstedCommentService } from './support-groups/post-list/post-item/nested-comment/netsted-comment.service';
import { TagService } from './shared/tag.service';
import { AutofocusDirective } from './shared/autofocus.directive';
import { FormsComponent } from './forms/forms.component';
import { ProblemSolvingWorksheetsComponent } from './forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { ProsConsComponent } from './forms/problem-solving-worksheets/pros-cons/pros-cons.component';
import { ActionsComponent } from './forms/problem-solving-worksheets/actions/actions.component';
import { ProconItemComponent } from './forms/problem-solving-worksheets/pros-cons/procon-item/procon-item.component';
import { SolutionsComponent } from './forms/problem-solving-worksheets/solutions/solutions.component';
import { ScoreComponent } from './score/score.component';
import { PhqNineComponent } from './score/phq-nine/phq-nine.component';
import { GadSevenComponent } from './score/gad-seven/gad-seven.component';
import { InterpretationBiasGameComponent } from './games/games-list/interpretation-bias-game/interpretation-bias-game.component';

@NgModule({
  declarations: [
    ModulesComponent,
    DashboardComponent,
    ModuleDetailComponent,
    ModuleItemComponent,
    ModuleOverviewComponent,
    ModuleListComponent,
    CategorySmallComponent,
    CategoryBigComponent,
    SectionCardComponent,
    MainComponent,
    LogoutComponent,
    ProgressComponent,
    CurrentModuleComponent,
    ThingsTodoComponent,
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
    ScrollingDirective,
    NavbarComponent,
    AutofocusDirective,
    FormsComponent,
    ProblemSolvingWorksheetsComponent,
    ProsConsComponent,
    ActionsComponent,
    ProconItemComponent,
    SolutionsComponent,
    ScoreComponent,
    PhqNineComponent,
    GadSevenComponent,
    InterpretationBiasGameComponent,
  ],
  imports: [
    CommonModule,
    ChartsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    AuthModule,
    AngularEditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MainRoutingModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    LocalStorageService,
    SupportGroupsService,
    SanitizationService,
    ScrollingService,
    GeneralErrorService,
    CommentService,
    NetstedCommentService,
    TagService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CreatePostComponent]
})
export class MainModule { }
