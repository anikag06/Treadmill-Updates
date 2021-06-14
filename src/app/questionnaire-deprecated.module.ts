import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireDeprecatedComponent } from './shared/questionnaire-deprecated/questionnaire-deprecated.component';
import { DataService } from './shared/questionnaire-deprecated/data.service';
import { QuizService } from './shared/questionnaire-deprecated/questionnaire-deprecated.service';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [];

@NgModule({
  declarations: [QuestionnaireDeprecatedComponent],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  // providers: [DataService, QuizService],
  exports: [QuestionnaireDeprecatedComponent],
})
export class QuestionnaireDeprecatedModule {}
