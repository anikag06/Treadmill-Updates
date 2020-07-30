import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-registration-step-three',
  templateUrl: './registration-step-three.component.html',
  styleUrls: ['./registration-step-three.component.scss'],
})
export class RegistrationStepThreeComponent implements OnInit {
  stepNo = 3;
  showPage = false;
  constructor() {}

  ngOnInit() {
    const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    if (smallDevice) {
      this.showPage = true;
    }
  }
}
