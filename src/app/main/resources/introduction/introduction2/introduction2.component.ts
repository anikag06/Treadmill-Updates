import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';

@Component({
  selector: 'app-introduction2',
  templateUrl: './introduction2.component.html',
  styleUrls: ['./introduction2.component.scss'],
})
export class Introduction2Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  enjoyable!: string;
  mastery!: string;
  miserable!: string;
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
          this.enjoyable = data.enjoyable;
          this.mastery = data.mastery;
          this.miserable = data.miserable;
          this.locked = false;
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
      });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  saveData() {
    let data = {
      enjoyable: this.enjoyable,
      mastery: this.mastery,
      miserable: this.miserable,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('success');
      });
  }
}
