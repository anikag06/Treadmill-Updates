import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-step-completed',
  templateUrl: './step-completed.component.html',
  styleUrls: ['./step-completed.component.scss'],
})
export class StepCompletedComponent implements OnInit {
  @Input() showNextStep!: boolean;
  @Input() showloading!: boolean;
  @Input() isLastStep!: boolean;
  @Input() lastStepCompleted!: boolean;

  @Output() completedEvent: EventEmitter<any> = new EventEmitter();
  @Output() nextStepEvent: EventEmitter<any> = new EventEmitter();
  @Output() gotodashboard: EventEmitter<any> = new EventEmitter();

  constructor() {}

  ngOnInit() {
    console.log('last step', this.lastStepCompleted);
  }

  onCompleted() {
    this.completedEvent.emit();
  }
  onNextStep() {
    this.nextStepEvent.emit();
  }

  onDashboardClicked() {
    this.gotodashboard.emit();
  }
}
