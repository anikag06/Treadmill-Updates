import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireModule } from '@/questionnaire.module';
import { MaterialModule } from '@/material.module';
import { SafeUrlPipe } from '@/shared/safe-url.pipe';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import { DateTimePickerComponent } from '@/main/shared/date-time-picker/date-time-picker.component';
import { MoodTrackerComponent } from '@/main/shared/mood-tracker/mood-tracker.component';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
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
    FormSliderComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
  ],
  imports: [
    CommonModule,
    QuestionnaireModule,
    MaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
  ],
  exports: [
    SlidesVideoComponent,
    QuestionnaireModule,
    MaterialModule,
    SafeUrlPipe,
    ChatVideoComponent,
    ChatImageComponent,
    CongratsDialogComponent,
    ClickOutsideDirective,
    FormSliderComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
  ],
  entryComponents: [
    SlidesVideoComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
    CongratsDialogComponent,
  ],
})
export class SharedModule {}
