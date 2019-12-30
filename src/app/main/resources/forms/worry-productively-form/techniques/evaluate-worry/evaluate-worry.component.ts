import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WorryFormComponent } from '../../worry-form/worry-form.component';
import { Worry } from '../../worry.model';
import { TechniquesComponent } from '../techniques.component';
import { SliderComponent } from '../../Slidder/Slidder.component';
@Component({
  selector: 'app-evaluate-worry',
  templateUrl: './evaluate-worry.component.html',
  styleUrls: ['./evaluate-worry.component.scss'],
})
export class EvaluateWorryComponent implements OnInit {
  @Input() EvaluatedClicked = false;
  @ViewChild(WorryFormComponent, { static: false })
  evaluateStatementForm!: WorryFormComponent;

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
  EvaluateEditMode = false;
  evaluateEvidence!: Worry;
  buttonClick: boolean;
  // show: any;

  constructor() {
    this.buttonClick = false;
    // this.show = this.EvaluatedClicked;
  }

  ngOnInit() {}
  EvaluateSelected(evaluate: Worry) {
    this.evaluateEvidence = evaluate;
    this.EvaluateEditMode = false;
  }
  onEditEvaluateClick() {
    this.onEvaluateClick();
    console.log(this.EvaluateEditMode);
    if (this.evaluateStatementForm) {
      this.evaluateStatementForm.editProblemText();
    }
  }
  onEvaluateClick() {
    if (this.evaluateEvidence) {
      this.EvaluateEditMode = true;
    }
  }
  continuetoSlider(selected: any) {
    this.buttonClick = selected;
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
}
