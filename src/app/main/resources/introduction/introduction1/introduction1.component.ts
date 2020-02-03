import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';

@Component({
  selector: 'app-introduction1',
  templateUrl: './introduction1.component.html',
  styleUrls: ['./introduction1.component.scss'],
})
export class Introduction1Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  situation!: string;
  feeling!: string;
  behavior!: string;
  thought!: string;
  dataLoaded: boolean = false;
  locked: boolean = true;
  introductionDataSubscription!: Subscription;

  constructor(
    private introductionService: IntroductionService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.url.subscribe(data => {
      this.stepGroupSequence = +data[0].path;
    });

    this.introductionDataSubscription = this.introductionService
      .getIntroductionData(this.stepGroupSequence)
      .subscribe(data => {
        if (data.user_step_status != LOCKED) {
          this.situation = data.data.situation;
          this.feeling = data.data.feeling;
          this.behavior = data.data.behavior;
          this.thought = data.data.thought;
          this.locked = false;
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
      });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
    this.saveData();
  }

  saveData() {
    let data = {
      situation: this.situation,
      feeling: this.feeling,
      behavior: this.behavior,
      thought: this.thought,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('success');
      });
  }
}
