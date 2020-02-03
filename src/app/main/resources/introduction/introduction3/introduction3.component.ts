import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { IntroductionService } from '../introduction.service';
import { LOCKED } from '@/app.constants';

export interface ThoughtSet {
  negativeThought: string;
  balancedThought: string;
}

@Component({
  selector: 'app-introduction3',
  templateUrl: './introduction3.component.html',
  styleUrls: ['./introduction3.component.scss'],
})
export class Introduction3Component implements OnInit, OnDestroy {
  stepGroupSequence!: number;
  dataLoaded: boolean = false;
  locked: boolean = true;
  introductionDataSubscription!: Subscription;
  negativeThoughts = [
    'Negative thought 1',
    'Negative thought 2',
    'Negative thought 3',
    'Negative thought 4',
    'Negative thought 5',
  ];
  balancedThoughts = [
    'Balanced thought 1',
    'Balanced thought 2',
    'Balanced thought 3',
    'Balanced thought 4',
    'Balanced thought 5',
  ];
  selectedThought!: string;
  balancedThought!: string;

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
          this.locked = false;
          this.selectedThought = data.data.selectedThought;
          this.onThoughtChanged();
        } else {
          this.locked = true;
        }
        this.dataLoaded = true;
      });
  }

  ngOnDestroy() {
    this.introductionDataSubscription.unsubscribe();
  }

  onThoughtChanged() {
    this.balancedThought = this.balancedThoughts[
      this.negativeThoughts.indexOf(this.selectedThought)
    ];
  }

  saveData() {
    let data = {
      selectedThought: this.selectedThought,
    };
    this.introductionService
      .storeIntroductionData(this.stepGroupSequence, data)
      .subscribe(data => {
        console.log('success');
      });
  }
}
