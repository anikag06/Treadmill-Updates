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

@Component({
  selector: 'app-trf-behavior-card',
  templateUrl: './trf-behavior-card.component.html',
  styleUrls: ['./trf-behavior-card.component.scss'],
})
export class TrfBehaviorCardComponent implements OnInit {
  @Input() header!: string;
  // @Output() onShowTechniques = new EventEmitter();
  @Input() thought!: any;
  @Input() reset!: boolean;
  @Input() editMode = false;
  @Output() showTechniques = new EventEmitter();
  @ViewChild('textArea', { static: false }) element!: ElementRef;
  showContinue = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private thoughtRecordService: ThoughtRecordService,
  ) {}

  behaviorFormGroup = this.formBuilder.group({
    behavior: new FormControl('', [Validators.required]),
  });

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.thought && this.reset) {
      this.initializeBehavior();
    }
    if (this.reset) {
      this.resetBehavior();
    }
  }

  onEditSituationClick() {
    this.element.nativeElement.focus();
  }

  initializeBehavior() {
    this.thoughtRecordService.getBehavior(this.thought.id).subscribe(resp => {
      if (resp.ok) {
        this.behaviorFormGroup.controls['behavior'].setValue(
          resp.body.behavior,
        );
        this.editMode = true;
        this.showTechniques.emit(true);
      }
    });
  }

  updateText() {
    if (this.thought && this.editMode) {
      this.onBehaviorSubmit();
    }
  }

  onBehaviorSubmit() {
    if (this.thought) {
      const object = {
        situation_id: this.thought.id,
        behavior: this.behaviorFormGroup.value['behavior'],
      };

      if (this.thought && this.thought.id > 0 && this.editMode) {
        this.thoughtRecordService
          .putBehavior(object, this.thought.id)
          .subscribe(resp => {
            status = resp.body.status;
            this.showContinue = false;
          });
      } else {
        this.thoughtRecordService.postBehavior(object).subscribe(resp => {
          const status = resp.ok;
          if (status) {
            // this.onShowTechniques.emit(true);
            this.showTechniques.emit(true);
            this.showContinue = false;
          }
        });
      }
    }
  }

  onShowContinueButton() {
    this.showContinue = true;
  }

  resetBehavior() {
    // delete this.thought;
    // this.showNegative.emit(false);
    this.behaviorFormGroup = this.formBuilder.group({
      behavior: new FormControl(''),
    });
  }
}
