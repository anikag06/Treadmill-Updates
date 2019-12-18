import { Component, OnInit, EventEmitter, Output, ElementRef, AfterViewInit, ViewChild, ViewChildren, Input } from '@angular/core';
import { Mood } from './mood.model';
import { NEGATIVE_EMOTIONS, NEUTRAL_EMOTIONS, POSITIVE_EMOTIONS } from '@/app.constants';

@Component({
  selector: 'app-mood-tracker',
  templateUrl: './mood-tracker.component.html',
  styleUrls: ['./mood-tracker.component.scss']
})
export class MoodTrackerComponent implements OnInit, AfterViewInit {
  @Output() onClose = new EventEmitter();
  moods: Mood[] = [];
  step = 0;
  emotions: string[] = [];
  customCollapsedHeight: string = '48px';
  customExpandedHeight: string = '48px';
  emotionCount: number = 0;
  range: string[] = ['Slightly', 'Somewhat', 'Quite', 'Very', 'Extremely'];
  rangeMargin: string[] = ['-10', '17', '63', '100', '125'];
  rangeValue: string = '';
  @Output() moodMessage = new EventEmitter();


  @Output() moodSubmit = new EventEmitter<any>();

  constructor(
    private element: ElementRef,
  ) { }

  ngOnInit() {
    // let negative_mood = new Mood('assets/chatbot/Negative_emotion.png', 'Negative mood');
    // let neutral_mood = new Mood('assets/chatbot/Neutral_emotion.png', 'Neutral mood');
    // let positive_mood = new Mood('assets/chatbot/Positive_emotion.png', 'Positive mood');
    // this.moods.push(negative_mood, neutral_mood, positive_mood);
  }
  ngAfterViewInit() {

    let listItem = this.element.nativeElement.querySelectorAll('.mat-list-item-content');
    let listText = this.element.nativeElement.querySelectorAll('.mat-list-text');
    let panelBody = this.element.nativeElement.querySelectorAll('.mat-expansion-panel-body');
    let checkmark = this.element.nativeElement.querySelectorAll(' .mat-checkbox-checkmark-path');


    for (let i = 0; i < listItem.length; i++) {
      listItem[i].setAttribute('style', 'padding-left:24px;padding-right: 0px');
    }

    for (let i = 0; i < listText.length; i++) {
      listText[i].setAttribute('style', 'width:auto;padding-left:20px;font-size: 14px;');
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
    console.log(this.step + "step");
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
    return POSITIVE_EMOTIONS
  }

  closeModal() {
    this.onClose.emit();
  }

  updateEmotionCount(change: boolean) {

    if (change === true) {
      this.emotionCount += 1;
    }
    else {
      this.emotionCount -= 1;
    }
  }

  showRange(index: number, emotion: string): void {
    let emotions = this.element.nativeElement.querySelectorAll('.emotions');
    for (let i = 0; i < emotions.length; i++) {
      let option_label = emotions[i].querySelector('.emotion-label');
      let option_label_str: string = option_label.innerText;
      if (option_label_str === emotion) {
        let rangeValue = emotions[i].querySelector('.rangeValue');
        rangeValue.style['margin-left'] = this.rangeMargin[index] + 'px';
        rangeValue.innerText = this.range[index]
      }
    }

  }

  onMoodSubmit() {
    let emotions = this.element.nativeElement.querySelectorAll('.emotions');
    let count = 0;
    let chatMoodMessage = "I\'m feeling ";

    for (let i = 0; i < emotions.length; i++) {
      let option = emotions[i].querySelector('.option');
      if (option.checked) {
        let option_label = emotions[i].querySelector('.emotion-label');
        let rangeValue = emotions[i].querySelector('.rangeValue');
        let rangeValue_str: string = rangeValue.textContent;
        let option_label_str: string = option_label.textContent;
        chatMoodMessage += (rangeValue_str.trim().toLowerCase() + " " + option_label_str.trim().toLowerCase() + " ");
        count += 1
        if (count < this.emotionCount - 1 && this.emotionCount > 2) {
          chatMoodMessage += ", "
        }

        if (count === this.emotionCount - 1 && this.emotionCount > 1) {
          chatMoodMessage += " and "
        }
        if (count === this.emotionCount) {
          chatMoodMessage += " today."
        }
      }
    }
    this.closeModal();
    this.moodMessage.emit(chatMoodMessage);
    this.moodSubmit.emit();
  }

}
