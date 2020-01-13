import { THOUGHT_RECORD, THOUGHT_RECROD_FORM_NAME } from '@/app.constants';
import { Component, OnInit } from '@angular/core';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

@Component({
  selector: 'app-thought-record-form',
  templateUrl: './thought-record-form.component.html',
  styleUrls: ['./thought-record-form.component.scss'],
})
export class ThoughtRecordFormComponent implements OnInit {
  type = THOUGHT_RECORD;
  situation!: string;
  situationEditMode = false;
  formName = THOUGHT_RECROD_FORM_NAME;
  situationHeader = 'What is the situation?';
  negativeThoughtHeader = 'What is the negative thought?';
  scaleThought =
    'On a scale of 1-10 how strongly do you believe the thought to be true?';
  moodSelect = 'How did this negative thought make you feel?';
  situationAdded = false;
  negativeThoughtAdded = false;
  showMood = false;
  showRecordBehave = false;
  showTechniques = false;
  minRating = 'Not At All';
  maxRating = 'Very Strongly';
  recordBehaveHeader = 'How did this negative thought make you behave?';
  situationCall = 'situation';
  thougtCall = 'thought';
  reset = false;
  thought!: Thought | undefined;
  constructor() {}

  ngOnInit() {}

  thoughtSelected(thought: Thought) {
    this.thought = thought;
  }

  onAddNewForm() {
    this.thought = undefined;
    this.reset = !this.reset;
  }
  onShowNegative(value: boolean) {
    this.situationAdded = value;
  }

  onShowSlider(value: boolean) {
    if (this.situationAdded) {
      console.log(value);
      this.negativeThoughtAdded = value;
    }
  }
  onSelectMood(value: boolean) {
    if (this.negativeThoughtAdded) {
      this.showMood = value;
      // this.onDialogRefClosed(dialogRef);
    }
  }

  onShowRecordBehave(value: boolean) {
    if (this.showMood) {
      this.showRecordBehave = value;
    }
  }

  onShowTechniques(value: boolean) {
    if (this.showRecordBehave) {
      this.showTechniques = value;
    }
  }

  // onEditSituationClick() {
  //   this.onSituationClick();
  //   return 0;
  // }

  // onSituationClick() {
  //   if (this.situation) {
  //     this.situationEditMode = true;
  //   }
  // }
}
