import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-step-completed',
  templateUrl: './step-completed.component.html',
  styleUrls: ['./step-completed.component.scss']
})
export class StepCompletedComponent implements OnInit {

  @Input() showNextStep!: boolean;
  @Input() showloading!: boolean;
  @Output() completedEvent: EventEmitter<any> = new EventEmitter();
  @Output() nextStepEvent: EventEmitter<any> = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onCompleted() {
     this.completedEvent.emit();
  }
  onNextStep() {
    this.nextStepEvent.emit();
  }
}
