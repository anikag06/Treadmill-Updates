import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlidesVideoComponent } from '@/main/resources/slides/slides-video/slides-video.component';
import { QuestionnaireDeprecatedModule } from '@/questionnaire-deprecated.module';
import { MaterialModule } from '@/material.module';
import { SafeUrlPipe } from '@/shared/safe-url.pipe';
import { FormSliderComponent } from '@/main/resources/forms/shared/form-slider/form-slider.component';
import { DateTimePickerComponent } from '@/main/shared/date-time-picker/date-time-picker.component';
import { MoodTrackerComponent } from '@/main/shared/mood-tracker/mood-tracker.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { CongratsDialogComponent } from '@/main/resources/shared/congrats-dialog/congrats-dialog.component';
import { ChatVideoComponent } from '@/main/chatbot/chat-window/chat-video/chat-video.component';
import { ChatImageComponent } from '@/main/chatbot/chat-window/chat-image/chat-image.component';
import { ClickOutsideDirective } from '@/main/shared/click-outside/click-outside.directive';
import { IframeTrackerDirective } from '@/main/chatbot/chat-window/chat-video/iframe-tracker.directive';
import { LazyLoadingImageDirective } from '@/main/shared/lazy-loading-image/lazy-loading-image.directive';
import { SafeHtmlPipe } from '@/shared/safe-html.pipe';
import { SanitizedHtmlPipe } from '@/shared/sanitized-html.pipe';
import { StepCompletedComponent } from '@/main/resources/shared/step-completed/step-completed.component';
import { QuestionnaireComponent } from '@/shared/questionnaire/questionnaire.component';
import { QuestionnaireItemComponent } from '@/shared/questionnaire/questionnaire-item/questionnaire-item.component';
// import {QuestionnaireContainerComponent} from "@/shared/questionnaire-container/questionnaire-container.component";
import { MatProgressBarModule } from '@angular/material';
import { QuestionnaireResultComponent } from '@/shared/questionnaire/shared/questionnaire-result/questionnaire-result.component';
import { CustomNavComponent } from '@/shared/questionnaire/shared/custom-nav/custom-nav.component';
import {RouterModule} from "@angular/router";

@NgModule({
  declarations: [
    SlidesVideoComponent,
    QuestionnaireComponent,
    // QuestionnaireContainerComponent,
    SafeUrlPipe,
    CongratsDialogComponent,
    ChatVideoComponent,
    ChatImageComponent,
    ClickOutsideDirective,
    FormSliderComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
    IframeTrackerDirective,
    LazyLoadingImageDirective,
    SafeHtmlPipe,
    SanitizedHtmlPipe,
    StepCompletedComponent,
    QuestionnaireItemComponent,
    QuestionnaireResultComponent,
    CustomNavComponent,
  ],
  imports: [
    CommonModule,
    QuestionnaireDeprecatedModule,
    MaterialModule,
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatProgressBarModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SlidesVideoComponent,
    QuestionnaireDeprecatedModule,
    MaterialModule,
    SafeUrlPipe,
    ChatVideoComponent,
    ChatImageComponent,
    CongratsDialogComponent,
    ClickOutsideDirective,
    FormSliderComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
    IframeTrackerDirective,
    LazyLoadingImageDirective,
    SafeHtmlPipe,
    SanitizedHtmlPipe,
    StepCompletedComponent,
    QuestionnaireComponent,
    QuestionnaireResultComponent,
    // QuestionnaireItemComponent,
    CustomNavComponent,
    // QuestionnaireContainerComponent,
  ],
  entryComponents: [
    SlidesVideoComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
    CongratsDialogComponent,
  ],
})
export class SharedModule {}
