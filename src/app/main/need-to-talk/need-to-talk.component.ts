import { Component, OnInit } from '@angular/core';
import { TREADWILL } from '@/app.constants';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-need-to-talk',
  templateUrl: './need-to-talk.component.html',
  styleUrls: ['./need-to-talk.component.scss'],
})
export class NeedToTalkComponent implements OnInit {
  showHelplineNumbers = false;
  constructor(private titleService: Title) {
    this.titleService.setTitle('Need to talk | ' + TREADWILL);
  }

  ngOnInit() {}
  changeNumberVisibilty() {
    this.showHelplineNumbers = !this.showHelplineNumbers;
  }
}
