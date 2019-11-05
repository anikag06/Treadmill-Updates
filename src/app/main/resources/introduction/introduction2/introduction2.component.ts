import { Component, OnInit } from '@angular/core';

import { IntroductionService } from '../introduction.service';

@Component({
  selector: 'app-introduction2',
  templateUrl: './introduction2.component.html',
  styleUrls: ['./introduction2.component.scss']
})
export class Introduction2Component implements OnInit {
  introductionId: number = 2;
  enjoyable!: string;
  mastery!: string;
  miserable!: string;

  constructor(
    private introductionService: IntroductionService,
  ) { }

  ngOnInit() {
    this.introductionService.getIntroductionData(this.introductionId).subscribe((data) => {
      this.enjoyable = data.enjoyable;
      this.mastery = data.mastery;
      this.miserable = data.miserable;
    });
  }

  saveData() {
    let data = {
      enjoyable: this.enjoyable,
      mastery: this.mastery,
      miserable: this.miserable,
    };
    this.introductionService.storeIntroductionData(this.introductionId, data).subscribe((data) => {
      console.log("success");
    });
  }
}
