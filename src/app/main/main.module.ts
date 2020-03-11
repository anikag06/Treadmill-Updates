import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';

import { DashboardComponent } from '@/main/dashboard/dashboard.component';
import { CategorySmallComponent } from './shared/category-small/category-small.component';
import { LocalStorageService } from '../shared/localstorage.service';
import { MainComponent } from './main.component';
import { LogoutComponent } from '../shared/auth/logout/logout.component';
import { ProgressComponent } from './dashboard/progress/progress.component';
import { ThingsTodoComponent } from './dashboard/things-todo/things-todo.component';
import { TimeAgoPipe } from '../shared/time-ago.pipe';
import { TrimStringPipe } from './shared/trim-string.pipe';
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
import { HttpClientModule } from '@angular/common/http';
import { AngularEditorModule } from '@arkaghosh024/angular-editor';
import { SanitizationService } from './shared/sanitization.service';
import { SafeHtmlPipe } from './support-groups/safe-html.pipe';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatExpansionModule,
  MatRippleModule,
} from '@angular/material';
import { MatProgressBarModule } from '@angular/material';
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
// tslint:disable-next-line:max-line-length
import { InterpretationBiasGameComponent } from './games/games-list/common-game/interpretation-bias-game/interpretation-bias-game.component';

import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsService } from '@/main/forms.service';
import { ExecutiveControlGameComponent } from './games/games-list/common-game/executive-control-game/executive-control-game.component';
import { CommonGameComponent } from './games/games-list/common-game/common-game.component';
import { GamesAuthService } from './games/shared/games-auth.service';
import { GamePlayService } from './games/shared/game-play.service';
import { GamesBadgesService } from '@/main/games/shared/games-badges.service';
// tslint:disable-next-line:max-line-length
import { LearnedHelplessnessGameComponent } from './games/games-list/common-game/learned-helplessness-game/learned-helplessness-game.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { ChatWindowComponent } from './chatbot/chat-window/chat-window.component';
import { ChatbotService } from '@/main/chatbot/chatbot.service';
import { SlideService } from './resources/slides/slide.service';
import { ProblemSolvingWorksheetsService } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.service';
import { ExperimentToTestBeliefService } from '@/main/resources/forms/experiment-to-test-belief-form/experiment-to-test-belief.service';
// import { DataService } from '@/shared/questionnaire/data.service';
import { PlotScoreGraphService } from './score/plot-score-graph.service';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireModule } from '@angular/fire';
// import {FcmService} from '@/shared/fcm.service';
import { environment } from '../../environments/environment';
import { AttributeStyleGameComponent } from './games/games-list/common-game/attribute-style-game/attribute-style-game.component';
import { PassDataService } from './resources/conversation-group/passdata.service';

import { FriendlyFaceGameComponent } from '@/main/games/games-list/common-game/friendly-face-game/friendly-face-game.component';
import { MentalImageryComponent } from '@/main/games/games-list/common-game/mental-imagery/mental-imagery.component';
import { MiInstructionsComponent } from '@/main/games/games-list/common-game/mental-imagery/mi-instructions/mi-instructions.component';
import { MiPlayComponent } from '@/main/games/games-list/common-game/mental-imagery/mi-play/mi-play.component';
import { MIGameAutofocusDirective } from '@/main/games/games-list/common-game/mental-imagery/mi-autofocus.directive';
import { MICurrentStateService } from '@/main/games/games-list/common-game/mental-imagery/mi-current-state.service';
import { TasksService } from './resources/forms/shared/tasks/tasks.service';
import { FlowComponent } from './flow/flow.component';
import { StepGroupComponent } from './flow/step-group/step-group.component';
import { FlowService } from './flow/flow.service';
import { StepComponent } from './flow/step-group/step/step.component';
import { StepsIndicatorComponent } from './flow/step-group/steps-indicator/steps-indicator.component';
// import { QuizService } from '@/shared/questionnaire/questionnaire.service';
import { FlowStepNavigationService } from './shared/flow-step-navigation.service';
import { IntroduceComponent } from './shared/introduce/introduce.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { NavbarFlowComponent } from './shared/navbar/navbar-flow/navbar-flow.component';
import { NavbarFlowDirective } from './shared/navbar/navbar-flow.directive';
import { NavbarNotificationDirective } from './shared/navbar/navbar-notification.directive';
import { NavbarNotificationsComponent } from './shared/navbar/navbar-notifications/navbar-notifications.component';
import { NavbarNotificationsService } from './shared/navbar/navbar-notifications.service';
import { NotificationItemComponent } from './shared/navbar/navbar-notifications/notification-item/notification-item.component';
// tslint:disable-next-line: max-line-length
import { IbGameInstructionsComponent } from './games/games-list/common-game/interpretation-bias-game/ib-game-instructions/ib-game-instructions.component';
// tslint:disable-next-line: max-line-length
import { IbMainTrainingComponent } from './games/games-list/common-game/interpretation-bias-game/ib-main-training/ib-main-training.component';
// tslint:disable-next-line: max-line-length
import { IbTrainingDataService } from '@/main/games/games-list/common-game/interpretation-bias-game/ib-main-training/ib-training-data.service';
import { CustomOverlayDirective } from './shared/custom-dialog/custom-overlay.directive';
import { DialogContainerComponent } from './shared/custom-dialog/dialog-container/dialog-container.component';
import { DialogBoxService } from './shared/custom-dialog/dialog-box.service';
import { DialogBoxChildDirective } from './shared/custom-dialog/dialog-container/dialog-box-child.directive';
// tslint:disable-next-line: max-line-length
import { ExecControlInstructionsComponent } from './games/games-list/common-game/executive-control-game/exec-control-instructions/exec-control-instructions.component';
// tslint:disable-next-line: max-line-length
import { ExecControlHelpService } from '@/main/games/games-list/common-game/executive-control-game/exec-control-instructions/exec-control-help.service';
import { MiWinComponent } from './games/games-list/common-game/mental-imagery/mi-win/mi-win.component';
import { EcgScienceComponent } from './games/games-list/common-game/executive-control-game/ecg-science/ecg-science.component';
import { IbgScienceComponent } from './games/games-list/common-game/interpretation-bias-game/ibg-science/ibg-science.component';
import { AsgScienceComponent } from './games/games-list/common-game/attribute-style-game/asg-science/asg-science.component';
import { MigScienceComponent } from './games/games-list/common-game/mental-imagery/mig-science/mig-science.component';
import { FfgScienceComponent } from './games/games-list/common-game/friendly-face-game/ffg-science/ffg-science.component';
import { LhgScienceComponent } from './games/games-list/common-game/learned-helplessness-game/lhg-science/lhg-science.component';
import { UserProfileComponent } from './shared/user-profile/user-profile.component';
import { UserProfileService } from './shared/user-profile/userProfile.service';
import { BadgesComponent } from './shared/user-profile/badges/badges.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { QuestionnaireModule } from '@/questionnaire.module';
import { GetQuestionnaireComponent } from './dashboard/get-questionnaire/get-questionnaire.component';
import { IdcHeadingComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-heading/idc-heading.component';
import { IdcMainComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-main/idc-main.component';
import { IdcNatComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-nat/idc-nat.component';
import { IdcOptionSolutionComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-option-solution/idc-option-solution.component';
import { IdcOptionsComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-options/idc-options.component';
import { IdcOptionsPopupProceedComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-options-popup-proceed/idc-options-popup-proceed.component';
import { IdcPopupComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-popup/idc-popup.component';
import { IdcScoreComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-score/idc-score.component';
import { IdcSelectedOptionComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-selected-option/idc-selected-option.component';
import { IdcSelectedOptionContentComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-selected-option-content/idc-selected-option-content.component';
import { IdcSituationComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-situation/idc-situation.component';
import { IdentifyCognitiveDistortionComponent } from './games/games-list/common-game/identify-cognitive-distortion/identify-cognitive-distortion.component';
import { IdcInstructionsComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-instructions/idc-instructions.component';
import { IdcInfoComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-info/idc-info.component';
import { IdcWinComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-win/idc-win.component';
import { IdcTimeComponent } from './games/games-list/common-game/identify-cognitive-distortion/idc-time/idc-time.component';
import { IdcGameService } from './games/games-list/common-game/identify-cognitive-distortion/idc-game.service';
import { LhgInstructionsComponent } from './games/games-list/common-game/learned-helplessness-game/lhg-instructions/lhg-instructions.component';
import { LhgHowtoplayComponent } from './games/games-list/common-game/learned-helplessness-game/lhg-howtoplay/lhg-howtoplay.component';
import { LhgPlaynextgameComponent } from './games/games-list/common-game/learned-helplessness-game/lhg-playnextgame/lhg-playnextgame.component';
import { FfgNextgameComponent } from './games/games-list/common-game/friendly-face-game/ffg-nextgame/ffg-nextgame.component';
import { FfgInstructionsComponent } from './games/games-list/common-game/friendly-face-game/ffg-instructions/ffg-instructions.component';
import { FfgPlayagainComponent } from './games/games-list/common-game/friendly-face-game/ffg-playagain/ffg-playagain.component';
import { FfgNolifeComponent } from './games/games-list/common-game/friendly-face-game/ffg-nolife/ffg-nolife.component';
import { LoadingBarComponent } from './games/shared/loading-bar/loading-bar.component';
import { LoadingBarDirective } from './games/shared/loading-bar.directive';
import { LoadingBarService } from './games/shared/loading-bar.service';
import { LhgGreatComponent } from './games/games-list/common-game/learned-helplessness-game/lhg-great/lhg-great.component';
import { StepsDataService } from './resources/shared/steps-data.service';
import { ResourcesModule } from './resources/resources.module';
import { SuggestedPostComponent } from './dashboard/suggested-post/suggested-post.component';
import { SuggestedPostItemComponent } from './dashboard/suggested-post/suggested-post-item/suggested-post-item.component';
import { WorryProductivelyService } from '@/main/resources/forms/worry-productively-form/worry-productively.service';
import { InfiniteScrollDirective } from './shared/infinite-scroll/infinite-scroll.directive';
import { LazyLoadingImageDirective } from './shared/lazy-loading-image/lazy-loading-image.directive';
import { ToastNotificationComponent } from '@/shared/toast-notification/toast-notification.component';
import { ToastNotificationDirective } from '@/shared/toast-notification/toast-notification.directive';
import { SurveyComponent } from './shared/survey/survey.component';
import { SurveyService } from './shared/survey.service';
import { DisableClickDirective } from '@/shared/disable-click.directive';
import { SlidesVideoComponent } from './resources/slides/slides-video/slides-video.component';
import { GamesFeedbackComponent } from './games/games-list/common-game/games-feedback/games-feedback.component';
import { GamesFeedbackService } from './games/games-list/common-game/games-feedback/games-feedback.service';
import { ThingsTodoService } from '@/main/dashboard/things-todo/things-todo.service';

@NgModule({
  declarations: [
    CategorySmallComponent,
    LogoutComponent,
    ProgressComponent,
    ThingsTodoComponent,
    TimeAgoPipe,
    TrimStringPipe,
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
    DashboardComponent,
    MainComponent,
    ChatbotComponent,
    ChatWindowComponent,
    AttributeStyleGameComponent,
    FriendlyFaceGameComponent,
    MentalImageryComponent,
    MiInstructionsComponent,
    MiPlayComponent,
    MIGameAutofocusDirective,
    FlowComponent,
    StepGroupComponent,
    StepComponent,
    StepsIndicatorComponent,
    IntroduceComponent,
    NavbarFlowComponent,
    NavbarFlowDirective,
    NavbarNotificationDirective,
    NavbarNotificationsComponent,
    NotificationItemComponent,
    IbGameInstructionsComponent,
    IbMainTrainingComponent,
    CustomOverlayDirective,
    DialogContainerComponent,
    DialogBoxChildDirective,
    ExecControlInstructionsComponent,
    MiWinComponent,
    EcgScienceComponent,
    IbgScienceComponent,
    AsgScienceComponent,
    MigScienceComponent,
    FfgScienceComponent,
    LhgScienceComponent,
    UserProfileComponent,
    BadgesComponent,
    GetQuestionnaireComponent,
    IdcHeadingComponent,
    IdcMainComponent,
    IdcNatComponent,
    IdcOptionSolutionComponent,
    IdcOptionsComponent,
    IdcOptionsPopupProceedComponent,
    IdcPopupComponent,
    IdcScoreComponent,
    IdcSelectedOptionComponent,
    IdcSelectedOptionContentComponent,
    IdcSituationComponent,
    IdentifyCognitiveDistortionComponent,
    IdcInstructionsComponent,
    IdcInfoComponent,
    IdcWinComponent,
    IdcTimeComponent,
    LhgInstructionsComponent,
    LhgHowtoplayComponent,
    LhgPlaynextgameComponent,
    FfgNextgameComponent,
    FfgInstructionsComponent,
    FfgPlayagainComponent,
    FfgNolifeComponent,
    LoadingBarComponent,
    LoadingBarDirective,
    LhgGreatComponent,
    SuggestedPostComponent,
    SuggestedPostItemComponent,
    LazyLoadingImageDirective,
    InfiniteScrollDirective,
    ToastNotificationComponent,
    ToastNotificationDirective,
    SurveyComponent,
    DisableClickDirective,
    GamesFeedbackComponent,
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
    MatProgressBarModule,
    ReactiveFormsModule,
    MainRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireMessagingModule,
    OverlayModule,
    MatTooltipModule,
    QuestionnaireModule,
    ResourcesModule,
    MatRippleModule,
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
    ExperimentToTestBeliefService,
    FormsService,
    TasksService,
    GamePlayService,
    GamesAuthService,
    ChatbotService,
    SlideService,
    PlotScoreGraphService,
    MICurrentStateService,
    FlowService,
    PassDataService,
    FlowStepNavigationService,
    NavbarNotificationsService,
    GamesBadgesService,
    IbTrainingDataService,
    DialogBoxService,
    ExecControlHelpService,
    UserProfileService,
    IdcGameService,
    LoadingBarService,
    StepsDataService,
    WorryProductivelyService,
    SurveyService,
    ThingsTodoService,
    GamesFeedbackService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    CreatePostComponent,
    IntroduceComponent,
    NavbarFlowComponent,
    NavbarNotificationsComponent,
    IbGameInstructionsComponent,
    IbMainTrainingComponent,
    DialogContainerComponent,
    ExecControlInstructionsComponent,
    MiInstructionsComponent,
    MiWinComponent,
    EcgScienceComponent,
    IbgScienceComponent,
    AsgScienceComponent,
    MigScienceComponent,
    FfgScienceComponent,
    LhgScienceComponent,
    IdcPopupComponent,
    IdcInstructionsComponent,
    IdcInfoComponent,
    IdcWinComponent,
    IdcTimeComponent,
    LhgHowtoplayComponent,
    LhgInstructionsComponent,
    LhgPlaynextgameComponent,
    LhgGreatComponent,
    FfgNextgameComponent,
    FfgInstructionsComponent,
    FfgPlayagainComponent,
    FfgNolifeComponent,
    LoadingBarComponent,
    ToastNotificationComponent,
    SlidesVideoComponent,
    GamesFeedbackComponent,
  ],
})
export class MainModule { }
