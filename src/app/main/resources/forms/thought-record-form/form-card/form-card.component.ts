import {Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {MatDialog} from '@angular/material';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ThoughtRecordService} from '@/main/resources/forms/thought-record-form/thought-record.service';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
  @Input() header!: string;
  @Output() showNegative = new EventEmitter();
  @Output() onShowSlider = new EventEmitter();
  @Output() onShowTechniques = new EventEmitter();
  @Input() apiToCall!: string;
  @Input() thought!: Thought;
  @Input() reset!: boolean;
  @ViewChild('problemTextArea', { static: false }) element!: ElementRef;
  submitted = false;

  constructor(
    public dialog: MatDialog,
    private formBuilder: FormBuilder,
    private thoughtRecordService: ThoughtRecordService,
  ) {}
  thoughtRecordForm = this.formBuilder.group({
    text: new FormControl('', [Validators.required]),
  });

  ngOnInit() {
    // console.log(this.apiToCall, this.thought,this.reset)
    // if (this.thought) {
    //   console.log(this.thought);
    //   this.loadSituation();
    // }
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.thought &&
      changes.thought &&
      changes.thought.previousValue !== changes.thought.currentValue
    ) {
      this.initializeThought();
    }
    if (changes.reset) {
      this.resetText();
    }
  }

  onEditSituationClick() {
    this.submitted = false;
    this.element.nativeElement.focus();
  }

  loadSituation() {
    this.thoughtRecordService.getThoughts();
    this.thoughtRecordService.thoughtBehaviour.subscribe(
      (data: any) => {
        if (data.length > 0) {
          this.thought = data.find((t: Thought) => {
            if (this.thought.id === t.id) {
              return t;
            }
          });
          if (this.thought) {
            this.initializeThought();
          }
        }
      },
      (error: HttpErrorResponse) => {},
    );
  }
  initializeThought() {
    if (this.apiToCall === 'situation') {
      this.thoughtRecordForm.controls['text'].setValue(this.thought.situation);
      this.showNegative.emit(true);
    }
  }
  updateText() {
    if (this.thought) {
      this.saveData();
    }
  }

  saveData() {
    if (this.apiToCall === 'situation') {
      const object = {
        situation: this.thoughtRecordForm.value['text'],
      };
      if (this.thought && this.thought.id > 0) {
        this.thoughtRecordService
          .putSituation(object, this.thought.id)
          .subscribe(resp => {
            status = resp.body.status;
          });
      } else {
        this.thoughtRecordService.postSituation(object).subscribe(resp => {
          const status = resp.ok;
          if (status) {
            this.textSituationHandler(resp.body, 'create');
          }
        });
      }
    }
  }
  textSituationHandler(data: any, action: string) {
    if (action === 'create') {
      this.thought = new Thought(data.id, data.situation);
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

  onProblemSubmit() {
    this.submitted = true;
    this.saveData();

    this.onShowSlider.emit(true);
    this.onShowTechniques.emit(true);
  }

  resetText() {
    delete this.submitted;
    delete this.thought;
    this.thoughtRecordForm = this.formBuilder.group({
      text: new FormControl(''),
    });
  }
}
