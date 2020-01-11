import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MOBILEWIDTH } from '@/app.constants';

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
  @ViewChild('panel', { static: false }) panel!: any;

  techniqueName = 'What is the worst that can happen?';
  outcomeRecordForm = this.formBuilder.group({
    worstOutcome: new FormControl('', [Validators.required]),
    bestOutcome: new FormControl('', [Validators.required]),
    likelyOutcome: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.summary =
      this.outcomeRecordForm.value['worstOutcome'] +
      this.outcomeRecordForm.value['bestOutcome'] +
      this.outcomeRecordForm.value['likelyOutcome'];
    if (this.summary.length > 50) {
      this.summary = this.summary.substring(0, 50) + '...';
    }
    console.log(this.summary);
    this.panel.expanded = false;
  }
}
