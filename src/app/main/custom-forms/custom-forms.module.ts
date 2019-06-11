import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsComponent} from '@/main/custom-forms/forms/forms.component';
import {ProblemSolvingWorksheetsComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/problem-solving-worksheets.component';
import {ProsConsComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/pros-cons-container/pros-cons/pros-cons.component';
import {SolutionsComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/solutions/solutions.component';
import {ProblemFormComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/problem-form/problem-form.component';
import {ContainerRefDirective} from '@/main/custom-forms/forms/problem-solving-worksheets/container-ref.directive';
import {ResultComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/result/result.component';
import {TasksComponent} from '@/main/custom-forms/forms/shared/tasks/tasks.component';
import {FormsListComponent} from '@/main/custom-forms/forms/forms-list/forms-list.component';
import {MaterialModule} from '@/material.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AngularEditorModule} from '@xw19/angular-editor';
import {LayoutModule} from '@angular/cdk/layout';
import {
  MatButtonModule,
  MatDatepickerModule,
  MatIconModule,
  MatListModule,
  MatNativeDateModule,
  MatSidenavModule, MatSlideToggleModule,
  MatToolbarModule
} from '@angular/material';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import { FormsSidebarComponent } from './forms/shared/forms-sidebar/forms-sidebar.component';
import {CustomFormsRoutingModule} from '@/main/custom-forms/custom-forms-routing.module';
import {ProconItemComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/pros-cons-container/pros-cons/procon-item/procon-item.component';
import {ProsConsContainerComponent} from '@/main/custom-forms/forms/problem-solving-worksheets/pros-cons-container/pros-cons-container.component';
import { TaskFormsComponent } from './forms/task-forms/task-forms.component';

@NgModule({
  declarations: [
    FormsComponent,
    ProblemSolvingWorksheetsComponent,
    ProsConsComponent,
    ProconItemComponent,
    SolutionsComponent,
    FormsComponent,
    ProblemFormComponent,
    ContainerRefDirective,
    ProsConsContainerComponent,
    ResultComponent,
    TasksComponent,
    FormsListComponent,
    FormsSidebarComponent,
    TaskFormsComponent,
  ],
  imports: [
    CustomFormsRoutingModule,
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
    MatNativeDateModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
  ],
  providers: [],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ProblemFormComponent]
})
export class CustomFormsModule { }
