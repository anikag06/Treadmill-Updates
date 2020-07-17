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

@NgModule({
  declarations: [
    SlidesVideoComponent,
    SafeUrlPipe,
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
    FormSliderComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
  ],
  entryComponents: [
    SlidesVideoComponent,
    DateTimePickerComponent,
    MoodTrackerComponent,
  ],
})
export class SharedModule {}
