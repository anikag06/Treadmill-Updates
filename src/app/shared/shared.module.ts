import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { MaterialModule } from '@/material.module';

@NgModule({
  declarations: [SlidesVideoComponent],
  imports: [CommonModule, QuestionnaireModule, MaterialModule],
  exports: [SlidesVideoComponent, QuestionnaireModule, MaterialModule],
  entryComponents: [SlidesVideoComponent],
})
export class SharedModule {}
