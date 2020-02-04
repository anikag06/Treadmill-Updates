import {THINKING_IMG, THOUGHT_RECORD, THOUGHT_RECROD_FORM_NAME, WELL_DONE_IMG,} from '@/app.constants';
import {Component, OnInit} from '@angular/core';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {FormMessage} from '@/main/resources/forms/shared/form-message/form-message.model';

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
  message!: FormMessage;
  quote =
    'the happiness of your life depends upon the quality of your thoughts.';
  quotedBy = 'Marcus Aurelius';
  initialRating = 0;
  finalRating = 0;
  showMessage!: boolean;
  text =
    'If you have this negative thought again, remind yourself this realistic thought.';
  formComplete = false;
  finalRatingHeader =
    'On a scale of 1-10 how strongly do you believe the thought?';
  realisticQues = 'Great! Now tell what would be a more realistic thought?';
  reviewTitle = 'Original Thought';
  thoughtObject!: any;
  showContinueButton = false;
  showFinalThought = false;
  constructor(private thoughtRecordService: ThoughtRecordService) {}

  ngOnInit() {}

  thoughtSelected(thought: any) {
    this.thought = thought;
    this.thoughtObject = {
      id: thought.id,
      text: thought.situation,
    };
  }

  updateThought(thought: any) {
    this.thought = thought;
    // this.onShowNegative(true);

    this.thoughtObject = {
      id: thought.id,
      text: thought.situation,
    };
  }

  onAddNewForm() {
    this.thought = undefined;
    this.reset = !this.reset;
    this.situationAdded = false;
    this.showMood = false;
    this.showRecordBehave = false;
    this.showTechniques = false;
    delete this.finalRating;
    delete this.initialRating;
    delete this.formComplete;
  }

  onShowNegative(value: boolean) {
    this.situationAdded = value;
  }

  showSelectMood(value: boolean) {
    console.log(value);
    this.showMood = value;
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
  finalFormComplete(value: number) {
    this.finalRating = value;
    this.formComplete = true;
    this.onShowMessage();
  }
  onInitialRatingChange(value: number) {
    this.initialRating = value;
    this.onShowMessage();
  }

  onShowFinalThought() {
    this.showFinalThought = true;
  }
  onShowMessage() {
    if (this.initialRating > 0 && this.finalRating > 0 && this.formComplete) {
      this.showMessage = true;
      if (this.finalRating < this.initialRating) {
        this.message = new FormMessage(WELL_DONE_IMG, 'Well Done', this.text);
      } else {
        this.message = new FormMessage(THINKING_IMG, '', this.text);
      }
    }
  }

  onFinalRatingChange(value: number) {
    this.finalRating = value;
    this.onShowMessage();
  }
}
