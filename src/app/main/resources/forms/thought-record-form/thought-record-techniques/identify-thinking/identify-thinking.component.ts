import { Component, OnInit, ViewChild } from '@angular/core';

import { FormBuilder } from '@angular/forms';
import { IdentifyThinkingService } from '@/main/resources/forms/thought-record-form/thought-record-techniques/identify-thinking/identify-thinking.service';

@Component({
  selector: 'app-identify-thinking',
  templateUrl: './identify-thinking.component.html',
  styleUrls: ['./identify-thinking.component.scss'],
})
export class IdentifyThinkingComponent implements OnInit {
  title = 'Can you identify the thinking errors in your negative thought?';
  errors: string[] = [];
  errorCount = 0;
  thinkingError: string[] = [];
  thinkingErrors = '';
  submitted = false;
  @ViewChild('panel', { static: false }) panel!: any;
  identifyThinkingForm = this.formBuilder.group({
    emotions: this.formBuilder.array(this.errors),
  });
  constructor(
    private formBuilder: FormBuilder,
    private thinkingService: IdentifyThinkingService,
  ) {
    this.thinkingService.getThinkingErrors().subscribe((errors: any) => {
      this.errors = errors;
    });
  }

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
    console.log(this.identifyThinkingForm.value['emotions']);
    this.panel.expanded = false;
  }
}
