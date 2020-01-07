import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { WorryFormComponent } from '../../worry-form/worry-form.component';
import { Worry } from '../../worry.model';
import { TechniquesComponent } from '../techniques.component';
@Component({
  selector: 'app-wpf-problem-solving',
  templateUrl: './wpf-problem-solving.component.html',
  styleUrls: ['./wpf-problem-solving.component.scss'],
})
export class WpfProblemSolvingComponent implements OnInit {
  @Input() canISolve = false;
  @ViewChild(WorryFormComponent, { static: false })
  solveProblemStatementForm!: WorryFormComponent;
  // choices : string[];
  radioResponse = '';
  solveEditMode = false;
  solveProblem !:Worry;
  imageDisplay = false;
  choices = [ 'Yes', 'No'];
  constructor() {}

  ngOnInit() {
  }
  solveProblemSelected(solve: Worry) {
    this.solveProblem = solve;
    this.solveEditMode = false;
  }
  onEditsolveProblemClick() {
    this.onSolveClick();
    console.log(this.solveEditMode);
    if (this.solveProblemStatementForm) {
      this.solveProblemStatementForm.editWorryText();
    }
  }
  onSolveClick() {
    if (this.solveProblem) {
      this.solveEditMode = true;
    }
  }
  continuetoImage(data : any){
    this.imageDisplay=true;
    console.log(this.imageDisplay);
  }
}
