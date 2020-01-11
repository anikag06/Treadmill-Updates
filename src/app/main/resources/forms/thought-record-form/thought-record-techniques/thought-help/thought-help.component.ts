import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-thought-help',
  templateUrl: './thought-help.component.html',
  styleUrls: ['./thought-help.component.scss'],
})
export class ThoughtHelpComponent implements OnInit {
  techniqueName = 'Does this thought help me?';
  submitted = false;
  summary = '';
  keepThoughtQues = 'What will happen if you keep thinking this way?';
  changeThoughtQues = 'What could happen if you changed this thought?';
  canSolveQues =
    'Is there anything that I can do to solve what I am worried about?';
  yes = 'Great ! Think of a more balanced thought.';
  no = 'Okay';
  @ViewChild('panel', { static: false }) panel!: any;

  thoughtHelpForm = this.formBuilder.group({
    keepThought: new FormControl('', [Validators.required]),
    changeThought: new FormControl('', [Validators.required]),
    canSolve: new FormControl('', [Validators.required]),
  });
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.summary =
      this.thoughtHelpForm.value['keepThought'] +
      this.thoughtHelpForm.value['changeThought'];

    if (this.summary.length > 50) {
      this.summary = this.summary.substring(0, 50) + '...';
    }
    console.log(this.summary);
    this.panel.expanded = false;
  }
}
