import { Component, Input, OnInit } from '@angular/core';

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

  constructor() {}

  ngOnInit() {}
}
