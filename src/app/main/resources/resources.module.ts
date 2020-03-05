import { FormsListComponent } from '@/main/resources/forms/forms-list/forms-list.component';
import { FormsComponent } from '@/main/resources/forms/forms.component';
import { ProblemFormComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-form/problem-form.component';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
// tslint:disable-next-line:max-line-length
import { ProsConsContainerComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons-container.component';
// tslint:disable-next-line:max-line-length
import { ProconItemComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/procon-item/procon-item.component';
import { ProsConsComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/pros-cons.component';
import { ResultComponent } from '@/main/resources/forms/problem-solving-worksheets/result/result.component';
import { SolutionsComponent } from '@/main/resources/forms/problem-solving-worksheets/solutions/solutions.component';
import { TasksComponent } from '@/main/resources/forms/shared/tasks/tasks.component';
import { ResourcesRoutingModule } from '@/main/resources/resources-routing.module';
import { MaterialModule } from '@/material.module';
import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatIconModule,
  MatListModule,
  MatRadioModule,
  MatSidenavModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatToolbarModule,
  MatTooltipModule,
  MatBottomSheetModule,
} from '@angular/material';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DateTimePickerComponent } from '../shared/date-time-picker/date-time-picker.component';
import { ConclusionComponent } from './conclusion/conclusion.component';
import { ConclusionService } from './conclusion/conclusion.service';
import { Conclusion1Component } from './conclusion/conclusion1/conclusion1.component';
import { Conclusion2Component } from './conclusion/conclusion2/conclusion2.component';
import { Conclusion3Component } from './conclusion/conclusion3/conclusion3.component';
import { Conclusion4Component } from './conclusion/conclusion4/conclusion4.component';
import { Conclusion5Component } from './conclusion/conclusion5/conclusion5.component';
import { ConversationGroupComponent } from './conversation-group/conversation-group.component';
import { ConversationsComponent } from './conversation-group/conversations/conversations.component';
import { EttbfBeliefComponent } from './forms/experiment-to-test-belief-form/ettbf-belief/ettbf-belief.component';
import { EttbfOutcomeComponent } from './forms/experiment-to-test-belief-form/ettbf-outcome/ettbf-outcome.component';
import { ExperimentToTestBeliefFormComponent } from './forms/experiment-to-test-belief-form/experiment-to-test-belief-form.component';
import { FormSliderComponent } from './forms/shared/form-slider/form-slider.component';
import { FormsSidebarComponent } from './forms/shared/forms-sidebar/forms-sidebar.component';
import { TaskFormsComponent } from './forms/task-forms/task-forms.component';
import { ThoughtRecordFormComponent } from './forms/thought-record-form/thought-record-form.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { Introduction1Component } from './introduction/introduction1/introduction1.component';
import { IntroductionService } from './introduction/introduction.service';
import { Introduction2Component } from './introduction/introduction2/introduction2.component';
import { Introduction3Component } from './introduction/introduction3/introduction3.component';
import { Introduction4Component } from './introduction/introduction4/introduction4.component';
import { Introduction5Component } from './introduction/introduction5/introduction5.component';
import { CommonDialogsService } from './shared/common-dialogs.service';
import { CongratsDialogComponent } from './shared/congrats-dialog/congrats-dialog.component';
import { StepsDataService } from './shared/steps-data.service';
import { FormDirective } from './slides/form.directive';
import { UserFeedbackComponent } from './shared/user-feedback/user-feedback.component';
import { SlideService } from './slides/slide.service';
import { SlidesComponent } from './slides/slides.component';
import { ClickOutsideDirective } from '../shared/click-outside/click-outside.directive';
import { WorryProductivelyComponent } from '@/main/resources/forms/worry-productively-form/worry-productively.component';
import { WorryFormComponent } from '@/main/resources/forms/worry-productively-form/worry-form/worry-form.component';
import { TechniquesComponent } from './forms/worry-productively-form/techniques/techniques.component';
import { EvaluateWorryComponent } from './forms/worry-productively-form/techniques/evaluate-worry/evaluate-worry.component';
import { MoodWidgetCardComponent } from './forms/thought-record-form/mood-widget-card/mood-widget-card.component';
import { FormCardComponent } from './forms/thought-record-form/form-card/form-card.component';
import { MoodTrackerComponent } from '../shared/mood-tracker/mood-tracker.component';
import { FaceMyWorstFearComponent } from './forms/worry-productively-form/techniques/face-my-worst-fear/face-my-worst-fear.component';
import { WpfDealWithWorryComponent } from './forms/worry-productively-form/techniques/wpf-deal-with-worry/wpf-deal-with-worry.component';
import { WpfProblemSolvingComponent } from './forms/worry-productively-form/techniques/wpf-problem-solving/wpf-problem-solving.component';
import { IdentifyThinkingService } from './forms/thought-record-form/thought-record-techniques/identify-thinking/identify-thinking.service';
import { AngularEditorModule } from '@arkaghosh024/angular-editor';
import { ModifyBeliefsComponent } from './forms/worry-productively-form/techniques/modify-beliefs/modify-beliefs.component';
// tslint:disable-next-line:max-line-length
import { ThoughtRecordTechniquesComponent } from './forms/thought-record-form/thought-record-techniques/thought-record-techniques.component';
import { TechniquesInfoComponent } from './forms/shared/techniques-info/techniques-info.component';
// tslint:disable-next-line:max-line-length
import { IdentifyThinkingComponent } from './forms/thought-record-form/thought-record-techniques/identify-thinking/identify-thinking.component';
import { ControlContentComponent } from './control-content/control-content.component';

import { ProofComponent } from './forms/thought-record-form/thought-record-techniques/proof/proof.component';
import { EvidenceFormComponent } from './forms/thought-record-form/thought-record-techniques/proof/evidence-form/evidence-form.component';
// tslint:disable-next-line:max-line-length
import { AlternativeExplanationComponent } from './forms/thought-record-form/thought-record-techniques/alternative-explanation/alternative-explanation.component';
import { RecordOutcomeComponent } from './forms/thought-record-form/thought-record-techniques/record-outcome/record-outcome.component';
import { FormTextareaComponent } from './forms/shared/form-textarea/form-textarea.component';
import { ThoughtHelpComponent } from './forms/thought-record-form/thought-record-techniques/thought-help/thought-help.component';
import { TellFriendComponent } from './forms/thought-record-form/thought-record-techniques/tell-friend/tell-friend.component';
import { ThoughtRecordService } from '@/main/resources/forms/thought-record-form/thought-record.service';
import { MoodTrackerService } from '@/main/shared/mood-tracker/mood-tracker.service';
import { ProofService } from '@/main/resources/forms/thought-record-form/thought-record-techniques/proof/proof.service';
import { AlternativeExplanationService } from './forms/thought-record-form/thought-record-techniques/alternative-explanation/alternative-explanation.service';
import { RecordOutcomeService } from './forms/thought-record-form/thought-record-techniques/record-outcome/record-outcome.service';
import { ThoughtHelpService } from './forms/thought-record-form/thought-record-techniques/thought-help/thought-help.service';
import { TellFriendService } from '@/main/resources/forms/thought-record-form/thought-record-techniques/tell-friend/tell-friend.service';
import { BeliefChangeComponent } from './forms/belief-change/belief-change.component';
import { NegativeBeliefComponent } from './forms/belief-change/negative-belief/negative-belief.component';
import { CommonBeliefComponent } from './forms/belief-change/negative-belief/common-belief/common-belief.component';
import { NegativeThoughtCardComponent } from './forms/thought-record-form/negative-thought-card/negative-thought-card.component';
import { BeliefChangeTechniquesComponent } from './forms/belief-change/belief-change-techniques/belief-change-techniques.component';
import { BeliefChangeService } from '@/main/resources/forms/belief-change/belief-change.service';
import { ProofBeliefComponent } from './forms/belief-change/belief-change-techniques/proof-belief/proof-belief.component';
import { BeliefEvidencesComponent } from './forms/belief-change/belief-change-techniques/proof-belief/belief-evidences/belief-evidences.component';
import { ProofBeliefService } from '@/main/resources/forms/belief-change/belief-change-techniques/proof-belief/proof-belief.service';
import { TellFriendBeliefComponent } from './forms/belief-change/belief-change-techniques/tell-friend-belief/tell-friend-belief.component';
import { TellFriendBeliefService } from '@/main/resources/forms/belief-change/belief-change-techniques/tell-friend-belief/tell-friend-belief.service';
import { ActAsIfComponent } from './forms/belief-change/belief-change-techniques/act-as-if/act-as-if.component';
import { ActAsIfService } from '@/main/resources/forms/belief-change/belief-change-techniques/act-as-if/act-as-if.service';
import { NegativeBeliefFinalComponent } from './forms/belief-change/negative-belief-final/negative-belief-final.component';
import { FormMessageComponent } from './forms/shared/form-message/form-message.component';
import { FormQuoteComponent } from './forms/shared/form-quote/form-quote.component';
import { SlidesBottomsheetComponent } from './slides/slides-bottomsheet/slides-bottomsheet.component';
import { SlidesVideoComponent } from './slides/slides-video/slides-video.component';
import { ConversationsService } from './conversation-group/conversations.service';

@NgModule({
  declarations: [
    FormsComponent,
    ProblemSolvingWorksheetsComponent,
    ProsConsComponent,
    ProconItemComponent,
    SolutionsComponent,
    ProblemFormComponent,
    ProsConsContainerComponent,
    ResultComponent,
    TasksComponent,
    FormsListComponent,
    FormsSidebarComponent,
    TaskFormsComponent,
    SlidesComponent,
    FormDirective,
    ConversationGroupComponent,
    ConversationsComponent,
    CongratsDialogComponent,
    UserFeedbackComponent,
    IntroductionComponent,
    Introduction1Component,
    Introduction2Component,
    Introduction3Component,
    Introduction4Component,
    Introduction5Component,
    ConclusionComponent,
    Conclusion1Component,
    Conclusion2Component,
    Conclusion3Component,
    Conclusion4Component,
    Conclusion5Component,
    ThoughtRecordFormComponent,
    ExperimentToTestBeliefFormComponent,
    EttbfBeliefComponent,
    EttbfOutcomeComponent,
    FormSliderComponent,
    WorryProductivelyComponent,
    WorryFormComponent,
    TechniquesComponent,
    EvaluateWorryComponent,
    FaceMyWorstFearComponent,
    WpfProblemSolvingComponent,
    WpfDealWithWorryComponent,
    FormCardComponent,
    MoodTrackerComponent,
    MoodWidgetCardComponent,
    ThoughtRecordTechniquesComponent,
    TechniquesInfoComponent,
    IdentifyThinkingComponent,
    ProofComponent,
    ClickOutsideDirective,
    EvidenceFormComponent,
    AlternativeExplanationComponent,
    RecordOutcomeComponent,
    FormTextareaComponent,
    ThoughtHelpComponent,
    TellFriendComponent,
    DateTimePickerComponent,
    ModifyBeliefsComponent,
    BeliefChangeComponent,
    NegativeBeliefComponent,
    CommonBeliefComponent,
    NegativeThoughtCardComponent,
    BeliefChangeTechniquesComponent,
    ProofBeliefComponent,
    BeliefEvidencesComponent,
    TellFriendBeliefComponent,
    ActAsIfComponent,
    NegativeBeliefFinalComponent,
    FormMessageComponent,
    FormQuoteComponent,
    ControlContentComponent,
    SlidesBottomsheetComponent,
    SlidesVideoComponent,
  ],
  imports: [
    ResourcesRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    AngularEditorModule,
    LayoutModule,
    MatToolbarModule,
    MatTooltipModule,
    MatButtonModule,
    MatDialogModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatMomentDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatRadioModule,
    MatSnackBarModule,
    MatBottomSheetModule,
  ],
  providers: [
    SlideService,
    CommonDialogsService,
    StepsDataService,
    IntroductionService,
    ConclusionService,
    ThoughtRecordService,
    IdentifyThinkingService,
    ProofService,
    MoodTrackerService,
    AlternativeExplanationService,
    RecordOutcomeService,
    ThoughtHelpService,
    TellFriendService,
    BeliefChangeService,
    ProofBeliefService,
    TellFriendBeliefService,
    ActAsIfService,
    ConversationsService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [
    CongratsDialogComponent,
    ProblemFormComponent,
    ProblemSolvingWorksheetsComponent,
    MoodTrackerComponent,
    TechniquesInfoComponent,
    DateTimePickerComponent,
    CommonBeliefComponent,
    SlidesBottomsheetComponent,
  ],
  exports: [
    DateTimePickerComponent,
    ClickOutsideDirective,
    MoodTrackerComponent,
  ],
})
export class ResourcesModule { }
