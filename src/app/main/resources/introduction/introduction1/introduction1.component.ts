import { Component, OnInit } from '@angular/core';

import { IntroductionService } from '../introduction.service';

@Component({
  selector: 'app-introduction1',
  templateUrl: './introduction1.component.html',
  styleUrls: ['./introduction1.component.scss']
})
export class Introduction1Component implements OnInit {
  introductionId: number = 1;
  situation!: string;
  feeling!: string;
  behavior!: string;
  thought!: string;

  constructor(
    private introductionService: IntroductionService,
  ) { }

  ngOnInit() {
    this.introductionService.getIntroductionData(this.introductionId).subscribe((data) => {
      this.situation = data.situation;
      this.feeling = data.feeling;
      this.behavior = data.behavior;
      this.thought = data.thought;
    });
  }

  saveData() {
    let data = {
      situation: this.situation,
      feeling: this.feeling,
      behavior: this.behavior,
      thought: this.thought
    };
    console.log(typeof(data));
    this.introductionService.storeIntroductionData(this.introductionId, data).subscribe((data) => {
      console.log("success");
    });
  }
}
