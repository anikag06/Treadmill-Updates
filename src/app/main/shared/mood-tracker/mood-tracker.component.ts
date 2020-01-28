import {
  NEGATIVE_EMOTIONS,
  NEUTRAL_EMOTIONS,
  POSITIVE_EMOTIONS,
} from '@/app.constants';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Optional,
  Output,
} from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { Mood } from './mood.model';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.scss'],
})
export class MoodTrackerComponent implements OnInit, AfterViewInit {
  @Output() onClose = new EventEmitter();
  moods: Mood[] = [];
  step = 0;
  emotions: string[] = [];
  customCollapsedHeight = '48px';
  customExpandedHeight = '48px';
  emotionCount = 0;
  range: string[] = ['Slightly', 'Somewhat', 'Quite', 'Very', 'Extremely'];
  rangeMargin: string[] = ['-10', '17', '63', '100', '125'];
  rangeValue = '';
  @Output() moodMessage = new EventEmitter();
  @Output() moodSubmit = new EventEmitter<any>();
  @Input() forChatBot = false;

  constructor(
    private element: ElementRef,
    @Optional() public dialogRef: MatDialogRef<MoodTrackerComponent>,
  ) {}

  ngOnInit() {
    // let negative_mood = new Mood('assets/chatbot/Negative_emotion.png', 'Negative mood');
    // let neutral_mood = new Mood('assets/chatbot/Neutral_emotion.png', 'Neutral mood');
    // let positive_mood = new Mood('assets/chatbot/Positive_emotion.png', 'Positive mood');
    // this.moods.push(negative_mood, neutral_mood, positive_mood);
  }
  ngAfterViewInit() {
    const listItem = this.element.nativeElement.querySelectorAll(
      '.mat-list-item-content',
    );
    const listText = this.element.nativeElement.querySelectorAll(
      '.mat-list-text',
    );
    const panelBody = this.element.nativeElement.querySelectorAll(
      '.mat-expansion-panel-body',
    );
    const checkmark = this.element.nativeElement.querySelectorAll(
      ' .mat-checkbox-checkmark-path',
    );

    for (let i = 0; i < listItem.length; i++) {
      listItem[i].setAttribute('style', 'padding-left:24px;padding-right: 0px');
    }

    for (let i = 0; i < listText.length; i++) {
      listText[i].setAttribute(
        'style',
        'width:auto;padding-left:20px;font-size: 14px;',
      );
    }
    for (let i = 0; i < panelBody.length; i++) {
      panelBody[i].setAttribute('style', 'padding: 0px;');
    }

    for (let i = 0; i < checkmark.length; i++) {
      checkmark[i].setAttribute('style', 'stroke: black !important;');
    }
  }

  setStep(index: number) {
    this.step = index;
    console.log(this.step + 'step');
  }

  // nextStep() {
  //   this.step++;
  // }

  // prevStep() {
  //   this.step--;
  // }

  // getEmotions() {

  //   console.log(this.step + "inside emotion");
  //   let emotions: string[] = [];
  //   if (this.step === 0) {
  //     emotions = NEGATIVE_EMOTIONS;
  //   }
  //   if (this.step === 1) {
  //     emotions = NEUTRAL_EMOTIONS;
  //   }
  //   if (this.step === 2) {
  //     emotions = POSITIVE_EMOTIONS;
  //   }
  //   return emotions;
  // }

  getNegativeEmotions() {
    return NEGATIVE_EMOTIONS;
  }

  getNeutralEmotions() {
    return NEUTRAL_EMOTIONS;
  }
  getPositiveEmotions() {
    return POSITIVE_EMOTIONS;
  }

  closeModal() {
    this.onClose.emit();
  }

  updateEmotionCount(change: boolean) {
    if (change === true) {
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
    let chatMoodMessage = "I'm feeling ";
    const neutral_index = 11;
    for (let i = 0; i < emotions.length; i++) {
      const option = emotions[i].querySelector('.option');
      const option_label = emotions[i].querySelector('.emotion-label');
      if (option.checked) {
        const option_label_str: string = option_label.textContent;
        count += 1;
        if (i !== neutral_index) {
          const rangeValue = emotions[i].querySelector('.rangeValue');
          const rangeValue_str: string = rangeValue.textContent;
          chatMoodMessage +=
            rangeValue_str.trim().toLowerCase() +
            ' ' +
            option_label_str.trim().toLowerCase() +
            ' ';
        }
        if (i === neutral_index) {
          chatMoodMessage += option_label_str.trim().toLowerCase() + ' ';
        }
        if (count < this.emotionCount - 1 && this.emotionCount > 2) {
          chatMoodMessage += ', ';
        }

        if (count === this.emotionCount - 1 && this.emotionCount > 1) {
          chatMoodMessage += ' and ';
        }
        if (count === this.emotionCount) {
          chatMoodMessage += ' today.';
        }
      }
    }
    this.closeModal();
    this.moodMessage.emit(chatMoodMessage);
    this.moodSubmit.emit();
    this.dialogRef.close({ event: 'close' });
  }
}
