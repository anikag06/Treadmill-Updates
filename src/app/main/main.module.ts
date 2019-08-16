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
import { MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatSlideToggleModule } from '@angular/material';
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
import { ScoreComponent } from './score/score.component';
import { PhqNineComponent } from './score/phq-nine/phq-nine.component';
import { GadSevenComponent } from './score/gad-seven/gad-seven.component';
import { InterpretationBiasGameComponent } from './games/games-list/common-game/interpretation-bias-game/interpretation-bias-game.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import {ProblemSolvingWorksheetsService} from '@/main/custom-forms/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import {FormsService} from '@/main/forms.service';
import {TasksService} from '@/main/custom-forms/forms/shared/tasks/tasks.service';
import { ExecutiveControlGameComponent } from './games/games-list/common-game/executive-control-game/executive-control-game.component';
import { CommonGameComponent } from './games/games-list/common-game/common-game.component';
import { GamesAuthService } from './games/shared/games-auth.service';
import { InterpretationBiasGameService } from './games/games-list/common-game/interpretation-bias-game/interpretation-bias-game.service';
import { GamePlayService } from './games/shared/game-play.service';
import { LearnedHelplessnessGameComponent } from './games/games-list/common-game/learned-helplessness-game/learned-helplessness-game.component';


@NgModule({
  declarations: [
    ModulesComponent,
    ModuleDetailComponent,
    ModuleItemComponent,
    ModuleOverviewComponent,
    ModuleListComponent,
    CategorySmallComponent,
    CategoryBigComponent,
    SectionCardComponent,
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
    ScoreComponent,
    PhqNineComponent,
    GadSevenComponent,
    InterpretationBiasGameComponent,
    DashboardComponent,
    MainComponent,
    ExecutiveControlGameComponent,
    CommonGameComponent,
    LearnedHelplessnessGameComponent,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
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
    ProblemSolvingWorksheetsService,
    FormsService,
    TasksService,
    InterpretationBiasGameService,
    GamePlayService,
    GamesAuthService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CreatePostComponent]
})
export class MainModule { }
