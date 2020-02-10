import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {RecordOutcomeService} from '@/main/resources/forms/thought-record-form/thought-record-techniques/record-outcome/record-outcome.service';

@Component({
  selector: 'app-record-outcome',
  templateUrl: './record-outcome.component.html',
  styleUrls: ['./record-outcome.component.scss'],
})
export class RecordOutcomeComponent implements OnInit, AfterViewInit {
  worstOutcomeQuestion =
    'What could be the worst outcome? How would I cope if it happens?';
  bestOutcomeQuestion = 'What is the best outcome?';
  likelyOutcomeQuestion = 'What is the most likely outcome?';
  submitted = false;
  summary = '';
  height = '42px';
  @Input() thought!: Thought;
  updateOutcome = false;
  @ViewChild('panel', { static: false }) panel!: any;
  @Output() showFinalThought = new EventEmitter();

  techniqueName = 'What is the worst that can happen?';
  outcomeRecordForm = this.formBuilder.group({
    worstOutcome: new FormControl('', [Validators.required]),
    bestOutcome: new FormControl('', [Validators.required]),
    likelyOutcome: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private recordOutcomeService: RecordOutcomeService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.thought) {
      this.resetForm();
      this.recordOutcomeService
        .getOutcome(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.updateOutcome = true;
            this.initializeOutcome(resp);
            this.summary = resp.body.realistic_outcome;
            this.showFinalThought.emit();
          }
        });
    }
  }

  ngAfterViewInit(): void {}

  initializeOutcome(resp: any) {
    this.outcomeRecordForm.controls['worstOutcome'].setValue(
      resp.body.worst_outcome,
    );
    this.outcomeRecordForm.controls['bestOutcome'].setValue(
      resp.body.best_outcome,
    );
    this.outcomeRecordForm.controls['likelyOutcome'].setValue(
      resp.body.realistic_outcome,
    );
  }

  onSubmit() {
    this.submitted = true;
    const object = {
      situation_id: this.thought.id,
      worst_outcome: this.outcomeRecordForm.value['worstOutcome'],
      best_outcome: this.outcomeRecordForm.value['bestOutcome'],
      realistic_outcome: this.outcomeRecordForm.value['likelyOutcome'],
    };

    if (this.updateOutcome && this.summary.length > 0) {
      this.recordOutcomeService
        .putOutCome(object, this.thought.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('put done');
            this.setSummary();
          }
        });
    } else {
      this.recordOutcomeService.postOutcome(object).subscribe((resp: any) => {
        const status = resp.ok;
        if (status) {
          this.setSummary();
        }
      });
    }

    // if (this.summary.length > 50) {
    //   this.summary = this.summary.substring(0, 50) + '...';
    // }
  }

  setSummary() {
    this.summary = this.outcomeRecordForm.value['likelyOutcome'];
    this.showFinalThought.emit();
    this.panel.expanded = false;
  }

  resetForm() {
    this.outcomeRecordForm = this.formBuilder.group({
      worstOutcome: new FormControl(''),
      bestOutcome: new FormControl(''),
      likelyOutcome: new FormControl(''),
    });
    this.summary = '';
  }
}
