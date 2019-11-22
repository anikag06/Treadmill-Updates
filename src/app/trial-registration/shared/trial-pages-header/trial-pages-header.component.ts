import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-trial-pages-header',
  templateUrl: './trial-pages-header.component.html',
  styleUrls: ['./trial-pages-header.component.scss']
})
export class TrialPagesHeaderComponent implements OnInit {

  @Input() stepNumber!: number;

  stepOne = false;
  stepTwo = false;
  stepThree = false;
  stepFour = false;

  constructor() { }

  ngOnInit() {
    console.log('step number', this.stepNumber);
    if (this.stepNumber === 1) {
      this.stepOne = true;
    } else if (this.stepNumber === 2) {
      this.stepTwo = true;
    } else if (this.stepNumber === 3) {
      this.stepThree = true;
    } else if (this.stepNumber === 4) {
      this.stepFour = true;
    }


  }

}
