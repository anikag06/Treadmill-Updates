import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-faq-page',
  templateUrl: './faq-page.component.html',
  styleUrls: ['./faq-page.component.scss'],
})
export class FaqPageComponent implements OnInit {
  showRegistrationContent = false;
  @Input() openPage!: boolean;

  constructor() {}

  ngOnInit() {
    this.showRegistrationContent = true;
  }
}
