import {THINKING_IMG, THOUGHT_RECORD, THOUGHT_RECROD_FORM_NAME, WELL_DONE_IMG,} from '@/app.constants';
import {Component, OnInit} from '@angular/core';
import {FormMessage} from '@/main/resources/forms/shared/form-message/form-message.model';
import {TRF_NEGATIVE_MSG, TRF_POSITIVE_MSG, TRF_QUOTES,} from '@/main/resources/forms/thought-record-form/trf-message';
import {FormService} from '@/main/resources/forms/shared/form.service';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';

@Component({
  selector: 'app-thought-record-form',
  templateUrl: './thought-record-form.component.html',
  styleUrls: ['./thought-record-form.component.scss'],
})
export class ThoughtRecordFormComponent implements OnInit {
  type = THOUGHT_RECORD;
  situation!: string;
  formName = THOUGHT_RECROD_FORM_NAME;
  situationHeader = 'What is the situation?';
  negativeThoughtHeader = 'What is the negative thought?';
  moodSelect = 'How did this negative thought make you feel?';
  situationAdded = false;
  showMood = false;
  showRecordBehave = false;
  showTechniques = false;
  recordBehaveHeader = 'How did this negative thought make you behave?';
  reset = false;
  thought!: Thought;
  negativeThought: any;
  message!: FormMessage;
  quote!: string;
  quotedBy!: string;
  initialRating = 0;
  finalRating = 0;
  showMessage!: boolean;
  text =
    'If you have this negative thought again, remind yourself this realistic thought.';
  formComplete = false;
  finalRatingHeader =
    'On a scale of 1-10 how strongly do you believe the thought?';
  realisticQues =
    'Great! Now write what would be a more <strong>realistic thought</strong>?';
  reviewTitle = 'Original Thought';
  thoughtObject!: any;
  showFinalThought = false;
  recommend =
    'I recommend that you fill the rest of the form after you reach "Evaluating Thoughts" module.';
  showRecommend!: boolean;
  imgSrc = 'assets/forms/therapist.png';
  constructor(
    private formService: FormService,
    private thoughtRecordService: ThoughtRecordService,
  ) {}

  ngOnInit() {}

  thoughtSelected(thought: Thought) {
    this.thought = thought;
    // this.showRecommend = !thought.show_full;
    this.reset = true;
    this.resetForm();
    this.thoughtObject = {
      id: thought.id,
      text: thought.situation,
    };
  }

  updateThought(thought: Thought) {
    this.thought = thought;
    // this.onShowNegative(true);

    this.thoughtObject = {
      id: thought.id,
      text: thought.situation,
    };
    // this.showRecommend = !thought.show_full;
    this.reset = false;
  }

  onAddNewForm() {
    delete this.thought;
    this.resetForm();
  }

  onShowNegative(value: boolean) {
    this.situationAdded = value;
  }

  showSelectMood(value: boolean) {
    this.showMood = value;
  }

  onShowRecordBehave(value: boolean) {
    if (this.showMood) {
      this.showRecordBehave = value;
    } else {
      this.showRecordBehave = false;
    }
  }

  onShowTechniques(value: boolean) {
    if (this.showRecordBehave) {
      this.showRecommend = !this.thought.show_full;
      this.showTechniques = this.showRecommend ? false : true;
    } else {
      this.showTechniques = false;
    }
  }

  accessTechniques() {
    this.showRecommend = false;
    this.showTechniques = true;
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
      const index = this.formService.getRandomInt(TRF_QUOTES.length);
      this.quote = TRF_QUOTES[index].quote;
      this.quotedBy = TRF_QUOTES[index].by;
      this.showMessage = true;
      if (this.finalRating < this.initialRating) {
        this.message = new FormMessage(
          WELL_DONE_IMG,
          'Well Done',
          TRF_POSITIVE_MSG[
            this.formService.getRandomInt(TRF_POSITIVE_MSG.length)
          ],
        );
      } else {
        this.message = new FormMessage(
          THINKING_IMG,
          '',
          TRF_NEGATIVE_MSG[
            this.formService.getRandomInt(TRF_NEGATIVE_MSG.length)
          ],
        );
      }
    }
  }
  resetForm() {
    this.situationAdded = false;
    this.showMood = false;
    this.showTechniques = false;
    this.showFinalThought = false;
    this.showRecordBehave = false;
    this.showMessage = false;
    delete this.showRecommend;
    delete this.finalRating;
    delete this.initialRating;
    delete this.formComplete;
  }
  onFinalRatingChange(value: number) {
    this.finalRating = value;
    this.onShowMessage();
  }
}
