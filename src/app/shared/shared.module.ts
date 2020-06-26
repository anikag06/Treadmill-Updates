import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { MaterialModule } from '@/material.module';
import { SafeUrlPipe } from '@/shared/safe-url.pipe';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';

@NgModule({
  declarations: [SlidesVideoComponent, SafeUrlPipe, CongratsDialogComponent],
  imports: [CommonModule, QuestionnaireModule, MaterialModule],
  exports: [
    SlidesVideoComponent,
    QuestionnaireModule,
    MaterialModule,
    SafeUrlPipe,
    CongratsDialogComponent,
  ],
  entryComponents: [SlidesVideoComponent, CongratsDialogComponent],
})
export class SharedModule {}
