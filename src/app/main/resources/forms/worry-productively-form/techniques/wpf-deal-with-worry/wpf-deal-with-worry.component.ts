import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { WorryFormComponent } from '../../worry-form/worry-form.component';
import { Worry } from '../../worry.model';
import { TechniquesComponent } from '../techniques.component';

@Component({
  selector: 'app-wpf-deal-with-worry',
  templateUrl: './wpf-deal-with-worry.component.html',
  styleUrls: ['./wpf-deal-with-worry.component.scss'],
})
export class WpfDealWithWorryComponent implements OnInit {
  @Input() dealWorryClick = false;
  @ViewChild(WorryFormComponent, { static: false })
  dealingWorryStatementForm!: WorryFormComponent;
  dealWorryEditMode = false;
  dealWorry !:Worry;
  calmMyself = false;  
  constructor() {}

  ngOnInit() {}
  DealWithWorrySelected(deal: Worry) {
    this.dealWorry = deal;
    this.dealWorryEditMode = false;
  }
  onEditDealingWorryClick() {
    this.onDealwithWorryClick();
    console.log(this.dealWorryEditMode);
    if (this.dealingWorryStatementForm) {
      this.dealingWorryStatementForm.editWorryText();
    }
  }
  onDealwithWorryClick() {
    if (this.dealWorry) {
      this.dealWorryEditMode = true;
    }
  }
  continuetocalmMyself( data : any){
   this.calmMyself = data;
  }
}
