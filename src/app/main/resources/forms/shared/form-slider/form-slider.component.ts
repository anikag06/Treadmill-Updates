import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss'],
})
export class FormSliderComponent implements OnInit {
  rating!: number;
  @Input() question!: string;
  @Input() minRatingText!: string;
  @Input() maxRatingText!: string;
  @Output() selectMood = new EventEmitter();

  constructor() {}

  ngOnInit() {
  
  }
  onSubmit(){
    this.selectMood.emit(true);
  }
}
