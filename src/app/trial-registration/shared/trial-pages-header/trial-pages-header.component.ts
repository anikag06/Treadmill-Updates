import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-trial-pages-header',
  templateUrl: './trial-pages-header.component.html',
  styleUrls: ['./trial-pages-header.component.scss'],
})
export class TrialPagesHeaderComponent implements OnInit {
  @Output() joinStudyClicked: EventEmitter<any> = new EventEmitter();

  @Input() stepNumber!: number;
  @Input() reregister!: boolean;

  stepOne = false;
  stepTwo = false;
  stepThree = false;
  stepFour = false;

  constructor(private router: Router) {}

  ngOnInit() {
    if (this.stepNumber === 1) {
      this.stepOne = true;
    } else if (this.stepNumber === null) {
      this.stepOne = false;
    } else if (this.stepNumber === 2) {
      this.stepTwo = true;
    } else if (this.stepNumber === 3) {
      this.stepThree = true;
    } else if (this.stepNumber === 4) {
      this.stepFour = true;
    }
  }

  topJoinStudyClick() {
    this.joinStudyClicked.emit('');
  }

  onLogoClick() {
    if (!this.reregister) {
      this.router.navigate(['trial/trial-registration']);
    }
  }
}
