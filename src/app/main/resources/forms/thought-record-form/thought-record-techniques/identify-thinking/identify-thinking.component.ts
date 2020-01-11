import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { THINKING_ERRORS } from '../../../../../../app.constants';

@Component({
  selector: 'app-identify-thinking',
  templateUrl: './identify-thinking.component.html',
  styleUrls: ['./identify-thinking.component.scss'],
})
export class IdentifyThinkingComponent implements OnInit {
  title = 'Can you identify the thinking errors in your negative thought?';
  errors = THINKING_ERRORS;
  errorCount = 0;
  thinkingError: string[] = [];
  thinkingErrors = '';
  submitted = false;
  @ViewChild('panel', { static: false }) panel!: any;

  constructor() {}

  ngOnInit() {}

  updateErrorCount(change: boolean, index: number) {
    if (change === true) {
      this.errorCount += 1;
      this.thinkingError.push(this.errors[index]);
    } else {
      this.errorCount -= 1;
      this.thinkingError.splice(index);
    }
  }

  onSubmit() {
    this.submitted = true;
    this.thinkingErrors = this.thinkingError.join(',');
    this.panel.expanded = false;
  }
}
