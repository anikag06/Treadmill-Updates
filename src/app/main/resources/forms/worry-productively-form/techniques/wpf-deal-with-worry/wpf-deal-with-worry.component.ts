import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { Worry } from '../../worry.model';
import { FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-wpf-deal-with-worry',
  templateUrl: './wpf-deal-with-worry.component.html',
  styleUrls: ['./wpf-deal-with-worry.component.scss'],
})
export class WpfDealWithWorryComponent implements OnInit {
  @Input() dealWorryClick = false;
  @Output() summaryDealingEvent = new EventEmitter<boolean>();
  summary = false;
  calmMyself = false;
  summaryText = '';
  DealWorryForm = this.fb.group({
    DealWorryStatement: new FormControl('', Validators.required)
  });

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit() { }

  ondealWorrySubmit() {
    this.calmMyself = true;
  }
  continuetocalmMyself() {
    this.summaryText = this.DealWorryForm.value['DealWorryStatement'];
    this.summary = true;
    if (this.summary) {
      this.summaryDealingEvent.emit(this.summary);

    }
  }
}
