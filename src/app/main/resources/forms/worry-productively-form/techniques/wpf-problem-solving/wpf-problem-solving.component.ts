import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import { Worry } from '../../worry.model';
import { FormControl, Validators, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-wpf-problem-solving',
  templateUrl: './wpf-problem-solving.component.html',
  styleUrls: ['./wpf-problem-solving.component.scss'],
})
export class WpfProblemSolvingComponent implements OnInit {
  @Input() canISolve = false;
  @Output() summaryProbSolvingEvent = new EventEmitter<boolean>();
  radioResponse = '';
  imageDisplay = false;
  choices = ['Yes', 'No'];
  summary = false;
  summaryText = '';
  problemSolvingForm = this.fb.group({
    problemSolvingStatement: new FormControl('', Validators.required),
  });
  constructor(private fb: FormBuilder) {}

  ngOnInit() {}

  continuetoImage() {
    this.imageDisplay = true;
  }
  showSummary() {
    this.summaryText = this.problemSolvingForm.value['problemSolvingStatement'];
    this.summary = true;
    this.summaryProbSolvingEvent.emit(this.summary);
  }
}
