import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-need-to-talk',
  templateUrl: './need-to-talk.component.html',
  styleUrls: ['./need-to-talk.component.scss'],
})
export class NeedToTalkComponent implements OnInit {
  showHelplineNumbers = false;
  constructor() {}

  ngOnInit() {}
  changeNumberVisibilty() {
    this.showHelplineNumbers = !this.showHelplineNumbers;
    console.log('clicked');
  }
}
