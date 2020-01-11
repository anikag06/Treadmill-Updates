import {Component, OnInit, ViewChild} from '@angular/core';
import {FormGroup, Validators, FormBuilder, FormControl} from '@angular/forms';

@Component({
  selector: 'app-explaination',
  templateUrl: './explaination.component.html',
  styleUrls: ['./explaination.component.scss'],
})
export class ExplainationComponent implements OnInit {
  techniqueName = 'Is this the only application?';
  question = 'Can there be another explanation for this situation?';
  submitted = false;
  explaination = '';
  @ViewChild('panel', { static: false }) panel!: any;

  explainationForm = this.formBuilder.group({
    suggestion: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
   this.explaination  = this.explainationForm.value['explaination'];
    console.log(this.suggestion);
    this.panel.expanded = false;
  }

  updateExplaination(){

  }
}
