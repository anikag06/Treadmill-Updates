import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent implements OnInit {
  showRegistrationContent = false;

  constructor() {}

  ngOnInit() {
    // const smallDevice = window.matchMedia('(max-width: 767px)').matches;
    // console.log(smallDevice);
    // if (smallDevice) {
      this.showRegistrationContent = true;
    // }
  }
}
