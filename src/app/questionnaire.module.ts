import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './shared/questionnaire/questionnaire.component';
import { DataService } from './shared/questionnaire/data.service';
import { QuizService } from './shared/questionnaire/questionnaire.service';
import { AppRoutingModule } from '@/app-routing.module';
import { MainModule } from '@/main/main.module';



@NgModule({
  declarations: [
    QuestionnaireComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
  ],
  
  providers: [
    DataService,
    QuizService
  ],
  exports: [
    QuestionnaireComponent
  ]
})
export class QuestionnaireModule { }
