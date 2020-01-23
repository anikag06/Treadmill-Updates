import {THOUGHT_RECORD, THOUGHT_RECROD_FORM_NAME} from '@/app.constants';
import {Component, OnInit} from '@angular/core';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';

@Component({
    selector: 'app-thought-record-form',
    templateUrl: './thought-record-form.component.html',
    styleUrls: ['./thought-record-form.component.scss'],
})
export class ThoughtRecordFormComponent implements OnInit {
    type = THOUGHT_RECORD;
    situation!: string;
    // situationEditMode = false;
  formName = THOUGHT_RECROD_FORM_NAME;
  situationHeader = 'What is the situation?';
  negativeThoughtHeader = 'What is the negative thought?';
  moodSelect = 'How did this negative thought make you feel?';
  situationAdded = false;
  showMood = false;
  showRecordBehave = false;
  showTechniques = false;
  recordBehaveHeader = 'How did this negative thought make you behave?';
  situationApi = 'situation';
  behaviorApi = 'behavior';
  reset = false;
  thought!: any;
  negativeThought: any;

  constructor(private thoughtRecordService: ThoughtRecordService) {}

  ngOnInit() {}

    thoughtSelected(thought: any) {
        this.thought = thought;
    }

  updateThought(thought: any) {
    this.thought = thought;
    this.onShowNegative(true);
  }

    onAddNewForm() {
        this.thought = undefined;
        this.reset = !this.reset;
    }

    onShowNegative(value: boolean) {
        this.situationAdded = value;
    }

    //
    // onShowSlider(data: any) {
    //   if (this.situationAdded) {
    //     this.negativeThoughtAdded = data.showSlider;
    //     this.negativeThought = data.negativeThought;
    //   }
    // }

    // onSelectMood(value: boolean) {
    //   if (this.negativeThoughtAdded) {
    //     this.showMood = value;
    //     // this.onDialogRefClosed(dialogRef);
    //   }
    // }

    showSelectMood() {
        this.showMood = true;
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

    // getRating(value: any) {
    //   this.negativeMoodRating = value;
    // }

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
