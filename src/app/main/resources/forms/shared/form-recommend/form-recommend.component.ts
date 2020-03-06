import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-form-recommend',
  templateUrl: './form-recommend.component.html',
  styleUrls: ['./form-recommend.component.scss'],
})
export class FormRecommendComponent implements OnInit {
  @Input() recommendPath!: string;
  @Input() characterImg!: string;
  @Output() recommedComplete = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  nextStep() {
    this.recommedComplete.emit();
  }
}
