import {Component, Input, OnInit, SimpleChanges, ViewChild,} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {Thought} from '@/main/resources/forms/thought-record-form/thoughtRecord.model';
import {AlternativeExplanationService} from './alternative-explanation.service';

@Component({
  selector: 'app-explanation',
  templateUrl: './alternative-explanation.component.html',
  styleUrls: ['./alternative-explanation.component.scss'],
})
export class AlternativeExplanationComponent implements OnInit {
  techniqueName = 'Is this the only explanation?';
  question = 'Can there be another explanation for this situation?';
  submitted = false;
  explanation = '';
  summary = '';
  @Input() reset!: boolean;
  updateExplanation!: boolean;
  @Input() thought!: Thought;
  @ViewChild('panel', { static: false }) panel!: any;

  explanationForm = this.formBuilder.group({
    explanation: new FormControl('', [Validators.required]),
  });

  constructor(
    private formBuilder: FormBuilder,
    private alternativeExplanationService: AlternativeExplanationService,
  ) {}

  ngOnInit() {}

  ngOnChanges(changes: SimpleChanges) {
    if (this.thought) {
      this.alternativeExplanationService
        .getExplanation(this.thought.id)
        .subscribe((resp: any) => {
          if (resp.ok) {
            this.updateExplanation = true;
            this.explanationForm.controls['explanation'].setValue(
              resp.body.explanation,
            );
            this.summary = resp.body.explanation;
          }
        });
    }
  }

  onSubmit() {
    this.submitted = true;

    const object = {
      situation_id: this.thought.id,
      explanation: this.explanationForm.value['explanation'],
    };

    if (this.updateExplanation) {
      this.alternativeExplanationService
        .putExplanation(object, this.thought.id)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('put done');
          }
        });
    } else {
      this.alternativeExplanationService
        .postExplanation(object)
        .subscribe((resp: any) => {
          const status = resp.ok;
          if (status) {
            console.log('post done');
          }
        });
    }
    this.summary = this.explanationForm.value['explanation'];
    this.panel.expanded = false;
  }
}
