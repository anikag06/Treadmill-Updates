import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './shared/questionnaire/questionnaire.component';
import { DataService } from './shared/questionnaire/data.service';
import { QuizService } from './shared/questionnaire/questionnaire.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [

]

@NgModule({
  declarations: [
    QuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(appRoutes),
  ],
  
  providers: [
    DataService,
    QuizService
  ],
  exports: [
    QuestionnaireComponent,
  ]
})
export class QuestionnaireModule { }
