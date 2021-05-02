import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './shared/questionnaire/questionnaire.component';
import { DataService } from './shared/questionnaire/data.service';
import { QuizService } from './shared/questionnaire/questionnaire.service';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from '@/shared/qr-code/qr-code.component';

const appRoutes: Routes = [];

@NgModule({
  declarations: [QrCodeComponent, QuestionnaireComponent],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  // providers: [DataService, QuizService],
  exports: [QuestionnaireComponent, QrCodeComponent],
})
export class QuestionnaireModule {}
