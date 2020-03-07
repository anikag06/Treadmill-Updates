import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatSliderChange } from '@angular/material';

@Component({
  selector: 'app-form-slider',
  templateUrl: './form-slider.component.html',
  styleUrls: ['./form-slider.component.scss'],
})
export class FormSliderComponent implements OnInit {
  @Input() rating!: number;
  @Input() question!: string;
  @Input() minRatingText!: string;
  @Input() maxRatingText!: string;
  @Output() getRating = new EventEmitter();

  constructor(public element: ElementRef) {}

  ngOnInit() {}

  onInputChange(event: MatSliderChange) {
    this.getRating.emit(event.value || undefined);
  }
}
