import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Worry } from '../../worry.model';
import { FormSliderComponent } from '../../../shared/form-slider/form-slider.component';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit {
  @Input() EvaluatedClicked = false;
  @Output() summaryEvaluateEvent = new EventEmitter<boolean>();
  // @ViewChild(WorryFormComponent, { static: false })
  // evaluateStatementForm!: WorryFormComponent;

  item = [
    'Emotional Reasoning',
    'All or None Thinking ',
    'Angry',
    'Guilty',
    'Jealous',
    'Hopeless',
    'Worthless',
    'Lonely',
    'Frustated',
    'Embarrassed',
  ];

  buttonClick = false;
  summary = false;
  sliderSubmit = false;
  continueText = false;
  evaluateSliderQuestion = 'Guess Probability';
  evaSliderMinRangeText = 'Low';
  evaSliderMaxRangeText = 'High';
  summaryText = '';
  evaluateForm = this.fb.group({
    evaluateStatement: new FormControl('', Validators.required)
  });
  constructor(
    private fb: FormBuilder,
  ) {

  }

  ngOnInit() { }
  onEvaluateSubmit() {
    this.summaryText = this.evaluateForm.value['evaluateStatement'];
    this.buttonClick = true;
    console.log(this.buttonClick);
  }
  checksubmitted = false;
  CheckSubmit() {
    this.checksubmitted = true;
  }
  evidencesubmitted = false;
  EvidenceSubmit() {
    this.evidencesubmitted = true;
  }
  onSliderSubmit() {
    this.sliderSubmit = true;
  }
  doneSummary() {
    this.summary = true;
    this.summaryEvaluateEvent.emit(this.summary);
  }
  setSummary() {
    this.summary = false;
  }
  onFocusOut(event: any) {
    if (
      !(
        <Element>event.relatedTarget &&
        (<Element>event.relatedTarget).classList.contains('continue-btn')
      )
    ) {
      this.continueText = false;
    }
  }
}
