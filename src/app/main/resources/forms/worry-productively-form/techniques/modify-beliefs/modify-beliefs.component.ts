import { Component, OnInit,  ViewChild, Input } from '@angular/core';
import { WorryFormComponent } from '../../worry-form/worry-form.component';
import { Worry } from '../../worry.model';
import { TechniquesComponent } from '../techniques.component';
@Component({
  selector: 'app-modify-beliefs',
  templateUrl: './modify-beliefs.component.html',
  styleUrls: ['./modify-beliefs.component.scss'],
})
export class ModifyBeliefsComponent implements OnInit {
  @Input() modifyBeliefsClick = false;
  @ViewChild(WorryFormComponent, { static: false })
  beliefStatementForm!: WorryFormComponent;
  beliefEditMode = false;
  modifyBeliefs !:Worry
  spanDisplay = false;
  constructor() {}

  ngOnInit() {}
  BeliefSelected(evaluate: Worry) {
    this.modifyBeliefs = evaluate;
    this.beliefEditMode = false;
  }
  onEditBeliefClick() {
    this.onBeliefClick();
    console.log(this.beliefEditMode);
    if (this.beliefStatementForm) {
      this.beliefStatementForm.editWorryText();
    }
  }
  onBeliefClick() {
    if (this.modifyBeliefs) {
      this.beliefEditMode = true;
    }
  }
  continuetoBeliefForm(data : any){
    this.spanDisplay=data;
    console.log(this.spanDisplay);
  }
}
