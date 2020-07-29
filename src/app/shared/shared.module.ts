import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { MaterialModule } from '@/material.module';
import { SafeUrlPipe } from '@/shared/safe-url.pipe';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { TrimStringPipe } from '@/main/shared/trim-string.pipe';
import { ChatVideoComponent } from '@/main/chatbot/chat-window/chat-video/chat-video.component';
import { ChatImageComponent } from '@/main/chatbot/chat-window/chat-image/chat-image.component';
import {ClickOutsideDirective} from '@/main/shared/click-outside/click-outside.directive';

@NgModule({
  declarations: [
    SlidesVideoComponent,
    SafeUrlPipe,
    CongratsDialogComponent,
    ChatVideoComponent,
    ChatImageComponent,
    ClickOutsideDirective,
  ],
  imports: [CommonModule, QuestionnaireModule, MaterialModule],
  exports: [
    SlidesVideoComponent,
    QuestionnaireModule,
    MaterialModule,
    SafeUrlPipe,
    ChatVideoComponent,
    ChatImageComponent,
    CongratsDialogComponent,
    ClickOutsideDirective,
  ],
  entryComponents: [SlidesVideoComponent, CongratsDialogComponent],
})
export class SharedModule {}
