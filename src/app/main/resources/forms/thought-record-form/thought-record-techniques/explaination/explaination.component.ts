import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
    selector: 'app-explaination',
    templateUrl: './explaination.component.html',
    styleUrls: ['./explaination.component.scss'],
})
export class ExplainationComponent implements OnInit {
    techniqueName = 'Is this the only explaination?';
    question = 'Can there be another explaination for this situation?';
    submitted = false;
    explaination = '';
    @ViewChild('panel', {static: false}) panel!: any;

    explainationForm = this.formBuilder.group({
        explaination: new FormControl('', [Validators.required]),
    });

    constructor(private formBuilder: FormBuilder) {
    }

    ngOnInit() {
    }

  onSubmit() {
    this.submitted = true;
    this.explaination = this.explainationForm.value['explaination'];
    console.log(this.explaination);
    this.panel.expanded = false;
  }

  updateExplaination() {}
}
