import { Component, OnInit, ViewChild, Input } from '@angular/core';
// import { WorryFormComponent } from '../../worry-form/worry-form.component';
import { Worry } from '../../worry.model';
import { TechniquesComponent } from '../techniques.component';
import { FormSliderComponent } from '../../../shared/form-slider/form-slider.component';
@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit {
  @Input() EvaluatedClicked = false;
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
  // EvaluateEditMode = false;
  // evaluateEvidence!: Worry;
  buttonClick = false;
  summary = false;
  continueText = false;
  evaluateSliderQuestion = 'Guess Probability';
  evaSliderMinRangeText = 'Low';
  evaSliderMaxRangeText = 'High';

  constructor() {
  }

  ngOnInit() { }
  // EvaluateSelected(evaluate: Worry) {
  //   this.evaluateEvidence = evaluate;
  //   this.EvaluateEditMode = false;
  // }
  // onEditEvaluateClick() {
  //   this.onEvaluateClick();
  //   console.log(this.EvaluateEditMode);
  //   if (this.evaluateStatementForm) {
  //     this.evaluateStatementForm.editWorryText();
  //   }
  // }
  // onEvaluateClick() {
  //   if (this.evaluateEvidence) {
  //     this.EvaluateEditMode = true;
  //   }
  // }
  onEvaluateSubmit() {
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
    this.summary = true;
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
