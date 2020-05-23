import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { MaterialModule } from '@/material.module';
import {SafeUrlPipe} from '@/shared/safe-url.pipe';

@NgModule({
  declarations: [SlidesVideoComponent, SafeUrlPipe],
  imports: [CommonModule, QuestionnaireModule, MaterialModule],
  exports: [SlidesVideoComponent, QuestionnaireModule, MaterialModule, SafeUrlPipe],
  entryComponents: [SlidesVideoComponent],
})
export class SharedModule {}
