import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '@/main/resources/forms/forms.component';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { ProsConsComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/pros-cons.component';
import { SolutionsComponent } from '@/main/resources/forms/problem-solving-worksheets/solutions/solutions.component';
import { ProblemFormComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-form/problem-form.component';
import { ResultComponent } from '@/main/resources/forms/problem-solving-worksheets/result/result.component';
import { TasksComponent } from '@/main/resources/forms/shared/tasks/tasks.component';
import { FormsListComponent } from '@/main/resources/forms/forms-list/forms-list.component';
import { MaterialModule } from '@/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@xw19/angular-editor';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatDialogModule,
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsSidebarComponent } from './forms/shared/forms-sidebar/forms-sidebar.component';
import { ResourcesRoutingModule } from '@/main/resources/resources-routing.module';
// tslint:disable-next-line:max-line-length
import { ProconItemComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/procon-item/procon-item.component';
// tslint:disable-next-line:max-line-length
import { ProsConsContainerComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons-container.component';
import { TaskFormsComponent } from './forms/task-forms/task-forms.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SlidesComponent } from './slides/slides.component';
import { FormDirective } from './slides/form.directive';
import { ConversationGroupComponent } from './conversation-group/conversation-group.component';
import { ConversationsComponent } from './conversation-group/conversations/conversations.component';
import { SlideService } from './slides/slide.service';
import { CongratsDialogComponent } from './shared/congrats-dialog/congrats-dialog.component';
import { CommonDialogsService } from './shared/common-dialogs.service';
import { ConclusionPageComponent } from './conclusion-page/conclusion-page.component';
import { StepsDataService } from './shared/steps-data.service';
import { UserFeedbackComponent } from './shared/user-feedback/user-feedback.component';

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
    ConclusionPageComponent,
    UserFeedbackComponent,
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
  ],
  providers: [
    SlideService,
    CommonDialogsService,
    StepsDataService,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [CongratsDialogComponent, ProblemFormComponent, ProblemSolvingWorksheetsComponent]
})
export class ResourcesModule {
}
