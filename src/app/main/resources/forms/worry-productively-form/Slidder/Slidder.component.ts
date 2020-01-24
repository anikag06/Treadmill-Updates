import {Component, EventEmitter, Output} from '@angular/core';
import 'hammerjs';

/**
 * @title Slider with custom thumb label formatting.
 */
@Component({
  selector: 'app-slider',
  templateUrl: 'Slidder.component.html',
  styleUrls: ['Slidder.component.scss'],
})
export class SliderComponent {
  Sliderval = 0;
  public Cbutton = false;
  @Output() testout = new EventEmitter<boolean>();

  // constructor(){
  //   this.Sliderval
  // }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  onSubmit() {
    console.log('Range Slider' + this.Sliderval);
    this.Cbutton = true;
    this.testout.emit(this.Cbutton);
  }
}

// /**  Copyright 2019 Google LLC. All Rights Reserved.
//     Use of this source code is governed by an MIT-style license that
//     can be found in the LICENSE file at http://angular.io/license */
