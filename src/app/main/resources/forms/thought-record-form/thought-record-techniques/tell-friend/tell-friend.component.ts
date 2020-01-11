import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-tell-friend',
  templateUrl: './tell-friend.component.html',
  styleUrls: ['./tell-friend.component.scss'],
})
export class TellFriendComponent implements OnInit {
  techniqueName = 'What would I tell a friend?';
  question =
    'What would I tell a close friend or relative if they were having this thought?';
  submitted = false;
  suggestion = '';
  suggestionForm = this.formBuilder.group({
    suggestion: new FormControl('', [Validators.required]),
  });
  @ViewChild('panel', { static: false }) panel!: any;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit() {}

  onSubmit() {
    this.submitted = true;
    this.suggestion = this.suggestionForm.value['suggestion'];
    console.log(this.suggestion);
    this.panel.expanded = false;
  }

  updateSuggestion() {}
}
