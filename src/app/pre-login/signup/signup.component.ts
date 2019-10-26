import { Component, OnInit, Output } from '@angular/core';
import { DialogSize } from '@/shared/dialog-size.service';
import {
  transition,
  trigger,
  style,
  state,
  animate,
} from '@angular/animations';

@Component({
  selector: 'app-signup',
  animations: [
    trigger('fadeInOut', [
      state('visible', style({
        opacity: 1
      })),
      state('inVisible', style({
        opacity: 0
      })),
      transition('visible => inVisible', [
        animate('1s ease-in')
      ]),
      transition('inVisible => visible', [
        animate('1s ease-out')
      ]),
    ]),
  ],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss', './mat-signup-dialog/mat-signup-dialog.component.scss']
})
export class SignupComponent implements OnInit {
  isVisible = true;

  constructor() { }

  ngOnInit() {
  }

}
