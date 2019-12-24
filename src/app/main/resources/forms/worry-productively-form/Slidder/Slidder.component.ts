import {Component,NgModule} from '@angular/core';
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
  Sliderval=0;
  // constructor(){
  //   this.Sliderval
  // }
  formatLabel(value: number) {
    if (value >= 1000) {
      return Math.round(value / 1000) + 'k';
    }

    return value;
  }
  onSubmit(){
    console.log('Range Slider'+this.Sliderval);
  }
}


/**  Copyright 2019 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at http://angular.io/license */