import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Optional,
  Output,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Mood } from './mood.model';
import { Feelings } from '@/main/shared/mood-tracker/feelings.model';
import { MoodTrackerService } from '@/main/shared/mood-tracker/mood-tracker.service';
import { UserFeeling } from '@/main/resources/forms/thought-record-form/mood-widget-card/userfeeling.model';
import { MOBILE_WIDTH } from '@/app.constants';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MoodTrackerComponent implements OnInit, AfterViewInit {
  @Output() onClose = new EventEmitter();
  moods: Mood[] = [];
  step = 0;
  emotions: string[] = [];
  customCollapsedHeight = '48px';
  customExpandedHeight = '48px';
  emotionCount = 0;
  range: string[] = [];
  rangeMargin: string[] = ['-10px', '17px', '63px', '100px', '125px'];
  negativeEmotions: Mood[] = [];
  neutralEmotions: Mood[] = [];
  positiveEmotions: Mood[] = [];
  feelings!: Feelings;
  formMoodData: any[] = [];
  feelingData: string[] = [];
  feelingRatingsData: string[] = [];
  QUITE = 'Quite';
  negativeHeading!: string;
  positiveHeading!: string;
  neutralheading!: string;
  rangeValue = '';
  @Output() moodMessage = new EventEmitter();
  @Output() moodSubmit = new EventEmitter<any>();
  @ViewChildren('option') checkBox!: QueryList<any>;
  moodArray: any[] = [];
  mobileView!: boolean;
  smallWindow!: boolean;
  @Input() moduleName!: string;
  constructor(
    private element: ElementRef,
    @Optional() public dialogRef: MatDialogRef<MoodTrackerComponent>,
    public moodTrackerService: MoodTrackerService,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.moodTrackerService.getFeelingsList().then((feelings: any) => {
      this.feelings = feelings;

      this.feelings.group_feelings_1.forEach((emotion) => {
        this.negativeEmotions.push(new Mood(emotion));
      });
      this.feelings.group_feelings_2.forEach((emotion) => {
        this.positiveEmotions.push(new Mood(emotion));
      });
      this.feelings.group_feelings_3.forEach((emotion) => {
        this.neutralEmotions.push(new Mood(emotion));
      });
      // this.positiveEmotions = this.feelings.group_feelings_2;
      // this.neutralEmotions = this.feelings.group_feelings_3;
      this.range = this.feelings.rating_options;
      this.negativeHeading = this.feelings.group_name_1;
      this.positiveHeading = this.feelings.group_name_2;
      this.neutralheading = this.feelings.group_name_3;
      if (this.data && this.data.emotionsData) {
        this.setUserFeelings();
      }
    });
    this.mobileView = window.innerWidth < MOBILE_WIDTH;
    this.smallWindow = window.innerHeight < 641;
  }

  getMargin(index: number) {
    return this.rangeMargin[index];
  }

  setUserFeelings() {
    this.data.emotionsData.forEach((userFeeling: UserFeeling) => {
      let isNegative = false;
      let isNeutral = false;
      for (let i = 0; i < this.neutralEmotions.length; i++) {
        if (
          userFeeling.feeling.toLowerCase() ===
          this.neutralEmotions[i].emotion.toLowerCase()
        ) {
          this.neutralEmotions[i].isChecked = true;
          this.neutralEmotions[i].range = this.range.indexOf(
            userFeeling.feeling_rating
          );
          isNeutral = true;
          this.emotionCount += 1;
        }
      }
      if (!isNeutral) {
        for (let i = 0; i < this.negativeEmotions.length; i++) {
          if (
            userFeeling.feeling.toLowerCase() ===
            this.negativeEmotions[i].emotion.toLowerCase()
          ) {
            this.negativeEmotions[i].isChecked = true;
            this.negativeEmotions[i].range = this.range.indexOf(
              userFeeling.feeling_rating
            );
            isNegative = true;
            this.emotionCount += 1;
          }
        }
      }
      if (!isNeutral && !isNegative) {
        for (let i = 0; i < this.positiveEmotions.length; i++) {
          if (
            userFeeling.feeling.toLowerCase() ===
            this.positiveEmotions[i].emotion.toLowerCase()
          ) {
            this.positiveEmotions[i].isChecked = true;
            this.positiveEmotions[i].range = this.range.indexOf(
              userFeeling.feeling_rating
            );
            this.emotionCount += 1;
          }
        }
      }
    });
  }

  ngOnInit() {}
  ngAfterViewInit() {
    const listItem = this.element.nativeElement.querySelectorAll(
      '.mat-list-item-content'
    );
    const listText = this.element.nativeElement.querySelectorAll(
      '.mat-list-text'
    );
    const panelBody = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body'
    );

    for (let i = 0; i < listItem.length; i++) {
      listItem[i].setAttribute('style', 'padding-left:24px;padding-right: 0px');
    }

    for (let i = 0; i < listText.length; i++) {
      listText[i].setAttribute(
        'style',
        'width:auto;padding-left:20px;font-size: 14px;'
      );
    }
    for (let i = 0; i < panelBody.length; i++) {
      panelBody[i].setAttribute('style', 'padding: 0px;');
    }
  }

  setStep(index: number) {
    this.step = index;
  }

  getNegativeEmotions() {
    return this.negativeEmotions;
  }

  getNeutralEmotions() {
    return this.neutralEmotions;
  }
  getPositiveEmotions() {
    return this.positiveEmotions;
  }

  closeModal() {
    this.onClose.emit();
    if (this.dialogRef) {
      this.dialogRef.close({ event: 'close' });
    }
  }

  updateEmotionCount(change: boolean) {
    if (change) {
      this.emotionCount += 1;
    } else {
      this.emotionCount -= 1;
    }
  }

  showRange(index: number, emotion: string): void {
    const emotions = this.element.nativeElement.querySelectorAll('.emotions');
    for (let i = 0; i < emotions.length; i++) {
      const option_label = emotions[i].querySelector('.emotion-label');
      const option_label_str: string = option_label.innerText;
      if (option_label_str === emotion) {
        const rangeValue = emotions[i].querySelector('.rangeValue');
        rangeValue.style['margin-left'] = this.rangeMargin[index] + 'px';
        rangeValue.innerText = this.range[index];
      }
    }
  }

  onMoodSubmit() {
    const emotions = this.element.nativeElement.querySelectorAll('.emotions');
    let count = 0;
    let chatMoodMessage;
    if (this.moduleName === 'mood_tracker') {
      chatMoodMessage = 'I am feeling ';
    } else if (this.moduleName === 'thought_record') {
      chatMoodMessage = 'I felt ';
    }
    const neutral_index = 11;
    for (let i = 0; i < emotions.length; i++) {
      const option = this.checkBox.find((ele, index) => index === i);
      if (option.checked) {
        const option_label_str: string =
          option._elementRef.nativeElement.textContent;
        count += 1;
        if (i !== neutral_index) {
          const rangeValue = emotions[i].querySelector('.rangeValue');
          const rangeValue_str: string = rangeValue.textContent;
          const moodObject = {
            mood: option_label_str.trim().toLowerCase(),
            strength: rangeValue_str.trim(),
            mood_type: i < 11 ? 'negative' : 'positive',
          };
          this.moodArray.push(moodObject);
          const emoji = i < 11 ? '😞 ' : '😄 ';
          chatMoodMessage +=
            emoji +
            rangeValue_str.trim().toLowerCase() +
            ' ' +
            option_label_str.trim().toLowerCase() +
            ' ';
          if (this.dialogRef) {
            this.feelingData.push(option_label_str.trim());
            this.feelingRatingsData.push(rangeValue_str.trim());
          }
        }
        if (i === neutral_index) {
          const moodObject = {
            mood: option_label_str.trim().toLowerCase(),
            strength: null,
            mood_type: 'neutral',
          };
          const emoji = '😐 ';
          chatMoodMessage +=
            emoji + option_label_str.trim().toLowerCase() + ' ';
          this.moodArray.push(moodObject);
          if (this.dialogRef) {
            this.feelingData.push(option_label_str.trim());
            this.feelingRatingsData.push(this.QUITE);
          }
        }
        if (count < this.emotionCount - 1 && this.emotionCount > 2) {
          chatMoodMessage += ', ';
        }

        if (count === this.emotionCount - 1 && this.emotionCount > 1) {
          chatMoodMessage += ' and ';
        }
        if (count === this.emotionCount && this.moduleName === 'mood_tracker') {
          chatMoodMessage += ' today';
        }
      }
    }
    const moodSelected = {
      moodMessage: chatMoodMessage,
      moodValues: this.moodArray,
    };
    this.closeModal();
    this.moodMessage.emit(moodSelected);
    this.moodSubmit.emit();
    if (this.dialogRef) {
      const feelingsData = {
        emotions: this.feelingData,
        emotionsRating: this.feelingRatingsData,
      };
      this.dialogRef.close({ event: 'close', data: feelingsData });
    }
  }
}
