import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ThoughtRecordService } from '@/main/resources/forms/thought-record-form/thought-record.service';
import { Thought } from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-trf-situation-card',
  templateUrl: './trf-situation-card.component.html',
  styleUrls: ['./trf-situation-card.component.scss'],
})
export class TrfSituationCardComponent implements OnInit {
  @Input() header!: string;
  @Output() showNegative = new EventEmitter();
  @Output() onShowSlider = new EventEmitter();

  @Input() thought!: Thought;
  @Input() reset!: boolean;
  @Input() editMode = false;
  @Output() updateThought = new EventEmitter();
  @ViewChild('textArea', { static: false }) element!: ElementRef;
  showContinue = false;
  submitted = false;
  showLoading = false;

  constructor(
    // public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private thoughtRecordService: ThoughtRecordService,
  ) {}

  situationFormGroup = this.formBuilder.group({
    situation: new FormControl('', [Validators.required]),
  });

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.thought &&
      changes.thought &&
      changes.thought.previousValue !== changes.thought.currentValue
    ) {
      this.initializeSituation();
    }
    if (changes.thought && this.thought === undefined) {
      this.resetForm();
    }
  }

  onEditSituationClick() {
    // this.submitted = false;
    this.element.nativeElement.focus();
  }

  loadSituation() {
    this.thoughtRecordService.getThoughts();
    this.thoughtRecordService.thoughtsBehaviour.subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.thought = data.find((t: Thought) => {
            if (this.thought.id === t.id) {
              return t;
            }
          });
          if (this.thought) {
            this.initializeSituation();
          }
        }
      },
      (error: HttpErrorResponse) => {},
    );
  }

  initializeSituation() {
    this.situationFormGroup.controls['situation'].setValue(
      this.thought.situation,
    );
    this.showNegative.emit(true);
    this.editMode = true;
  }

  updateText() {
    if (this.thought && this.editMode) {
      this.onSituationSubmit();
    }
  }

  situationHandler(data: Thought, action: string) {
    if (action === 'create') {
      this.thought = new Thought(data.id, data.situation, data.show_full);
      this.thoughtRecordService.addSituation(this.thought);

      this.showNegative.emit(true);
      // this.hideNextStep = true;
    } else {
      const thought = this.thoughtRecordService.thoughts.find(
        (t: Thought) => t.id === +data.id,
      );
      if (thought) {
        this.thought = <Thought>data;
        this.thoughtRecordService.updateSituation(this.thought);
      }
    }
  }

  onSituationSubmit() {
    const object = {
      situation: this.situationFormGroup.value['situation'],
    };
    if (this.thought && this.thought.id > 0) {
      this.thoughtRecordService
        .putSituation(object, this.thought.id)
        .subscribe(resp => {
          status = resp.body.status;
          this.showContinue = false;
          this.updateThought.emit(resp.body);
        });
    } else {
      this.showLoading = true;
      this.thoughtRecordService.postSituation(object).subscribe(resp => {
        const status = resp.ok;
        if (status) {
          this.updateThought.emit(resp.body);
          this.situationHandler(resp.body, 'create');
          this.showLoading = false;
          this.showContinue = false;
        }
      });
    }
  }

  onShowContinueButton() {
    this.showContinue = true;
  }

  resetForm() {
    // delete this.thought;
    // this.showNegative.emit(false);
    this.situationFormGroup = this.formBuilder.group({
      situation: new FormControl(''),
    });
  }
}
