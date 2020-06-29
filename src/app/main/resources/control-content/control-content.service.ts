import {ElementRef, EventEmitter, Injectable, ViewChild} from '@angular/core';
import { NavbarComponent } from '@/main/shared/navbar/navbar.component';

// @Injectable({
//   providedIn: 'root',
// })
export class ControlContentService {
  @ViewChild('targetOnNavbar', { static: false }) targetOnNavbar!: ElementRef;
  constructor() {}

  getHtml() {
    // ControlC
  }
  moveToTop() {
    this.targetOnNavbar.nativeElement.scrollIntoView();
    console.log('hello');
  }
}
