import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsComponent } from '@/main/resources/forms/forms.component';
import { ProblemSolvingWorksheetsComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import { ProsConsComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/pros-cons.component';
import { SolutionsComponent } from '@/main/resources/forms/problem-solving-worksheets/solutions/solutions.component';
import { ProblemFormComponent } from '@/main/resources/forms/problem-solving-worksheets/problem-form/problem-form.component';
import { ContainerRefDirective } from '@/main/resources/forms/problem-solving-worksheets/container-ref.directive';
import { ResultComponent } from '@/main/resources/forms/problem-solving-worksheets/result/result.component';
import { TasksComponent } from '@/main/resources/forms/shared/tasks/tasks.component';
import { FormsListComponent } from '@/main/resources/forms/forms-list/forms-list.component';
import { MaterialModule } from '@/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularEditorModule } from '@xw19/angular-editor';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatListModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { FormsSidebarComponent } from './forms/shared/forms-sidebar/forms-sidebar.component';
import { ResourcesRoutingModule } from '@/main/resources/resources-routing.module';
import { ProconItemComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons/procon-item/procon-item.component';
import { ProsConsContainerComponent } from '@/main/resources/forms/problem-solving-worksheets/pros-cons-container/pros-cons-container.component';
import { TaskFormsComponent } from './forms/task-forms/task-forms.component';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { SlidesComponent } from '@/main/resources/slides/slides.component';
import { FormDirective } from '@/main/resources/slides/form.directive';

@NgModule({
  declarations: [
    FormsComponent,
    ProblemSolvingWorksheetsComponent,
    ProsConsComponent,
    ProconItemComponent,
    SolutionsComponent,
    ProblemFormComponent,
    ContainerRefDirective,
    ProsConsContainerComponent,
    ResultComponent,
    TasksComponent,
    FormsListComponent,
    FormsSidebarComponent,
    TaskFormsComponent,
    SlidesComponent,
    FormDirective,
  ],
  imports: [
    ResourcesRoutingModule,
    CommonModule,
    MaterialModule,
    FormsModule,
    AngularEditorModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
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
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ProblemFormComponent, ProblemSolvingWorksheetsComponent]
})
export class ResourcesModule {
}
