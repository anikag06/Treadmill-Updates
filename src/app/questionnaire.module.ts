import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './shared/questionnaire/questionnaire.component';
import { DataService } from './shared/questionnaire/data.service';
import { QuizService } from './shared/questionnaire/questionnaire.service';
import { RouterModule, Routes } from '@angular/router';
import { QrCodeComponent } from '@/shared/qr-code/qr-code.component';
import {MatButtonModule} from '@angular/material';

@NgModule({
  declarations: [QrCodeComponent, QuestionnaireComponent],
  imports: [CommonModule,
    MatButtonModule,
  ],
  imports: [CommonModule, RouterModule.forChild(appRoutes)],
  exports: [QuestionnaireComponent, QrCodeComponent],
  providers: [],
})

export class QuestionnaireModule {}
